"use client";

import styles from "../../../styles/landing.module.css";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/languageSwitcher";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const t = useTranslations("landing");
  const nav = useTranslations("navbar");

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => router.push("/")}>
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
          <span>{nav("logo")}</span>
        </div>
        <div className={styles.navLinks}>
          <button
            onClick={() => router.push("/praticiens")}
            className={styles.linkBtn}
          >
            {nav("practitioner")}
          </button>
          <button
            onClick={() => router.push("/help")}
            className={styles.linkBtn}
          >
            {nav("help")}
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

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <div className={styles.buttons}>
            <button
              onClick={() => router.push("/login")}
              className={styles.btnPrimary}
            >
              {t("ctaPatient")}
            </button>
            <button
              onClick={() => router.push("/praticiens")}
              className={styles.btnSecondary}
            >
              {t("ctaDoctor")}
            </button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/hero.png"
            alt="Bannière"
            fill
            className={styles.heroImg}
            priority
          />
        </div>
      </header>

      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>{t("featuresTitle")}</h2>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <h3>{t("featureSearchTitle")}</h3>
            <p>{t("featureSearchDesc")}</p>
          </div>
          <div className={styles.featureItem}>
            <h3>{t("featureBookingTitle")}</h3>
            <p>{t("featureBookingDesc")}</p>
          </div>
          <div className={styles.featureItem}>
            <h3>{t("featureManageTitle")}</h3>
            <p>{t("featureManageDesc")}</p>
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
