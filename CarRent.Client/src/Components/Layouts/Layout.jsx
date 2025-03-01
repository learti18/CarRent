import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';
import Navbar from './../Navbar/Navbar';

export default function Layout() {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <Footer className="w-full"/>
    </div>
  );
}