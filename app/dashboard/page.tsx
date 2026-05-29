import { Metadata } from "next";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "My Progress — Alien's Aileen",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
