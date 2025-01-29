import { useState } from "react";

const WheelsFilterToolbox = ({ selected, updateFilter }) => {
    const [checked, setChecked] = useState(selected === 'true');

    const toggleCheckbox = () => {
      const newChecked = !checked;
      setChecked(newChecked);
      updateFilter(newChecked ? true : false);
    }

    return (
        <div className="filter-boxes__wheels d-flex align-items-center">
        <p>Wheels</p>
        <label className="switch">
          <input type="checkbox" checked={checked} onChange={toggleCheckbox}/>
          <span className="slider round"></span>
        </label>
      </div>
    )
}

export default WheelsFilterToolbox;