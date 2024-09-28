import React, { useState } from 'react'

const CustomeInput = ({ lable, type, values, placeholder, onChange, validate }) => {
    const [error, setError] = useState('');
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        onChange(inputValue);
        setError(validate(inputValue));
    }
    return (
        <div>
            <div className=''>
                <lable className='text'>{lable}</lable>
                <input
                    type={type}
                    value={values}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                ></input>
                {error && <span style={{ color: 'red' }}>{error}</span>}
            </div>
        </div>
    )
}

export default CustomeInput
