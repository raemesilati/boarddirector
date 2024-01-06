import React from 'react';

const Select = ({ name, placeholder, value, onChange, options, label, error, defaultOption, required }) => {
    return <React.Fragment>
        {label ? <label htmlFor={name} className="input-label">{label}{required && label !== " " ? <span className='required'>*</span> : null}</label> : null}
        <select type="text" name={name} id={name} value={defaultOption ? defaultOption : value} onChange={onChange} className={error && "error-input"} required={required}>
            <option value="" disabled>{placeholder}</option>
            {options.map(option => <option key={option.id + option.value} value={option.id}>{option.value}</option>)}
        </select>
        {error && <span className='error-message'>{error}</span>}
    </React.Fragment>

}

export default Select;