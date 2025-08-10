//app/components/ticket/ViewTicketForm.tsx

"use client";

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { viewTicket } from '@/lib/api';
import { ViewTicketResponse, PasskeyEntry } from '@/types/ticket';
import type { UnifiedViewRequest } from '@/types/ticket';
import { TicketContentView } from '@/app/components/ticket/TicketContentView';

export const ViewTicketForm = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [passkeys, setPasskeys] = useState(['']);
  const [ticketData, setTicketData] = useState<ViewTicketResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasskeyChange = (index: number, value: string) => {
    const newPasskeys = [...passkeys];
    newPasskeys[index] = value;
    setPasskeys(newPasskeys);
  };

  const addPasskey = () => {
    if (passkeys.length < 10) {
      setPasskeys([...passkeys, '']);
    }
  };

  const removePasskey = (index: number) => {
    if (passkeys.length > 1) {
      const newPasskeys = passkeys.filter((_, i) => i !== index);
      setPasskeys(newPasskeys);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    // Ensure passkeys are non-empty and have correct order
    const validPasskeys = passkeys
      .filter(pk => pk.trim() !== '')
      .map((value, index) => ({ 
        order: index + 1, 
        value: value.trim() 
      }));

    if (validPasskeys.length === 0) {
      throw new Error("At least one passkey is required");
    }

    const requestData: UnifiedViewRequest = {
      ticketNumber: ticketNumber.trim(),
      passkeys: validPasskeys
    };

      const response = await viewTicket(requestData);
      setTicketData(response);
    } catch (err: any) {
      setError(err.message || 'Failed to access ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Ticket Number"
          name="ticketNumber"
          value={ticketNumber}
          onChange={(e) => setTicketNumber(e.target.value)}
          placeholder="Enter ticket number (e.g. GRP-0000019866759c777604d39a842fd0098db4)"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passkeys (in correct order)
          </label>
          {passkeys.map((passkey, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <Input
                label={`Passkey ${index + 1}`}
                name={`passkey-${index}`}
                type="password"
                value={passkey}
                onChange={(e) => handlePasskeyChange(index, e.target.value)}
                required
                className="flex-1"
              />
              {passkeys.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePasskey(index)}
                  className="text-red-500 font-bold px-2 py-1 rounded hover:bg-red-100"
                  aria-label={`Remove Passkey ${index + 1}`}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          {passkeys.length < 10 && (
            <button
              type="button"
              onClick={addPasskey}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Passkey
            </button>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Accessing Ticket...' : 'View Secure Ticket'}
          </Button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">Error:</p>
          <p className="text-red-700 mt-1">{error}</p>
          <p className="text-red-700 text-sm mt-2">
            Please check:
            <ul className="list-disc pl-5 mt-1">
              <li>Ticket number is correct</li>
              <li>Passkeys are in the right order</li>
              <li>Ticket hasn't expired</li>
            </ul>
          </p>
        </div>
      )}

      {ticketData && <TicketContentView ticket={ticketData} />}
    </div>
  );
};