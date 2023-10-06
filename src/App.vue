<script setup lang="ts">
import { Chart } from "./lib/Chart";

let chart = new Chart();
let blocks = chart.blocks;
let arrows = chart.arrows;

console.log(blocks);

// .future -> go down
// .past -> go up
// .branchLeft -> go left
// .branchRight -> go right
</script>

<template>Hello World</template>

<style lang="stylus"></style>
./lib/Chart
