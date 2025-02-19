import React from 'react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'agreement' | 'transaction' | 'dispute' | 'system';
  category: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  referenceId?: string;  // ID of related agreement/transaction/dispute
}

const sampleNotifications: Notification[] = [];

const getTypeIcon = (type: Notification['type']) => {
  switch (type) {
    case 'agreement':
      return '📄';
    case 'transaction':
      return '💰';
    case 'dispute':
      return '⚠️';
    case 'system':
      return '🔔';
  }
};

const getCategoryStyles = (category: Notification['category']) => {
  switch (category) {
    case 'info':
      return 'bg-blue-50 border-blue-200';
    case 'success':
      return 'bg-green-50 border-green-200';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200';
    case 'error':
      return 'bg-red-50 border-red-200';
  }
};

const Notifications: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        {sampleNotifications.length > 0 && (
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Mark all as read
          </button>
        )}
      </div>
      
      {sampleNotifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="text-4xl mb-4">🔔</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
          <p className="text-gray-500">
            When you receive notifications, they will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sampleNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${getCategoryStyles(notification.category)} 
                ${notification.isRead ? 'opacity-75' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                      {!notification.isRead && (
                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"/>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {format(notification.timestamp, 'MMM d, yyyy HH:mm')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications; 