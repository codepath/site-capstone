import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Restform.css";

export default function Restform() {
  // need to use this when backend is finsihed
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  return (
    <div className="Restaurant">
      <div className="card">Add Your Restaurant!</div>
      {errors.form && <span className="error">{errors.form}</span>}
      <br />

      <div className="form">
        <div className="split-inputs">
          <div className="input-field">
            <label htmlFor="name">Select a date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleOnInputChange}
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
