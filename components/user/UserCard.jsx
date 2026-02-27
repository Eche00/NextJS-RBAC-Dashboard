"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { fetchTopUsers } from "@/utils/cardLogic";
import "@/styles/UserCard.css";
import Loader from "./loading";

// Dynamically import Slider with SSR disabled
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [centerPadding, setCenterPadding] = useState("0px");
  const sliderRef = useRef(null);

  // Fetch users
  useEffect(() => {
    const getUsers = async () => {
      const topUsers = await fetchTopUsers();
      setUsers(topUsers);
      setLoading(false);
    };
    getUsers();
  }, []);

  // Set slidesToShow and centerPadding based on viewport
  const updateSlides = () => {
    const width = window.innerWidth;

    if (width < 780) {
      setSlidesToShow(1);
      // show part of next slide
      setCenterPadding("10%"); 
    } else if (width < 950) {
      setSlidesToShow(2);
      // optional peek for tablet
      setCenterPadding("10%"); 
    } else {
      setSlidesToShow(4);
      // full slides on desktop
      setCenterPadding("0px"); 
    }

    // Force Slick to recalculate layout
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true);
    }
  };

  useEffect(() => {
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    pauseOnHover: true,
    centerMode: slidesToShow === 1,
    centerPadding,
  };

  if (loading) return <Loader />;

  return (
    <div className="user-carousel-container">
      <Slider ref={sliderRef} {...sliderSettings}>
        {users.map((user, index) => (
          <div
            className="user-card"
            key={user.id || index}
            onClick={() =>
              window.open(`https://x.com/${user.username}`, "_blank")
            }
          >
            <div
              className="card-content"
              onClick={() =>
                window.open(`https://x.com/${user.username}`, "_blank")
              }
            >
              <div className="user-info-row">
                <div className="avatar-wrapper">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="user-avatars"
                    onError={(e) => (e.target.src = "/images/brain.PNG")}
                  />
                </div>
                <div className="user-names-container">
                  <h3 className="user-names">{user.name}</h3>
                  <p className="user-handle">@{user.username}</p>
                </div>
              </div>
              <div className="user-role">{user.rank}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UserCard;
