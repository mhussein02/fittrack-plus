import "@/app/globals.css";

export const metadata = {
  title: "FitTrack+",
  description: "Personalized fitness & nutrition dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
