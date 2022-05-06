import React, { useEffect } from 'react'
import PropTypes from 'prop-types';


export default function Bet({bet, races, horses, onRemoveBet}) {

  const getRace = (bet) => {
    return races.filter( race => race.id == bet.race).map(race => race.name);
  }
  const getHorse = (bet) => {
    return horses.filter( horse => horse.id == bet.horse).map(horse => horse)[0];
  }
  const horse = getHorse(bet);
  return (
    <div className="bet">  
      <div >
        <p>Race: {getRace(bet)}</p>
        <p>Horse name: {horse.name}, color: {horse.color}</p>
        {bet.winner != null && 
        <p><strong>{bet.winner == true ? "WIN" : "LOST"}</strong> </p>}
      </div>
      <button onClick={() => onRemoveBet(bet.id)}>Delete Bet</button>
    </div>
  )
}

Bet.propTypes = {
  races: PropTypes.arrayOf(PropTypes.object),
  horses: PropTypes.arrayOf(PropTypes.object),
  bet: PropTypes.object,
  onRemoveBet: PropTypes.func
}
