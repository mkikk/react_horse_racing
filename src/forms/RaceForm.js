import React, {useState} from 'react'

export default function RaceForm({onSubmit}) {
    const [race, setRace] = useState('');
    const [place, setPlace] = useState('');
    const [time, setTime] = useState('');
    const onRaceChange = (e) => {
        setRace(e.target.value);
    }
    const onPlaceChange = (e) => {
        setPlace(e.target.value);
    }
    const onTimeChange = (e) => {
        setTime(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmit({name:race,place:place,time:time});
        setRace('');
        setPlace('');
        setTime('');
    }
    return (
        
        <form  onSubmit={onSubmitHandler}>
            <div className="raceForm">
                <h2>Create new horse race: </h2> 
                
                <label>
                Race name
                <input type="text" onChange={onRaceChange}/>
                </label>
                <label>
                Race place
                <input type="text" onChange={onPlaceChange}/>
                </label>
                <label>
                Race time
                <input type="date" onChange={onTimeChange}/>
                </label>
                
                <button
                    disabled={race.length === 0 || place.length === 0 || time.length === 0}
                    type="submit"
                >
                    Create race
                </button>
            </div>
        </form>
    )       
}
