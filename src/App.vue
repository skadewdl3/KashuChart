<script setup lang="ts">
import { onMounted, ref } from "vue";
import { parse } from "smol-toml";
import { fabric } from "fabric";
import { useElementSize } from '@vueuse/core'

const code = ref(`start.start.text = 'Start'
proc.step1.text = 'Step 1'

[cond.decision]
text = 'Decision'
yesDir = 'down'
yesText = 'Yes'
noDir = 'left'
noText = 'No'

proc.step2.text = 'Step 2'
stop.end.text = 'End'

join = [
  'start->step1->decision.yes->end',
  'decision.no->step1'
] `);

const canvasEl = ref(null);
const codeEl = ref(null);
const width = ref(0)
const height = ref(0)

onMounted(() => {
  // @ts-ignore
  width.value = parseFloat(getComputedStyle(document.querySelector('.code-container')).width.replace('px', ''))
  // @ts-ignore
  height.value = parseFloat(getComputedStyle(document.querySelector('.code-container')).height.replace('px', ''))
  const canvas = new fabric.Canvas(canvasEl.value);
  canvas.setDimensions({
    width: width.value,
    height: height.value
  })
  const rect = new fabric.Rect({
    fill: "red",
    width: 200,
    height: 200,
  });
  canvas.add(rect)

});

const convert = () => {
  console.log(parse(code.value));
};
</script>

<template>
  <div class="hero w-screem min-h-screen bg-base-200">
    <div class="hero-content text-center w-full h-full grid grid-cols-2">
      <div class="code-container w-full flex items-center justify-between flex-col">
        <h1 class="text-5xl my-8 font-bold">KashuChart</h1>
        <textarea
          class="w-full min-h-[20rem] text-xl textarea my-8 textarea-primary"
          v-model="code"
          placeholder="Code"
        ></textarea>
        <button @click="convert" class="btn my-8 btn-primary">Convert!</button>
      </div>
      <canvas class="fabric-canvas" ref="canvasEl"></canvas>
    </div>
  </div>
</template>

<style lang="stylus"></style>
./lib/Chart
