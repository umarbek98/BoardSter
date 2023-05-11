import React from "react";

function Contact() {
  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Contact Us</h1>
      <form className="flex flex-col gap-4 ">
        <label htmlFor="name">Name:</label>
        <input
          className="border-2 border-black"
          type="text"
          id="name"
          name="name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          className="border-2 border-black"
          type="email"
          id="email"
          name="email"
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          className="border-2 border-black"
          id="message"
          name="message"
          rows="5"
          required
        ></textarea>

        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
