"use client";

import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";
import styles from "../styles/auth.module.css";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface RegisterProps {
  role: "PATIENT" | "DOCTOR";
}

export default function RegisterBase({ role }: RegisterProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role,
    streetNumber: "",
    street: "",
    postalCode: "",
    city: "",
    specialty: "",
    rpps: "",
  });
  const [message, setMessage] = useState("");
  const t = useTranslations(
    role === "DOCTOR" ? "registerDoctor" : "registerPatient"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage(t("passwordMismatch"));
      return;
    }

    const payload = {
      email: form.email,
      password: form.password,
      role: form.role,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      streetNumber: form.streetNumber,
      street: form.street,
      postalCode: form.postalCode,
      city: form.city,
      specialty: role === "DOCTOR" ? form.specialty : undefined,
      rpps: role === "DOCTOR" ? form.rpps : undefined,
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setMessage(data.ok ? t("success") : `${data.error}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {role === "DOCTOR" ? t("titleDoctor") : t("titlePatient")}
        </h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <FiUser className={styles.icon} />
              <input
                type="text"
                placeholder={t("firstName")}
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FiUser className={styles.icon} />
              <input
                type="text"
                placeholder={t("lastName")}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <FiMail className={styles.icon} />
              <input
                type="email"
                placeholder={t("email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FiPhone className={styles.icon} />
              <input
                type="tel"
                placeholder={t("phone")}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <FiLock className={styles.icon} />
              <input
                type="password"
                placeholder={t("password")}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FiLock className={styles.icon} />
              <input
                type="password"
                placeholder={t("confirmPassword")}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <FiMapPin className={styles.icon} />
              <input
                type="text"
                placeholder={t("streetNumber")}
                value={form.streetNumber}
                onChange={(e) =>
                  setForm({ ...form, streetNumber: e.target.value })
                }
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FiMapPin className={styles.icon} />
              <input
                type="text"
                placeholder={t("street")}
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <FiMapPin className={styles.icon} />
              <input
                type="text"
                placeholder={t("postalCode")}
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FiMapPin className={styles.icon} />
              <input
                type="text"
                placeholder={t("city")}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={styles.input}
                required
              />
            </div>
          </div>

          {role === "DOCTOR" && (
            <div className={styles.grid2}>
              <div className={styles.inputGroup}>
                <FiBriefcase className={styles.icon} />
                <input
                  type="text"
                  placeholder={t("specialty")}
                  value={form.specialty}
                  onChange={(e) =>
                    setForm({ ...form, specialty: e.target.value })
                  }
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <FiBriefcase className={styles.icon} />
                <input
                  type="text"
                  placeholder={t("rpps")}
                  value={form.rpps}
                  onChange={(e) => setForm({ ...form, rpps: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>
          )}

          <button type="submit" className={styles.button}>
            {t("submit")}
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.links}>
          <p>
            {t("alreadyAccount")}{" "}
            <Link href="/login" className={styles.linkBtn}>
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
