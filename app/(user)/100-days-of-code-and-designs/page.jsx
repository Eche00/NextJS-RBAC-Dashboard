"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import "./100Days.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


export default function HundredDaysPage() {
    const { user } = useAuth();

    const [hasJoined, setHasJoined] = useState(false);
    const [checkingJoin, setCheckingJoin] = useState(true);
    const [joining100Days, setJoining100Days] = useState(false);
    const [joinedUsers, setJoinedUsers] = useState([]);
    const [secondRandomUser, setSecondRandomUser] = useState("");
    const [currentDay, setCurrentDay] = useState(0);




    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // before, ongoing, ended
    const [eventStatus, setEventStatus] = useState("before");

    // New state for joined users
    const [joinedUsersCount, setJoinedUsersCount] = useState(0);
    const [randomUserName, setRandomUserName] = useState("");

    // Single source of truth: check if user already joined 100Days
    useEffect(() => {
        const checkJoinStatus = async () => {
            if (!user) {
                setCheckingJoin(false);
                return;
            }

            try {
                const userRef = doc(db, "geeks", user.uid);
                const snap = await getDoc(userRef);

                if (snap.exists()) {
                    setHasJoined(!!snap.data()?.["100Days"]);
                }
            } catch (err) {
                console.error("Error checking 100Days status:", err);
            } finally {
                setCheckingJoin(false);
            }
        };

        checkJoinStatus();
    }, [user]);

    // New: fetch count and random name of joined users
    useEffect(() => {
        const fetchJoinedUsers = async () => {
            try {
                const q = query(collection(db, "geeks"), where("100Days", "==", true));
                const qs = await getDocs(q);
                const joined = qs.docs
                    .map(d => d.data().fullName)
                    .filter(Boolean);

                setJoinedUsers(joined);
                setJoinedUsersCount(joined.length);

                if (joined.length > 0) {
                    const randomIndex = Math.floor(Math.random() * joined.length);
                    const firstUser = joined[randomIndex];
                    setRandomUserName(firstUser);

                    if (joined.length > 2) {
                        const others = joined.filter(u => u !== firstUser);
                        const secondIndex = Math.floor(Math.random() * others.length);
                        setSecondRandomUser(others[secondIndex]);
                    }
                }
            } catch (err) {
                console.error("Error fetching joined users:", err);
            }
        };

        fetchJoinedUsers();
    }, []);



    // Countdown logic (unchanged)
    useEffect(() => {
        const startDate = new Date("2026-01-12T00:00:00").getTime();
        const endDate = new Date("2026-04-21T23:59:59.999").getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const oneDay = 1000 * 60 * 60 * 24;

            if (now < startDate) {
                const diff = startDate - now;
                setTimeLeft({
                    days: Math.floor(diff / oneDay),
                    hours: Math.floor((diff % oneDay) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
                setEventStatus("before");
                setCurrentDay(0);
            } else if (now >= startDate && now <= endDate) {
                const diff = endDate - now;

                const dayNumber = Math.min(
                    Math.floor((now - startDate) / oneDay) + 1,
                    100
                );

                setCurrentDay(dayNumber);

                setTimeLeft({
                    days: Math.floor(diff / oneDay),
                    hours: Math.floor((diff % oneDay) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });

                setEventStatus("ongoing");
            } else {
                setEventStatus("ended");
                setCurrentDay(100);
            }
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="hundred-days-container">
            {/* Hero Section */}
            <section className="hero-section">
                {eventStatus === "ongoing" ? (
                    <h4 className="hero-titles">Day {currentDay} of #100DaysOfCodeAndDesigns</h4>
                ) : (
                    <h1 className="hero-title">100 Days of Code & Designs</h1>
                )}
                <p className="hero-subtitle">
                    Building in public. Designing boldly. Coding daily.
                </p>


                {/* Event Start Date */}
                <div className="start-date">
                    {eventStatus === "before" && (
                        <>
                            <span>Event Starts on:</span>{" "}
                            <strong>January 12, 2026</strong>
                        </>
                    )}

                    {eventStatus !== "before" && (
                        <>
                            <strong>January 12, 2026 - April 21, 2026</strong>
                        </>
                    )}
                </div>


                {eventStatus === "ended" ? (
                    <div className="end-date-message">
                        <span>Event Ended on:</span>{" "}
                        <strong>April 21, 2026</strong>
                    </div>
                ) : (
                    <div className="countdown">
                        <div className="countdown-item">
                            <div className="countdown-value">{timeLeft.days}</div>
                            <div className="countdown-label">Days</div>
                        </div>
                        <div className="countdown-item">
                            <div className="countdown-value">{timeLeft.hours}</div>
                            <div className="countdown-label">Hours</div>
                        </div>
                        <div className="countdown-item">
                            <div className="countdown-value">{timeLeft.minutes}</div>
                            <div className="countdown-label">Minutes</div>
                        </div>
                        <div className="countdown-item">
                            <div className="countdown-value">{timeLeft.seconds}</div>
                            <div className="countdown-label">Seconds</div>
                        </div>
                    </div>
                )}

                {!checkingJoin && (
                    <>
                        <div className="hero-cta">
                            <button
                                href="#"
                                className="cta-buttons card-shock"
                                onClick={async (e) => {
                                    e.preventDefault();

                                    if (!user) {
                                        window.location.href = "/login";
                                        return;
                                    }

                                    // If event has already started, no more joining
                                    if (eventStatus !== "before") {
                                        window.location.href = "/100-days-of-code-and-designs/projects";
                                        return;
                                    }

                                    // Event not started yet → allow joining
                                    if (!hasJoined) {
                                        try {
                                            setJoining100Days(true);
                                            const userRef = doc(db, "geeks", user.uid);
                                            await updateDoc(userRef, {
                                                "100Days": true,
                                                joined100DaysAt: new Date().toISOString(),
                                            });
                                            setHasJoined(true);
                                        } finally {
                                            setJoining100Days(false);
                                        }
                                    }

                                    window.location.href = "/100-days-of-code-and-designs/projects";
                                }}
                            >
                                {eventStatus !== "before"
                                    ? "View All Projects"
                                    : joining100Days
                                        ? "Getting Started"
                                        : hasJoined
                                            ? "View All Projects"
                                            : "Join the Challenge"}
                            </button>
                        </div>

                        {/* New: Joined Users Count */}
                        {joinedUsersCount > 0 && (
                            <div className="joined-users-count">
                                {(() => {
                                    if (joinedUsersCount === 1) {
                                        return `${randomUserName} joined the challenge`;
                                    } else if (joinedUsersCount === 2) {
                                        const secondUser = joinedUsers.find(u => u !== randomUserName);
                                        return `${randomUserName} and ${secondUser} joined the challenge`;
                                    } else if (joinedUsersCount === 3) {
                                        const others = joinedUsers.filter(u => u !== randomUserName);
                                        return `${randomUserName}, ${others[0]}, and 1 other joined the challenge`;
                                    } else {
                                        const remainingCount = joinedUsersCount - 2;
                                        return `${randomUserName}, ${secondRandomUser}, and ${remainingCount} others joined the challenge`;
                                    }
                                })()}
                            </div>
                        )}

                    </>
                )}

                <section className="how-to-start-sections">
                    <h2 className="section-title">How to Get Started</h2>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-icon">
                                <i className="fas fa-play-circle"></i>
                            </div>
                            <h3 className="step-title">Click Get Started</h3>
                            <p className="step-description">
                                Join the challenge officially by clicking the <strong>Get Started</strong> button.
                                This unlocks access to projects, updates, and community participation.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-icon">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <h3 className="step-title">Choose a Project Idea</h3>
                            <p className="step-description">
                                Pick and update project feed with something meaningful to you. You can build one big project or multiple small ones.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-icon">
                                <i className="fab fa-github"></i>
                            </div>
                            <h3 className="step-title">Commit Single Day</h3>
                            <p className="step-description">
                                Starting from <strong>January 12th</strong>, commit code or designs <strong>every day</strong>.
                                Small progress counts — consistency beats perfection.
                            </p>
                        </div>

                        <div className="step-card">
                            <div className="step-icon">
                                <i className="fab fa-twitter"></i>
                            </div>
                            <h3 className="step-title">Share & Tag Us</h3>
                            <p className="step-description">
                                <strong>
                                    Day {currentDay} of <span className="hashtag-text">#100DaysOfCodeAndDesigns</span> with the Sarcastic Geeks Trybe
                                    <span className="hashtag-text"> @sarcasticgeek4u</span>
                                </strong>
                            </p>
                        </div>
                    </div>
                </section>

            </section>

            {/* What to Expect Section */}
            <section className="what-to-expect-section">
                <h2 className="section-title">What to Expect</h2>
                <div className="cards-grid">
                    <div className="card">
                        <div className="step-icon">
                            <i className="fas fa-gift"></i>
                        </div>
                        <h3 className="card-title">Giveaways</h3>
                        <p className="card-description">
                            Exciting prizes and resources shared throughout the journey to celebrate milestones together.
                        </p>
                    </div>
                    <div className="card">
                        <div className="step-icon">
                            <i className="fas fa-handshake"></i>
                        </div>
                        <h3 className="card-title">Collaborations</h3>
                        <p className="card-description">
                            Work with talented developers and designers on meaningful projects that push boundaries.
                        </p>
                    </div>
                    <div className="card">
                        <div className="step-icon">
                            <i className="fas fa-globe"></i>
                        </div>
                        <h3 className="card-title">Connections</h3>
                        <p className="card-description">
                            Build lasting relationships with like-minded creators from around the world.
                        </p>
                    </div>
                    <div className="card">
                        <div className="step-icon">
                            <i className="fas fa-brain"></i>
                        </div>
                        <h3 className="card-title">Mentorship</h3>
                        <p className="card-description">
                            Learn from experienced professionals and share knowledge with aspiring developers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="key-goals-section">
                <h2 className="section-title">Key Goals</h2>
                <div className="goals-grid">
                    <div className="goal-card">
                        <div className="step-icon">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <h3 className="goal-title">Building in Public</h3>
                        <p className="goal-description">
                            Share progress transparently, document the journey, and inspire others through open development.
                        </p>
                    </div>
                    <div className="goal-card">
                        <div className="step-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <h3 className="goal-title">Real-World Experience</h3>
                        <p className="goal-description">
                            Gain practical skills and confidence through hands-on projects and daily coding challenges.
                        </p>
                    </div>
                    <div className="goal-card">
                        <div className="step-icon">
                            <i className="fas fa-eye"></i>
                        </div>
                        <h3 className="goal-title">Online Visibility</h3>
                        <p className="goal-description">
                            Increase your digital presence and establish yourself as an active member of the tech community.
                        </p>
                    </div>
                    <div className="goal-card">
                        <div className="step-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <h3 className="goal-title">Reach Clients</h3>
                        <p className="goal-description">
                            Attract potential clients and collaborators by showcasing your skills and dedication.
                        </p>
                    </div>
                    <div className="goal-card">
                        <div className="step-icon">
                            <i className="fas fa-code"></i>
                        </div>
                        <h3 className="goal-title">Master Technologies</h3>
                        <p className="goal-description">
                            Deepen your understanding of modern frameworks, tools, and best practices through consistent practice.
                        </p>
                    </div>
                    <div className="goal-card">
                        <div className="step-icon">
                            <i className="fas fa-network-wired"></i>
                        </div>
                        <h3 className="goal-title">Build Portfolio</h3>
                        <p className="goal-description">
                            Create a diverse collection of projects that demonstrate your versatility and problem-solving abilities.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
