function calculateAge (birthdate) {
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
    const skill_level = employee.skill_level;
    const active = employee.active;
    const age = employee.age;
    
    
    const emailRegex = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$');
    const nameRegex = new RegExp('[a-zA-Z]+');
  
    if ((first_name.match(nameRegex) && last_name.match(nameRegex)) && (calculateAge(dob) >= 18 && calculateAge(dob) <= 100) && email.match(emailRegex) && (active === true || active === false) && age === calculateAge(dob)) {
      return true;
    }
  
    return false;
  }
  

module.exports = {
    validation: validation
}