<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import PokedexCard from './components/PokedexCard.vue';

const filteredPokemonText = ref([]);
const pokemonStore = reactive({
	list: [],
	filterePokemonList: computed(() =>
		pokemonStore.list.filter((pokemon) => pokemon.name.includes(filteredPokemonText.value))
	)
});

onMounted(async () => {
	const pokeData = await fetch('/.netlify/functions/pokedex/pokedex.js').then((response) =>
		response.json()
	);
	console.log(pokeData);
	pokemonStore.list = pokeData;
});
</script>

<template>
	<div>
		<h1>Pokedex</h1>
		<p>Filtered: {{ pokemonStore.filterePokemonList.length }}</p>
		<input type="text" v-model="filteredPokemonText" />
		<ul>
			<PokedexCard
				v-for="(pokemon, index) in pokemonStore.filterePokemonList"
				:key="`poke-${index}`"
				:id="pokemon.id"
				:name="pokemon.name"
			/>
		</ul>
	</div>
</template>

<style scoped></style>
