<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { EmapType } from './types/map'
import useMapSize from './utils/mapSize'

const map = useMapSize(10)

const mapList = ref(map.resetMapList())

const computedMapWidth = computed(() => {
  return `${map.size.value * 40}px`
})

function resetPlayer() {
  const size = map.size.value
  // 球必须从(2,2)开始，到(size-3，size-3)结束（球如果挨着墙的话，就不好推了）
  // 玩家其实可以挨着墙，但不管了，懒得额外判断了
  const x = Math.floor(Math.random() * (size - 5) + 2)
  const y = Math.floor(Math.random() * (size - 5) + 2)
  const currentType = mapList.value[x][y].type
  if (currentType === EmapType.Empty) { return { x, y } }

  return resetPlayer()
}

const player = ref(resetPlayer())
const ball = ref(resetPlayer())

function initMap() {
  player.value = resetPlayer()
  const { x, y } = player.value
  mapList.value[x][y].type = EmapType.Player
  ball.value = resetPlayer()
  const { x: bx, y: by } = ball.value
  mapList.value[bx][by].type = EmapType.Ball
}

// 上就是y--，下就是y++，左就是x--，右就是x++
function moveUp() {
  const { x, y } = player.value
  const currentType = mapList.value[x][y].type
  const topType = mapList.value[x][y - 1].type
  if (topType === EmapType.Empty) {
    player.value = { x, y: y - 1 }
    mapList.value[x][y].type = EmapType.Empty
    mapList.value[x][y - 1].type = currentType
  }

  // 如果上面是球，就要判断球的上面是不是空的
  else if (topType === EmapType.Ball) {
    const ballTop = mapList.value[x][y - 2].type
  }
}
function moveDown() { }
function moveLeft() { }
function moveRight() { }

function handleKeyUp() {
  // 监听键盘方向4个键
  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        moveUp()
        break
      case 'ArrowDown':
        moveDown()
        break
      case 'ArrowLeft':
        moveLeft()
        break
      case 'ArrowRight':
        moveRight()
        break
    }
    return 1
  })
}

onMounted(() => {
  initMap()
  handleKeyUp()
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="container border flex ">
      <div v-for="(row, rowIndex) in mapList" :key="rowIndex" class="flex flex-wrap">
        <div
          v-for="(col, colIndex) in row" :key="colIndex" :class="{
            'bg-neutral-100': col.type === EmapType.Ball,
            'bg-zinc-400': col.type === EmapType.Border,
          }" class="flex items-center justify-center w-10 h-10"
        >
          <div v-if="col.type === EmapType.Border">
            {{ col.x }},{{ col.y }}
          </div>
          <div v-else-if="col.type === EmapType.Empty">
            {{ col.x }},{{ col.y }}
          </div>
          <div v-else-if="col.type === EmapType.Player" class="player">
            人
          </div>
          <div v-else-if="col.type === EmapType.Ball" class="box" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: v-bind(computedMapWidth);
  height: v-bind(computedMapWidth);
  // background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.player {
  background-color: #f00;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s;
  transform: scale(0.8);
}

// 球
.box {
  background-color: pink;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.3s;
}
</style>
