import axios from 'axios';

export const fetchPokemon = (currentPage) => async dispatch => {
    const pokemonPerPage = 15;
    const offset = (currentPage - 1) * pokemonPerPage;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}&offset=${offset}`)
    const pokemon = response.data.results;
    await Promise.all(
        pokemon.map(async (p, i) => {
            const { data: pokemonDetail } = await axios.get(p.url)
            // get the location for each encounter, and add to 'encounter' object
            pokemon[i].id = pokemonDetail.id;
            pokemon[i].img = pokemonDetail.sprites.other['official-artwork'].front_default;
        })
    )
    dispatch({ type: 'FETCH_POKEMON', payload: pokemon })
};
