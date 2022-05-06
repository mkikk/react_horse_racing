import React, { useState } from 'react';

export default function HorseForm({ addHorse }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onColorChange = (e) => {
    setColor(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addHorse({ name, color });
    setName('');
    setColor('');
  };
  return (
    <form >
      <div className="raceForm">
        <label>
          Enter horse name:
          <input type="text" placeholder="Name" value={name} onChange={onNameChange} />
        </label>
        <label>
          Enter color:
          <input
            placeholder="Color"
            type="text"
            value={color}
            onChange={onColorChange}
          />
        </label>
      <button
        disabled={name.length === 0 || color.length === 0}
        type="submit"
        className="widget__button green"
        onClick= {onSubmitHandler}
      >
        Submit horse
      </button>
      </div>
    </form>
  );
}
