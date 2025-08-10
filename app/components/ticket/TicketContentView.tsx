//app/components/ticket/TicketContentView.tsx

import React from 'react';
import { ViewTicketResponse, ConversationNode } from '@/types/ticket';
import { formatDate } from '@/app/utils/timeUtils';

interface TicketContentViewProps {
  ticket: ViewTicketResponse;
}

const ConversationTree: React.FC<{ nodes: ConversationNode[] }> = ({ nodes }) => {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No conversation yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {nodes.map((node) => (
        <div key={node.replyId} className="pl-4 border-l-2 border-gray-200">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-primary-100 text-primary-800 rounded-full w-8 h-8 flex items-center justify-center">
                {node.replyId.substring(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {node.decryptedContent}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(node.createdAt)}
                </p>
              </div>
            </div>
          </div>
          {node.replies && node.replies.length > 0 && (
            <div className="mt-3 ml-6">
              <ConversationTree nodes={node.replies} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const TicketContentView: React.FC<TicketContentViewProps> = ({ ticket }) => {
  const getStatusDisplay = () => {
    if (!ticket.ticketStatus) return 'UNKNOWN';
    return ticket.ticketStatus.replace(/_/g, ' ');
  };

  const getStatusColor = () => {
    const status = ticket.ticketStatus?.toUpperCase();
    if (status === 'OPEN') return 'bg-green-100 text-green-800';
    if (status === 'CLOSED') return 'bg-red-100 text-red-800';
    if (status === 'EXPIRED') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-primary-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">Secure Ticket Content</h3>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Security Warning */}
        {ticket.securityWarning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {ticket.securityWarning}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Ticket Status */}
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusDisplay()}
          </span>
        </div>
        
        {/* Main Content */}
        {ticket.decryptedContent && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">
              {ticket.decryptedContent}
            </p>
          </div>
        )}
        
        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ticket.openFrom && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Open From</h4>
              <p className="text-sm">{formatDate(ticket.openFrom)}</p>
            </div>
          )}
          
          {ticket.openUntil && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Open Until</h4>
              <p className="text-sm">{formatDate(ticket.openUntil)}</p>
            </div>
          )}
          
          {ticket.maxViews !== undefined && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Max Views</h4>
              <p className="text-sm">{ticket.maxViews}</p>
            </div>
          )}
          
          {ticket.remainingViews !== undefined && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Remaining Views</h4>
              <p className="text-sm">{ticket.remainingViews}</p>
            </div>
          )}
          
          {ticket.readAt && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Last Read At</h4>
              <p className="text-sm">{formatDate(ticket.readAt)}</p>
            </div>
          )}
        </div>
        
        {/* Conversation Thread */}
        {(ticket.conversation && ticket.conversation.length > 0) && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
              Conversation Thread
            </h4>
            <ConversationTree nodes={ticket.conversation} />
          </div>
        )}
      </div>
    </div>
  );
};