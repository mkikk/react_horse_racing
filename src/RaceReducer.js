import {
    HORSE_CREATED,
    RACE_CREATED,
    RACE_FROM_SERVER,
    BET_CREATED,
    BET_REMOVED,
    HORSES_RACING,
    RACE_RESULTS,
    HORSES_ADDED_FAILED,
    RACE_ADDED_FAILED,
} from './actions/Actions'

export const initWidgets = {
    horses: [],
    races: [],
    bets: [],
    error: null,
}

export const reducer = (state, action) => {
    switch(action.type) {
        case HORSE_CREATED:
            return addHorse(state, action.payload);
        case RACE_CREATED:
            return addRace(state, action.payload);
        case HORSES_RACING:
            return addHorsesToRace(state, action.payload);
        case BET_CREATED:
            return addBet(state, action.payload);
        case BET_REMOVED:
            return removeBet(state, action.payload);
        case RACE_RESULTS:
            return raceResults(state, action.payload);
            return state
        }
}

const nextWidgetId = (widgets) => {
    const maxId = widgets.reduce((maxId, widget) => Math.max(widget.id, maxId), -1);
    return maxId + 1
};

const initHorse = (name, color, {horses}) => ({
    id: nextWidgetId(horses),
    name: name,
    color: color
});


const initRace = (race, {races}) => ({
    id: nextWidgetId(races),
    name: race.name,
    place: race.place,
    time: race.time,
    participants: [],
    result: null,
    bet: -1
});

const initBet = (bet, {bets}) => ({
    id: nextWidgetId(bets),
    race: bet.race,
    horse: bet.horse,
    winner: null
})

const addHorse = (state, {horse}) => {
    const newHorse = initHorse(horse.name, horse.color,state);
    return {
        ...state,
        horses: [
            ...state.horses,
            newHorse
        ],
    }
}

const addRace = (state, {race}) => {
    const newRace = initRace(race,state);
    return {
        ...state,
        races: [
            ...state.races,
            newRace
        ],
        
    }
}

const addHorsesToRace = (state, {competition}) => ({
    ...state,
    races: state.races.map(race => {
       
        if (race.id != competition.race) {
            return race
        }
        return {
            ...race, 
            participants: competition.participants,
            result: null,
            bet: -1
        }
    })
})

const addBet = (state, {bet}) => {
    const newBet = initBet(bet,state);
    return {
        ...state,
        bets: [
            ...state.bets,
            newBet
        ],
        races: state.races.map(race => {
            if (race.id != bet.race) {
                return race;
            }
            return {
                ...race,
                bet: newBet
            }
        })
    }
}


const removeBet = (state, {betID}) => ({
    ...state,
    bets: state.bets.filter(bet => bet.id !== betID),
    races: state.races.filter(race => race.bet.id != betID),

})

const raceResults = (state, {results}) => ({
    ...state,
    races: state.races.map(race =>{
        if (race.id != results.race){
            return race;
        }
        return {
            ...race,
            result: results.result,
            bet: {...race.bet,
                    winner: race.bet.horse==results.result.filter(participant => participant.place == 1)
                                                        .map(champion => champion.id)        
            }
        }
    }), 

    bets: state.bets.map(bet => {
        if (bet.race != results.race) {
            return bet;
        }
        const championHorse = results.result.filter(horse => horse.place == 1).map(horse => horse.id);
        return {
            ...bet,
            winner: (championHorse == bet.horse)
        }
    }) 
})
