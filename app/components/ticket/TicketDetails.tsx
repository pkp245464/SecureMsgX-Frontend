// components/ticket/TicketDetails.tsx
import React from 'react';
import { TicketCreationResponse } from '@/types/ticket';
import { Button } from '@/app/components/ui/button';

interface TicketDetailsProps {
  ticket: TicketCreationResponse;
  onClose?: () => void;
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onClose }) => {
  // Format dates for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Ticket Created Successfully!</h3>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-white hover:text-blue-200"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Ticket ID</h4>
            <p className="mt-1 text-sm font-mono break-all">{ticket.ticketId}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Ticket Number</h4>
            <p className="mt-1 text-sm font-mono">{ticket.ticketNumber}</p>
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
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-500">Security Details</h4>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-xs font-medium text-gray-400">Encryption</h5>
              <p className="text-sm">{ticket.encryption_algo}</p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-400">Salt</h5>
              <p className="text-sm font-mono break-all">{ticket.salt || 'None'}</p>
            </div>
          </div>
        </div>

        {/* Passkeys */}
        {ticket.passkey && ticket.passkey.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-500">Passkeys</h4>
            <div className="mt-2 space-y-2">
              {ticket.passkey.map((pk, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 text-sm text-gray-400">#{index + 1}</div>
                  <div className="flex-1">
                    <p className="text-sm font-mono break-all">{pk.passkey}</p>
                    <p className="text-xs text-gray-400">Order: {pk.key_order}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button 
            variant="secondary" 
            onClick={() => navigator.clipboard.writeText(ticket.ticketNumber)}
          >
            Copy Ticket Number
          </Button>
          <Button 
            variant="primary"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(ticket, null, 2));
            }}
          >
            Copy Full Details
          </Button>
        </div>
      </div>
    </div>
  );
};