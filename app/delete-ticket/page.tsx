// app/delete-ticket/page.tsx

"use client";

import { Container } from '@/app/components/ui/Container';
import { DeleteTicketForm } from '@/app/components/ticket/DeleteTicketForm';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export default function DeleteTicketPage() {
  return (
    <Container className="py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
          Secure Ticket Deletion
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Permanently erase tickets with zero digital residue. Your data, your control.
        </p>
      </motion.div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-1 bg-gradient-to-r from-red-600 to-red-800"></div>
          <div className="p-8">
            <DeleteTicketForm />
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-3xl mx-auto bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                • Only the original creator can delete a ticket<br />
                • Deletion removes all content, metadata, and access logs<br />
                • No backups or recovery possible after deletion<br />
                • Use the Ticket ID (not Ticket Number) for deletion
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}