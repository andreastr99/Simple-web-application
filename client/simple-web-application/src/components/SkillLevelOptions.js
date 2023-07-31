import AxiosRequests from "./axios";

const fetchData =  () => {
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

    });
  return skills
};

const SKILL_LEVEL_OPTIONS = fetchData();
export default SKILL_LEVEL_OPTIONS;
