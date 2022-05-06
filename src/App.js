import React, {useReducer, useState, useEffect} from 'react';

import Bet from './Bet';
import Race from './Race';
import Header from './Header';
import RaceBrowser from './RaceBrowser';

import './styles/App.scss';

import {reducer, initWidgets} from './RaceReducer';
import {
  horseCreated,
  raceCreated,
  betCreated,
  betRemoved,
  addHorsesToRace, 
  raceResults,
} from './actions/Actions';

export default function App() {

  const [state, dispatch] = useReducer(reducer, initWidgets);

  const showHorses = (horses) => {
    horses.forEach(horse => {
      dispatch(horseCreated(horse));
    })
  }

  const createRace = (race) => {
    dispatch(raceCreated(race));
  }

  const showRaceCreator = (competition) => {
    dispatch(addHorsesToRace(competition));
  }

  const showBet = (bet) => {
    dispatch(betCreated(bet));
  }

  
  const onCompeteHandler = (result) => {
    dispatch(raceResults(result))
  }

  const onRemoveBetHandler = (betID) => {
    dispatch(betRemoved(betID));
  }

  return (
    <div className="App">
      <Header
        horses={state.horses}
        races={state.races}
        onRegisterHorses={showHorses}
        onCreateRace={createRace}
        onAddHorsesToRace={showRaceCreator}
        onAddBet={showBet}
      />

      <section >
        {state.bets.length !== 0 && <h2>My bets:</h2>}
        <div className="betList">
        {
          state.bets.map((bet) => 
          <Bet
            key={bet.id}
            bet={bet}
            races={state.races.filter(race => race.participants.length != 0).map(race => race)}
            horses={state.horses}
            onRemoveBet={onRemoveBetHandler} />
            )}
        </div>
      </section>
      <section className="raceList">
      <h2>See available races</h2>
        {state.races.length == 0 && <h3> No races created </h3>}
        {state.races.filter(race => race.participants.length == 0).map(race => {
            return <p key={race.id}>Race: {race.name}, place: {race.place}, time: {race.time}</p>
        })}
      <RaceBrowser 
        races={state.races.filter(race => race.participants.length != 0).map(race => race)}
        horses={state.horses}
        compete={onCompeteHandler}
      />
      </section>
    </div>
  );
}
