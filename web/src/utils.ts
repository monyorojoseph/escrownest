export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
};

export  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};
