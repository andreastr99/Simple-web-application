const db = require('../database/database');

function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


function validation(employee) {
  const first_name = employee.first_name;
  const last_name = employee.last_name;
  const dob = employee.dob;
  const email = employee.email;
  const active = employee.active;
  const age = employee.age;
  
  
  const emailRegex = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
  const nameRegex = new RegExp("^([a-zA-Z]+[ \\-']{0,1}){1,3}$");

  if ((nameRegex.test(first_name) && nameRegex.test(last_name)) && (calculateAge(dob) >= 18 && calculateAge(dob) <= 100) && emailRegex.test(email) && (active === true || active === false) && (age === calculateAge(dob))) {
    return true;
  }
  return false;
}

async function skillIdValidation(skill_level_id) {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM skill_levels WHERE skill_level_id = ?", [skill_level_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    return !(results.length === 0);
  } catch (error) {
    // Handle the error here, such as logging or throwing
    console.error("Error while querying the database:", error);
    throw error;
  }
}

async function dataValidation (req) {
  let isValid;
  try {
      isValid = await skillIdValidation(req.body.skill_level);
   } catch (error) {
     console.error("An error occurred:", error);
   }
   
 if (!validation(req.body) || !isValid) {
     return false;
 }
 return true;
}

module.exports = {
  validation: validation,
  skillIdValidation: skillIdValidation,
  dataValidation: dataValidation
}