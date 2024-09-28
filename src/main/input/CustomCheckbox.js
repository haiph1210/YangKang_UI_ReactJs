import React, { useEffect, useState } from 'react';
import './CustomCheckbox.scss'
const CustomCheckbox = ({ value, status, code, data }) => {
  const [selectedForms, setSelectedForms] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    const selectedId = parseInt(event.target.value);
    const checked = event.target.checked;
    if (checked) {
      setSelectedForms((prevForms) => [...prevForms, selectedId]);
    } else {
      setSelectedForms((prevForms) => prevForms.filter((form) => form !== selectedId));
    }
    setIsChecked(checked);
  };
  
  console.log(selectedForms);

  return (
    <>
      <label className={`checkbox-button ${isChecked ? 'checked' : ''}`}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          value={value}
        />
        {code}
      </label>
    </>
  );
};

export default CustomCheckbox;
