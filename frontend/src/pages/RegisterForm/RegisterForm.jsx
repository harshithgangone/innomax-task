import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [visibleFields, setVisibleFields] = useState([]);
  const [loading, setLoading] = useState(false); 
  const fieldRefs = useRef([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    collegeName: "",
    designation: "",
    graduationBatch: "",
    gender: "",
    eventRole: "",
    about: "",
    dob: "",
    city: "",
    linkedIn: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisibleFields((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.2, 
      }
    );

    fieldRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      fieldRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
  
    try {
      
      const response = await axios.post("https://innomax-task.onrender.com/submit-registration", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        alert("Registration successful!");
      } else {
        alert("Error during registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting the form.");
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div className="body">
      <div className="piling-item hero-sectionreg" id="hero">
        <div className="hero-images2"></div>
        <div className="hero-contentreg">
          <h1>Event Registration Form</h1>
          <p>Register now to be part of the event!</p>
        </div>
      </div>
      <div className="contact-form-container">
        <h2 className="form-title fade-field">Registration</h2>
        <p className="form-subtitle fade-field">Join us for an amazing experience!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          {[
            { placeholder: "Full Name*", name: "fullName", type: "text" },
            { placeholder: "Email Address*", name: "email", type: "email" },
            { placeholder: "Phone Number*", name: "phoneNumber", type: "tel" },
            { placeholder: "College/Organization Name*", name: "collegeName", type: "text" },
            { placeholder: "Designation/Role", name: "designation", type: "text" },
            { placeholder: "Graduation Batch", name: "graduationBatch", type: "text" },
          ].map((field, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => (fieldRefs.current[index] = el)}
              className={`form-group fade-field ${visibleFields.includes(index.toString()) ? "visible" : ""}`}
            >
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          
          <div
            data-index="6"
            ref={(el) => (fieldRefs.current[6] = el)}
            className={`form-group fade-field ${visibleFields.includes("6") ? "visible" : ""}`}
          >
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div
            data-index="7"
            ref={(el) => (fieldRefs.current[7] = el)}
            className={`form-group fade-field ${visibleFields.includes("7") ? "visible" : ""}`}
          >
            <label htmlFor="event-role">Interested Role</label>
            <select
              name="eventRole"
              value={formData.eventRole || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="participant">Participant</option>
              <option value="volunteer">Volunteer</option>
              <option value="speaker">Speaker</option>
            </select>
          </div>

          <div
            data-index="8"
            ref={(el) => (fieldRefs.current[8] = el)}
            className={`form-group fade-field ${visibleFields.includes("8") ? "visible" : ""}`}
          >
            <textarea
              name="about"
              rows="5"
              placeholder="Tell us about yourself (optional)"
              value={formData.about || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div
            data-index="9"
            ref={(el) => (fieldRefs.current[9] = el)}
            className={`form-group fade-field ${visibleFields.includes("9") ? "visible" : ""}`}
          >
            <input
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div
            data-index="10"
            ref={(el) => (fieldRefs.current[10] = el)}
            className={`form-group fade-field ${visibleFields.includes("10") ? "visible" : ""}`}
          >
            <input
              type="text"
              name="city"
              placeholder="City/Location*"
              value={formData.city || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div
            data-index="11"
            ref={(el) => (fieldRefs.current[11] = el)}
            className={`form-group fade-field ${visibleFields.includes("11") ? "visible" : ""}`}
          >
            <input
              type="text"
              name="linkedIn"
              placeholder="LinkedIn Profile (optional)"
              value={formData.linkedIn || ""}
              onChange={handleInputChange}
            />
          </div>

          <div
            data-index="12"
            ref={(el) => (fieldRefs.current[12] = el)}
            className={`form-group fade-field ${visibleFields.includes("12") ? "visible" : ""}`}
          >
            <button type="submit" className="submit-button">
              {loading ? <div className="loader"></div> : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
