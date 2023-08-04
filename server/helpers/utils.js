const { validation, skillIdValidation } = require('./employee.validation')

function handleDatabaseResponse(res, error, result) {
    // if (result) {
        if (error) {
            return res.status(500).json(error);
        } else {

            return res.status(200).json(result);
        }
    // } else {
    //     if (error) {
    //         return res.status(500).json(error);
    //     }
    // }
}

async function dataValidation (req) {
    let isValid;
    // console.log(req.body)
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
    handleDatabaseResponse: handleDatabaseResponse,
    dataValidation: dataValidation
    
}