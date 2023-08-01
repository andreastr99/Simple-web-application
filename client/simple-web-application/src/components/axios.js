import axiosInterceptor from './axios.interceptors';

const axiosRequests = {
  login: (credentials) => axiosInterceptor.post('/login', credentials),
  getAllEmployees: () => axiosInterceptor.get('/Employees'),
  deleteEmployee: (employee_id) => axiosInterceptor.delete(`/Employees/${employee_id}`),
  addEmployee: (employee) => axiosInterceptor.post('/Employees', employee),
  editEmployee: (employee_id, employee) => axiosInterceptor.put(`/Employees/${employee_id}`, employee),
  getSkillLevel: () => axiosInterceptor.get('/skill-levels'),
};

export default axiosRequests;



