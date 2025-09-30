"use client";

import ProtectedDashboard from "@/components/protectedDashboard";

export default function DoctorDashboard() {
  return (
        <ProtectedDashboard>
    
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">Espace Médecin</h1>
      <p className="mt-2">Bienvenue sur votre tableau de bord médecin </p>
      <ul className="mt-4 list-disc list-inside">
        <li>Voir vos patients</li>
        <li>Gérer vos rendez-vous</li>
        <li>Rédiger des ordonnances</li>
      </ul>
    </div>
    </ProtectedDashboard>
  );
}
