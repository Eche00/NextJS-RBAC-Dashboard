"use client";

/*
  This is about page to be handled by GoodBadBoy
  It should be very detailed and include all information to serve its course
  It should find a way to talk about and link to Collaboration, Beta Testing Audit,partnership and outsourcing
  Focus on SEO, connect to roadmap, be very descriptive
*/

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Code,
  Users,
  Zap,
  Globe,
  MessageSquare,
  Award as Trophy,
} from "react-feather";
import "./../Home.css";
import "./../hero.css";
import UserCard from "@/components/user/UserCard";

function ParticleSystem() {
  const [particles, setParticles] = useState([]);

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
    <div className="app">
      <main>
        {/* About Section */}
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
                  <strong>A Normal Life is Boring</strong>. We’re not just a
                  Trybe of Geeks — we’re Sarcastic Geeks. Developers are often
                  told to grind away in silence, following the same path as
                  everyone else. Why not spice things up?
                </p>
                <p className="about-description">
                  Our story? It’s simple. We believe in creating fun,
                  unconventional ways to make coding not just a job, but a
                  lifestyle. We’re all about finding creative, and often
                  sarcastic vibes to make development exciting. Whether it’s
                  gamifying the learning process, turning projects into quirky
                  challenges, or finding alternative ways to build funds (think
                  side projects, hackathons, and unexpected opportunities), we
                  make sure the grind doesn’t feel like a grind.
                </p>
                <p className="about-description">
                  At The Sarcastic Geeks Trybe, we’re here to help you level up
                  both in your skills and your financial game. We believe that
                  being part of this community means getting paid, having fun,
                  and building something you can be proud of—all while laughing
                  at the chaos along the way.
                </p>
              </div>
              <div className="about-image">
                <div className="grid-container">
                  <div className="main-box">
                    <img
                      src="/images/eche-brain.jpg"
                      alt="The Sarcastic Geeks Trybe"
                      className="about-img"
                    />
                  </div>
                  <div className="right-column">
                    <img
                      src="/images/brain-eche.JPG"
                      alt="The Sarcastic Geeks Trybe"
                      className="about-img"
                    />
                  </div>
                </div>

                <div className="values-card">
                  <div className="card-overlay"></div>
                  <div className="event-overlay">
                    <h2>A Normal Life is Boring.</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">More than just code</h2>
              <p className="section-description">
                The Trybe pushes for the integration of AI and web3 while
                supporting startups, fostering{" "}
                <span
                  onClick={() => router.push("/collaboration")}
                  style={{
                    color: "var(--cyan)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  collaboration
                </span>{" "}
                and{" "}
                <span
                  onClick={() => router.push("/beta-testing-audit")}
                  style={{
                    color: "var(--purple-light)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  beta testing audits
                </span>
                , and creating opportunities to earn online. - A Normal Life is
                Boring.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="card-icon purple">
                  <Code className="icon" />
                </div>
                <h3 className="card-title">Startup Support</h3>
                <p className="card-description">
                  Get resources, mentorship, and community backing to launch and
                  grow your startup.
                </p>
              </div>

              <div className="feature-card">
                <div className="card-icon cyan">
                  <Users className="icon" />
                </div>
                <h3 className="card-title">Proof of Community</h3>
                <p className="card-description">
                  Leverage our community backing to validate ideas and gain
                  traction for your projects.
                </p>
              </div>

              <div className="feature-card">
                <div className="card-icon pink">
                  <Zap className="icon" />
                </div>
                <h3 className="card-title">AI & Web3 Integration</h3>
                <p className="card-description">
                  Learn and build at the intersection of artificial intelligence
                  and blockchain technology.
                </p>
              </div>

              <div className="feature-card">
                <div className="card-icon amber">
                  <Trophy className="icon" />
                </div>
                <h3 className="card-title">Earn While Learning</h3>
                <p className="card-description">
                  Participate in activities to earn in-app points that will
                  become tokens with real value.
                </p>
              </div>

              <div className="feature-card">
                <div className="card-icon green">
                  <MessageSquare className="icon" />
                </div>
                <h3 className="card-title">Tech Job Connections</h3>
                <p className="card-description">
                  Helping developers discover new career opportunities and
                  connect with companies looking for their skills.
                </p>
              </div>

              <div
                className="feature-card"
                onClick={() => router.push("/outsourcing")}
                style={{ cursor: "pointer" }}
              >
                <div className="card-icon blue">
                  <Globe className="icon" />
                </div>
                <h3 className="card-title">Developer Outsourcing</h3>
                <p className="card-description">
                  Provide skilled developers to companies worldwide, empowering
                  businesses while giving tech talent real projects to work on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Showcase */}
        <section id="showcase" className="showcase">
          <div className="containers">
            <div className="section-header">
              <h2 className="section-title">Meet our trybe</h2>
              <p className="section-description">
                The Trybe brings together a diverse mix of developers — from
                web2 and mobile engineers to AI innovators and web3 builders —
                united by a shared passion to collaborate, learn, and shape the
                future of technology together.
              </p>
            </div>
            {/* user card carousel */}
            <UserCard />
            <div className="cta-content">
              <h2 className="">Ready to join our trybe?</h2>
              <p className="cta-description">
                Create your profile, connect with other geeks, and start
                building the future together.
              </p>
              <button
                className="app-container center-btn"
                onClick={() =>
                  window.open("https://x.com/sarcasticgeek4u", "_blank")
                }
              >
                Join the X Family
              </button>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="community">
          <div className="container">
            <div className="community-grid">
              <div>
                <span className="badge pink">The Geeks Community</span>
                <h2 className="section-title">
                  Join a trybe of Sarcastic Geeks
                </h2>
                <p className="community-description">
                  The Trybe is more than just a community — it's a startup built
                  by devs for devs; where project managers connect and
                  collaborate with the complete skill sets. Host interactive X
                  Spaces, play in-app games, collaborate on gigs, explore new
                  technologies, and discover new ways to monetize the craft — A
                  normal life is boring.
                </p>

                <div className="community-actions">
                  <button
                    onClick={() => router.push("/account")}
                    className="btn btn-primary pink"
                  >
                    Get a Community Profile
                  </button>
                  <button
                    onClick={() => router.push("/roadmap")}
                    className="btn btn-outline"
                  >
                    View Project Roadmap
                  </button>
                </div>
              </div>
              <div className="community-image">
                <div className="image-overlay"></div>
                <div className="event-cards">
                  {[
                    {
                      title: "Weekly X Spaces",
                      time: "Every Saturday at 8PM WAT",
                      image: "/images/space-sessions.JPG",
                    },
                    {
                      title: "Code Review Session",
                      time: "Active Debugging",
                      image: "/images/code-review.PNG",
                    },
                    {
                      title: "Game Nights",
                      time: "Regularly, on Request",
                      image: "/images/game-challenge.PNG",
                    },
                    {
                      title: "Hackathon & Buildathon",
                      time: "Quarterly, Community Backing.",
                      image: "/images/group-pic.jpg",
                    },
                  ].map((event, index) => (
                    <div className="event-card" key={index}>
                      <div className="card-overlay"></div>
                      <img
                        src={event.image}
                        alt={event.title}
                        className="event-image"
                      />
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

        {/* FAQ Section */}
        <section id="faq" className="faq">
          <div className="container">
            <div className="section-header">
              <span className="badge cyan">FAQ</span>
              <h2 className="section-title">Frequently asked questions</h2>
              <p className="section-description">
                Everything you need to know about the Sarcastic Geeks Trybe.
              </p>
            </div>
            <div className="faq-grid">
              {[
                {
                  q: "Do I need to be a web3 developer to join?",
                  a: "Not at all! Our community welcomes developers from all backgrounds - web2, mobile, AI, and web3. We believe in the power of cross-discipline collaboration.",
                },
                {
                  q: "How does the in-app points system work?",
                  a: "You earn points by participating in community activities like game nights, hackathons, and contributing to projects. These points will eventually be converted to tokens with real value.",
                },
                {
                  q: "What kind of games can we expect during game nights?",
                  a: "Expect a range of fun, casual browser games with impressive graphics. While we're not diving into CODM-level stuff, we focus on accessible games that are easy to pick up, but still deliver a great gaming experience.",
                },
                {
                  q: "How does 'Proof of Community' work?",
                  a: "Proof of Community is our way of validating projects and startups through community backing. Members can vote on and support projects they believe in, providing social proof and potential resources.",
                },
                {
                  q: "How can I get my startup supported by the community?",
                  a: "Join the community, participate actively, and then pitch your startup idea during our regular pitch events. Community members can choose to support projects they believe in.",
                },
                {
                  q: "What makes Sarcastic Geeks Trybe different?",
                  a: "We combine technical excellence with a fun, sarcastic culture. They are trying to fit in, we are trying to stand out.",
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
      </main>
    </div>
  );
}

export default About;
