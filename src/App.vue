<script setup>
import { reactive, ref, onMounted, computed } from 'vue';

const filteredPokemonText = ref([]);

const pokemonStore = reactive({
	list: [],
	filterePokemonList: computed(() =>
		pokemonStore.list.filter((pokemon) =>
			pokemon.pokemon_species.name.includes(filteredPokemonText.value)
		)
	)
});

onMounted(async () => {
	const pokeData = await fetch('http://pokeapi.co/api/v2/pokedex/2/').then((response) =>
		response.json()
	);
	pokemonStore.list = pokeData.pokemon_entries;
});
</script>

<template>
	<div>
		<h1>Pokedex</h1>
		<p>Filtered Text: {{ filteredPokemonText }}</p>
		<input type="text" v-model="filteredPokemonText" />
		<ul>
			<li v-for="(pokemon, index) in pokemonStore.filterePokemonList" :key="`poke-${index}`">
				{{ pokemon.pokemon_species.name }}
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
