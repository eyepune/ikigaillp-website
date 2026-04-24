import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { LanguageProvider } from "./components/LanguageContext";
import CursorEffect from "./components/CursorEffect";

const noFooterPages = ["AdminLogin", "AdminUpdateEditor", "AdminPanel"];
const noNavPages = ["AdminLogin", "AdminUpdateEditor", "AdminPanel"];

export default function Layout({ children, currentPageName }) {
  const showNav = !noNavPages.includes(currentPageName);
  const showFooter = !noFooterPages.includes(currentPageName);
  const location = useLocation();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.search]);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0d1f1a] text-white" style={{ cursor: "none" }}>
        <CursorEffect />
        {showNav && <Navbar />}
        <main>{children}</main>
        {showFooter && <Footer />}
      </div>
    </LanguageProvider>
  );
}