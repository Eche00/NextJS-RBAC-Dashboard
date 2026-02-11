"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Loader from "@/components/user/loading";
import "@/styles/EditCourse.css";

export default function EditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [expandedModuleIndex, setExpandedModuleIndex] = useState(null); // only one open

    // ---------- FETCH COURSE ----------
    useEffect(() => {
        if (!id) return;

        const fetchCourse = async () => {
            try {
                const snap = await getDoc(doc(db, "courses", id));
                if (snap.exists()) {
                    setCourse({ id: snap.id, ...snap.data() });
                } else {
                    setCourse(null);
                }
            } catch (err) {
                console.error("Error fetching course:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) return <Loader />;
    if (!course) return <p className="edit-course-empty">Course not found</p>;

    // ---------- SAVE COURSE ----------
    const saveCourse = async () => {
        setSaving(true);
        try {
            const { id: docId, ...data } = course;
            await updateDoc(doc(db, "courses", docId), data);
            alert("Course saved successfully!");
        } catch (err) {
            console.error("Error saving course:", err);
            alert("Failed to save course");
        } finally {
            setSaving(false);
        }
    };

    // ---------- DELETE COURSE ----------
    const deleteCourse = async () => {
        const ok = confirm("Are you sure you want to delete this course?");
        if (!ok) return;

        setDeleting(true);
        try {
            await deleteDoc(doc(db, "courses", course.id));
            router.push("/all-courses");
        } catch (err) {
            console.error("Error deleting course:", err);
            alert("Failed to delete course");
        } finally {
            setDeleting(false);
        }
    };

    // ---------- MODULE HANDLERS ----------
    const updateModuleField = (index, field, value) => {
        const updatedModules = [...(course.modules || [])];
        updatedModules[index] = { ...updatedModules[index], [field]: value };
        setCourse((prev) => ({ ...prev, modules: updatedModules }));
    };

    const addModule = () => {
        const updatedModules = [
            ...(course.modules || []),
            { title: "", description: "", videoTitle: "", videoLink: "", videoThumbnail: "" },
        ];
        setCourse((prev) => ({ ...prev, modules: updatedModules }));
    };

    const removeModule = (index) => {
        const updatedModules = [...(course.modules || [])].filter((_, i) => i !== index);
        setCourse((prev) => ({ ...prev, modules: updatedModules }));
        if (expandedModuleIndex === index) setExpandedModuleIndex(null);
    };

    const toggleModule = (index) => {
        setExpandedModuleIndex((prev) => (prev === index ? null : index));
    };

    const previewCourse = () => {
        const slug = (course.courseTitle || "course")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
        router.push(`/courses/${slug}/${course.id}`);
    };

    return (
        <div className="edit-course">
            <div className="edit-course-container">
                <h1>Edit Course</h1>

                <div className="edit-course-section">
                    <label>Course Title:</label>
                    <input
                        type="text"
                        value={course.courseTitle || ""}
                        onChange={(e) =>
                            setCourse((prev) => ({ ...prev, courseTitle: e.target.value }))
                        }
                    />
                </div>

                <div className="edit-course-section">
                    <label>Course Description:</label>
                    <textarea
                        value={course.courseDescription || ""}
                        onChange={(e) =>
                            setCourse((prev) => ({ ...prev, courseDescription: e.target.value }))
                        }
                    />
                </div>

                <div className="edit-course-section">
                    <h2>Modules</h2>

                    {course.modules?.map((module, i) => (
                        <div key={i} className="module-accordion">
                            <div className="module-header" onClick={() => toggleModule(i)}>
                                <strong>{module.title || `Module ${i + 1}`}</strong>
                                <span>{expandedModuleIndex === i ? "" : "▼"}</span>
                            </div>

                            {expandedModuleIndex === i && (
                                <div className="module-content">
                                    <span className="module-remove-btn" onClick={() => removeModule(i)}>
                                        Remove Module
                                    </span>

                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={module.title || ""}
                                        onChange={(e) => updateModuleField(i, "title", e.target.value)}
                                    />

                                    <label>Description:</label>
                                    <textarea
                                        value={module.description || ""}
                                        onChange={(e) => updateModuleField(i, "description", e.target.value)}
                                    />

                                    <label>Video Title:</label>
                                    <input
                                        type="text"
                                        value={module.videoTitle || ""}
                                        onChange={(e) => updateModuleField(i, "videoTitle", e.target.value)}
                                    />

                                    <label>Video Link:</label>
                                    <input
                                        type="text"
                                        value={module.videoLink || ""}
                                        onChange={(e) => updateModuleField(i, "videoLink", e.target.value)}
                                    />

                                    <label>Video Thumbnail:</label>
                                    <input
                                        type="text"
                                        value={module.videoThumbnail || ""}
                                        onChange={(e) =>
                                            updateModuleField(i, "videoThumbnail", e.target.value)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    <span className="add-module-btn" onClick={addModule}>
                        + Add Module
                    </span>
                </div>

                <div className="edit-course-actions">
                    <span className="save-btn" onClick={saveCourse} disabled={saving}>
                        {saving ? "Saving..." : "Save"}
                    </span>
                    <span className="delete-btn" onClick={deleteCourse} disabled={deleting}>
                        {deleting ? "Deleting..." : "Delete"}
                    </span>
                    <span className="preview-btn" onClick={previewCourse}>
                        Preview
                    </span>
                </div>
            </div>
        </div>
    );
}
