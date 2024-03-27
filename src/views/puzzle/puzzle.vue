<script lang="ts" setup>
import { shuffle } from 'lodash-es'
import { reactive } from 'vue'

function randomize() {
  return shuffle([1, 2, 3, 4, 5, 6, 7, 8, ''])
}

const puzzleGrid = reactive(randomize())

const gridSize = 3

function move(index: number) {
  const emptyIndex = puzzleGrid.indexOf('')
  if (
    index === emptyIndex - 1
    || index === emptyIndex + 1
    || index === emptyIndex - gridSize
    || index === emptyIndex + gridSize
  ) {
    [puzzleGrid[index], puzzleGrid[emptyIndex]] = [puzzleGrid[emptyIndex], puzzleGrid[index]]
  }
}
</script>

<template>
  <div class="puzzle">
    <div v-for="(item, index) in puzzleGrid" :key="index" class="grid" @click="move(index)">
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
.puzzle {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 1px solid #000;
  font-size: 24px;
}
</style>
