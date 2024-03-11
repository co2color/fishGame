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

// 生成a-b的随机整数,包含a和b
function randomBetween(a: number, b: number) {
  return Math.floor(Math.random() * (b - a + 1) + a)
}

function resetPosition(left: number, right: number) {
  const size = map.size.value
  const x = randomBetween(left, right)
  const y = randomBetween(left, right)
  const currentType = mapList.value[x][y].type
  if (currentType === EmapType.Empty) {
    return { x, y }
  }
  return resetPosition(left, size - right)
}

function getPlayerPosition() {
  return resetPosition(1, map.size.value - 2)
}
function getBallPosition() {
  const { x, y } = resetPosition(2, map.size.value - 3)
  // 如果生成的球的上下左右四个位置存在边界，就重新生成
  const top = mapList.value[x][y - 1].type
  const bottom = mapList.value[x][y + 1].type
  const left = mapList.value[x - 1][y].type
  const right = mapList.value[x + 1][y].type
  if (top === EmapType.Border || bottom === EmapType.Border || left === EmapType.Border || right === EmapType.Border) {
    return getBallPosition()
  }
  return { x, y }
}
function getTargetPosition() {
  return resetPosition(1, map.size.value - 2)
}

const player = ref(getPlayerPosition())
const ball = ref(getBallPosition())
const target = ref(getTargetPosition())

function initMap() {
  mapList.value = cloneDeep(map.resetMapList())
  player.value = getPlayerPosition()
  const { x, y } = player.value
  mapList.value[x][y].type = EmapType.Player
  ball.value = getBallPosition()
  const { x: bx, y: by } = ball.value
  mapList.value[bx][by].type = EmapType.Ball
  target.value = getTargetPosition()
  const { x: tx, y: ty } = target.value
  mapList.value[tx][ty].type = EmapType.Target
}
const isWin = ref(false)
function win() {
  const { x, y } = ball.value
  const { x: tx, y: ty } = target.value
  isWin.value = (x === tx && y === ty)
}

function setTargetPosition() {
  // 为球推到target上面的时候，target的type就是球了。
  // 而此时如果球被推走了，target原本位置的type就再也不是Target了，所以需要重新设置回来
  const { x: tx, y: ty } = target.value
  if (mapList.value[tx][ty].type === EmapType.Empty) {
    mapList.value[tx][ty].type = EmapType.Target
  }
}

// 往上，x不动，y--
function moveUp() {
  const { x, y } = player.value
  const currentType = mapList.value[x][y].type
  const playerTopType = mapList.value[x][y - 1].type
  const ballTopType = mapList.value[x][y - 2].type // 球的上面
  // 能往上的条件有两个：1是上面是空的，2是上面有球且球的上面是空的
  if (playerTopType === EmapType.Empty || playerTopType === EmapType.Target) {
    player.value = { x, y: y - 1 }
    mapList.value[x][y].type = EmapType.Empty
    mapList.value[x][y - 1].type = currentType
  }

  // 如果上面是球，就要判断球的上面是不是空的
  else if (playerTopType === EmapType.Ball) {
    // 如果球的上面是空的，就可以推，将玩家和球都往上移动
    if (ballTopType === EmapType.Empty) {
      player.value = { x, y: y - 1 } // 玩家往上走
      ball.value = { x, y: y - 2 } // 球往上走
      mapList.value[x][y].type = EmapType.Empty // 玩家原来的位置变成空
      mapList.value[x][y - 1].type = currentType // 球原来的位置变成玩家
      mapList.value[x][y - 2].type = EmapType.Ball // 球的上面变成球
    }
    else if (ballTopType === EmapType.Target) {
      player.value = { x, y: y - 1 }
      ball.value = { x, y: y - 2 }
      mapList.value[x][y].type = EmapType.Empty
      mapList.value[x][y - 1].type = currentType
      mapList.value[x][y - 2].type = EmapType.Ball
    }
  }
  setTargetPosition()

  win()
}

// 往下，x不动，y++
function moveDown() {
  const { x, y } = player.value
  const currentType = mapList.value[x][y].type
  // 下面是空的，就往下走
  const bottomType = mapList.value[x][y + 1].type
  if (bottomType === EmapType.Empty || bottomType === EmapType.Target) {
    player.value = { x, y: y + 1 }
    mapList.value[x][y].type = EmapType.Empty
    mapList.value[x][y + 1].type = currentType
  }
  else if (bottomType === EmapType.Ball) {
    const ballBottom = mapList.value[x][y + 2].type
    if (ballBottom === EmapType.Empty) {
      player.value = { x, y: y + 1 }
      ball.value = { x, y: y + 2 }
      mapList.value[x][y].type = EmapType.Empty
      mapList.value[x][y + 1].type = currentType
      mapList.value[x][y + 2].type = EmapType.Ball
    }
  }
  setTargetPosition()
  win()
}
function moveLeft() {
  const { x, y } = player.value
  const currentType = mapList.value[x][y].type
  const leftType = mapList.value[x - 1][y].type
  if (leftType === EmapType.Empty || leftType === EmapType.Target) {
    player.value = { x: x - 1, y }
    mapList.value[x][y].type = EmapType.Empty
    mapList.value[x - 1][y].type = currentType
  }
  else if (leftType === EmapType.Ball) {
    const ballLeft = mapList.value[x - 2][y].type
    if (ballLeft === EmapType.Empty) {
      player.value = { x: x - 1, y }
      ball.value = { x: x - 2, y }
      mapList.value[x][y].type = EmapType.Empty
      mapList.value[x - 1][y].type = currentType
      mapList.value[x - 2][y].type = EmapType.Ball
    }
  }
  setTargetPosition()
  win()
}
function moveRight() {
  const { x, y } = player.value
  const currentType = mapList.value[x][y].type
  const rightType = mapList.value[x + 1][y].type
  if (rightType === EmapType.Empty || rightType === EmapType.Target) {
    player.value = { x: x + 1, y }
    mapList.value[x][y].type = EmapType.Empty
    mapList.value[x + 1][y].type = currentType
  }
  else if (rightType === EmapType.Ball) {
    const ballRight = mapList.value[x + 2][y].type
    if (ballRight === EmapType.Empty) {
      player.value = { x: x + 1, y }
      ball.value = { x: x + 2, y }
      mapList.value[x][y].type = EmapType.Empty
      mapList.value[x + 1][y].type = currentType
      mapList.value[x + 2][y].type = EmapType.Ball
    }
  }
  setTargetPosition()
  win()
}

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
            b
          </div>
          <div v-else-if="col.type === EmapType.Empty">
            e
          </div>
          <div v-else-if="col.type === EmapType.Player" class="player">
            人
          </div>
          <div v-else-if="col.type === EmapType.Ball" class="box" />
          <div v-else-if="col.type === EmapType.Target" class="target">
            T
          </div>
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
  transition: all 2s;
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

.target {
  background-color: skyblue;
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
