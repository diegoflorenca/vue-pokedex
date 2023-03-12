<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import PokedexCard from './components/PokedexCard.vue';

const filteredPokemonText = ref([]);

const paginationStore = reactive({
	start: 0,
	end: computed(() => paginationStore.start + 10)
});

const turnNextPage = () => {
	paginationStore.start += 10;
	getPokedexEntries();
};

const turnPreviousPage = () => {
	paginationStore.start -= 10;
	getPokedexEntries();
};

const getPokedexEntries = async () => {
	const pokeData = await fetch('/.netlify/functions/pokedex/pokedex.js', {
		method: 'POST',
		body: JSON.stringify({
			start: paginationStore.start,
			end: paginationStore.end
		})
	}).then((response) => response.json());
	pokemonStore.list = pokeData;
};

const pokemonStore = reactive({
	list: [],
	filterePokemonList: computed(() =>
		pokemonStore.list.filter((pokemon) => pokemon.name.includes(filteredPokemonText.value))
	)
});

onMounted(() => {
	getPokedexEntries();
});
</script>

<template>
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
	<button v-if="paginationStore.start > 0" @click="turnPreviousPage">Previous Page</button>
	<button v-if="paginationStore.end < 151" @click="turnNextPage">Next Page</button>
</template>

<style scoped></style>
