import React from "react";
import Hero from "../components/Hero";
import ExperiencePremium from "../components/ExperiencePremium";
import AITrainer from "../components/AITrainer";
import WhyChoose from "../components/WhyChoose";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Services from "../components/Services";
import BecomeATriiner from "../components/BecomeATrainer";

const LandingPage: React.FC = () => (
  <div className="font-sans">
    <main className="pt-16">
      <Hero />
      <Services />
      <ExperiencePremium />
      <AITrainer />
      <WhyChoose />
      <Testimonials />
      <CTA />
      <BecomeATriiner/>
    </main>
  </div>
);

export default LandingPage;