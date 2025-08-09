// lib/api.ts

import axios from 'axios';

// types/ticket.ts
// Matches backend TicketType enum
import type { TicketCreationRequest, TicketCreationResponse, TicketCreationResponseBackend  } from '@/types/ticket';

// const API_URL = "http://3.91.186.101:8083"; // original API URL
const API_URL = "http://localhost:8083";  // added for local development

export const createTicket = async (
  data: TicketCreationRequest
): Promise<TicketCreationResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}/doors-of-durin/sigil-scrolls/new-ticket`,
      data
    );

    // NEW: Transform snake_case keys from backend to camelCase expected by TS interface
    const resp = response.data as TicketCreationResponseBackend ;
    return {
      ticketId: resp.ticket_id,
      ticketNumber: resp.ticket_number,
      expires_at: resp.expires_at,
      open_from: resp.open_from,
      open_until: resp.open_until,
      encryption_algo: resp.encryption_algo,
      salt: resp.salt,
      passkey: resp.passkey,
      ticket_type: resp.ticket_type,
      allow_replies: resp.allow_replies,
      ticket_status: resp.ticket_status,
      count_views: resp.count_views,
      createdAt: resp.created_at,
    };

  } catch (error: any) {
    // NEW: More detailed backend error logging
    if (error.response) {
      console.error("Backend error response:", error.response.data);
    } else {
      console.error("Ticket creation failed:", error.message);
    }
    throw error;
  }
};
