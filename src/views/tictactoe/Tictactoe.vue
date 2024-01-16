<script lang="ts" setup>
import { ref } from 'vue'

function getInitBoard() {
  return new Array(9).fill('')
}

const board = ref(getInitBoard())

// 定义当前玩家
const currentPlayer = ref('X')

const message = ref('')

function makeMove(index: number) {
  // 如果当前格子已经有值或者已经有人赢了，就不允许再走了
  if (board.value[index] || message.value) {
    return
  }

  board.value[index] = currentPlayer.value

  if (checkWin()) {
    message.value = `${currentPlayer.value} win!`
    return
  }

  // 如果满了，就平局结束
  if (board.value.every((item) => item)) {
    message.value = '平局...'
    return
  }

  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}
function resetBoard() {
  board.value = getInitBoard()
  currentPlayer.value = 'X'
  message.value = ''
}

function checkWin() {
  const winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // 横
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // 竖
    [0, 4, 8],
    [2, 4, 6], // 斜
  ]
  return winArr.some((item) => {
    const [a, b, c] = item
    return (
      board.value[a] &&
      board.value[a] === board.value[b] &&
      board.value[a] === board.value[c]
    )
  })
}
</script>

<template>
  <!-- 居中 -->
  <div class="w-full flex flex-col justify-center items-center">
    <h1 class="py-4">{{ message || `当前该${currentPlayer}走` }}</h1>
    <div class="board">
      <div v-for="(cell, index) in board" :key="index" @click="makeMove(index)">
        {{ cell }}
      </div>
    </div>
    <button class="pt-4" @click="resetBoard">Reset</button>
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
