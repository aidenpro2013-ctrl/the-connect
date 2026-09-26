import "./globals.css";

export const metadata = {
  title: "THE Connect",
  description: "Community connection platform for Seabrook / CCISD — messaging, dating, calls, AI, calendar, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
