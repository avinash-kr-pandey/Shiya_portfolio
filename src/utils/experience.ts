export const calculateExperience = (startDate: string = "2025-01-06") => {
  const start = new Date(startDate);
  const now = new Date();
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  
  // Adjust if the current day of the month is less than the start day of the month
  if (now.getDate() < start.getDate()) {
    months--;
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months };
};

export const formatExperience = (startDate: string = "2025-01-06") => {
  const { years, months } = calculateExperience(startDate);
  
  if (years === 0) {
    return `${months} Month${months !== 1 ? 's' : ''}`;
  }
  
  if (months === 0) {
    return `${years} Year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} Year${years !== 1 ? 's' : ''} ${months} Month${months !== 1 ? 's' : ''}`;
};
