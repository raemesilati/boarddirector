import { useEffect, useState, useRef } from "react"

export const MultiSelect = ({ categories, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value) => {
    const updatedSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((selectedValue) => selectedValue !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedSelectedValues);
  };

  const confirmSelection = () => {
    onChange(selectedValues);
    setIsOpen(!isOpen);

  }
  return (
    <div className="multi-select" ref={dropdownRef}>
      <button className="selected-values" onClick={toggleDropdown}>
        {selectedValues.length > 0 ? selectedValues.join(', ') : 'Select Options'}
        <img src="/images/arrow.svg" alt="arrow" />
      </button>
      {isOpen && (
        <div className="dropdown">
          <ul>
            {categories.map((category) => (
              <li key={category.idCategory}>
                <label key={category.idCategory}>
                  <input
                    type="checkbox"
                    value={category.strCategory}
                    checked={selectedValues.includes(category.strCategory)}
                    onChange={() => handleCheckboxChange(category.strCategory)}
                  />
                  {category.strCategory}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={confirmSelection}>Confirm</button>
        </div>
      )}
    </div>
  );
} 