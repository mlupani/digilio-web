"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import InsuranceSelector from "@/components/InsuranceSelector";
import ValueProp from "@/components/ValueProp";
import HowItWorks from "@/components/HowItWorks";
import AssistantSection from "@/components/AssistantSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingAssistant from "@/components/FloatingAssistant";
import type { InsuranceType } from "@/lib/flows";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatType, setChatType] = useState<InsuranceType | null>(null);
  const [lead, setLead] = useState<Record<string, string> | null>(null);

  const openChat = (t?: InsuranceType) => {
    setChatType(t ?? null);
    setChatOpen(true);
  };
  const closeChat = () => setChatOpen(false);

  return (
    <>
      <Header onCotizar={() => openChat()} />

      <main className="relative z-10">
        <Hero onPrimary={() => openChat()} />

        <TrustBar />

        <InsuranceSelector onSelect={(t) => openChat(t)} />

        <ValueProp />

        <HowItWorks onOpenChat={() => openChat()} />

        <AssistantSection lead={lead} onOpenChat={openChat} />

        <Testimonials />

        <FAQ />
      </main>

      <Footer onCotizar={() => openChat()} />

      <FloatingAssistant
        open={chatOpen}
        initialType={chatType}
        onOpen={openChat}
        onClose={closeChat}
        onLead={setLead}
      />
    </>
  );
}
