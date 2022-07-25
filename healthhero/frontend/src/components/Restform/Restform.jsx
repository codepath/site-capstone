import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
import { useAuthContext } from "../../AuthContext/auth";
import "./Restform.css";

export default function Restform() {
  // need to use this when backend is finsihed
  const { user, setUser } = useAuthContext();
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
      <div className="card">
        <h2>Add Your Restaurant!</h2>
      </div>
      {errors.form && <span className="error">{errors.form}</span>}
      <br />

      <div className="form">
        <div className="input-field">
          <label htmlFor="location">Restaurant Name</label>
          <input
            type="name"
            name="name"
            value={form.name}
            onChange={handleOnInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="split-inputs">
          <div className="input-field">
            <label htmlFor="location">Location</label>
            <input
              type="location"
              name="location"
              value={form.location}
              onChange={handleOnInputChange}
            />
            {errors.location && (
              <span className="error">{errors.location}</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="image">Image</label>
            <input
              type="image"
              name="image"
              value={form.image_url}
              onChange={handleOnInputChange}
            />
            {errors.image_url && (
              <span className="error">{errors.image_url}</span>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="description">Description</label>
            <input
              type="description"
              name="description"
              value={form.description}
              onChange={handleOnInputChange}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
