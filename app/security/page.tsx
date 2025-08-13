// app/security/page.tsx

import { Container } from '@/app/components/ui/Container';
import { Card } from '@/app/components/ui/card';

export default function SecurityPage() {
  return (
    <Container className="py-12">
      <Card title="Security Information">
        <div className="prose max-w-none">
          <h3>1. End-to-End Encryption</h3>
          <p>
            SecureMsgX uses end-to-end encryption (E2EE) to ensure that only the intended recipients can access message content. Messages are encrypted on the sender's device and can only be decrypted by recipients with valid passkeys.
          </p>

          <h3>2. AES-256 Encryption</h3>
          <p>
            All messages are encrypted using AES-256, a military-grade encryption standard trusted worldwide for its strength and reliability.
          </p>

          <h3>3. Passkey Protection</h3>
          <p>
            Access to messages requires one or more passkeys. These passkeys are never stored in plaintext on our servers and must be provided in the correct order to decrypt content.
          </p>

          <h3>4. No Message Storage</h3>
          <p>
            Encrypted messages are stored temporarily and deleted after expiration or access. We never store decrypted content or private keys.
          </p>

          <h3>5. Tamper-Resistance</h3>
          <p>
            All tickets and replies are digitally verified. Any tampering or unauthorized access attempts are logged and blocked.
          </p>

          <h3>6. Secure Transmission</h3>
          <p>
            All communications with our servers occur over secure HTTPS connections using TLS 1.3 to prevent interception or eavesdropping.
          </p>
        </div>
      </Card>
    </Container>
  );
}
