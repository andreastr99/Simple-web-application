import React, { useState, useEffect } from 'react';
import AxiosRequests from '../api/axios';

const Dropdown = ({ onChange, required, data, currentValue }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data) {
      // If 'data' is provided, use it to set the options
      setOptions(data);
    } else {
      // Otherwise, fetch the data from the API
      AxiosRequests.getSkillLevels()
        .then((res) => {
          setOptions(res.data);
        })
        .catch((error) => {
          console.error('Error fetching dropdown options:', error);
        });
    }
  }, [data]);

  return (
    <div className="form-group mt-3 mb-2">
      <label>Employee skill level:</label>
      <select id="skill-level" onChange={onChange} value={currentValue} required={required}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.skill_level_id} value={option.skill_level_id}>
            {option.skill_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
