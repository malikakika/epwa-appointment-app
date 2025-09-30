"use client";

import { useEffect, useState } from "react";
import LandingPage from "./landingPage/page";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) {
    setLoading(false); 
  } else {
    setLoading(false); 
  }
}, []);


  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Chargement...</p>
      </main>
    );
  }



  return <LandingPage />;
}
