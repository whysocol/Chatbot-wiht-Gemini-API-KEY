import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chatbot from '../Chatbot';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col pt-[var(--header-height)]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
