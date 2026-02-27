"use client"

/*
  This is Project Page to be handled by Eche
  Do not reinvent the logic or design, you are to only upgrade the concept.
  When user clicks on the project, open a new page ie /projects/${id}
  The edit and Delete feature will be moved to the projects/id page and the full content 
  Creation can in a modal still, but remember to enable such that enter breaks can be read as p tag, for a more aesthetic display
  Fell free to come up wih new design while flowing with same concept on the main project page. by id
*/

import { useEffect, useState } from "react"
import Link from "next/link"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/context/AuthContext"
import Loader from "@/components/user/loading"
import "@/styles/AllProjects.css"

/* Utility */
const slugify = (text) =>
    text
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")

const shuffleArray = (array) => {
    if (!array) return []
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}

export default function AllProjects() {
    const { user, loading: authLoading } = useAuth()

    const [projects, setProjects] = useState([])
    const [activeTab, setActiveTab] = useState("all")
    const [loading, setLoading] = useState(true)

    const [showModal, setShowModal] = useState(false)
    const [creating, setCreating] = useState(false)

    const [viewProject, setViewProject] = useState(null)

    const [projectTitle, setProjectTitle] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [technologies, setTechnologies] = useState("")
    const [status, setStatus] = useState("pending")
    const [projectLink, setProjectLink] = useState("")
    const [editingProjectId, setEditingProjectId] = useState(null)

    const [notification, setNotification] = useState("")
    const [searchQuery, setSearchQuery] = useState("");


    const [contributors, setContributors] = useState([])
    const [userSearch, setUserSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        async function fetchProjects() {
            try {
                const qs = await getDocs(collection(db, "projects"));
                const fetched = qs.docs.map((d) => ({ id: d.id, ...d.data() }));
                setProjects(shuffleArray(fetched)); // Shuffle only once here
                setLoading(false);
            } catch (err) {
                console.error("[v0] Error fetching projects:", err);
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);


    if (authLoading || loading) return <Loader />

    const userProjectsCount = projects.filter((p) => p.ownerId === user?.uid).length

    const searchUsers = async (query) => {
        if (!query || query.length < 2) {
            setSearchResults([])
            return
        }

        try {
            const qs = await getDocs(collection(db, "geeks"))
            const results = qs.docs
                .map((d) => {
                    const data = d.data()
                    return Object.assign({ uid: d.id }, data)
                })
                .filter((u) => {
                    const emailMatch = u.email?.toLowerCase().includes(query.toLowerCase())
                    const nameMatch = u.fullName?.toLowerCase().includes(query.toLowerCase())
                    return (emailMatch || nameMatch) && u.uid !== user?.uid
                })

            setSearchResults(results)
        } catch (err) {
            console.error("[v0] Error searching users:", err)
        }
    }

    const getFilteredProjects = () => {
        let filtered = projects;

        // Filter by tab
        switch (activeTab) {
            case "complete":
                filtered = filtered.filter((p) => p.status?.toLowerCase() === "completed");
                break;
            case "pending":
                filtered = filtered.filter((p) => p.status?.toLowerCase() === "pending");
                break;
            case "mine":
                filtered = filtered.filter((p) => {
                    const isOwner = p.ownerId === user?.uid;
                    const isContributor =
                        p.contributors?.some((c) => c.uid === user?.uid || (user?.fullName && c.fullName === user?.fullName));
                    return isOwner || isContributor;
                });
                break;
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.projectTitle?.toLowerCase().includes(q) ||
                    p.fullName?.toLowerCase().includes(q)
            );
        }

        return filtered;
    };



    const filteredProjects = getFilteredProjects()

    const handleCreateProject = async (e) => {
        if (e) e.preventDefault()
        setNotification("")

        if (!projectTitle || !projectDescription) {
            setNotification("Title and description are required.")
            return
        }

        if (!editingProjectId && userProjectsCount >= 10) {
            setNotification("Maximum of 10 projects allowed.")
            return
        }

        setCreating(true)

        try {
            const projectData = {
                projectTitle: projectTitle,
                projectDescription: projectDescription,
                technologies: technologies
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                status: status,
                projectLink: status === "completed" ? projectLink : "",
                contributors: contributors,
            }

            if (editingProjectId) {
                const projectRef = doc(db, "projects", editingProjectId)
                await updateDoc(projectRef, projectData)
            } else {
                const newProject = Object.assign({}, projectData, {
                    fullName: user.fullName || "Anonymous",
                    ownerId: user.uid,
                    createdAtTimestamp: serverTimestamp(),
                })
                await addDoc(collection(db, "projects"), newProject)
            }

            const qs = await getDocs(collection(db, "projects"))
            setProjects(
                qs.docs.map((d) => {
                    return Object.assign({ id: d.id }, d.data())
                }),
            )
            closeModal()
        } catch (err) {
            console.error(err)
            setNotification("Error saving project. Try again.")
        } finally {
            setCreating(false)
        }
    }

    const closeModal = () => {
        setShowModal(false)
        setProjectTitle("")
        setProjectDescription("")
        setTechnologies("")
        setStatus("pending")
        setProjectLink("")
        setEditingProjectId(null)
        setNotification("")
        setContributors([])
        setUserSearch("")
        setSearchResults([])
    }

    const handleDelete = async (e, projectId) => {
        e.stopPropagation()
        try {
            await deleteDoc(doc(db, "projects", projectId))
            setProjects(projects.filter((p) => p.id !== projectId))
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = (e, project) => {
        e.stopPropagation()
        setEditingProjectId(project.id)
        setProjectTitle(project.projectTitle)
        setProjectDescription(project.projectDescription)
        setTechnologies(project.technologies ? project.technologies.join(", ") : "")
        setStatus(project.status)
        setProjectLink(project.projectLink || "")
        setContributors(project.contributors || [])
        setShowModal(true)
    }

    return (
        <div className="allProjects">
            {/* Tabs */}
            <div className="allProjects-tabsContainer">
                <div className="project-search-container">
                    <input
                        type="text"
                        placeholder="Search by project title or poster name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="project-search-bar"
                    />
                </div>

                <div className="allProjects-tabs">
                    {["All", "Complete", "Pending", "Mine"].map((tab) => (
                        <div
                            key={tab}
                            className={`tab ${activeTab === tab.toLowerCase() ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                        >
                            {tab}
                        </div>
                    ))}

                    <div className="tab add-tabs" onClick={() => setShowModal(true)}>
                        + Add
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filteredProjects.length > 0 ? (
                <div className="allProjects-grid">
                    {filteredProjects.map((p) => (
                        <div key={p.id} className="allProjects-card" onClick={() => setViewProject(p)}>
                            <h3 className="allProjects-title">{p.projectTitle}</h3>

                            {/* Technologies */}
                            <div className="allProjects-tech">
                                {Array.isArray(p.technologies)
                                    ? p.technologies.map((tech, idx) => (
                                        <span key={idx} className="tech-badge">
                                            {tech}
                                        </span>
                                    ))
                                    : typeof p.technologies === "string"
                                        ? p.technologies
                                            .split(",")
                                            .map((tech) => tech.trim())
                                            .filter(Boolean)
                                            .map((tech, idx) => (
                                                <span key={idx} className="tech-badge">
                                                    {tech}
                                                </span>
                                            ))
                                        : null}
                            </div>

                            {/* Footer */}
                            <div className="allProjects-footer">
                                <div className="allProjects-statusLine">
                                    <span className={`status ${p.status}`}>{p.status}</span>
                                    <span className="allProjects-author">by {p.fullName}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="allProjects-empty">No projects found.</h2>
            )}

            {/* View Project Modal */}
            {viewProject && (
                <div className="modal-overlay" onClick={() => setViewProject(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2>{viewProject.projectTitle}</h2>

                        <div className="modal-metadata">
                            <span className={`status ${viewProject.status}`}>{viewProject.status}</span>
                            <p className="allProjects-author">
                                by{" "}
                                <Link href={`/profile/${slugify(viewProject.fullName)}`} className="profile-link">
                                    {viewProject.fullName}
                                </Link>
                            </p>
                        </div>

                        <div className="allProjects-description">{viewProject.projectDescription}</div>

                        <div className="allProjects-tech">
                            {viewProject.technologies?.map((tech, i) => (
                                <span key={i} className="tech-badge">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {viewProject.contributors && viewProject.contributors.length > 0 && (
                            <div className="contributor-list-view">
                                <h3>Contributors</h3>
                                <div className="contributor-badges">
                                    {viewProject.contributors.map((c, i) => (
                                        <Link key={i} href={`/profile/${slugify(c.fullName)}`} className="contributor-badge clickable">
                                            {c.fullName}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {viewProject.projectLink && (
                            <div className="project-link-view">
                                <a
                                    href={viewProject.projectLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="view-project-btn"
                                >
                                    View Live Project
                                </a>
                            </div>
                        )}

                        <div className="modal-actions">
                            {(user?.uid === viewProject.ownerId || user?.admin) && (
                                <>
                                    <div
                                        className="editBtn"
                                        onClick={(e) => {
                                            handleEdit(e, viewProject)
                                            setViewProject(null)
                                        }}
                                    >
                                        Edit
                                    </div>
                                    <div
                                        className="deleteBtn"
                                        onClick={(e) => {
                                            handleDelete(e, viewProject.id)
                                            setViewProject(null)
                                        }}
                                    >
                                        Delete
                                    </div>
                                </>
                            )}

                            <div className="btn-cancel" onClick={() => setViewProject(null)}>
                                Close
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Add / Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingProjectId ? "Edit Project" : "Add Project"}</h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleCreateProject(e)
                            }}
                        >
                            <label>Project Title</label>
                            <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />

                            <label>Project Description</label>
                            <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />

                            <label>Technologies (comma separated)</label>
                            <input value={technologies} onChange={(e) => setTechnologies(e.target.value)} />

                            <label>Contributors</label>
                            <div className="contributors-selection">
                                {contributors.map((c) => (
                                    <span key={c.uid} className="contributor-badge">
                                        {c.fullName}
                                        <span
                                            className="remove-contributor"
                                            onClick={() => {
                                                setContributors(contributors.filter((con) => con.uid !== c.uid))
                                            }}
                                        >
                                            ×
                                        </span>
                                    </span>
                                ))}
                            </div>
                            <input
                                placeholder="Search by email or name"
                                value={userSearch}
                                onChange={(e) => {
                                    setUserSearch(e.target.value)
                                    searchUsers(e.target.value)
                                }}
                            />

                            {searchResults.length > 0 && (
                                <div className="user-search-results">
                                    {searchResults.map((u) => (
                                        <div
                                            key={u.uid}
                                            className="user-result"
                                            onClick={() => {
                                                const exists = contributors.find((c) => c.uid === u.uid)
                                                if (!exists) {
                                                    setContributors(
                                                        contributors.concat([
                                                            {
                                                                uid: u.uid,
                                                                fullName: u.fullName,
                                                                email: u.email,
                                                            },
                                                        ]),
                                                    )
                                                }
                                                setUserSearch("")
                                                setSearchResults([])
                                            }}
                                        >
                                            {u.fullName} ({u.email})
                                        </div>
                                    ))}
                                </div>
                            )}

                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>

                            {status === "completed" && (
                                <>
                                    <label>Project Link</label>
                                    <input value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                                </>
                            )}

                            {notification && <div className="notification-popup">{notification}</div>}

                            <div className="modal-actions">
                                <div className="btn-cancel" onClick={closeModal}>
                                    Cancel
                                </div>
                                <div
                                    className={`btn-submit ${creating ? "disabled" : ""}`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (!creating) handleCreateProject(e)
                                    }}
                                >
                                    {creating ? "Saving..." : editingProjectId ? "Update" : "Create"}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
