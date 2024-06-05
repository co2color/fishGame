<script lang="ts" setup>
import { ref } from 'vue'

function getInitBoard() {
  return Array.from({ length: 9 }).fill('') as string[]
}

interface IHistory {
  board: string[]
  currentPlayer: string
  uid: string
}

// 随机生成字符串
function randomString() {
  return Math.random().toString(36).slice(2)
}

const historyList = ref([] as IHistory[])

const board = ref(getInitBoard())

// 定义当前玩家
const currentPlayer = ref('X')

const message = ref('')

function makeMove(index: number) {
  // 如果当前格子已经有值或者已经有人赢了，就不允许再走了
  if (board.value[index] || message.value)
    return

  // 下棋
  board.value[index] = currentPlayer.value

  // 如果有胜负
  if (checkWin()) {
    message.value = `${currentPlayer.value} win!`
  }
  // 如果平局
  else if (board.value.every(item => item)) {
    message.value = '平局...'
  }
  // 切换玩家
  else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    historyList.value.push({
      board: board.value.slice(),
      currentPlayer: currentPlayer.value,
      uid: randomString(),
    })
  }
}
function resetBoard() {
  board.value = getInitBoard()
  currentPlayer.value = 'X'
  message.value = ''
  historyList.value = []
}

function goToStep(uid: string) {
  const findIndex = historyList.value.findIndex(item => item.uid === uid)
  const { board: newBoard, currentPlayer: newCurrentPlayer }
    = historyList.value[findIndex]
  board.value = [...newBoard]
  currentPlayer.value = newCurrentPlayer
  message.value = ''
  historyList.value = historyList.value.slice(0, findIndex + 1)
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
      board.value[a]
      && board.value[a] === board.value[b]
      && board.value[a] === board.value[c]
    )
  })
}
</script>

<template>
  <div>
    <h1 class="py-4 text-center">
      {{ message || `当前该${currentPlayer}走` }}
    </h1>
    <div class="flex w-full justify-center">
      <div class="flex flex-col justify-center items-center">
        <div class="board">
          <div
            v-for="(cell, index) in board"
            :key="index"
            @click="makeMove(index)"
          >
            {{ cell }}
          </div>
        </div>
        <button class="pt-4" @click="resetBoard">
          Reset
        </button>
      </div>
      <div class="flex items-start flex-col ml-4 w-60">
        <button
          v-for="(item, index) in historyList"
          :key="item.uid"
          class="mt-1 p-2 button"
          @click="goToStep(item.uid)"
        >
          go to step {{ index + 1 }}
        </button>
      </div>
    </div>
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
.button {
  border: 1px solid rgb(173, 172, 172);
  cursor: pointer;
  font-size: 14px;
  border-radius: 10px;
  transition: all 0.2s;
}
.button:hover {
  background-color: rgb(173, 172, 172);
  color: white;
}
</style>
