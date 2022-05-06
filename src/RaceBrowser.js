import React, {useState} from 'react'
import Race from './Race';

export default function RaceBrowser({races, horses, compete}) {

  const [displayedRace, setDisplayedRace] = useState('empty');

  return (
    <div>
        {races.length != 0 &&
          <h2>Select race:</h2> && 
          <select value={displayedRace} onChange={(event) => setDisplayedRace(event.target.value)}>
            {displayedRace=='empty' && <option key='empty' value='empty'></option>}
            {races.map((race) => {
                return <option key={race.id} value={race.id}>
                        {race.name}, {race.place}, {race.time}
                        </option>
            })}
          </select>
        }
        {
          displayedRace != 'empty' && 
          <Race
            key={displayedRace}
            race={races.filter(race => race.id == displayedRace).map(race => race)[0]}
            horses={horses}
            compete={compete}
            />
        }
    </div>
  )
}
