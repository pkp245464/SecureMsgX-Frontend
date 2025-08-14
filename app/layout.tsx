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
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-primary-600">SecureMsgX</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  href="/create-ticket"
                  // className="px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition shadow-button"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 transition"
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
                href="/reply-ticket"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 transition"
              >
                Reply to Ticket
              </Link>
              <Link
                href="/delete-ticket"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary-600 transition"
              >
                Delete Ticket
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
        <footer className="bg-dark-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <span className="text-2xl font-bold text-primary-400 mb-2 block">SecureMsgX</span>
                <p className="text-gray-400 max-w-md">
                  Military-grade encrypted messaging platform. Send self-destructing messages with 
                  zero tracking and complete anonymity.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://github.com/pkp245464/SecureMsgX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition flex flex-col items-center"
                    aria-label="SecureMsgX Backend GitHub Repository"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs mt-1">Backend</span>
                  </a>

                  {/* Vertical dashed line separator */}
                  <div className="h-6 border-l-2 border-dashed border-gray-500"></div>

                  <a
                    href="https://github.com/pkp245464/SecureMsgX-Frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition flex flex-col items-center"
                    aria-label="SecureMsgX Frontend GitHub Repository"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs mt-1">Frontend</span>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Features</h4>
                <ul className="space-y-2">
                  <li><a href="/create-ticket" className="text-gray-400 hover:text-white transition">Send Message</a></li>
                  <li><a href="/view-ticket" className="text-gray-400 hover:text-white transition">View Message</a></li>
                  <li><a href="/reply-ticket" className="text-gray-400 hover:text-white transition">Reply Message</a></li>
                  <li><a href="/delete-ticket" className="text-gray-400 hover:text-white transition">Delete Message</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Docs & Policies</h4>
                <ul className="space-y-2">
                  <li><a href="/terms" className="text-gray-400 hover:text-white transition">Terms</a></li>
                  <li><a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                  <li><a href="/security" className="text-gray-400 hover:text-white transition">Security</a></li>
                  <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} SecureMsgX. All rights reserved.</p>
              <p className="mt-2">Made with ❤️ for a more secure internet</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
