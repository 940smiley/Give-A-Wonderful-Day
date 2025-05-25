import './globals.css';

export const metadata = {
  title: 'Give-A-Wonderful-Day',
  description: 'Transparent, on-chain nonprofit donations powered by Ethereum and AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
