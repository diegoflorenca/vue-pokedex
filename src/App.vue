<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import PokedexCard from './components/PokedexCard.vue';

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
		<p>Filtered: {{ pokemonStore.filterePokemonList.length }}</p>
		<input type="text" v-model="filteredPokemonText" />
		<ul>
			<PokedexCard
				v-for="(pokemon, index) in pokemonStore.filterePokemonList"
				:key="`poke-${index}`"
				:number="pokemon.entry_number"
				:name="pokemon.pokemon_species.name"
			/>
			<!-- {{ pokemon.pokemon_species.name }}
			</PokedexCard> -->
		</ul>
	</div>
</template>

<style scoped></style>
