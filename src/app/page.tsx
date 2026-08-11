import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { VariablesIntro } from '@/components/VariablesIntro';
import { GuessingGame } from '@/components/GuessingGame';
import { BinarySearchIntro } from '@/components/BinarySearchIntro';
import { JoinClub } from '@/components/JoinClub';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />
      <main className="flex-1">
        <Hero />
        <VariablesIntro />
        <GuessingGame />
        <BinarySearchIntro />
        <JoinClub />
      </main>
      <Footer />
    </div>
  );
}
