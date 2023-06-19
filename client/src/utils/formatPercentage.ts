const formatPercentage = (percentage: number) => {
    const formattedPercentage = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(percentage / 100);
  
    return formattedPercentage;
  };
  
export default formatPercentage;