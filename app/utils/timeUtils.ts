// app/utils/timeUtils.ts

export const formatDate = (dateString?: string) => {
  if (!dateString) return 'Not specified';
  return new Date(dateString).toLocaleString();
};

export const calculateDuration = (start?: string, end?: string) => {
  if (!start || !end) return 'N/A';
  
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return `${days}d ${hours}h`;
};

export const formatTimeRange = (expiresAt?: string, openFrom?: string, openUntil?: string) => {
  if (openFrom && openUntil) {
    return `Access Window: ${formatDate(openFrom)} - ${formatDate(openUntil)}`;
  }
  if (expiresAt) {
    return `Expires At: ${formatDate(expiresAt)}`;
  }
  return 'No expiration set';
};