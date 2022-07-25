import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
import "./Restform.css";

export default function Restform() {
  // need to use this when backend is finsihed
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    location: "",
    image_url: "",
    description: "",
  });
  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const res = await apiClient.request("restaurant", "post", form);

      console.log(res);
      if (res?.data?.restaurant) {
        setUser(res.data);
        // apiClient.setToken(res.data.token);
        setIsLoading(false);
        navigate("/viewrest");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with adding your restaurant",
        }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };

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
