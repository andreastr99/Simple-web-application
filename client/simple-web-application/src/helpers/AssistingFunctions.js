import AxiosRequests from '../api/axios';

const today = new Date();

// Variable to set the maximum date to today to prevent future dates from being selected
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
export const minDate = eighteenYearsAgo.toISOString().split('T')[0];


// Function to calculate the min date that can be selected
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

// Function to convert the given date in th format of yyyy-MM-dd
export const formatDate = (isoDate) => {
  const dateParts = isoDate.split('T')[0];
  return dateParts;
}

// Function to convert the 0/1 from checkbox to true/false
export const convertCheckboxToBoolean = (active) => {
  if (active === 1)
    return true;
  return false;
}

export const getSkill = (skill_level_id, skills) => {
  const matchedOption = skills.find(skill => skill.skill_level_id === skill_level_id);
  return matchedOption ? matchedOption.skill_name : null;
}



export function logout() {

  localStorage.removeItem('token');
  AxiosRequests.logout();
}
