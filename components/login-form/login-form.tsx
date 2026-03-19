"use client";

import { useState } from "react";
import styles from "./login-form.module.scss";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const newErrors: FormErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    
    console.log({ email, password });
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (field: "email" | "password") => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGroup}>
        <input
          className={styles.formInput}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
          onChange={() => handleInputChange("email")}
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.formInput} ${styles.formInputPassword}`}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={() => handleInputChange("password")}
          />
          <button
            type="button"
            className={styles.btnShow}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        </div>
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password}</span>
        )}
      </div>

      <a href="/forgot-password" className={styles.forgotLink}>
        Forgot password?
      </a>

      <button type="submit" className={styles.btnLogin} disabled={isSubmitting}>
        {isSubmitting ? "LOGGING IN..." : "LOG IN"}
      </button>
    </form>
  );
}
