import React , {useState} from 'react';
import PropTypes from 'prop-types';

/**
 * CHECK THAT DUPLICATES COULDN'T HAPPEN
 */
export default function CreateRace({horses, races, onSubmit}) {

  const [participants, setParticipants] = useState([]);
  const [selectedRace, setSelectedRace] = useState("empty");
  
  const [error, setError] = useState(false);

  const addHorses = (e) => {
    e.preventDefault();
  
    if (participants.length < 2) {
      setError(true);
      setParticipants([]);
    }
    else {
      setError(false);
      const competition = {race:selectedRace, participants:participants}
      onSubmit(competition);
      setParticipants([]);
      setSelectedRace("empty");
    }
  }

  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value);
  }
  const handleHorsesChange = (event) => {
    const horseID = event.target.value;
    horses.filter(horse => horse.id == horseID)
    .map(horse => {
      if (!participants.includes(horse.id)) {
      setParticipants(participants.concat(horse.id));
      }
    })
    
  }
  return (
    <div >
    {
      error && 
      <div className="errorNotEnoughHorses">
      <h3>RACE MUST HAVE AT LEAST 2 PARTICIPATING HORSES</h3>
      </div>
    }
    { 
    races.length === 0 ? <h2>To add horses first create a race</h2> :
    horses.length === 0 ? 
    <div>
    <h2>No horses available to add</h2>
    <p> Need atleast 2 horses to create race.</p>
    </div> :
    <div className="raceForm">
        <h2>Select race</h2>
        <select value={selectedRace} onChange={handleRaceChange}>
          {selectedRace=="empty" && <option key="empty" value="empty"></option>}
          {races.filter(race => race.result == null).map((race) => {
              return <option key={race.id} value={race.id}>
                      {race.name}, {race.place}, {race.time}
                      </option>
          })}
        </select>
    </div>
    }

    {
    selectedRace != "empty" &&
    <form className="raceForm" onSubmit={addHorses}>
      <h3>Available horses</h3>
      {horses.map((horse) => {
              return  <label key={horse.id}>
                        <input type="checkbox"  name="horse" value={horse.id} onChange={handleHorsesChange} />
                        Horse: {horse.name}, Color: {horse.color} 
                      </label>
      })}
      <input className="btn" type="submit" value="Register horses" />
      <input className="btn" type="reset"/>
    </form>
    }
    </div>
  )
}

CreateRace.propTypes = {
  onSubmit: PropTypes.func,
  races: PropTypes.array,
  horses: PropTypes.array,
}