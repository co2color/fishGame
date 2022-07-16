<script setup lang="ts">
import { computed, ref } from 'vue'
interface Render {
  color?: string
  x?: number
  y?: number
  is_null?: boolean
}
const ITEM_WIDTH = '50px'
const ITEM_HEIGHT = '50px'
const allColors = ['orange', 'yellow', 'skyblue', 'pink', 'lightseagreen', 'greenyellow', 'darkseagreen']
// 随机color = allColors[Math.floor(Math.random() * allColors.length)]

const getColorsByLevel = computed(() => {
  // 设定5个level，level1用前3个颜色，level+1 => color+1
  return allColors.slice(0, level.value + 2)
})

const level = ref(1)
const initList = (row: number = 10, col: number = 10) => {
  const list = [] as Render[][]
  for (let i = 0; i < row; i++) {
    list.push([])
    for (let j = 0; j < col; j++) {
      list[i].push({
        color: getColorsByLevel.value[Math.floor(Math.random() * (level.value + 2))],
        is_null: false,
        x: j * row,
        y: i * col
      })
    }
  }
  return list
}
const list = ref(initList())
console.log(list.value)

const levelAdd = () => {
  if (level.value >= 5) {
    return alert('已经超过5级了')
  }
  level.value++
  list.value = initList()
}
</script>
<template>
  <div class="game flex justify-center items-center">
    <button @click="levelAdd">add</button>
    <div class="game-box">
      <div class="game-list flex" v-for="(rows, row_index) in list" :key="row_index + 'row'">
        <div class="game-item flex" :style="{ backgroundColor: item.color }" v-for="(item, index) in rows"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.game {
  width: 100vw;
  height: 100vh;
  .game-box {
    width: 500px;
    height: 500px;
    .game-list {
      border-left: 1px solid #fff;
      border-top: 1px solid #fff;
      .game-item {
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        width: v-bind(ITEM_WIDTH);
        height: v-bind(ITEM_HEIGHT);
      }
    }
  }
}
</style>
