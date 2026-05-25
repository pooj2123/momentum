import "./globals.css";

export const metadata = {
  title: "Momentum",
  description: "Personal productivity system",
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