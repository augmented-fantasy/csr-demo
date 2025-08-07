import "./globals.css";

export const metadata = {
  title: "Amp CSR Portal",
  description: "Demo app for AMP CSR Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
