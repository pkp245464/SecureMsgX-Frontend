// app/reply-ticket/page.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/app/components/ui/Container';
import { Section } from '@/app/components/ui/Section';
import { Card } from '@/app/components/ui/card';
import { ReplyForm } from '@/app/components/ticket/ReplyForm';
import { PostReplyResponse } from '@/types/ticket'; 

export default function ReplyTicketPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  const ticketNumber = searchParams.get('ticketNumber') || '';
  const parentReplyId = searchParams.get('parentReplyId') || undefined;
  
  // In a real app, you might get passkeys from context or session
  const passkeys = [{ order: 1, value: "pkp" }]; // Example - should come from secure storage

  const handleSuccess = (response: PostReplyResponse) => {
    // You can use the response.replyId if needed
    console.log("Reply posted successfully with ID:", response.replyId);
    
    // Optionally redirect or refresh the view
    // router.push(`/view-ticket?ticketNumber=${ticketNumber}`);
  };

  return (
    <Container className="py-1">
      <div className="text-center mb-1">
        <h1 className="text-4xl font-bold text-dark-900 mb-4">
          Post a Reply
        </h1>
        {/* <p className="text-gray-600 max-w-2xl mx-auto">
          {parentReplyId 
            ? `Replying to message in ticket ${ticketNumber}`
            : `Replying to ticket ${ticketNumber}`}
        </p> */}
      </div>
      
      <Section>
        <Card>
          <ReplyForm 
            ticketNumber={ticketNumber}
            passkeys={passkeys}
            parentReplyId={parentReplyId}
            onSuccess={handleSuccess}
          />
        </Card>
      </Section>
    </Container>
  );
}