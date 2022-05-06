import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {race as haveRace} from './util';
import { raceResults } from './actions/Actions';

/**
 * display race details
 * display participants
 * mark user bet
 * compete button (visible if competition isnt held yet)
 * display race results
 */

export default function Race({race, horses, compete}) {

  
  const getDetails = (horseID) => {
    return horses.filter(x => x.id == horseID ).map(horse => horse)[0];
  }

  const startRace = () => {
    const res = haveRace(race.participants);
    const result =race.participants.map(horseID => ( 
        {id:horseID, place:res.pop()}))
    compete({race: race.id, result});
  }

  return (
    <div>
      <h3>{race.name} at {race.place} on {race.time}</h3>
      {race.result != null && <h4>COMPETITION OVER</h4>}
      <p>Participants: </p>
      
        {race.participants.map(horseID => {
            const horse = getDetails(horseID)
            return <p key={horseID}>
                      Name: {horse.name}, color: {horse.color}{horseID == race.bet.horse ? <span>, <strong>MY BET</strong></span> : ""} 
                      {race.bet.winner != null && race.result.filter(participant => participant.id == horseID).map(participant => {
                        if (participant.place == 1) {
                          return ', result: Champion'
                        }
                        return `, place: ${participant.place}` 
                        
                      })}
                  </p>
            }
        )}
  
      <button hidden={race.bet == -1 || race.result != null} onClick={startRace}>COMPETE</button>
    </div>
  )
}

Race.propTypes = {
    race: PropTypes.object,
    compete: PropTypes.func
}