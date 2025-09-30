"use client";

import styles from "../../../styles/adminLanding.module.css";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/languageSwitcher";
import Image from "next/image";

export default function AdminLanding() {
  const router = useRouter();
  const t = useTranslations("adminLanding");
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
          />
          <span>EPWA</span>
        </div>

        <div className={styles.navLinks}>
          <button
            onClick={() => router.push("/login?role=admin")}
            className={styles.loginBtn}
          >
            {nav("login")}
          </button>

          <LanguageSwitcher />
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{t("heroTitle")}</h1>
          <p className={styles.subtitle}>{t("heroSubtitle")}</p>
          <button
            className={styles.ctaBtn}
            onClick={() => router.push("/login?role=admin")}
          >
            {t("cta")}
          </button>
        </div>
        {/* <div className={styles.heroImage}>
          <img
            src="/images/admin-dashboard.png"
            alt="Admin dashboard illustration"
          />
        </div> */}
      </header>

      <section className={styles.features}>
        <h2>{t("featuresTitle")}</h2>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <h3>{t("featureUsersTitle")}</h3>
            <p>{t("featureUsersDesc")}</p>
          </div>
          <div className={styles.featureItem}>
            <h3>{t("featureStatsTitle")}</h3>
            <p>{t("featureStatsDesc")}</p>
          </div>
          <div className={styles.featureItem}>
            <h3>{t("featureSecurityTitle")}</h3>
            <p>{t("featureSecurityDesc")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
