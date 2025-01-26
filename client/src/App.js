import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogPage from "./components/Blog/BlogPage";
import TheBlog from "./components/Blog/TheBlog/TheBlog";
import Category from "./components/Blog/Category/Category";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import BlogPost from "./components/Dashboard/Blog/BlogPost";
import BlogOps from "./components/Dashboard/Blog/BlogOps";
import BlogEdit from "./components/Dashboard/Blog/BlogEdit";
import BlogDelete from "./components/Dashboard/Blog/BlogDelete";
import Content from "./components/Dashboard/Content/Content";
import Settings from "./components/Dashboard/Settings/Settings";


function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          {/*<Route path="/blog" element={<BlogPage />} />*/}
          <Route path="/admin" element={<Login />} />
          {/*<Route path="/category/:category" element={<Category />} />*/}
          <Route path="*" element={<Navigate to="/"/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/*
          <Route path="/blog/:id" element={<TheBlog />} />
          <Route path="/blog-post" element={<BlogPost />} />
          <Route path="/blog-ops" element={<BlogOps />} />
          <Route path="/blog-edit" element={<BlogEdit />} />
          <Route path="/blog-delete" element={<BlogDelete />} />
          <Route path="/content" element={<Content />} />
          <Route path="/settings" element={<Settings />} />
          */}
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;