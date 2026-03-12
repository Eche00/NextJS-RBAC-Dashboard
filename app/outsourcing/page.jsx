import React from "react";
import "../../styles/outsourse.css";
import { outsourceServices } from "@/utils/outsourseServices";
import ServicesOverview from "./ServicesOverview";
import OurServices from "./OurServices";
import OutsourceCta from "./OutsourceCta";

function page() {
    return (
        <div className="outsourse-container">


            {/* Hero */}
            <section className="outsourse-hero-container outsourse-grid-bg">
                <section className="outsourse-hero ">
                    <div className="outsourse-hero-content">
                        <span className="badge">Sarcastic Geeks Trybe</span>
                        <h1 className="outsourse-hero-title">
                            From Idea to Product, <span>We Build the Tech</span>
                        </h1>

                        <p className="outsourse-hero-subtitle">
                            We help startups and businesses build scalable digital products
                            using modern technologies and world-class engineering.
                        </p>

                        <button className="outsourse-hero-button">
                            TRYBE
                        </button>

                    </div>
                    <img src="/outsoursehero.png" alt="" className=" outsource-hero-image" />

                    <div className="hero-overlay" />
                </section>
                <div className="scroll-container">
                    <div className="outsourse-services scroll-content">
                        {outsourceServices.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <div key={index} className="outsourse-service-card">
                                    <span><Icon /></span>
                                    <p>{service.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <ServicesOverview />
            <OurServices />
            <OutsourceCta />
        </div>
    );
}

export default page;