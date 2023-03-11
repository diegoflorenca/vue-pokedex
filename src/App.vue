<script setup>
import { ref, onMounted, computed } from 'vue';

const pokemonList = ref([]);
const filteredPokemonText = ref([]);

const filteredPokemonList = computed(() => pokemonList.value.filter((pokemon) => pokemon.pokemon_species.name.includes(filteredPokemonText.value)));

onMounted(async () => {
	const pokeData = await fetch('http://pokeapi.co/api/v2/pokedex/2/').then((response) => response.json());
	pokemonList.value = pokeData.pokemon_entries;
});
</script>

<template>
	<div>
		<h1>Pokedex</h1>
		<p>{{ filteredPokemonText }}</p>
		<input type="text" v-model="filteredPokemonText" />
		<ul>
			<li v-for="pokemon in filteredPokemonList" :key="`poke-${pokemon.entry_number}`">
				{{ pokemon.pokemon_species.name }}
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
