'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { deleteTicket } from '@/lib/api';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const DeleteTicketForm = () => {
  const [ticketId, setTicketId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const validateTicketId = (id: string) => {
    if (!id.trim()) {
      setInputError('Ticket ID is required');
      return false;
    }
    
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      setInputError('Invalid Ticket ID format. Example: 105d1e8f-cec3-44d8-a262-9655d4feb307');
      return false;
    }
    
    setInputError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateTicketId(ticketId)) {
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to permanently delete this ticket? ' +
      'This action cannot be undone and will remove all data associated with this ticket.'
    );
    
    if (!confirmDelete) return;

    setIsDeleting(true);
    setResult(null);

    try {
      const response = await deleteTicket(ticketId.trim());
      setResult(response);
    } catch (err: any) {
      setResult({
        success: false,
        message: err.message || 'An unexpected error occurred'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketId(e.target.value);
    
    // Clear error when user types
    if (inputError) {
      setInputError(null);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {result ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`p-6 rounded-xl border ${
            result.success ? 
              'bg-green-50 border-green-200' : 
              'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-start">
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
              result.success ? 
                'bg-green-100 text-green-600' : 
                'bg-red-100 text-red-600'
            }`}>
              {result.success ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="ml-4">
              <h3 className={`text-lg font-medium ${
                result.success ? 
                  'text-green-800' : 
                  'text-red-800'
              }`}>
                {result.success ? 'Ticket Deleted' : 'Deletion Failed'}
              </h3>
              <div className={`mt-2 text-sm ${
                result.success ? 
                  'text-green-700' : 
                  'text-red-700'
              }`}>
                {result.message}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Button
              onClick={() => {
                setTicketId('');
                setResult(null);
              }}
              variant={result.success ? "primary" : "secondary"}
              className="w-full"
            >
              {result.success ? 'Delete Another Ticket' : 'Try Again'}
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.form 
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
        >
          <div>
            <label htmlFor="ticketId" className="block text-sm font-medium text-gray-700 mb-2">
              Ticket ID
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id="ticketId"
              name="ticketId"
              value={ticketId}
              onChange={handleInputChange}
              placeholder="105d1e8f-cec3-44d8-a262-9655d4feb307"
              required
            />
            {inputError && (
              <p className="mt-2 text-sm text-red-600">{inputError}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Enter the internal ID received when creating the ticket
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Warning</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>This action cannot be undone. All ticket data will be permanently erased.</p>
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            variant="secondary" 
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
            disabled={isDeleting || !!inputError}
          >
            {isDeleting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </>
            ) : 'Permanently Delete Ticket'}
          </Button>
        </motion.form>
      )}
    </div>
  );
};