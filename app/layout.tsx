// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'SecureMsgX | Encrypted Messaging',
  description: 'Send encrypted messages securely with military-grade encryption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-sans bg-gray-50 text-dark-900">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary-600">SecureMsgX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href="/create-ticket"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition shadow-button"
                >
                  Create Ticket
                </Link>
                <Link
                  href="/view-ticket"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 transition"
                >
                  View Ticket
                </Link>
                <Link
                  href="/api-metrics"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 transition"
                >
                  API Metrics
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-8 min-h-screen bg-gradient-to-b from-white to-gray-50">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-dark-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="text-xl font-bold text-primary-400">SecureMsgX</span>
                <p className="text-gray-400 mt-2">Military-grade encrypted messaging</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Security
                </a>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} SecureMsgX. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
