//app/view-ticket/page.tsx

import { Container } from '@/app/components/ui/Container';
import { Section } from '@/app/components/ui/Section';
import { Card } from '@/app/components/ui/card';
import { ViewTicketForm } from '@/app/components/ticket/ViewTicketForm';

export default function ViewTicketPage() {
  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark-900 mb-4">
          Access Secure Message
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          View encrypted messages using your passkeys. Enter the ticket number and 
          passkeys in the correct order to decrypt and view the content.
        </p>
      </div>
      
      <Section>
        <Card title="Access Ticket">
          <ViewTicketForm />
        </Card>
      </Section>
    </Container>
  );
}