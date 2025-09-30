"use client";

import { useEffect, useState } from "react";
import ProtectedDashboard from "@/components/protectedDashboard";
import styles from "../../../../styles/adminDashboard.module.css";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/users", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || "Erreur API");
        setUsers(data.users);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Une erreur inconnue est survenue");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <ProtectedDashboard>
      <div className={styles.container}>
        <h1 className={styles.title}>Tableau de bord Admin</h1>
        <p className={styles.subtitle}>Bienvenue sur l’espace administrateur 🛠</p>

        <div className={styles.summaryGrid}>
          <div className={styles.card}>
            <h2>Utilisateurs</h2>
            <p className={styles.count}>{users.length}</p>
          </div>
          <div className={styles.card}>
            <h2>Médecins</h2>
            <p className={`${styles.count} ${styles.doctor}`}>
              {users.filter((u) => u.role === "DOCTOR").length}
            </p>
          </div>
          <div className={styles.card}>
            <h2>Patients</h2>
            <p className={`${styles.count} ${styles.patient}`}>
              {users.filter((u) => u.role === "PATIENT").length}
            </p>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <h2 className={styles.sectionTitle}>Liste des utilisateurs</h2>

          {loading && <p className={styles.info}>Chargement...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && users.length === 0 && (
            <p className={styles.info}>Aucun utilisateur trouvé.</p>
          )}

          {!loading && !error && users.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name ?? "—"}</td>
                    <td>{u.email}</td>
                    <td
                      className={
                        u.role === "ADMIN"
                          ? styles.admin
                          : u.role === "DOCTOR"
                          ? styles.doctor
                          : styles.patient
                      }
                    >
                      {u.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ProtectedDashboard>
  );
}
