// Dashboard/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
    {message}
  </div>
);

export default ErrorMessage;
