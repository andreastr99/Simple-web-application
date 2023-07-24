const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
export const minDate = eighteenYearsAgo.toISOString().split('T')[0];

export const calculateDate = (givenDate, years) => {
  const dateObj = new Date(givenDate);
  dateObj.setFullYear(dateObj.getFullYear() + years);
  return dateObj.toISOString().split('T')[0];
};

  // Function to calculate age based on the given date
 export const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  export const formatDate = (isoDate) => {
    const dateParts = isoDate.split('T')[0].split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${year}-${month}-${day}`;
  }