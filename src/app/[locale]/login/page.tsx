"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import styles from "../../../styles/auth.module.css";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("login");

  const isAdminLogin = searchParams.get("role") === "admin";

    console.log("searchParams role =", searchParams.get("role"));
  console.log("isAdminLogin =", isAdminLogin);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || t("error"));
      return;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "PATIENT") router.push("/dashboard/patient");
    if (data.user.role === "DOCTOR") router.push("/dashboard/doctor");
    if (data.user.role === "ADMIN") router.push("/dashboard/admin");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t("title")}</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FiMail className={styles.icon} />
            <input
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.icon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button type="submit" className={styles.button}>
            {t("submit")}
          </button>
        </form>

        {message && <p className={styles.error}>{message}</p>}

        {!isAdminLogin && (
          <div className={styles.links}>
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className={styles.linkBtn}
            >
              {t("forgotPassword")}
            </button>

            <p className={styles.registerText}>
              {t("noAccount")}{" "}
              <label htmlFor="roleSelect" className={styles.visuallyHidden}>
                {t("chooseRole")}
              </label>
              <select
                id="roleSelect"
                onChange={(e) => {
                  const role = e.target.value;
                  if (role === "PATIENT") router.push("/register?role=patient");
                  if (role === "DOCTOR") router.push("/register?role=doctor");
                }}
                defaultValue=""
                className={styles.roleSelect}
              >
                <option value="" disabled>
                  {t("chooseRole")}
                </option>
                <option value="PATIENT">{t("registerPatient")}</option>
                <option value="DOCTOR">{t("registerDoctor")}</option>
              </select>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
