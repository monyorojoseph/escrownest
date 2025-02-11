export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
};

export  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};

export  const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export  const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString();
};

