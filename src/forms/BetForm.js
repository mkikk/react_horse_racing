import React, {useState} from 'react';
import { raceCreated } from '../actions/Actions';


export default function BetForm({horses, races, onSubmit}) {
    const [displayRace, setDisplayRace] = useState(-1);
    const [selectedHorse, setSelectedHorse] = useState(-1);
    const [error, setError] = useState(false);

    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        if(selectedHorse == -1) {
            setError(true);
            return;
        }
        onSubmit({race:displayRace, horse: selectedHorse});
        setDisplayRace(-1);
        setSelectedHorse({});
    }

    const getHorseData = (id) => {
        return horses.filter(horse => horse.id == id).map(horse =>  {
            return horse;
        })
    }

    const handleRaceChange = (e) => {
        e.preventDefault();
        const newVal = e.target.value;
        setDisplayRace(newVal);
    }

    return (
        <div className="raceForm">
            {error && <h2>Place your bet</h2>}
            {races.length === 0 ? 
            <h2>No races available</h2> : (
                <div>
                    <h3>Make your bet </h3> 
                    <p>You can only make one bet per race!</p> 
                </div>
            )}
            
            <select value={displayRace} onChange={handleRaceChange}>
            {displayRace==-1 && <option key="empty" value="nan"></option>}
            {races.filter(race => race.bet==-1).map((race) => {
                return <option key={race.id} value={race.id}>
                        {race.name}, {race.place}, {race.time}
                        </option>
            })}
            </select>
            
            <form onSubmit={onSubmitHandler}>
                <h2>Participating horses:</h2>
                <div className="raceForm">
                    { 
                    races.filter(race => race.id == displayRace).map((race) => {
                                return race.participants.map((horseID) => {
                                {const horse = getHorseData(horseID)[0]
                                    return <label key={horseID}>
                                                <input 
                                                    key={horseID}
                                                    type="radio"
                                                    name="horse"
                                                    className="betInput"
                                                    value={horseID}
                                                    onChange={() => setSelectedHorse(horseID)} 
                                                />
                                                {horse.name}, {horse.color}
                                            </label>
                                }
                            })
                        })[0]   
                    }
                </div>
                <input hidden={selectedHorse==-1} className="btn" type="submit" value="BET"/>
            </form>
        </div>
  )
}
