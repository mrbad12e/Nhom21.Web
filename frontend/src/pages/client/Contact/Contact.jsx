import React from "react";
import { TextField, Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Have any questions? We'd love to hear from you.
        </p>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent successfully!");
          }}
        >
          {/* Name */}
          <div>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              className="bg-gray-50"
            />
          </div>

          {/* Email */}
          <div>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
              className="bg-gray-50"
            />
          </div>

          {/* Subject */}
          <div>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              className="bg-gray-50"
            />
          </div>

          {/* Message */}
          <div>
            <TextField
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              required
              className="bg-gray-50"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              variant="contained"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
