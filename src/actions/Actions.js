export const HORSE_CREATED = 'HORSE_CREATED';
export const horseCreated = (horse) => ({
    type: HORSE_CREATED,
    payload: {horse}
});

export const RACE_CREATED = 'RACE_CREATED';
export const raceCreated = (race) => ({
    type: RACE_CREATED,
    payload: {race}
});

export const HORSES_RACING = 'HORSES_RACING';
export const addHorsesToRace = (competition) => ({
    type: HORSES_RACING,
    payload: {competition}
})

export const BET_CREATED = 'BET_CREATED';
export const betCreated = (bet) => ({
    type: BET_CREATED,
    payload: {bet}
});


export const BET_REMOVED = 'BET_REMOVED';
export const betRemoved = (betID) => ({
    type: BET_REMOVED,
    payload: {betID}
});

export const RACE_RESULTS = 'RACE_RESULTS';
export const raceResults = (results) => ({
    type: RACE_RESULTS,
    payload: {results}
})