import React from 'react';

const TextArea = ({ name, placeholder, cols, rows, value, onChange, limit, error, required }) => {
    return <React.Fragment>
        <textarea name={name} id={name} cols={cols} rows={rows} placeholder={placeholder} onChange={onChange} value={value} maxLength={limit} className={error && "error-input"} required={required}></textarea>
        <div>{error && <span className='error-message'>{error}</span>}</div>
        {limit ? <span className='text-area-limit'>{value.length}/{limit}</span> : null}
    </React.Fragment>
}

export default TextArea;