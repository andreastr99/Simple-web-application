import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const withAuthHeaders = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};

const axiosRequests = {
  login: (credentials) => axios.post(`${API_BASE_URL}/login`, credentials, { withCredentials: true }),
  getAllEmployees: () => axios.get(`${API_BASE_URL}/Employees`, withAuthHeaders),
  deleteEmployee: (employee_id) => axios.delete(`${API_BASE_URL}/Employees/${employee_id}`, withAuthHeaders),
  addEmployee: (employee) => axios.post(`${API_BASE_URL}/Employees`, employee, withAuthHeaders),
  editEmployee: (employee_id, employee) => axios.put(`${API_BASE_URL}/Employees/${employee_id}`, employee, withAuthHeaders),
  getSkillLevel: () => axios.get(`${API_BASE_URL}/skill-levels`),
  // findSkillLevel: (skill_level_id) => axios.get(`${API_BASE_URL}/get-skill/${skill_level_id}`)
};

export default axiosRequests;
