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

const sampleNotifications: Notification[] = [
  {
    id: 'notif_1',
    type: 'agreement',
    category: 'success',
    title: 'New Agreement Created',
    message: 'Agreement AGR-001 has been created and is awaiting approval',
    timestamp: new Date('2024-03-15T10:30:00'),
    isRead: false,
    referenceId: 'AGR-001'
  },
  {
    id: 'notif_2',
    type: 'transaction',
    category: 'info',
    title: 'Payment Received',
    message: 'Payment of $1,500.00 has been received for agreement AGR-001',
    timestamp: new Date('2024-03-14T15:45:00'),
    isRead: false,
    referenceId: 'tr_1'
  },
  {
    id: 'notif_3',
    type: 'dispute',
    category: 'warning',
    title: 'New Dispute Opened',
    message: 'A dispute has been opened for transaction tr_1',
    timestamp: new Date('2024-03-13T09:20:00'),
    isRead: true,
    referenceId: 'disp_1'
  },
  {
    id: 'notif_4',
    type: 'system',
    category: 'error',
    title: 'Action Required',
    message: 'Please complete your profile verification',
    timestamp: new Date('2024-03-12T14:30:00'),
    isRead: false
  }
];

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
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Mark all as read
        </button>
      </div>
      
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
    </div>
  );
};

export default Notifications; 