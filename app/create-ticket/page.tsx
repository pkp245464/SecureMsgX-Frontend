// app/create-ticket/page.tsx

import { Container } from '@/app/components/ui/Container';
import { Section } from '@/app/components/ui/Section';
import { Card } from '@/app/components/ui/card';
import { CreateTicketForm } from '@/app/components/ticket/CreateTicketForm';

export default function CreateTicketPage() {
  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark-900 mb-4">
          Create Secure Message
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Send encrypted messages with military-grade AES-256 encryption. 
          Your message is secured with multiple passkeys and can only be 
          accessed by authorized recipients.
        </p>
      </div>
      
      <Section>
        <Card title="Message Details">
          <CreateTicketForm />
        </Card>
      </Section>
    </Container>
  );
}