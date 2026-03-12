import React from "react";
import "../../styles/outsourse.css";

function OutsourceCta() {

    const outsourceProfiles = [
        {
            name: "sarcastic Geek",
            role: "Founder",
            techRole: "Software Engineer",
            image: "https://pbs.twimg.com/profile_images/1863335299842969600/n-u4tPld_400x400.jpg"
        },
        {
            name: "Eche_Codes",
            role: "Co-Founder",
            techRole: "Software Engineer",
            image: "https://pbs.twimg.com/profile_images/2013562089772617728/1AtLgkwC_400x400.jpg"
        },
        {
            name: "GIM",
            role: "Co-Founder",
            techRole: "Front End Engineer",
            image: "https://pbs.twimg.com/profile_images/1997692211438206976/PqI1A3QZ_400x400.jpg"
        }
    ];


    return (
        <div className="outsource-cta-container">

            <div className="outsource-team-header">

                <h3 className="outsource-overview-title">
                    Ready to build with us?
                </h3>

                <p>
                    Whether you need a full product team, a single developer, or help
                    bringing your idea to life, our experts are ready to plug into your
                    workflow and start building immediately.
                </p>


                {/* PROFILE CARDS */}
                <div className="outsource-team">

                    {outsourceProfiles.map((profile, index) => (
                        <div key={index} className="outsource-profile-card">

                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="outsource-profile-image"
                            />

                            <div className="outsource-profile-overlay"></div>

                            <div className="outsource-profile-info">
                                <h4>{profile.name}</h4>
                                <span className="outsource-profile-role">
                                    {profile.role}
                                </span>
                                <span className="outsource-profile-tech">
                                    {profile.techRole}
                                </span>
                            </div>

                        </div>
                    ))}

                </div>


                <button className="outsourse-hero-button">
                    Get Started
                </button>

            </div>

        </div>
    );
}

export default OutsourceCta;