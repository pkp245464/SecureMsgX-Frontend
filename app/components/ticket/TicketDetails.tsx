// components/ticket/TicketDetails.tsx
import React from 'react';
import { TicketCreationResponse } from '@/types/ticket';
import { Button } from '@/app/components/ui/button';
import { formatDate, calculateDuration, formatTimeRange } from '@/app/utils/timeUtils';

interface TicketDetailsProps {
  ticket: TicketCreationResponse;
  onClose?: () => void;
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onClose }) => {
  // Format dates for display
  const duration = calculateDuration(ticket.open_from, ticket.open_until);
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto">

      {/* Header */}
      <div className="bg-primary-600 px-6 py-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Secure Ticket Created</h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-white hover:text-primary-200 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
        )}
      </div>
      
      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between">
            <div>
              <h4 className="text-xs font-medium text-gray-500">Ticket ID</h4>
              <p className="mt-1 text-sm font-mono break-all">{ticket.ticketId}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Ticket Number</h4>
              <p className="mt-1 text-sm font-mono">{ticket.ticketNumber}</p>
            </div>
          </div>
        </div>

        {/* Status & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                ticket.ticket_status === 'OPEN' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {ticket.ticket_status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Type</h4>
            <p className="mt-1 text-sm capitalize">
              {ticket.ticket_type.toLowerCase().replace(/_/g, ' ')}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Created At</h4>
            <p className="mt-1 text-sm">{formatDate(ticket.createdAt)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Expires At</h4>
            <p className="mt-1 text-sm">{formatDate(ticket.expires_at)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Open Until</h4>
            <p className="mt-1 text-sm">{formatDate(ticket.open_until)}</p>
          </div>
        </div>

        {/* Security Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Encryption</h4>
          <p className="text-lg font-bold text-primary-600">{ticket.encryption_algo}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Salt</h4>
          <p className="text-lg font-mono break-all">{ticket.salt || 'None'}</p>
        </div>
      </div>

        {/* Passkeys */}
        {ticket.passkey && ticket.passkey.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Passkeys</h4>
          <div className="space-y-3">
            {ticket.passkey.map((pk, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-md">
                <div className="bg-primary-100 text-primary-800 rounded-full w-8 h-8 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-mono break-all">{pk.passkey}</p>
                  <p className="text-xs text-gray-500">Order: {pk.key_order}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

        {/* Actions */}
         <div className="flex justify-center space-x-4 pt-4">
        <Button 
          variant="secondary" 
          onClick={() => navigator.clipboard.writeText(ticket.ticketNumber)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          Copy Ticket Number
        </Button>
      </div>
    </div>
  </div>
  );
};