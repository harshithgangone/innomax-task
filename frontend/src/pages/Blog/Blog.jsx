import React, { useEffect, useRef, useState } from "react";
import "./Blog.css";
import assets from "../../assets/assests";

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const postRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisiblePosts((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    postRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      postRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const blogPosts = [
    {
      title: "Welcome to Our Event Blog!",
      date: "January 1, 2025",
      content: "Get the latest updates and announcements about our upcoming events.",
    },
    {
      title: "Startup Award Applications are Open!",
      date: "December 30, 2024",
      content: "Don't miss your chance to apply for the prestigious Startup Award. Deadline: January 15th.",
    },
    {
      title: "Volunteer Registrations Now Open!",
      date: "December 28, 2024",
      content: "Join us as a volunteer and make a difference! Sign up today and be a part of the change.",
    },
    {
      title: "Event Schedule Announced",
      date: "December 25, 2024",
      content: "Check out the full schedule for our event. We can't wait to see you there!",
    },
  ];

  return (
    <div className="body">
      <div className="piling-item hero-sectionblg" id="hero">
        <div className="hero-imagesapp"></div>
        <div className="hero-content">
          <h1>Blog & Announcements</h1>
          <p>Stay updated with the latest news and announcements.</p>
        </div>
      </div>
      <div className="blog-container">
        <h2 className="blog-title">Latest Updates</h2>
        <div className="blog-posts">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => (postRefs.current[index] = el)}
              className={`blog-post fade-post ${
                visiblePosts.includes(index.toString()) ? "visible" : ""
              }`}
            >
              <h3>{post.title}</h3>
              <p className="post-date">{post.date}</p>
              <p className="post-content">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        
        <div className="grid">
          <div className="footersection about">
          <div className="logof">
          <h4>JNV Alumni</h4>
        </div>
            <p>
              Meet. Connect. Explore.
            </p>
          </div>
          <div className="footersection address">
            <p>Hyderabad,Telanana,500010</p>
            <p>+91 92038034879</p>
            <p>jnvsupport@gmail.com</p>
          </div>
          <div className="footersection support-logos">
            <img src={assets.insta} alt="" />
            <img src={assets.facebook} alt="" />
            <img src={assets.linkedin} alt="" />
            <img src={assets.twitter} alt="" />
            
          </div>
          <div className="footersection inputfields">
            <p>Subscribe For Notifications & Updates</p>
            <input id="email" type="text" placeholder="Email Address" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="bottom">
        <hr />
        <p>&copy; 2025 JNV Alumni Event. All Rights Reserved.</p>
        </div>
        
      </footer>
    </div>
  );
};

export default Blog;
