import React, {useState} from 'react'
import HorseForm from './HorseForm';

export default function AddHorsesForm({onRegisterHorses}) {
    const [horses, setHorses] = useState([]);

    const onAddHorse = (horse) => {
        setHorses(horses => [...horses, horse]);
    }
    const onRegister = (e) => {
        e.preventDefault();
        onRegisterHorses(horses);
        setHorses([]);
    }
    return (
    <div className="raceForm">
        <h2> Register horses to competition: </h2>
        <div >
            
            {
                horses.map((horse, horseIdx) => {
                    return <p key={horseIdx}>Name: {horse.name} Color: {horse.color}</p>
                })
            }
            
            <button 
                hidden={horses.length===0}
                onClick={onRegister}
            >
                Register Horses
            </button>
        </div>
        <div className="newHorseRegistration">
            <HorseForm addHorse={(horse) => onAddHorse(horse) }/>
        </div>
    </div>
    )
}
