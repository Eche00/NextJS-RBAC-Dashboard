"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { GitBranch, CheckCircle, Share2, Code, Users, Zap, Globe, ArrowRight, Layers, Cpu, Shield, } from "react-feather";
import './../Home.css';
import './../hero.css';
import { ParticleSystem } from './../about/page';


function CollaborationPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('startups');

    return (
        <>
            {/* ── SEO HEAD ── */}
            <Head>
                <title>Collaboration & Partnership | Sarcastic Geeks Trybe — Build With Elite Developers</title>
                <meta
                    name="description"
                    content="Collaborate with execution-ready developers from the Sarcastic Geeks Trybe. We support startups, companies, and developer ecosystems through real technical collaboration, beta testing, and long-term strategic partnerships."
                />
                <meta name="keywords" content="developer collaboration, technical partnership, startup developers, hire developers Nigeria, beta testing, open source collaboration, web3 collaboration, AI developers, Sarcastic Geeks" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://sarcasticgeeks.com/collaboration" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Collaboration & Partnership | Sarcastic Geeks Trybe" />
                <meta property="og:description" content="Build With Elite Developers. Scale With Strategic Partners. Real collaboration. Real execution. Real outcomes." />
                <meta property="og:image" content="/images/eche-brain.jpg" />
                <meta property="og:url" content="https://sarcasticgeeks.com/collaboration" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Collaboration & Partnership | Sarcastic Geeks Trybe" />
                <meta name="twitter:description" content="An active execution layer where developers, startups, and organizations collaborate to build real systems." />
                <meta name="twitter:image" content="/images/eche-brain.jpg" />
            </Head>

            <div className="app">
                <main>

                    {/* ── HERO ── */}
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
                        <div className="hero-overlay" />
                        <div className="container">
                            <div className="hero-grid">
                                <div className="hero-content">
                                    <span className="badge amber">Collaboration & Partnership</span>
                                    <div className="content-wrapper">
                                        <h1 className="hero-tops">Build With Elite Developers.</h1>
                                        <h2 className="hero-top">Scale With Strategic Partners.</h2>
                                    </div>
                                    <p className="hero-description">
                                        Sarcastic Geeks is not a passive community. It is an active execution layer where developers, startups,
                                        and organizations collaborate to build real systems, validate ideas, and scale products faster.
                                    </p>
                                    <p className="hero-description">
                                        Whether you're building an early-stage startup, expanding an existing platform, or seeking technical
                                        partners — our network provides execution-ready developers, beta testers, and long-term collaborators
                                        who actually ship.
                                    </p>
                                    <div className="hero-actions">
                                        <button
                                            onClick={() => router.push('/login')}
                                            className="community-actions-btn">
                                            Start a Collaboration
                                        </button>
                                        <button
                                            onClick={() => router.push('/collaboration')}
                                            className="btn btn-outline">
                                            Become a Strategic Partner
                                        </button>
                                    </div>
                                    <p className="community-count">
                                        Trusted by builders, founders, and engineers shaping real products.
                                    </p>
                                </div>
                                <div className="hero-image">
                                    <div className="image-container">
                                        <div className="image-overlay" />
                                        <img
                                            src="/images/code-review.PNG"
                                            alt="Sarcastic Geeks Collaboration"
                                            className="hero-img"
                                        />
                                        <div className="image-footer">
                                            <div className="foot-content">
                                                <div className="footer-left">
                                                    <div className="icon-wrapper">
                                                        <GitBranch size={14} color="white" />
                                                    </div>
                                                    <div>
                                                        <p className="foot-title">Active Collaboration</p>
                                                        <p className="foot-subtitle">Real developers. Real execution.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ── COLLABORATION CAPABILITIES ── */}
                    <section id="capabilities" className="features">
                        <div className="container">
                            <div className="section-header">
                                <span className="badge cyan">What We Do</span>
                                <h2 className="section-title">Collaboration That Produces Real Outcomes</h2>
                                <p className="section-description">
                                    This is not surface-level networking. Every collaboration within Sarcastic Geeks is designed to produce
                                    tangible results — shipped features, validated products, resolved technical blockers, and scalable infrastructure.
                                    We don't just connect people; we align execution.
                                </p>
                            </div>
                            <div className="features-grid">

                                <div className="feature-card">
                                    <div className="card-icon purple">
                                        <GitBranch className="icon" />
                                    </div>
                                    <h3 className="card-title">Product-Level Collaboration</h3>
                                    <p className="card-description">
                                        Work directly with developers actively building production systems. Collaborators contribute to real
                                        repositories, solve engineering challenges, and participate in architecture decisions, feature delivery,
                                        and system optimization — not just advice, actual execution.
                                    </p>
                                </div>

                                <div className="feature-card">
                                    <div className="card-icon cyan">
                                        <Code className="icon" />
                                    </div>
                                    <h3 className="card-title">Startup Technical Execution</h3>
                                    <p className="card-description">
                                        Early-stage startups gain access to developers capable of implementing MVP features, improving
                                        performance, resolving technical debt, and stabilizing production infrastructure. We don't just consult —
                                        we build alongside you until the product is ready.
                                    </p>
                                </div>

                                <div className="feature-card">
                                    <div className="card-icon pink">
                                        <CheckCircle className="icon" />
                                    </div>
                                    <h3 className="card-title">Deep Beta Testing & Validation</h3>
                                    <p className="card-description">
                                        Products are tested by real developers who evaluate usability, performance, scalability, and reliability
                                        — identifying issues before they affect real users. Our beta audit goes beyond bug reports; it delivers
                                        structured engineering insight.
                                    </p>
                                </div>

                                <div className="feature-card">
                                    <div className="card-icon amber">
                                        <Layers className="icon" />
                                    </div>
                                    <h3 className="card-title">Open Contribution Ecosystem</h3>
                                    <p className="card-description">
                                        Developers collaborate across projects, share expertise, contribute improvements, and participate in
                                        building scalable systems beyond isolated environments. Every contribution is tracked, recognized,
                                        and rewarded through the community reputation system.
                                    </p>
                                </div>

                                <div className="feature-card">
                                    <div className="card-icon green">
                                        <Users className="icon" />
                                    </div>
                                    <h3 className="card-title">Cross-Team Engineering Support</h3>
                                    <p className="card-description">
                                        Engineering teams can collaborate with Sarcastic Geeks developers to accelerate feature delivery,
                                        resolve bottlenecks, and extend internal engineering capacity — without the overhead of full-time
                                        hiring or long onboarding cycles.
                                    </p>
                                </div>

                                <div className="feature-card">
                                    <div className="card-icon blue">
                                        <Globe className="icon" />
                                    </div>
                                    <h3 className="card-title">Long-Term Technical Partnership</h3>
                                    <p className="card-description">
                                        Organizations can establish ongoing relationships with developers for continuous product improvement,
                                        infrastructure maintenance, and engineering expansion. This is not a one-time engagement — it's a
                                        sustained technical relationship built for scale.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </section>


                    {/* ── PARTNERSHIP TYPES SHOWCASE ── */}
                    <section id="partnership-types" className="showcase">
                        <div className="container">
                            <div className="section-header">
                                <span className="badge pink">Who We Work With</span>
                                <h2 className="section-title">Strategic Partnerships We Support</h2>
                                <p className="section-description">
                                    Sarcastic Geeks partners with organizations across different stages — from early-stage startups to
                                    established companies — providing technical collaboration, product support, and developer access.
                                    Every partnership is structured around real execution, not optics.
                                </p>
                            </div>

                            <div className="tabs-container">
                                <div className="tabs-header">
                                    <button
                                        className={`tab-button ${activeTab === 'startups' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('startups')}>
                                        Startups
                                    </button>
                                    <button
                                        className={`tab-button ${activeTab === 'companies' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('companies')}>
                                        Companies
                                    </button>
                                    <button
                                        className={`tab-button ${activeTab === 'ecosystems' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('ecosystems')}>
                                        Developer Ecosystems
                                    </button>
                                </div>

                                {/* Startups Tab */}
                                <div className={`tab-content ${activeTab === 'startups' ? 'active' : ''}`}>
                                    <div className="cards-grid">
                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon purple">
                                                        <Zap className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">Startup Launch Support</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Build MVPs faster with developers capable of implementing core product functionality,
                                                    integrations, and infrastructure. We help you go from idea to working product without
                                                    wasting months on recruitment or onboarding.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/login" className="card-link">
                                                    Get Started <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon cyan">
                                                        <Shield className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">Technical Validation</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Validate architecture, performance, and scalability before production deployment.
                                                    Real developers review your codebase, stress-test your infrastructure, and surface
                                                    issues you cannot afford to discover in production.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/beta-testing-audit" className="card-link">
                                                    Request Audit <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon green">
                                                        <Users className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">Engineering Expansion</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Extend your engineering team without full-time hiring overhead. Access developers
                                                    who can integrate into your workflow, contribute to your codebase, and help you
                                                    ship faster — on your timeline.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/outsourcing" className="card-link">
                                                    Learn More <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Companies Tab */}
                                <div className={`tab-content ${activeTab === 'companies' ? 'active' : ''}`}>
                                    <div className="cards-grid">
                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon blue">
                                                        <Cpu className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">Engineering Resource Extension</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Collaborate with external developers to accelerate internal engineering workflows.
                                                    Our developers integrate cleanly into existing teams, follow your processes, and
                                                    deliver without friction or long ramp-up periods.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/outsourcing" className="card-link">
                                                    Hire Developers <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon purple">
                                                        <Code className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">Feature Development Support</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Deliver features faster by expanding execution capacity through collaboration.
                                                    Whether you need full feature ownership or targeted support on specific modules,
                                                    we align developers with your sprint cycles and delivery goals.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/login" className="card-link">
                                                    Start Collaboration <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon pink">
                                                        <Zap className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">System Optimization</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Improve performance, stability, and scalability through targeted engineering collaboration.
                                                    Our developers identify bottlenecks, refactor critical systems, and implement
                                                    improvements that reduce operational costs and technical risk.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/beta-testing-audit" className="card-link">
                                                    Get an Audit <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Developer Ecosystems Tab */}
                                <div className={`tab-content ${activeTab === 'ecosystems' ? 'active' : ''}`}>
                                    <div className="cards-grid">
                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon amber">
                                                        <Share2 className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">Community Integration</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Integrate Sarcastic Geeks into your ecosystem to expand your technical reach.
                                                    We collaborate with platforms, protocols, and developer tools looking to grow
                                                    their active builder base with real contributors.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/partnership" className="card-link">
                                                    Partner With Us <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon green">
                                                        <Users className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">Developer Access</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Connect your platform with active developers building real systems. Our community
                                                    does not just consume tools — they build with them, report real issues, and contribute
                                                    to making platforms better through direct use.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/login" className="card-link">
                                                    Get Access <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="profile-card">
                                            <div className="card-header" />
                                            <div className="card-body">
                                                <div className="profile-header">
                                                    <div className="card-icon cyan">
                                                        <Globe className="icon" />
                                                    </div>
                                                    <div>
                                                        <h3 className="profile-name">Ecosystem Growth</h3>
                                                    </div>
                                                </div>
                                                <p className="profile-bio">
                                                    Support innovation by enabling developer collaboration across platforms. We help
                                                    ecosystems grow their contributor base, increase engagement, and build long-term
                                                    technical communities that sustain product development.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="/collaboration" className="card-link">
                                                    Explore Partnership <ArrowRight size={14} className="card-link-icon" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ── HOW COLLABORATION WORKS ── */}
                    <section id="how-it-works" className="community">
                        <div className="container">
                            <div className="community-grid">
                                <div className="community-content">
                                    <span className="badge amber">The Process</span>
                                    <h2 className="section-title">How Collaboration Works</h2>
                                    <p className="community-description">
                                        Every collaboration follows a structured process to ensure clarity, execution quality, and
                                        measurable outcomes. We don't do vague handshakes — we align goals, scope work, and execute.
                                    </p>
                                    <p className="community-description">
                                        From the moment you submit a collaboration request to the point your goals are achieved,
                                        the Trybe is with you — contributing, testing, reviewing, and shipping alongside your team.
                                    </p>
                                    <ul className="community-list">
                                        <li className="list-item">
                                            <span className="list-bullet" />
                                            <span><strong>Step 1 —</strong> Submit a collaboration request outlining your project, goals, or technical needs.</span>
                                        </li>
                                        <li className="list-item">
                                            <span className="list-bullet" />
                                            <span><strong>Step 2 —</strong> Sarcastic Geeks evaluates the scope and aligns suitable developers to your project.</span>
                                        </li>
                                        <li className="list-item">
                                            <span className="list-bullet" />
                                            <span><strong>Step 3 —</strong> Developers collaborate, contribute, test, or implement based on your project needs.</span>
                                        </li>
                                        <li className="list-item">
                                            <span className="list-bullet" />
                                            <span><strong>Step 4 —</strong> Collaboration continues until your execution goals are fully achieved.</span>
                                        </li>
                                    </ul>
                                    <div className="community-actions">
                                        <button
                                            onClick={() => router.push('/login')}
                                            className="community-actions-btn">
                                            Request Collaboration
                                        </button>
                                        <button
                                            onClick={() => router.push('/about')}
                                            className="btn btn-outline">
                                            Learn About Us
                                        </button>
                                    </div>
                                </div>

                                <div className="community-image">
                                    <div className="image-overlay" />
                                    <div className="event-cards">
                                        {[
                                            {
                                                title: "Submit Your Request",
                                                time: "Define scope, goals, and timeline",
                                                image: "/images/code-review.PNG"
                                            },
                                            {
                                                title: "Team Alignment",
                                                time: "We match the right developers",
                                                image: "/images/space-sessions.JPG"
                                            },
                                            {
                                                title: "Active Execution",
                                                time: "Build, test, ship together",
                                                image: "/images/game-challenge.PNG"
                                            },
                                            {
                                                title: "Goals Achieved",
                                                time: "Continuous until delivery",
                                                image: "/images/group-pic.jpg"
                                            }
                                        ].map((step, index) => (
                                            <div className="event-card" key={index}>
                                                <div className="card-overlay" />
                                                <img
                                                    src={step.image}
                                                    alt={step.title}
                                                    className="event-image"
                                                />
                                                <div className="event-overlay">
                                                    <h3 className="event-title">{step.title}</h3>
                                                    <p className="event-time">{step.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ── STRATEGIC PARTNERSHIP ── */}
                    <section id="strategic-partnership" className="about">
                        <div className="container">
                            <div className="about-grid">
                                <div className="about-content">
                                    <span className="badge pink">Strategic Partnership</span>
                                    <h2 className="section-title">Strategic Partnerships That Scale Ecosystems</h2>
                                    <p className="about-description">
                                        Sarcastic Geeks forms long-term partnerships with startups, companies, platforms, and developer
                                        ecosystems. Partnerships are not symbolic — they enable real execution through technical collaboration,
                                        developer access, product validation, and ecosystem growth.
                                    </p>
                                    <p className="about-description">
                                        Partners gain access to a network of developers actively building systems, solving technical
                                        challenges, and contributing to scalable products. When you partner with the Trybe, you are not
                                        getting a logo on a website — you are getting an execution-capable community behind your vision.
                                    </p>
                                    <ul className="values-list">
                                        <li className="values-item">
                                            <span className="list-bullet" />
                                            <span>Access to active developers building real production systems</span>
                                        </li>
                                        <li className="values-item">
                                            <span className="list-bullet" />
                                            <span>Direct collaboration with technical contributors across web2, web3, and AI</span>
                                        </li>
                                        <li className="values-item">
                                            <span className="list-bullet" />
                                            <span>Product testing, validation, and structured technical audit reports</span>
                                        </li>
                                        <li className="values-item">
                                            <span className="list-bullet" />
                                            <span>Long-term ecosystem collaboration opportunities and community integration</span>
                                        </li>
                                        <li className="values-item">
                                            <span className="list-bullet" />
                                            <span>Co-hosted events, X Spaces, and community-backed product launches</span>
                                        </li>
                                    </ul>
                                    <div className="community-actions">
                                        <button
                                            onClick={() => router.push('/collaboration')}
                                            className="community-actions-btn">
                                            Become a Partner
                                        </button>
                                    </div>
                                </div>

                                <div className="about-image">
                                    <div className="grid-container">
                                        <div className="main-box">
                                            <img
                                                src="/images/space-sessions.JPG"
                                                alt="Sarcastic Geeks Strategic Partnership"
                                                className="about-img"
                                            />
                                        </div>
                                        <div className="right-column">
                                            <img
                                                src="/images/group-pic.jpg"
                                                alt="Sarcastic Geeks Community"
                                                className="about-img"
                                            />
                                        </div>
                                    </div>
                                    <div className="values-card">
                                        <div className="card-overlay" />
                                        <div className="event-overlay">
                                            <h2>Build Real. Scale Real.</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ── FAQ ── */}
                    <section id="faq" className="faq">
                        <div className="container">
                            <div className="section-header">
                                <span className="badge cyan">FAQ</span>
                                <h2 className="section-title">Frequently Asked Questions</h2>
                                <p className="section-description">
                                    Everything you need to know about collaboration and partnership with the Sarcastic Geeks Trybe.
                                </p>
                            </div>
                            <div className="faq-grid">
                                {[
                                    {
                                        q: "Who can collaborate with Sarcastic Geeks?",
                                        a: "Startups, companies, founders, and developers can collaborate. Collaboration is open to anyone building or improving real products — whether you need one developer or a full execution team.",
                                    },
                                    {
                                        q: "Is this a hiring platform?",
                                        a: "No. Sarcastic Geeks is a collaboration ecosystem. Organizations collaborate directly with developers to execute technical goals. If you need dedicated outsourcing, we offer that separately through our outsourcing programme.",
                                    },
                                    {
                                        q: "What kind of projects are supported?",
                                        a: "Web platforms, SaaS products, developer tools, APIs, infrastructure systems, mobile applications, and technical platforms across web2, web3, and AI. If it is a real technical product, we can support it.",
                                    },
                                    {
                                        q: "How do partnerships work?",
                                        a: "Partnerships are structured relationships where organizations collaborate with Sarcastic Geeks developers for ongoing technical execution and ecosystem growth. We define scope, align developers, and maintain the collaboration for as long as it produces value.",
                                    },
                                    {
                                        q: "How long does a collaboration last?",
                                        a: "As long as it needs to. Some collaborations are short-term — a single feature, an audit, an MVP. Others are long-term technical partnerships that span months or years. We structure every engagement around your actual goals.",
                                    },
                                    {
                                        q: "Can we collaborate on open-source projects?",
                                        a: "Absolutely. Open-source collaboration is one of the core ways Sarcastic Geeks developers contribute. If you are building or maintaining an open-source project, we can align contributors from our community.",
                                    },
                                    {
                                        q: "What makes this different from freelancing?",
                                        a: "Freelancing is transactional. Collaboration with Sarcastic Geeks is ecosystemic — you gain access to a community of developers who are invested in building quality systems, not just completing tickets. It is execution with context.",
                                    },
                                    {
                                        q: "How do I get started?",
                                        a: "Create a community profile, then submit a collaboration or partnership request. We review your goals, align the right people, and establish the collaboration structure within a short timeframe.",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="faq-item">
                                        <h3 className="faq-question">{item.q}</h3>
                                        <p className="faq-answer">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>


                    {/* ── FINAL CTA ── */}
                    <section id="cta" className="cta">
                        <div className="container">
                            <div className="roadmap-cta-box">
                                <span className="badge purple">Ready to Build?</span>
                                <h2 className="section-title roadmap-cta-title">
                                    Build Faster. Scale Smarter. Collaborate With Execution-Ready Developers.
                                </h2>
                                <p className="section-description roadmap-cta-description">
                                    Join the ecosystem where collaboration produces real technical outcomes. Whether you are launching,
                                    scaling, or optimizing — the Trybe is ready to execute alongside you.
                                </p>
                                <div className="collab-cta-actions">
                                    <button
                                        onClick={() => router.push('/login')}
                                        className="community-actions-btn">
                                        Start Collaboration
                                    </button>
                                    <button
                                        onClick={() => router.push('/collaboration')}
                                        className="btn btn-outline">
                                        Become a Partner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </>
    );
}

export default CollaborationPage;