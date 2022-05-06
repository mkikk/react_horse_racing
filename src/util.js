/**
 * @param Array Array of horses competing in this race
 * @returns Array of place results for each competing horse in horse start order
 */
export const race = (horses) => {
    const lastPlace = horses.length;
    const results = new Set();
    while (results.size < lastPlace) {
        results.add(Math.floor(Math.random() * (lastPlace)) + 1);
    }
    return Array.from(results);
}