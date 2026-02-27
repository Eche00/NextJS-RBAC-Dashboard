"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Loader from "@/components/user/loading"
import "@/styles/Course.css"
import ChatBot from "./chat/page"
import { useAuth } from "@/context/AuthContext"
import { getAuth } from "firebase/auth"

//* Required cowries to access AI course
const MINIMUM_BALANCE = 100

//* Course rules shown to the user before they begin
const RULES = [
  "This AI course is a dynamic and interactive experience, not just a bunch of static lessons. The AI may ask you questions to customize your learning. Try to be conversational and thoughtful in your responses, not just short replies like 'okay' or 'yes'.",
  "The AI isn't perfect. If it goes off-topic or gets confused, just reload the page or guide it back with a clear message. You're in control of the flow, so don't hesitate to steer it when needed.",
  "You need at least 100 cowries to begin. Cowries can be earned by playing games or asking other Trybe members to gift you some. Keep your balance up to unlock more features.",
  "You can only create a new course once every 7 days. This keeps things focused. But you can continue learning your current course anytime, now with AI support included!",
  "The AI has a bit of humor and might roast you from time to time. Don't take it personally — it's meant to be fun. Loosen up, enjoy the banter, and stay engaged.",
  "To get the most out of it, share honest answers, express your thoughts, and let the AI learn about you. The more it understands you, the better your course experience will be.",
]

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")      // Replace spaces with -
    .replace(/[^\w\-]+/g, "")  // Remove all non-word chars
    .replace(/\-\-+/g, "-");   // Replace multiple - with single -

const ChatCourse = () => {
  const router = useRouter()
  const { user: authUser, loading: authLoading } = useAuth()
  const [user, setUser] = useState(null)
  const [totalBalance, setTotalBalance] = useState(0)
  const [checkingQualification, setCheckingQualification] = useState(false)
  const [existingCourse, setExistingCourse] = useState(null)
  const [qualified, setQualified] = useState(false)
  const [showCourseReady, setShowCourseReady] = useState(false)
  const [userDataLoading, setUserDataLoading] = useState(true)
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false) // NEW

  // --------------------------------------------------
  // Fetch full user doc from Firestore and compute balance
  // --------------------------------------------------
  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser?.uid) {
        setUserDataLoading(false)
        return
      }

      try {
        const userDoc = await getDoc(doc(db, "geeks", authUser.uid))
        const fullName = userDoc.exists() ? userDoc.data().fullName || "Unknown" : "Unknown"
        const transactions = userDoc.exists() ? userDoc.data().transactions || [] : []

        const total = transactions.reduce(
          (sum, t) =>
            t.type === "credit"
              ? sum + Number(t.amount || 0)
              : sum - Number(t.amount || 0),
          0
        )

        setUser({ uid: authUser.uid, email: authUser.email, fullName, transactions })
        setTotalBalance(total)

        // Only show insufficient balance if user has no existing course
        setShowInsufficientBalance(!existingCourse && total < MINIMUM_BALANCE)

      } catch (e) {
        console.error("Error fetching user:", e)
        setUser(null)
        setShowInsufficientBalance(false)
      } finally {
        setUserDataLoading(false)
      }
    }

    fetchUserData()
  }, [authUser, existingCourse])

  // --------------------------------------------------
  // Check if the user has created a course within the last 7 days
  // --------------------------------------------------
  const checkRecentCourse = async () => {
    if (!user?.fullName) return false
    const q = query(collection(db, "courses"), where("fullName", "==", user.fullName))
    const snapshot = await getDocs(q)
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data()
      const createdAt = data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt)
      if (createdAt > sevenDaysAgo) {
        setExistingCourse({ id: docSnap.id, ...data })
        return true
      }
    }
    return false
  }

  // --------------------------------------------------
  // Prepay and execute transfer after qualification
  // --------------------------------------------------
  const handleQualifyCourse = async () => {
    if (!user) return
    setCheckingQualification(true)

    try {
      const recent = await checkRecentCourse()
      const hasMinimum = totalBalance >= MINIMUM_BALANCE
      setQualified(hasMinimum)

      if (recent || !hasMinimum) return

      // Find AI recipient
      const usersSnapshot = await getDocs(collection(db, "geeks"))
      const recipientDoc = usersSnapshot.docs.find(
        (doc) => doc.data().username === "sarcasticgeek4u"
      )

      if (!recipientDoc) throw new Error("Recipient not found")

      const auth = getAuth()
      const token = await auth.currentUser.getIdToken()

      const transferId = crypto.randomUUID()
      const tokenAmount = 30

      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: user.uid,
          receiverId: recipientDoc.id,
          amount: tokenAmount,
          transferId,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Transfer failed")

      const refreshedSnap = await getDoc(doc(db, "geeks", user.uid))
      const refreshedTxns = refreshedSnap.data().transactions || []

      const newTotal = refreshedTxns.reduce(
        (sum, t) =>
          sum + (t.type === "credit" ? Number(t.amount || 0) : -Number(t.amount || 0)),
        0
      )

      setUser((prev) => ({ ...prev, transactions: refreshedTxns }))
      setTotalBalance(newTotal)

      setShowCourseReady(true)
      console.log("✅ Course payment successful via transfer API")

    } catch (error) {
      console.error("❌ Course payment failed:", error.message)
    } finally {
      setCheckingQualification(false)
    }
  }

  // --------------------------------------------------
  // Format balance for display
  // --------------------------------------------------
  const formattedBalance = totalBalance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  // --------------------------------------------------
  // Auth or loading gate
  // --------------------------------------------------
  if (authLoading || userDataLoading) return <Loader />

  return (
    <>
      <div className="course-container">
        {!showCourseReady && (
          <>
            <div className="loader-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>

            <div className="course-content-flex">
              <div className="rules-section">
                <h3>Before starting, please read the rules:</h3>
                <ul>
                  {RULES.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>

                <div className="action-area">
                  {/* Logged OUT View */}
                  {!authUser && !userDataLoading && (
                    <div className="logged-out-action">
                      <button
                        onClick={() => router.push("/login")}
                        className="card-shock center-btn"
                      >
                        Get Started
                      </button>
                    </div>
                  )}

                  {/* Logged IN View */}
                  {authUser && (
                    <>
                      {!checkingQualification && !existingCourse && totalBalance >= MINIMUM_BALANCE && (
                        <div>
                          <div className="button-flex">
                            <div className="tab" onClick={handleQualifyCourse}>
                              Start Bez AI
                            </div>
                            <div
                              onClick={() =>
                                router.push(`/courses`)
                              }
                              className="tab"
                            >
                              View All Courses
                            </div>
                          </div>
                          Total Balance: <strong>{formattedBalance} 🐚</strong>
                        </div>
                      )}

                      {checkingQualification && (
                        <p className="checking-text">Checking your eligibility...</p>
                      )}

                      {existingCourse && (
                        <div className="notice-box">
                          <p>
                            You created a course "<strong>{existingCourse.courseTitle}</strong>" on{" "}
                            {new Date(existingCourse.createdAt).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                            .
                          </p>
                          <p>You must wait 7 days before creating another course.</p>
                          <button
                            onClick={() =>
                              router.push(
                                `/courses/${slugify(existingCourse.courseTitle)}/${existingCourse.id}`
                              )
                            }
                            className="continue-link card-shock center-btn"
                          >
                            👉 Continue Learning
                          </button>
                        </div>
                      )}

                      {qualified && !existingCourse && showCourseReady && (
                        <div className="course-ready">🎉 Ready for this course!</div>
                      )}

                      {showInsufficientBalance && (
                        <>
                          <p className="fail-text">
                            ❌ You need at least {MINIMUM_BALANCE} cowries to proceed.
                          </p>
                          <button
                            onClick={() =>
                              router.push(`/courses`)
                            }
                            className="card-shock center-btns"
                          >
                            View All Courses
                          </button>
                          <p className="user-balance">
                            Total Balance: <strong>{formattedBalance} 🐚</strong>
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="side-image">
                <img src="/images/geek-hoodie.png" alt="AI Bot" />
                <h2>Bez AI</h2>
              </div>
            </div>
          </>
        )}
      </div>

      {showCourseReady && <ChatBot user={user} />}
    </>
  )
}

export default ChatCourse