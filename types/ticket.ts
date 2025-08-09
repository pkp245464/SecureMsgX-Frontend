// types/ticket.ts

// Matches backend TicketType enum
export type TicketType =
  | "SINGLE"
  | "SECURE_SINGLE"
  | "THREAD"
  | "BROADCAST"
  | "GROUP";

// Matches backend TicketStatus enum
export type TicketStatus =
  | "OPEN"
  | "EXPIRED"
  | "CLOSED"
  | "VIEW_LIMIT_REACHED"
  | "REVOKED";

// Matches backend EncryptionAlgo enum
export type EncryptionAlgo =
  | "AES_256"
  | "CHACHA20"
  | "TWOFISH";
  
// Optional passkey structure from backend
export interface Passkey {
  passkey_hash: string;
  key_order: number;
  passkey?: string; // Only included during creation
}

// Request body for ticket creation
export interface TicketCreationRequest {
  message_content: string;
  encryption_algo: EncryptionAlgo;
  passkeys: string[];
  salt: string;

  expires_at?: string;
  open_from?: string;
  open_until?: string;

  ticket_type: TicketType;
  max_views: number;
  allow_replies: boolean;
}

// Response body from backend after creation
export interface TicketCreationResponse {
  // CHANGED: camelCase keys here to match transformed response
  ticketId: string;
  ticketNumber: string;

  expires_at?: string;
  open_from?: string;
  open_until?: string;

  encryption_algo: "AES_256";
  salt: string;

  passkey?: Passkey[];
  ticket_type: TicketType;
  allow_replies: boolean;
  ticket_status: TicketStatus;

  count_views?: number;
  createdAt?: string;
}

// Backend response structure for ticket creation
// This matches the backend response structure
export interface TicketCreationResponseBackend {
  ticket_id: string;
  ticket_number: string;
  expires_at?: string;
  open_from?: string;
  open_until?: string;
  encryption_algo: "AES_256";
  salt: string;
  passkey?: Passkey[];
  ticket_type: TicketType;
  allow_replies: boolean;
  ticket_status: TicketStatus;
  count_views?: number;
  created_at?: string;
}
