"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/user/loading";
import "@/styles/AllCourses.css";

//* Utility to slugify a title
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") 
    .replace(/[^\w\-]+/g, "") 
    .replace(/\-\-+/g, "-") 
    .replace(/^-+/, "") 
    .replace(/-+$/, ""); 

export default function AllCourses() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); 
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingCourseId, setDeletingCourseId] = useState(null); 

  //* Fetch all courses
  useEffect(() => {
    async function fetchCourses() {
      try {
        const qs = await getDocs(collection(db, "courses"));
        const data = qs.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAtTimestamp:
            d.data().createdAtTimestamp?.toDate?.() || new Date(d.data().createdAt),
        }));

        const randomized = data.sort(() => Math.random() - 0.5);
        setCourses(randomized);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (authLoading || loading) return <Loader />;

  //* Filter courses based on active tab
  const filteredCourses = courses.filter((c) => {
    if (activeTab === "mine") {
      return c.fullName === user?.fullName;
    } else if (activeTab === "purchased") {
      return Array.isArray(c.purchased) && c.purchased.includes(user?.fullName);
    }
    return true; 
  });

  //* Further filter based on search
  const displayCourses = filteredCourses.filter((c) =>
    c.courseTitle?.toLowerCase().includes(search.toLowerCase())
  );

  //* Delete a course
  const handleDelete = async (courseId) => {
    const ok = confirm("This will permanently delete the course. Continue?");
    if (!ok) return;

    setDeletingCourseId(courseId);
    try {
      await deleteDoc(doc(db, "courses", courseId));
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    } catch (err) {
      console.error("Error deleting course:", err);
    } finally {
      setDeletingCourseId(null);
    }
  };

  return (
    <div className="allCourses">
      {/* Tabs + Create Button */}
      <div className="allCourses-tabsContainer">
        <div className="allCourses-tabs">
          <div
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </div>
          <div
            className={`tab ${activeTab === "mine" ? "active" : ""}`}
            onClick={() => setActiveTab("mine")}
          >
            Mine
          </div>
          <div
            className={`tab ${activeTab === "purchased" ? "active" : ""}`}
            onClick={() => setActiveTab("purchased")}
          >
            Purchased
          </div>

          <div className="allCourses-createBtnWrappers">
            <div className="tab" onClick={() => router.push("/courses/bez.ai")}>
              + Create a Course
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="allCourses-header">
        <input
          placeholder="Search for courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="allCourses-search"
        />
      </div>

      {/* Courses Grid */}
      {displayCourses.length > 0 ? (
        <div className="allCourses-grid">
          {displayCourses.map((c) => {
            const slug = slugify(c.courseTitle);
            return (
              <div key={c.id} className="allCourses-card">
                {c.modules?.[0]?.videoThumbnail && (
                  <img
                    src={c.modules[0].videoThumbnail}
                    alt={c.courseTitle}
                    className="allCourses-thumbnail"
                  />
                )}
                <div className="allCourses-cardContent">
                  <h3 className="allCourses-title">{c.courseTitle}</h3>
                  <p className="allCourses-author">Created by {c.fullName}</p>
                  <p className="allCourses-date">
                    {c.createdAt || c.createdAtTimestamp?.toLocaleDateString("en-GB")}
                  </p>

                  {/* Buttons */}
                  <div className="allCourses-buttons">
                    <span
                      className="allCourses-btn viewBtn"
                      onClick={() => router.push(`/courses/${slug}/${c.id}`)}
                    >
                      View
                    </span>
                    <span
                      className="allCourses-btn editBtn"
                      onClick={() => router.push(`/all-courses/${c.id}`)}
                    >
                      Edit
                    </span>
                    <span
                      className="allCourses-btn deleteBtn"
                      onClick={() => handleDelete(c.id)}
                      disabled={deletingCourseId === c.id}
                    >
                      {deletingCourseId === c.id ? "Deleting…" : "Delete"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className="allCourses-empty">No courses found.</h2>
      )}
    </div>
  );
}
