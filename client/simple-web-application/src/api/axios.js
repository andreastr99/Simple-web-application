import axios from 'axios';
import axiosInterceptor from './axios.interceptors';

const axiosRequests = {
  // login: (credentials) => axiosInterceptor.post('/login', credentials),
  login: (credentials) => axios.post('http://localhost:8081/api/login', credentials, {withCredentials: true}),
  logout: () => axiosInterceptor.post('/logout'),
  // logout: () => axios.post('http://localhost:8081/api/logout', {withCredentials: true}),
  getAllEmployees: () => axiosInterceptor.get('/Employees'),
  deleteEmployee: (employee_id) => axiosInterceptor.delete(`/Employees/${employee_id}`),
  addEmployee: (employee) => axiosInterceptor.post('/Employees', employee),
  editEmployee: (employee_id, employee) => axiosInterceptor.put(`/Employees/${employee_id}`, employee),
  getSkillLevels: () => axiosInterceptor.get('/skill-levels'),
  getSkill: (skill_level_id) => axiosInterceptor.get(`/skill-level/${skill_level_id}`),
  // checkRefreshToken: () => axiosInterceptor.get('/check-refresh-token')
};

export default axiosRequests;



