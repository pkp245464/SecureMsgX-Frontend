// app/create-ticket/page.tsx

import { Card } from '@/app/components/ui/card';
import { CreateTicketForm } from '@/app/components/ticket/CreateTicketForm';

export default function CreateTicketPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Create Secure Message Ticket
        </h1>
        
        <Card title="Secure Message Details">
          <CreateTicketForm />
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your message will be encrypted using AES-256 encryption</p>
          <p className="mt-1">Passkeys are required to decrypt the message</p>
        </div>
      </div>
    </div>
  );
}