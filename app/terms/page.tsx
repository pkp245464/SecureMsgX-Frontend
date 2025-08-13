// Sample for app/terms/page.tsx
import { Container } from '@/app/components/ui/Container';
import { Card } from '@/app/components/ui/card';

export default function TermsPage() {
  return (
    <Container className="py-12">
      <Card title="Terms of Service">
        <div className="prose max-w-none">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing SecureMsgX, you agree to be bound by these Terms...</p>
          
          <h3>2. Service Description</h3>
          <p>SecureMsgX provides end-to-end encrypted messaging services...</p>
          
          <h3>3. User Responsibilities</h3>
          <p>You agree not to use the service for illegal purposes...</p>
        </div>
      </Card>
    </Container>
  );
}