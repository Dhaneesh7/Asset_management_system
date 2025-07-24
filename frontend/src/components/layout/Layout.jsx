import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <main className="p-4 flex-grow-1" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
