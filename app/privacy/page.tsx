// app/privacy/page.tsx

import { Container } from '@/app/components/ui/Container';
import { Card } from '@/app/components/ui/card';

export default function PrivacyPage() {
  return (
    <Container className="py-12">
      <Card title="Privacy Policy">
        <div className="prose max-w-none">
          <h3>1. Introduction</h3>
          <p>
            SecureMsgX is committed to protecting your privacy. This Privacy Policy outlines how we handle your data.
          </p>

          <h3>2. Data Collection</h3>
          <p>
            We only collect data that is strictly necessary to provide our encrypted messaging services. No unencrypted content is stored on our servers.
          </p>

          <h3>3. Data Usage</h3>
          <p>
            Data you provide (e.g., ticket metadata) is used solely to enable secure message delivery. We do not sell or share your information with third parties.
          </p>

          <h3>4. Security</h3>
          <p>
            All messages are encrypted using AES-256 before transmission and cannot be decrypted by us.
          </p>

          <h3>5. Your Rights</h3>
          <p>
            You may request deletion of your secure messages at any time, provided the ticket has not yet expired or been accessed.
          </p>

          <h3>6. Changes to This Policy</h3>
          <p>
            We reserve the right to update this Privacy Policy. Changes will be posted on this page with a revised effective date.
          </p>
        </div>
      </Card>
    </Container>
  );
}
