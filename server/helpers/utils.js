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
  const emailRegex = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
  const nameRegex = new RegExp("^([a-zA-Z]+[ \\-']{0,1}){1,3}$");

  if ((nameRegex.test(employee.first_name) && nameRegex.test(employee.last_name)) && (calculateAge(employee.dob) >= 18 && calculateAge(employee.dob) <= 100) && emailRegex.test(employee.email) && (employee.active === true || employee.active === false) && (employee.age === calculateAge(employee.dob))) {
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

async function dataValidation(req) {
  try {
      return (validation(req.body) && await skillIdValidation(req.body.skill_level));
  } catch (error) {
      console.error("An error occurred:", error);
      return false;
  }
}


module.exports = {
  validation: validation,
  skillIdValidation: skillIdValidation,
  dataValidation: dataValidation
}