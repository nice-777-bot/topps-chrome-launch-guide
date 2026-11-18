import type { Metadata } from "next";
import type { ReactNode } from "react";
import data from "@/data/launch-data.json";
import "./retro.css";
import "./launch.css";

export const metadata: Metadata = {
  title: `${data.product} | Chrome Launch Guide`,
  description: data.release.summary,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
