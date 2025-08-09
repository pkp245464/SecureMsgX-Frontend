"use client";

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { createTicket } from '@/lib/api';
import { TicketCreationRequest } from '@/types/ticket';

const TICKET_TYPES = [
  "SINGLE",
  "SECURE_SINGLE",
  "THREAD",
  "BROADCAST",
  "GROUP"
] as const;

// Helper to determine if replies are allowed based on type
const isRepliesAllowed = (type: TicketCreationRequest['ticket_type']) =>
  type === 'GROUP' || type === 'THREAD';

// Helper to determine if max_views is required for type
const isMaxViewsRequired = (type: TicketCreationRequest['ticket_type']) =>
  type === 'GROUP' || type === 'BROADCAST';

// Helper to determine if max_views is fixed (cannot be changed) for type
const isMaxViewsFixed = (type: TicketCreationRequest['ticket_type']) =>
  type === 'SINGLE' || type === 'SECURE_SINGLE';

export const CreateTicketForm = () => {
  const [formData, setFormData] = useState<TicketCreationRequest>({
    message_content: '',
    encryption_algo: 'AES_256',
    passkeys: ['', ''],  // Start with 2 passkeys
    salt: '',
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    ticket_type: 'GROUP',
    max_views: 10,
    allow_replies: true, // based on default type
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketInfo, setTicketInfo] = useState<{
    ticketId: string;
    ticketNumber: string;
  } | null>(null);

  // Add or remove passkeys
  const addPasskey = () => {
    if (formData.passkeys.length < 10) {
      setFormData({ ...formData, passkeys: [...formData.passkeys, ''] });
    }
  };

  const removePasskey = (index: number) => {
    if (formData.passkeys.length > 1) {
      const newPasskeys = formData.passkeys.filter((_, i) => i !== index);
      setFormData({ ...formData, passkeys: newPasskeys });
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith('passkey')) {
      const index = Number(name.replace('passkey', ''));
      const newPasskeys = [...formData.passkeys];
      newPasskeys[index] = value;
      setFormData({ ...formData, passkeys: newPasskeys });
    } else if (name === 'max_views') {
      // Only allow editing max_views if not fixed type
      if (!isMaxViewsFixed(formData.ticket_type)) {
        let maxViewsNum = Number(value);
        if (isNaN(maxViewsNum) || maxViewsNum < 1) maxViewsNum = 1;
        if (maxViewsNum > 1_000_000_000) maxViewsNum = 1_000_000_000;
        setFormData({ ...formData, max_views: maxViewsNum });
      }
    } else if (name === 'expires_at') {
      let isoDate = value;
      if (value.length === 10) {
        isoDate = value + 'T23:59:59Z';
      }
      setFormData({ ...formData, expires_at: isoDate });
    } else if (name === 'ticket_type') {
      const newType = value as TicketCreationRequest['ticket_type'];

      // Set fixed max_views for SINGLE and SECURE_SINGLE
      let newMaxViews = formData.max_views;
      if (newType === 'SECURE_SINGLE') {
        newMaxViews = 1;
      } else if (newType === 'SINGLE') {
        newMaxViews = 5;
      } else if (newType === 'GROUP') {
        // Default for group if undefined
        if (!formData.max_views || formData.max_views < 1) newMaxViews = 10;
      } else if (newType === 'BROADCAST') {
        if (!formData.max_views || formData.max_views < 1) newMaxViews = 10;
      } else {
        // THREAD or others: no fixed max_views
        newMaxViews = formData.max_views;
      }

      setFormData({
        ...formData,
        ticket_type: newType,
        allow_replies: isRepliesAllowed(newType),
        max_views: newMaxViews,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Frontend validation: require max_views for GROUP and BROADCAST
    if (
      isMaxViewsRequired(formData.ticket_type) &&
      (formData.max_views === undefined || formData.max_views === null)
    ) {
      setError(`max_views is required for ticket type ${formData.ticket_type}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const data = await createTicket(formData);
      setTicketInfo({
        ticketId: data.ticketId,
        ticketNumber: data.ticketNumber,
      });
      setSuccess(true);

      // Reset form to default
      const defaultType = 'GROUP';
      setFormData({
        message_content: '',
        encryption_algo: 'AES_256',
        passkeys: ['', ''],
        salt: '',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        ticket_type: defaultType,
        max_views: 10,
        allow_replies: isRepliesAllowed(defaultType),
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if max_views input should be disabled
  const maxViewsDisabled = isMaxViewsFixed(formData.ticket_type);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Message Content */}
      <div className="mb-4">
        <label htmlFor="message_content" className="block text-sm font-medium text-gray-700 mb-1">
          Secret Message
        </label>
        <textarea
          id="message_content"
          name="message_content"
          value={formData.message_content}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your secret message here..."
        />
      </div>

      {/* Passkeys */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Passkeys (1 to 10 required)
        </label>
        {formData.passkeys.map((passkey, index) => (
          <div key={index} className="flex items-center mb-2 space-x-2">
            <Input
              label={`Passkey ${index + 1}`}
              name={`passkey${index}`}
              type="password"
              value={passkey}
              onChange={handleChange}
              required
            />
            {formData.passkeys.length > 1 && (
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
        {formData.passkeys.length < 10 && (
          <button
            type="button"
            onClick={addPasskey}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Passkey
          </button>
        )}
      </div>

      {/* Salt */}
      <Input
        label="Salt"
        name="salt"
        value={formData.salt}
        onChange={handleChange}
        placeholder="Enter salt (optional)"
      />

      {/* Expiration Date */}
      <Input
        label="Expiration Date"
        name="expires_at"
        type="datetime-local"
        value={(formData.expires_at ?? '').slice(0, 16)}
        onChange={handleChange}
        required
      />

      {/* Ticket Type & Max Views */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="ticket_type" className="block text-sm font-medium text-gray-700 mb-1">
            Ticket Type
          </label>
          <select
            id="ticket_type"
            name="ticket_type"
            value={formData.ticket_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TICKET_TYPES.map(type => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            {formData.allow_replies
              ? '✅ Replies allowed for this ticket type.'
              : '❌ Replies are disabled for this type.'}
          </p>
        </div>

        <label htmlFor="max_views" className="block text-sm font-medium text-gray-700 mb-1">
          Maximum Views
        </label>
        <input
          id="max_views"
          name="max_views"
          type="number"
          value={formData.max_views}
          onChange={handleChange}
          required={formData.ticket_type === 'BROADCAST' || formData.ticket_type === 'GROUP'}
          readOnly={formData.ticket_type === 'SINGLE' || formData.ticket_type === 'SECURE_SINGLE'}
          min={1}
          max={1000000000}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {(formData.ticket_type === 'SINGLE' || formData.ticket_type === 'SECURE_SINGLE') && (
          <p className="text-sm text-gray-500 mt-1">
            {formData.ticket_type === 'SINGLE'
              ? 'Max views fixed to 5 for SINGLE tickets.'
              : 'Max views fixed to 1 for SECURE_SINGLE tickets.'}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Ticket...' : 'Create Secure Ticket'}
        </Button>
      </div>

      {/* Success Message */}
      {success && ticketInfo && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Ticket Created Successfully!</h3>
          <p className="text-sm text-green-700 mt-2">
            <span className="font-semibold">Ticket ID:</span> {ticketInfo.ticketId}
          </p>
          <p className="text-sm text-green-700">
            <span className="font-semibold">Ticket Number:</span> {ticketInfo.ticketNumber}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </form>
  );
};
