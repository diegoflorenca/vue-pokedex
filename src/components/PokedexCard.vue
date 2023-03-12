<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
	name: {
		type: String,
		required: true
	},
	id: {
		type: Number,
		required: true
	}
});
</script>

<template>
	<li>{{ id }} - {{ name }}</li>
</template>

<style scoped></style>
