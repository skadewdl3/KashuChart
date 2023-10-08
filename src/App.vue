<script setup lang="ts">
import { ref } from 'vue';
import Lexer from './lib/Lexer';

const code = ref(`if = cond(Some Condition) {
  yes: down
  no: left
}

st = start(Algorithm Starts)

ed = stop(ALgorithm Stops)

join {
  st-(Hello World)->ed
}
`)

const lexer = new Lexer()

const convert = () => {
  lexer.setCode(code.value)
  console.log(lexer.lex())
  // customExtract('if = cond(Some Condition)', '(', ')')
  // console.log(customSplit('if\n(Hello\nWorld)\nhi', '\n', '(', ')'))
}

</script>

<template>

  <div class="hero w-screem min-h-screen bg-base-200">
  <div class="hero-content text-center w-full h-full">
    <div class="w-full flex items-center justify-between flex-col">
      <h1 class="text-5xl my-8 font-bold">KashuChart</h1>
      <textarea class=" w-full min-h-[20rem] text-xl textarea my-8 textarea-primary" v-model="code" placeholder="Code"></textarea>
      <button @click="convert" class="btn my-8 btn-primary">Convert!</button>
    </div>
  </div>
</div>
</template>

<style lang="stylus"></style>
./lib/Chart
