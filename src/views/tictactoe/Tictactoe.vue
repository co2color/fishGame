<script lang="ts" setup>
import { ref } from 'vue'

const board = ref(new Array(9).fill(''))

// 定义当前玩家
const currentPlayer = ref('X')

function makeMove(index: number) {
  board.value[index] = currentPlayer.value
  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}
function resetBoard() {}
</script>

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
