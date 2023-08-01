import AxiosRequests from "./axios";

const fetchSkillData = () => {
  let skills = [];

  AxiosRequests.getSkillLevel()
    .then(response => {

      for (let key in response.data) {
        const skill = {
          value: response.data[key].skill_level_id,
          label: response.data[key].skill_name
        }
        skills.push(skill)
      }

    })
    .catch(error => {
      // Handle the error here
      console.error("Error fetching skill levels:", error);
    });
  return skills
};

const SKILL_LEVEL_OPTIONS = fetchSkillData();
export default SKILL_LEVEL_OPTIONS;
