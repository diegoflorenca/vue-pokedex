<script>
export default {
	async mounted() {
		const pokeData = await fetch('http://pokeapi.co/api/v2/pokedex/2/').then((response) => response.json());
		this.pokemonList = pokeData.pokemon_entries;
	},
	data: () => ({
		pokemonList: [],
	}),
};
</script>

<template>
	<div>
		<h1>Pokedex</h1>
		<ul>
			<li v-for="pokemon in pokemonList" :key="`poke-${index}`">
				{{ pokemon.pokemon_species.name }}
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
