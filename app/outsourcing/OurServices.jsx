import React from "react";
import "../../styles/outsourse.css";
import { outsourceServices } from "@/utils/outsourseServices";

function OurServices() {
    return (
        <div className="outsource-services-main">
            <section className="outsource-services-container">

                <div className="outsource-services-header">
                    <h2 className="outsource-overview-title">Our Services</h2>
                    <p>
                        We provide world-class tech outsourcing solutions for startups,
                        founders, and companies looking to scale faster with expert teams.
                    </p>
                </div>

                <div className="outsource-services-grid">
                    {outsourceServices.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <div key={index} className="outsource-service-card">

                                <div className="outsource-service-icon">
                                    <Icon fontSize="medium" />
                                </div>

                                <h3>{service.title}</h3>

                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default OurServices;