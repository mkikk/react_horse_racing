import React, {useState} from 'react';
import PropTypes from 'prop-types';

import RaceForm from './forms/RaceForm';
import BetForm from './forms/BetForm';
import CreateRaceForm from './forms/CreateRaceForm';
import AddHorsesForm from './forms/AddHorsesForm';

export default function Header({horses, races, onRegisterHorses, onCreateRace, onAddHorsesToRace, onAddBet}) {
const [isDisplayHorse, setIsDisplayHorse] = useState(false);
  const [isDisplayRace, setIsDisplayRace] = useState(false);
  const [isDisplayCompete, setIsDisplayCompete] = useState(false);
  const [isDisplayBet, setIsDisplayBet] = useState(false);

  const addHorse = () => {
    setIsDisplayHorse(!isDisplayHorse);
  }

  const addRace = () => {
    setIsDisplayRace(!isDisplayRace);
  }
  const makeRace = () => {
    setIsDisplayCompete(!isDisplayCompete);
  }

  const createBet = () => {
    setIsDisplayBet(!isDisplayBet);
  }

  const onRegisterHorsesHandler = (horses) => {
    setIsDisplayHorse(false);
    onRegisterHorses(horses);
  }

  const onCreateRaceHandler = (race) => {
    setIsDisplayRace(false);
    onCreateRace(race);
  }

  const onAddHorsesToRaceHandler = (competition) => {
    setIsDisplayCompete(false);
    onAddHorsesToRace(competition);
  }

  const onAddBetHandler = (bet) => {
    setIsDisplayBet(false);
    onAddBet(bet);
  }

  return (
    <section className="header">
        <header className="headerNav">
            <h1>Welcome to competition manager</h1>
            <button onClick={addHorse}>+ Create horse</button>
            <button onClick={addRace}>+ Create race</button>
            <button onClick={makeRace}>+ Add horses to race</button>
            <button onClick={createBet}>+ Make bet</button>
        </header>
        <div className="forms">
            {
            isDisplayHorse &&
            <AddHorsesForm onRegisterHorses={onRegisterHorsesHandler}/>
            }
            {
            isDisplayRace && 
            <RaceForm onSubmit={onCreateRaceHandler} />
            }
            {
            isDisplayCompete &&
            <CreateRaceForm 
              horses={horses}
              races={races.filter(race => race.participants.length == 0).map(race => race)}
              onSubmit={onAddHorsesToRaceHandler}
            />
            }
            {
            isDisplayBet && 
            <BetForm 
              horses={horses}
              races={races.filter(race => race.bet == -1).map(race => race)}
              onSubmit={onAddBetHandler}
            /> 
            }
        
      </div>
    </section>
  )
}

Header.propTypes = {
    onRegisterHorses: PropTypes.func,
    onCreateRace: PropTypes.func,
    onAddHorsesToRace: PropTypes.func,
    onAddBet: PropTypes.func
}