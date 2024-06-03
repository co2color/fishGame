<script lang="ts" setup>
import { shuffle } from 'lodash-es'
import { reactive } from 'vue'

const gridSize = 3

function randomize(size: number) {
  const arr = Array.from({ length: size ** 2 - 1 }, (_, i) => i + 1)
  return shuffle([...arr, ''])
}

const puzzleGrid = reactive(randomize(gridSize))
function move(index: number) {
  const emptyIndex = puzzleGrid.indexOf('')
  if (
    index === emptyIndex - 1
    || index === emptyIndex + 1
    || index === emptyIndex - gridSize
    || index === emptyIndex + gridSize
  )
    [puzzleGrid[index], puzzleGrid[emptyIndex]] = [puzzleGrid[emptyIndex], puzzleGrid[index]]
}
</script>

<template>
  <div
    class="grid gap-2.5" :style="{
      'grid-template-columns': `repeat(${gridSize}, 1fr)`,
      'grid-template-rows': `repeat(${gridSize}, 1fr)`,

    }"
  >
    <div v-for="(item, index) in puzzleGrid" :key="index" class="grids" @click="move(index)">
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
.grids {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 1px solid #000;
  font-size: 24px;
}
</style>
