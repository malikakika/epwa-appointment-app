"use client";

import RegisterBase from "@/components/registerBase";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const params = useSearchParams();
  const role = (params.get("role")?.toUpperCase() as "PATIENT" | "DOCTOR") || "PATIENT";

  return <RegisterBase role={role} />;
}
