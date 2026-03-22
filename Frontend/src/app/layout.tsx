import "./globals.css"; // Dòng này cực kỳ quan trọng để kích hoạt hình khối

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}