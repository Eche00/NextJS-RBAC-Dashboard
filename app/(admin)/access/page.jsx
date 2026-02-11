"use client";

import React from "react";
import UserBarChart from "@/components/admin/UserBarChart";
import UserRankBarChart from "@/components/admin/UserRankBarChart";
import ProjectStatusBarChart from "@/components/admin/ProjectStatusBarChart";
import TopBalances from "@/components/admin/TopBalances";

const Page = () => {
  return (
    <div className="containers">
      <div className="fullWidthChart">
        <TopBalances />
      </div>
      <div className="fullWidthChart">
        <UserRankBarChart />
      </div>

      <div className="chartWrapper">
        <div className="chartBox">
          <UserBarChart />
        </div>
        <div className="chartBox">
          <ProjectStatusBarChart />
        </div>
      </div>

      {/* CSS below */}
      <style jsx>{`
        .containers {
          box-sizing: border-box;
        }

        .chartWrapper {
          display: flex;
          flex-direction: row;
          gap: 20px;
          flex-wrap: wrap; 
        margin-top: 20px;
        }

        .chartBox {
          flex: 1; 
          min-width: 280px;
          display: flex;
          flex-direction: column;
        }

        /* Ensure chart inside fills the box */
        .chartBox > :global(div) {
          flex: 1;
        }

        .fullWidthChart {
          margin-top: 20px;
        }

        /* Mobile-specific adjustments */
        @media (max-width: 768px) {
          .chartWrapper {
            flex-direction: column;
          }

          .chartBox {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
