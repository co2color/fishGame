<template>
  <div>
    <h1>Tic Tac Toe</h1>
    <div class="board">
      <div v-for="(cell, index) in board" :key="index" @click="makeMove(index)">
        {{ cell }}
      </div>
    </div>
    <button @click="resetBoard">Reset</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 300px;
}

.board div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 24px;
}
</style>
