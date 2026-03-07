"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Globe, Cpu } from "react-feather";
import "../../styles/Outsourcing.css";

const Page = () => {
  const services = [
    {
      icon: <Code />,
      title: "Custom Software Development",
      text: "We build scalable, high-performance applications tailored to your business needs, from complex enterprise systems to innovative startups.",
    },
    {
      icon: <Cpu />,
      title: "AI & Automation",
      text: "Integrating cutting-edge artificial intelligence to streamline your workflows and give you a competitive edge in the modern market.",
    },
    {
      icon: <Globe />,
      title: "Global Tech Talent",
      text: "Access our curated trybe of elite developers ready to integrate into your existing teams or handle full-cycle project delivery.",
    },
  ];

  const steps = [
    {
      title: "Discovery & Strategy",
      description:
        "We dive deep into your requirements and business goals to map out the perfect technical solution.",
    },
    {
      title: "Design & Architecture",
      description:
        "Our geeks craft robust system architectures and intuitive interfaces built for performance and scale.",
    },
    {
      title: "Agile Development",
      description:
        "Transparent, iterative development cycles with regular updates and continuous integration/deployment.",
    },
    {
      title: "Quality Assurance",
      description:
        "Rigorous testing protocols ensure your software is battle-tested and ready for production.",
    },
  ];

  return (
    <div className="outsourcing-page">
      <div className="outsourcing-container">
        <motion.section
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Global Engineering, Sarcastic Excellence.</h1>
          <p>
            Elevate your technical capabilities with our elite developer trybe.
            We don't just write code; we build digital futures with precision
            and a touch of wit.
          </p>
        </motion.section>

        <div className="grid-section">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="card-icon">{service.icon}</div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-text">{service.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          className="process-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="process-title">Our Development Lifecycle</h2>
          <div className="process-steps">
            {steps.map((step, index) => (
              <div className="step-item" key={index}>
                <div className="step-number">0{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p className="card-text">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.div
          className="cta-box"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2>Ready to Scale Your Team?</h2>
          <p className="card-text" style={{ marginBottom: "32px" }}>
            Let's discuss how our geeks can help you ship better software,
            faster.
          </p>
          <button
            className="btn btn-primary"
            style={{ padding: "16px 40px", fontSize: "1.1rem" }}
          >
            Schedule a Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
