export const getRickandMorty = async (count: number) => {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/character?limit=${count}`).then(res => res.json());
        return data.results.slice(0, count); 
    } catch (error) {
        console.error(error);
    }
};