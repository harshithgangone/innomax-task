import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ApplicationForm.css";

const ContactForm = () => {
  const [visibleFields, setVisibleFields] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    nameOfStartup: "",
    foundersName: "",
    alumniId: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false); 

  const fieldRefs = useRef([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 

    const data = new FormData();
    data.append("nameOfStartup", formData.nameOfStartup);
    data.append("foundersName", formData.foundersName);
    data.append("alumniId", formData.alumniId);
    data.append("category", formData.category);
    data.append("description", formData.description);
    
    if (file) {
      
      const uniqueFileName = `${Date.now()}-${file.name}`;
      data.append("pdf", file, uniqueFileName);
    }

    try {
      const response = await axios.post("https://innomax-task.onrender.com/submit-application", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setLoading(false); 
    }
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

  return (
    <div className="body">
      <div className="piling-item hero-sectionapp" id="hero">
        <div className="hero-imagesapp"></div>
        <div className="hero-contentapp">
          <h1>Startup Award Application Portal</h1>
          <p>Fill out the form to get awarded for your startup!!</p>
        </div>
      </div>
      <div className="contact-form-container">
        <h2 className="form-title fade-field">Application</h2>
        <p className="form-subtitle fade-field">We really appreciate your startup move!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          {[{ placeholder: "Name Of Startup*", type: "text", name: "nameOfStartup" },
            { placeholder: "Founder(s) Name(s)*", type: "text", name: "foundersName" },
            { placeholder: "Alumni Association ID", type: "text", name: "alumniId" }
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
            data-index="3"
            ref={(el) => (fieldRefs.current[3] = el)}
            className={`form-group fade-field ${visibleFields.includes("3") ? "visible" : ""}`}
          >
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="education">Education</option>
              <option value="it">IT</option>
              <option value="service">Service</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="communication">Communication</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div
            data-index="4"
            ref={(el) => (fieldRefs.current[4] = el)}
            className={`form-group fade-field ${visibleFields.includes("4") ? "visible" : ""}`}
          >
            <textarea
              rows="7"
              name="description"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div
            data-index="5"
            ref={(el) => (fieldRefs.current[5] = el)}
            className={`form-group fade-field ${visibleFields.includes("5") ? "visible" : ""}`}
          >
            <label htmlFor="pdf">Upload PDF</label>
            <input
              type="file"
              id="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div
            data-index="6"
            ref={(el) => (fieldRefs.current[6] = el)}
            className={`form-group fade-field ${visibleFields.includes("6") ? "visible" : ""}`}
          >
            {loading ? (
              <button type="submit" className="submit-button" disabled>
                <div className="loader"></div> {/* Show loader inside the button */}
              </button>
            ) : (
              <button type="submit" className="submit-button">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ContactForm;
