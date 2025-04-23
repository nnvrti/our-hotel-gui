
import React from "react";

interface HotelLayoutProps {
  children: React.ReactNode;
}

const HotelLayout: React.FC<HotelLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            <span className="text-secondary">Stay</span>Easy
          </h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 StayEasy Hotel | University Project</p>
        </div>
      </footer>
    </div>
  );
};

export default HotelLayout;
