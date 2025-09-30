"use client";

import styles from "../../../styles/praticiens.module.css";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/languageSwitcher";
import Image from "next/image";

export default function PraticiensLanding() {
  const router = useRouter();
  const t = useTranslations("praticiens");
  const nav = useTranslations("navbar");

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <Image
            src="/logo.png"
            alt="EPWA Logo"
            width={40}
            height={40}
            priority
          />{" "}
          <span>EPWA</span>
        </div>
        <div className={styles.navLinks}>
          <button
            onClick={() => {
              const section = document.getElementById("pricing");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className={styles.linkBtn}
          >
            {t("offers")}
          </button>
          <button
            onClick={() => {
              const section = document.getElementById("pricing");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className={styles.linkBtn}
          >
            {t("pricing")}
          </button>
          <button
            onClick={() => router.push("/login")}
            className={styles.loginBtn}
          >
            {nav("login")}
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      <header className={styles.header}>
        <h1>{t("heroTitle")}</h1>
        <p>{t("heroSubtitle")}</p>
        <button
          className={styles.ctaBtn}
          onClick={() => router.push("/register")}
        >
          {t("cta")}
        </button>
      </header>

      <section className={styles.benefits}>
        <h2>{t("benefitsTitle")}</h2>
        <div className={styles.benefitList}>
          <div>
            <h3>{t("benefit1Title")}</h3>
            <p>{t("benefit1Desc")}</p>
          </div>
          <div>
            <h3>{t("benefit2Title")}</h3>
            <p>{t("benefit2Desc")}</p>
          </div>
          <div>
            <h3>{t("benefit3Title")}</h3>
            <p>{t("benefit3Desc")}</p>
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.pricing}>
        <h2>{t("pricingTitle")}</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>{t("freeTitle")}</h3>
            <p>{t("freeDesc")}</p>
            <button
              className={styles.ctaBtn}
              onClick={() => router.push("/register")}
            >
              {t("freeBtn")}
            </button>
          </div>
          <div className={styles.card}>
            <h3>{t("premiumTitle")}</h3>
            <p>{t("premiumDesc")}</p>
            <button
              className={styles.ctaBtn}
              onClick={() => router.push("/register")}
            >
              {t("premiumBtn")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
