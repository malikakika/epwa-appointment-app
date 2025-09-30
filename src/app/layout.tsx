import "./globals.css";

export const metadata = {
  title: "EPWA Appointment",
  description: "PWA for booking appointments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
