// src/presentation/layouts/TrainerLayout.tsx
import React from "react";
import Navbar from "../features/trainer/components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom"; 

export const TrainerLayout: React.FC<{ children?: React.ReactNode }> = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main>
      <Outlet /> {/* Render nested routes here */}
    </main>
    <Footer />
  </div>
);