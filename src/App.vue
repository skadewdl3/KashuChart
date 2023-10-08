<script setup lang="ts">
import { Chart } from "./lib/Chart";

let chart = new Chart();
let blocks = chart.blocks;
// let arrows = chart.arrows;

console.log(blocks);

/*
Syntax:

[variable] = [block](text){
  branch1: dir1
  branch2: dir2
  prop1: val1
  prop2: val2
}

join {
  [var1]->[var2]
  [var2].yes->[var3]
  

}


*/


</script>

<template>

  <textarea class="text-4xl"></textarea>
</template>

<style lang="stylus"></style>
./lib/Chart
