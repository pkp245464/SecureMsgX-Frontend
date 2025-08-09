// utils/format.ts
export const formatDate = (dateString?: string) => {
  if (!dateString) return 'Not specified';
  return new Date(dateString).toLocaleString();
};

export const formatTicketType = (type: string) => {
  return type.toLowerCase().replace(/_/g, ' ');
};

export const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ');
};