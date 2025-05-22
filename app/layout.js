import './globals.css';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

export const metadata = {
  title: 'Link in Bio Templates by Sanzy',
  description: 'Koleksi template link in bio premium untuk personal branding dan bisnis.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
