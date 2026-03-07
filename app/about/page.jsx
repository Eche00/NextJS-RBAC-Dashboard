"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Code, Users, Zap, Globe, MessageSquare, Award as Trophy, GitBranch, CheckCircle, Briefcase, ArrowRight, Share2 } from "react-feather";
import './../Home.css';
import './../hero.css';
import UserCard from '@/components/user/UserCard';


export function ParticleSystem() {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        const particleArray = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 10,
            size: 2 + Math.random() * 4,
            left: Math.random() * 100,
        }));
        setParticles(particleArray);
    }, []);

    return (
        <div className="particle-container">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: `${particle.left}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

function About() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>About | The Sarcastic Geeks Trybe - Developer Community for Web2, Web3 & AI</title>
                <meta name="description" content="The Sarcastic Geeks Trybe is a developer-first community building at the intersection of AI, Web3, and real-world collaboration. Join us for startup support, outsourcing, beta testing, partnerships, and more." />
                <meta name="keywords" content="developer community, web3 developers, AI developers, hire developers, beta testing, startup support, developer outsourcing, collaboration, tech community Nigeria, Sarcastic Geeks" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://sarcasticgeeks.com/about" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About | The Sarcastic Geeks Trybe" />
                <meta property="og:description" content="A developer-first community building at the intersection of AI, Web3, and real-world collaboration. Collaboration, Beta Testing, Partnerships, Outsourcing — we do it all." />
                <meta property="og:image" content="/images/eche-brain.jpg" />
                <meta property="og:url" content="https://sarcasticgeeks.com/about" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About | The Sarcastic Geeks Trybe" />
                <meta name="twitter:description" content="A developer community that earns, builds, and laughs at the chaos — together." />
                <meta name="twitter:image" content="/images/eche-brain.jpg" />
            </Head>

            <div className="app">
                <main>

                    <section className="hero">
                        <div className="gradient-bg" />
                        <div className="grid-pattern" />
                        <ParticleSystem />
                        <div className="floating-shapes">
                            <div className="shape shape-1" />
                            <div className="shape shape-2" />
                            <div className="shape shape-3" />
                            <div className="shape shape-4" />
                            <div className="shape shape-5" />
                        </div>
                        <div className="hero-overlay"></div>
                        <div className="container">
                            <div className="about-grid">
                                <div className="about-content">
                                    <span className="badge amber">About Us</span>
                                    <h2 className="section-title">The Sarcastic Geeks Trybe</h2>
                                    <p className="about-description">
                                        <strong>A Normal Life is Boring</strong>. We're not just a Trybe of Geeks — we're Sarcastic Geeks.
                                        Developers are often told to grind away in silence, following the same path as everyone else. We think that's the most boring way to live your best developer life.
                                    </p>
                                    <p className="about-description">
                                        Our story is simple but powerful. We believe in creating fun, unconventional ways to make coding not just a job, but a lifestyle.
                                        We gamify the learning process, turn projects into quirky challenges, and find alternative ways to build financial independence
                                        — through side projects, hackathons, outsourcing deals, and unexpected opportunities. The grind doesn't feel like a grind when you're doing it with your trybe.
                                    </p>
                                    <p className="about-description">
                                        At The Sarcastic Geeks Trybe, we're here to help you level up both your skills and your financial game.
                                        Being part of this community means getting paid, having fun, and building something you can be proud of — all while laughing at the chaos along the way.
                                        We open doors to <strong>collaboration</strong>, <strong>beta testing opportunities</strong>, <strong>strategic partnerships</strong>, and <strong>developer outsourcing</strong> — because your talent deserves more than just a LinkedIn profile.
                                    </p>
                                    <div className="community-actions">
                                        <button onClick={() => router.push('/roadmap')} className="community-actions-btn">
                                            View Our Roadmap
                                        </button>
                                    </div>
                                </div>
                                <div className="about-image">
                                    <div className="grid-container">
                                        <div className="main-box">
                                            <img src="/images/eche-brain.jpg" alt="The Sarcastic Geeks Trybe" className="about-img" />
                                        </div>
                                        <div className="right-column">
                                            <img src="/images/brain-eche.JPG" alt="The Sarcastic Geeks Trybe" className="about-img" />
                                        </div>
                                    </div>
                                    <div className="values-card">
                                        <div className="card-overlay"></div>
                                        <div className="event-overlay">
                                            <h2>A Normal Life is Boring</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="features" className="features">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">More than just code</h2>
                                <p className="section-description">
                                    The Trybe pushes for the integration of AI and Web3 while supporting startups, fostering collaboration, and creating
                                    opportunities to earn online. — A Normal Life is Boring.
                                </p>
                            </div>
                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="card-icon purple"><Code className="icon" /></div>
                                    <h3 className="card-title">Startup Support</h3>
                                    <p className="card-description">Get resources, mentorship, and community backing to launch and grow your startup. We help you validate your idea, find your first users, and build momentum from day one.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="card-icon cyan"><Users className="icon" /></div>
                                    <h3 className="card-title">Proof of Community</h3>
                                    <p className="card-description">Leverage our community backing to validate ideas and gain traction for your projects. Real developers, real feedback, real support — not just likes and retweets.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="card-icon pink"><Zap className="icon" /></div>
                                    <h3 className="card-title">AI & Web3 Integration</h3>
                                    <p className="card-description">Learn and build at the intersection of artificial intelligence and blockchain technology. We host sessions, workshops, and live builds to keep you at the bleeding edge.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="card-icon amber"><Trophy className="icon" /></div>
                                    <h3 className="card-title">Earn While Learning</h3>
                                    <p className="card-description">Participate in activities to earn in-app points that will become tokens with real value. From game nights to hackathons, every action you take builds your on-chain reputation.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="card-icon green"><MessageSquare className="icon" /></div>
                                    <h3 className="card-title">Tech Job Connections</h3>
                                    <p className="card-description">Helping developers discover new career opportunities and connect with companies looking for their skills. Whether you want remote work, contracts, or full-time roles — we plug you in.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="card-icon blue"><Globe className="icon" /></div>
                                    <h3 className="card-title">Developer Outsourcing</h3>
                                    <p className="card-description">
                                        Provide skilled developers to companies worldwide, empowering businesses while giving tech talent real projects to work on.
                                        <a href="/outsourcing" className="card-link">Learn more <ArrowRight size={14} className='card-link-icon' /></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="services" className="features">
                        <div className="container">
                            <div className="section-header">
                                <span className="badge amber">What We Offer</span>
                                <h2 className="section-title">How We Work With You</h2>
                                <p className="section-description">
                                    Beyond community, the Sarcastic Geeks Trybe opens doors to real-world opportunities — from collaborative builds to paid outsourcing engagements.
                                    These are the four pillars that connect our community to the world.
                                </p>
                            </div>
                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="card-icon purple"><GitBranch className="icon" /></div>
                                    <h3 className="card-title">Collaboration</h3>
                                    <p className="card-description">We believe the best products are built together. The Trybe actively facilitates collaboration between developers, designers, and project managers on real gigs and open-source projects.</p>
                                    <a href="/collaboration" className="card-link">Explore Collaboration <ArrowRight size={14} className='card-link-icon' /></a>
                                </div>
                                <div className="feature-card">
                                    <div className="card-icon cyan"><CheckCircle className="icon" /></div>
                                    <h3 className="card-title">Beta Testing Audit</h3>
                                    <p className="card-description">Before your product goes live, it needs real eyes. Our community of seasoned developers and tech enthusiasts provides structured beta testing and honest audits.</p>
                                    <a href="/beta-testing-audit" className="card-link">Request a Beta Audit <ArrowRight size={14} className='card-link-icon' /></a>
                                </div>
                                <div className="feature-card">
                                    <div className="card-icon pink"><Share2 /></div>
                                    <h3 className="card-title">Partnership</h3>
                                    <p className="card-description">We're always open to strategic partnerships with startups, tech companies, DAOs, and organizations that share our vision.</p>
                                    <a href="/collaboration" className="card-link">Become a Partner <ArrowRight size={14} className='card-link-icon' /></a>
                                </div>
                                <div className="feature-card">
                                    <div className="card-icon green"><Briefcase className="icon" /></div>
                                    <h3 className="card-title">Developer Outsourcing</h3>
                                    <p className="card-description">Need a skilled developer or a full team? The Sarcastic Geeks Trybe connects businesses with vetted, experienced developers across web2, web3, mobile, and AI.</p>
                                    <a href="/outsourcing" className="card-link">Hire from the Trybe <ArrowRight size={14} className='card-link-icon' /></a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="roadmap-cta" className="roadmap-cta">
                        <div className="container">
                            <div className="roadmap-cta-box">
                                <span className="badge cyan">Transparency First</span>
                                <h2 className="section-title roadmap-cta-title">See Where We're Headed</h2>
                                <p className="section-description roadmap-cta-description">
                                    We build in public. Our roadmap outlines every milestone — from community growth targets and product launches to token integration and global outsourcing expansion.
                                </p>
                                <button onClick={() => router.push('/roadmap')} className="community-actions-btn">
                                    View the Full Roadmap
                                </button>
                            </div>
                        </div>
                    </section>

                    <section id="showcase" className="showcase">
                        <div className="containers">
                            <div className="section-header">
                                <h2 className="section-title">Meet our trybe</h2>
                                <p className="section-description">
                                    The Trybe brings together a diverse mix of developers — from web2 and mobile engineers to AI innovators and web3 builders — united by a shared passion to collaborate, learn, and shape the future of technology together.
                                </p>
                            </div>
                            <UserCard />
                            <div className="cta-content">
                                <h2>Ready to join our trybe?</h2>
                                <p className="cta-description">Create your profile, connect with other geeks, and start building the future together.</p>
                                <button className="app-container center-btn" onClick={() => window.open('https://x.com/sarcasticgeek4u', '_blank')}>
                                    Join the X Family
                                </button>
                            </div>
                        </div>
                    </section>

                    <section id="community" className="community">
                        <div className="container">
                            <div className="community-grid">
                                <div>
                                    <span className="badge pink">The Geeks Community</span>
                                    <h2 className="section-title">Join a trybe of Sarcastic Geeks</h2>
                                    <p className="community-description">
                                        The Trybe is more than just a community — it's a startup built by devs for devs; where project managers connect and collaborate with the complete skill sets.
                                    </p>
                                    <p className="community-description" style={{ marginTop: '1rem' }}>
                                        Every week brings new opportunities: code reviews, game nights, hackathons, and X Spaces where real ideas become real products. — A normal life is boring.
                                    </p>
                                    <div className="community-actions">
                                        <button onClick={() => router.push('/account')} className="community-actions-btn">Get a Community Profile</button>
                                        <button onClick={() => router.push('/roadmap')} className="btn btn-outline">View Project Roadmap</button>
                                    </div>
                                </div>
                                <div className="community-image">
                                    <div className="image-overlay"></div>
                                    <div className="event-cards">
                                        {[
                                            { title: "Weekly X Spaces", time: "Every Saturday at 8PM WAT", image: "/images/space-sessions.JPG" },
                                            { title: "Code Review Session", time: "Active Debugging", image: "/images/code-review.PNG" },
                                            { title: "Game Nights", time: "Regularly, on Request", image: "/images/game-challenge.PNG" },
                                            { title: "Hackathon & Buildathon", time: "Quarterly, Community Backing.", image: "/images/group-pic.jpg" }
                                        ].map((event, index) => (
                                            <div className="event-card" key={index}>
                                                <div className="card-overlay"></div>
                                                <img src={event.image} alt={event.title} className="event-image" />
                                                <div className="event-overlay">
                                                    <h3 className="event-title">{event.title}</h3>
                                                    <p className="event-time">{event.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="faq" className="faq">
                        <div className="container">
                            <div className="section-header">
                                <span className="badge cyan">FAQ</span>
                                <h2 className="section-title">Frequently asked questions</h2>
                                <p className="section-description">Everything you need to know about the Sarcastic Geeks Trybe.</p>
                            </div>
                            <div className="faq-grid">
                                {[
                                    { q: "Do I need to be a web3 developer to join?", a: "Not at all! Our community welcomes developers from all backgrounds - web2, mobile, AI, and web3. If you write code, you belong here." },
                                    { q: "How does the in-app points system work?", a: "You earn points by participating in community activities like game nights, hackathons, and contributing to projects. These points will eventually be converted to tokens with real value." },
                                    { q: "What kind of games can we expect during game nights?", a: "Expect a range of fun, casual browser games with impressive graphics. We focus on accessible games that are easy to pick up but still deliver a great gaming experience." },
                                    { q: "How does 'Proof of Community' work?", a: "Proof of Community is our way of validating projects and startups through community backing. Members can vote on and support projects they believe in." },
                                    { q: "How can I get my startup supported by the community?", a: "Join the community, participate actively, and then pitch your startup idea during our regular pitch events." },
                                    { q: "How does Beta Testing Audit work?", a: "Submit a request via our Beta Testing page. We assign community testers who evaluate your app across functionality, UX, performance, and security — then deliver a structured report." },
                                    { q: "Can my company hire developers through the Trybe?", a: "Absolutely. Visit the Outsourcing page to submit your requirements and we'll match you with the right talent." },
                                    { q: "What makes Sarcastic Geeks Trybe different?", a: "We combine technical excellence with a fun, sarcastic culture. They are trying to fit in, we are trying to stand out." },
                                ].map((item, i) => (
                                    <div key={i} className="faq-item">
                                        <h3 className="faq-question">{item.q}</h3>
                                        <p className="faq-answer">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </>
    );
}

export default About;