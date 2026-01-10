"use client";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import HeaderPublic from "@/components/nav/HeaderPublic";
import Footer from "@/components/nav/Footer";

function Layout({ children }) {
  const { user } = useAuth();

  return (
    <>
      <HeaderPublic />
      <main className="main-main">{children}</main>
      {/* Hide footer if logged in and on mobile */}
      <Footer className={user ? "hide-footer-mobile" : ""} />
    </>
  );
}

export default function ClientAuthWrapper({ children }) {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
}
