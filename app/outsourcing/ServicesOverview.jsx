import React from "react";
import "../../styles/outsourse.css";
import { Code, FlashAuto, People } from "@mui/icons-material";

function ServicesOverview() {
    return (
        <section className="outsource-overview-container">

            {/* SECTION HEADER */}
            <div className="outsource-overview-header">
                <h2 className="outsource-overview-title">
                    More than just <span>code</span>
                </h2>

                <p className="outsource-overview-subtitle">
                    We help startups and companies scale faster by outsourcing
                    development, design, and technical expertise to experienced teams.
                    From idea validation to production deployment, we plug into your
                    workflow and ship real products.
                </p>
            </div>


            {/* SERVICES GRID */}
            <div className="outsource-overview-grid">

                <div className="outsource-overview-card">
                    <div className="outsource-overview-icon dev">
                        <Code />
                    </div>

                    <h3>Product Development</h3>

                    <p>
                        We build production-ready web and mobile applications. Our team
                        handles frontend, backend, APIs, and infrastructure so you can
                        launch faster and focus on growth.
                    </p>
                </div>


                <div className="outsource-overview-card">
                    <div className="outsource-overview-icon team">
                        <People />
                    </div>

                    <h3>Dedicated Tech Teams</h3>

                    <p>
                        Hire skilled engineers, designers, and product builders who work
                        as an extension of your internal team. We integrate directly into
                        your workflow and development cycles.
                    </p>
                </div>


                <div className="outsource-overview-card">
                    <div className="outsource-overview-icon ai">
                        <FlashAuto />
                    </div>

                    <h3>AI & Web3 Solutions</h3>

                    <p>
                        We help companies integrate AI automation and blockchain
                        technologies into their products. From smart contracts to AI
                        powered systems, we help you stay ahead of the curve.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default ServicesOverview;