import React, { useState } from "react";
import "./CoverLetterForm.css";

export const CoverLetterForm = ({ handleDownload }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    city: "",
    companyName: "",
    jobTitle: "",
    experienceYears: "",
  });

  const inputFields = [
    { label: "First Name:", name: "firstName", type: "text", required: true },
    { label: "Last Name:", name: "lastName", type: "text", required: true },
    {
      label: "Phone Number:",
      name: "phoneNumber",
      type: "tel",
      required: true,
    },
    { label: "Email:", name: "email", type: "email", required: true },
    { label: "City:", name: "city", type: "text", required: true },
    {
      label: "Company Name:",
      name: "companyName",
      type: "text",
      required: true,
    },
    { label: "Job Title:", name: "jobTitle", type: "text", required: true },
    {
      label: "Years of Experience:",
      name: "experienceYears",
      type: "number",
      required: true,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDownload(formValues);
  };

  return (
    <div className="form-container">
      <h2>Cover Letter Generator Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {inputFields.map((field, index) => (
            <div key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
