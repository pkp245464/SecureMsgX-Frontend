// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SecureMsgX',
  description: 'Send encrypted messages securely',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {/* Navigation Bar */}
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold">SecureMsgX</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/create-ticket"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800"
                >
                  Create Ticket
                </Link>
                <Link
                  href="/view-ticket"
                  className="px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white"
                >
                  View Ticket
                </Link>
                <Link
                  href="/api-metrics"
                  className="px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white"
                >
                  API Metrics
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} SecureMsgX. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
