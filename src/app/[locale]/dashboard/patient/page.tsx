"use client";

import ProtectedDashboard from "@/components/protectedDashboard";


export default function PatientDashboard() {
  return (
    <ProtectedDashboard>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Espace Patient</h1>
        <p className="mt-2">Bienvenue sur votre tableau de bord patient 👩‍⚕️</p>
        <ul className="mt-4 list-disc list-inside">
          <li>Prendre un rendez-vous</li>
          <li>Voir vos rendez-vous à venir</li>
          <li>Consulter vos ordonnances</li>
        </ul>
      </div>
    </ProtectedDashboard>
  );
}
