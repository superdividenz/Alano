import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactModal = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message_body: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setFormData({ name: "", email: "", message_body: "" });
      setStatus("sent");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl h-[75vh] relative overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 h-full overflow-y-auto"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message_body"
              placeholder="Your Message"
              rows={6}
              className="w-full p-3 border rounded resize-none"
              value={formData.message_body}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "sent" && (
              <p className="text-green-500 text-center mt-2">Message sent!</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-center mt-2">
                Error sending message.
              </p>
            )}
          </form>

          {/* Google Map */}
          <div className="h-full w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Event Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6226.0822339754595!2d-90.45907712485702!3d38.716864971763094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87df2df311b91275%3A0x31e271b29644fffc!2s2050%20Dorsett%20Rd%2C%20Maryland%20Heights%2C%20MO%2063043!5e0!3m2!1sen!2sus!4v1756611174286!5m2!1sen!2sus"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
