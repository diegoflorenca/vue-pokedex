const handler = async (event, context) => {
	try {
		const pokeApiData = await fetch('http://pokeapi.co/api/v2/pokedex/2/').then((response) =>
			response.json()
		);

		const { start, end } = JSON.parse(event.body);

		let finalResult = [];

		const pokeData = pokeApiData.pokemon_entries
			? pokeApiData.pokemon_entries.map((pokemon) => {
					const pokemonName =
						pokemon.pokemon_species.name[0].toUpperCase() +
						pokemon.pokemon_species.name.substring(1);
					return {
						id: pokemon.entry_number,
						name: pokemonName
					};
			  })
			: [];

		finalResult = pokeData.slice(start, end);

		return {
			statusCode: 200,
			body: JSON.stringify(finalResult)
		};
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};

module.exports = { handler };
