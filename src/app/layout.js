
import "./globals.css";

export const metadata = {
  title: "Trivia Quest",
  description: "Un juego muy divertido!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
