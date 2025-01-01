import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import assets from "../../assets/assests";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate=useNavigate()
    const sponsors = [
        "Company A", "Company B", "Company C", "Company D", "Company E", 
        "Company F", "Company G", "Company H", "Company I", "Company J"
      ];
      const [isPaused, setIsPaused] = useState(false);
      useEffect(() => {
        const fadeInElements = document.querySelectorAll('.fade-in');
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            } else {
              entry.target.classList.remove('show'); 
            }
          });
        }, { threshold: 0.1 }); 
    
        fadeInElements.forEach(el => observer.observe(el));
    
        return () => {
          fadeInElements.forEach(el => observer.unobserve(el));
        };
      }, []);
    useEffect(() => {
        const items = document.querySelectorAll(".accordion button");
        const icons = document.querySelectorAll(".icon");
    
        const toggleAccordion = (event) => {
          const button = event.target.closest("button");
          const itemToggle = button.getAttribute('aria-expanded');
      
          // Close all accordions
          items.forEach(item => item.setAttribute('aria-expanded', 'false'));
      
          // Open the clicked accordion if it's closed
          if (itemToggle === 'false') {
            button.setAttribute('aria-expanded', 'true');
          }
        };
    
        icons.forEach(icon => icon.addEventListener('click', toggleAccordion));
    
        return () => {
          icons.forEach(icon => icon.removeEventListener('click', toggleAccordion));
        };
      }, []);
  return (
    <>
      <nav>
        <div className="logo">
          <h4>JNV Alumni</h4>
        </div>
        <div className="nav-options">
          <a href="/" id="style-2" data-replace="HOME">
            <span>HOME</span>
          </a>
          <a href="#event" id="style-2" data-replace="EVENT DETAILS">
            <span>EVENT DETAILS</span>
          </a>
          <a href="#faqs" id="style-2" data-replace="FAQs">
            <span>FAQs</span>
          </a>
          <a href="#footer" id="style-2" data-replace="CONTACT">
            <span>CONTACT</span>
          </a>
          <a href="/blog" id="style-2" data-replace="BLOG">
            <span>BLOG</span>
          </a>
        </div>
        <div className="nav-buttons">
          <button onClick={()=>{navigate("/register")}} className="button button--pan">
            <span id="reg">
              REGISTER <img src={assets.rightIcon} alt="" />
            </span>
          </button>
        </div>
      </nav>

      <div id="piling-container">
        {/* Hero Section */}
        <div className="piling-item hero-section" id="hero">
          <div className="hero-images"></div>
          <div className="hero-content">
            <h1>Welcome to JNV Alumni Event</h1>
            <p>Join us for an unforgettable experience in Hyderabad!</p>
            <div className="cta-buttons">
              <button onClick={()=>{navigate("/register")}} className="button button--anthe">
                <span>Register</span>
              </button>
              <button onClick={()=>{navigate("/application")}} className="button button--anthe">
                <span  >Submit Application</span>
              </button>
            </div>
          </div>
        </div>
        <div className="section2 ">
          <div className="event-details fade-in" id="event">
            <h3>Event Details</h3>
            <p>
              <b>Date:</b>January 20,2025
            </p>
            <p>
              <b>Location: <img id="pin" src={assets.pin} alt="" /></b>Hi-Tex Exhibition,Hyderabad
            </p>
          </div>
          <div className="speakers fade-in">
            <h3>Key-Note Speakers</h3>
            <div className="speaker">
              <img src={assets.ariana} alt="Speaker-pic" />
              <div className="about">
                <b>Ariana Grande</b>
                <br />
                <i>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Excepturi in earum itaque ex animi deleniti autem numquam,
                  deserunt incidunt iure?
                </i>
              </div>
            </div>
            <div className="speaker">
              <img src={assets.lana} alt="Speaker-pic" />
              <div className="about">
                <b>Lana Del Rey</b>
                <br />
                <i>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Excepturi in earum itaque ex animi deleniti autem numquam,
                  deserunt incidunt iure?
                </i>
              </div>
            </div>
          </div>
          <div className="highlights fade-in" id="highlights">
            <h3>Main Highlights</h3>
            <p>
              <b>• Keynote Speakers</b> Engage with distinguished speakers from
              various industries.
            </p>
            <p>
              <b>• Startup Showcase</b> Explore innovative ideas and startups by
              JNV alumni.
            </p>
            <p>
              <b>• Networking Opportunities</b> Reconnect and network with
              fellow alumni.
            </p>
          </div>
        </div>
        <div className="sponsors-section fade-in">
      <h2 className="sponsors-heading">Our Sponsors</h2>
      <div
        className="sponsor-container"
        onMouseEnter={() => setIsPaused(true)}  
        onMouseLeave={() => setIsPaused(false)} 
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        <div className="sponsor-list">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="sponsor">
              <p>{sponsor}</p>
            </div>
          ))}
        </div>
        <div className="sponsor-list">
          {sponsors.map((sponsor, index) => (
            <div key={`duplicate-${index}`} className="sponsor">
              <p>{sponsor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
        {/* FAQs Section */}
        <div className="piling-item faqs" id="faqs">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="accordion">
            <div className="accordion-item fade-in">
              <button id="accordion-button-1" aria-expanded="false">
                <span className="accordion-title">
                Who can attend the event?
                </span>
                <span className="icon" aria-hidden="true"></span> 
              </button>
              <div className="accordion-content">
                <p>
                All alumni of JNV are welcome to join the event.
                </p>
              </div>
            </div> 
            <div className="accordion-item fade-in">
              <button id="accordion-button-2" aria-expanded="false">
                <span className="accordion-title">How can I submit my startup application?</span>
                <span className="icon" aria-hidden="true"></span>
              </button>
              <div className="accordion-content">
                <p>
                Click on the "Submit Application" button and fill out the form.
                </p>
              </div>
            </div>
            <div className="accordion-item fade-in">
              <button id="accordion-button-2" aria-expanded="false">
                <span className="accordion-title">What is the deadline for the Startup Award Application submission?</span>
                <span className="icon" aria-hidden="true"></span> 
              </button>
              <div className="accordion-content">
                <p>
                The deadline for submitting your Startup Award application is January 15, 2025. Ensure all required fields are completed and your attachments are uploaded before submitting.
                </p>
              </div>
            </div>
            <div className="accordion-item fade-in">
              <button id="accordion-button-2" aria-expanded="false">
                <span className="accordion-title">How can I become a sponsor for the event?</span>
                <span className="icon" aria-hidden="true"></span>
              </button>
              <div className="accordion-content">
                <p>
                If you are interested in sponsoring the JNV Alumni Event, please contact us directly through the "Contact Us" section on the website, or email us at sponsor@jnvalumni.com. We will send you detailed sponsorship packages and opportunities.
                </p>
              </div>
            </div>
            <div className="accordion-item fade-in">
              <button id="accordion-button-2" aria-expanded="false">
                <span className="accordion-title">Will there be any networking opportunities at the event?</span>
                <span className="icon" aria-hidden="true"></span> 
              </button>
              <div className="accordion-content">
                <p>
                Yes, there will be plenty of networking opportunities during the event. You will have the chance to connect with fellow alumni, industry leaders, and key-note speakers during various sessions and social events.
                </p>
              </div>
            </div>
            <div className="accordion-item fade-in">
              <button id="accordion-button-2" aria-expanded="false">
                <span className="accordion-title">Can I attend the event if I am not an alumni of JNV?</span>
                <span className="icon" aria-hidden="true"></span> 
              </button>
              <div className="accordion-content">
                <p>
                The JNV Alumni Event is specifically for alumni, but we welcome guests who are invited or have been referred by an alumni. If you are not an alumni, please reach out to us through the contact form for more details.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

    
      </div>

      <footer id="footer">
        
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
          <div className="footersection support">
             <a href="/application">Start Up Application</a>
            <a href="/blog">Blog</a>
            <a href="#faqs">FAQs</a>
            <a href="/register">Register</a>
            <a href="#highlights">Highlights</a>
          </div>
          <div className="footersection inputfields">
            <p>Contact Us</p>
            <input id="name" type="text" placeholder="Name" />
            <input id="email" type="email" placeholder="Email Address" />
            <textarea id='textarea' name="" placeholder="Message"  rows={"5"}></textarea>
            <button>Send</button>
          </div>
        </div>
        <div className="bottom">
        <hr />
        <p>&copy; 2025 JNV Alumni Event. All Rights Reserved.</p>
        </div>
        
      </footer>
    </>
  );
};

export default LandingPage;
