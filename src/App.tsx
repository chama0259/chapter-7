// import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import ContactForm from "./pages/ContactForm";

const App = () => {
  return (
    <>
      <Header />
      <div className="max-w-[1280px] mx-auto p-6">
        <main className="mt-8">
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/contact" element={<ContactForm />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
