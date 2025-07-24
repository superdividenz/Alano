import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message_body: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-in-out", once: true });
    AOS.refresh();
  }, []);

  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, handleClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setFormData({ name: "", email: "", phone: "", message_body: "" });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
      data-aos="fade-in"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative mx-4 sm:mx-0"
        data-aos="zoom-in"
      >
        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close Contact Modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Contact Us
        </h2>

        {sent ? (
          <div className="text-green-600 font-semibold text-center">
            ✅ Message sent!
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              name="message_body"
              placeholder="Message"
              rows={5}
              required
              value={formData.message_body}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
