// path: frontend/src/App.tsx
import React, { useEffect } from "react";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import BioSection from "./components/BioSection";
import ShowsSection from "./components/ShowsSection";
import LatestReleases from "./components/LatestReleases";
import Footer from "./components/Footer";
import { getSeoSettings } from "./lib/apiClient";

const App: React.FC = () => {
  useEffect(() => {
    const applySeo = async () => {
      try {
        const seo = await getSeoSettings();
        if (seo?.meta_title) {
          document.title = seo.meta_title;
        }
        if (seo?.meta_description) {
          let desc = document.querySelector("meta[name='description']");
          if (!desc) {
            desc = document.createElement("meta");
            desc.setAttribute("name", "description");
            document.head.appendChild(desc);
          }
          desc.setAttribute("content", seo.meta_description);
        }
        if (seo?.og_image_url) {
          let og = document.querySelector("meta[property='og:image']");
          if (!og) {
            og = document.createElement("meta");
            og.setAttribute("property", "og:image");
            document.head.appendChild(og);
          }
          og.setAttribute("content", seo.og_image_url);
        }
      } catch {
        // ignore SEO fetch errors; fallback to defaults
      }
    };
    applySeo();
  }, []);

  return (
    <Layout>
      <Navbar />
      <main className="space-y-16">
        <HeroSlider />
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 space-y-12">
          <BioSection />
          <LatestReleases />
          <ShowsSection />
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default App;
