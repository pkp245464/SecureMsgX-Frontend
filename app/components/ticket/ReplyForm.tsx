//app/components/ticket/ReplyForm.tsx

"use client";

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { postReply } from '@/lib/api';
import type { PasskeyEntry, PostReplyResponse } from '@/types/ticket';

interface ReplyFormProps {
  ticketNumber: string;
  passkeys: PasskeyEntry[];
  parentReplyId?: string;
  onSuccess?: (response: PostReplyResponse) => void;
}

export const ReplyForm = ({
  ticketNumber: initialTicketNumber,
  passkeys: initialPasskeys,
  parentReplyId: initialParentReplyId,
  onSuccess,
}: ReplyFormProps) => {
  const [ticketNumber, setTicketNumber] = useState(initialTicketNumber || '');
  const [content, setContent] = useState('');
  const [parentReplyId, setParentReplyId] = useState(initialParentReplyId || '');

  const [passkeys, setPasskeys] = useState<PasskeyEntry[]>(
    initialPasskeys?.length ? initialPasskeys : [{ order: 1, value: '' }]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasskeyChange = (index: number, field: 'order' | 'value', value: string) => {
    const updated = [...passkeys];
    updated[index] = {
      ...updated[index],
      [field]: field === 'order' ? parseInt(value) : value,
    };
    setPasskeys(updated);
  };

  const addPasskey = () => {
    setPasskeys([...passkeys, { order: passkeys.length + 1, value: '' }]);
  };

  const removePasskey = (index: number) => {
    if (passkeys.length === 1) return; // At least one passkey must exist
    setPasskeys(passkeys.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await postReply({
        ticketNumber,
        content,
        parentReplyId: parentReplyId || undefined,
        passkeys,
      });

      setSuccess(`Reply posted! ID: ${response.replyId}`);
      if (onSuccess) onSuccess(response);
    } catch (err: any) {
      setError(err.message || 'Failed to post reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-lg mx-auto">
      {/* <h2 className="text-xl font-bold mb-4">Post Reply</h2> */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ticket Number */}
        <div>
          <label className="block mb-1">Ticket Number*</label>
          <input
            type="text"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Passkeys */}
        <div>
          <label className="block mb-1">Passkeys*</label>
          <div className="space-y-2">
            {passkeys.map((pk, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="number"
                  value={pk.order}
                  onChange={(e) =>
                    handlePasskeyChange(index, 'order', e.target.value)
                  }
                  className="w-1/4 p-2 border rounded"
                  placeholder="Order"
                  required
                />
                <input
                  type="text"
                  value={pk.value}
                  onChange={(e) =>
                    handlePasskeyChange(index, 'value', e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Value"
                  required
                />
                <button
                  type="button"
                  onClick={() => removePasskey(index)}
                  className="text-red-500"
                  disabled={passkeys.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addPasskey}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Passkey
          </button>
        </div>

        {/* Message Content */}
        <div>
          <label className="block mb-1">Message Content*</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        {/* Parent Reply ID */}
        <div>
          <label className="block mb-1">Parent Reply ID (optional)</label>
          <input
            type="text"
            value={parentReplyId}
            onChange={(e) => setParentReplyId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="42a439e9-6c68-4163-8cff-c6b9933dd12b"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Posting...' : 'Submit Reply'}
        </Button>

        {/* Success / Error */}
        {error && (
          <div className="text-red-500 p-2 bg-red-50 rounded">{error}</div>
        )}
        {success && (
          <div className="text-green-500 p-2 bg-green-50 rounded">{success}</div>
        )}
      </form>
    </div>
  );
};
