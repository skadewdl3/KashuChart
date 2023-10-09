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
  width.value = parseFloat(getComputedStyle(document.querySelector('.code-container')).width.replace('px', '')) - 100
  // @ts-ignore
  height.value = parseFloat(getComputedStyle(document.querySelector('.content')).height.replace('px', ''))
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
  <div class="w-screen  h-screen bg-base-200 flex flex-col items-center">
    <div class="content text-center w-full min-h-full grid grid-cols-[1fr_2fr]">
      <div class="code-container mx-4 w-full h-full flex items-center justify-between flex-col">
        <textarea
          class="w-full h-full text-xl textarea my-8 textarea-primary"
          v-model="code"
          placeholder="Code"
        ></textarea>
        <button @click="convert" class="btn my-8 btn-primary">Convert!</button>
      </div>
      <div class="fcanvas-container mx-4 flex items-center justify-center ">
        <canvas class="fabric-canvas" ref="canvasEl"></canvas>
      </div>
    </div>
  </div>
</template>

<style lang="stylus"></style>
./lib/Chart
