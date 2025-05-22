// src/presentation/layouts/TrainerLayout.tsx
import React from "react";
import Navbar from "../features/trainer/components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom"; 

<<<<<<< HEAD
export const TrainerLayout: React.FC<{ children?: React.ReactNode }> = () => (
=======
 const TrainerLayout: React.FC<{ children?: React.ReactNode }> = () => (
>>>>>>> f18b7a7 (Refactored trainer-app with new folder structure and updated config)
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main>
      <Outlet /> {/* Render nested routes here */}
    </main>
    <Footer />
  </div>
<<<<<<< HEAD
);
=======
);

export default TrainerLayout;
>>>>>>> f18b7a7 (Refactored trainer-app with new folder structure and updated config)
