"use client"
// Update slug by admins
import { useState } from "react"
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/context/AuthContext"

const slugify = (str) =>
  str
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")

export default function AddSlugs() {
  const { user: currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddSlugs = async () => {
    if (!currentUser?.admin) {
      setMessage("Only admins can run this!")
      return
    }

    setLoading(true)
    setMessage("Updating slugs...")

    try {
      const geeksRef = collection(db, "geeks")
      const snapshot = await getDocs(geeksRef)

      let updatedCount = 0

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data()
        const userSlug = slugify(data.fullName || data.username || docSnap.id)

        // Skip if slug already exists
        if (data.slug === userSlug) continue

        const userRef = doc(db, "geeks", docSnap.id)
        await updateDoc(userRef, { slug: userSlug })
        updatedCount++
      }

      setMessage(`Updated slugs for ${updatedCount} users!`)
    } catch (err) {
      console.error(err)
      setMessage("Failed to update slugs. Check console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "1rem", maxWidth: "400px" }}>
      <button
        onClick={handleAddSlugs}
        disabled={loading}
        style={{
          padding: "0.5rem 1rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Updating..." : "Add Slugs to All Users"}
      </button>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  )
}
