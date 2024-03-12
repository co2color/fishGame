<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { cloneDeep } from 'lodash-es'

const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const btn = ref<HTMLButtonElement | null>(null)
const WIDTH = 500
const HEIGHT = 500
const SIZE = 10
const foodCanInBorder = ref(false)
const initSnakeList = [
  { x: 30, y: 25 },
  { x: 31, y: 25 },
  { x: 32, y: 25 },
]
let t = 0
const snakeList = ref(cloneDeep(initSnakeList))
const currentLocation = ref('KeyA')
function canvasInit() {
  canvas.value!.width = WIDTH
  canvas.value!.height = HEIGHT
  context.value = canvas.value!.getContext('2d')
}
function renderItem(color: string, x: number, y: number) {
  context.value!.fillStyle = color
  context.value!.fillRect(x * SIZE, y * SIZE, SIZE, SIZE)
}
function getRandomFoodLocation(_foodCanInBorder: boolean = false) {
  let x = Math.floor((Math.random() * WIDTH) / SIZE)
  let y = Math.floor((Math.random() * HEIGHT) / SIZE)
  if (_foodCanInBorder) {
    return { x, y }
  }
  if (x === 0) {
    x += 1
  }
  else if (y === 0) {
    y += 1
  }
  else if (x === WIDTH / SIZE - 1) {
    x -= 1
  }
  else if (y === HEIGHT / SIZE - 1) {
    y -= 1
  }
  return { x, y }
}
const foodLocation = ref({
  x: getRandomFoodLocation(foodCanInBorder.value).x,
  y: getRandomFoodLocation(foodCanInBorder.value).y,
})
function renderFood(color: string = 'skyblue') {
  renderItem(color, foodLocation.value.x, foodLocation.value.y)
}
function renderSnake() {
  snakeList.value.forEach((item) => {
    renderItem('pink', item.x, item.y)
  })
}
function touchWallWatch() {
  const headItem = snakeList.value[0]
  // 有待改进，这个函数应该只用于判断蛇头是否在边界处
  // 然后，蛇头如果再动，才算触碰边界
  if (headItem.y === -1 || headItem.y === HEIGHT / SIZE || headItem.x === -1 || headItem.x === WIDTH / SIZE) {
    return true
  }
  return false
}
function touchCallBack() {
  btn.value!.textContent = 'restart'
  removeKeyBoardWatch()
}
function moveSnake() {
  if (touchWallWatch()) {
    touchCallBack()
    clearInterval(t)
    return
  }
  if (currentLocation.value === 'KeyW') {
    snakeList.value.unshift({
      x: snakeList.value[0].x,
      y: snakeList.value[0].y - 1,
    })
  }
  else if (currentLocation.value === 'KeyA') {
    snakeList.value.unshift({
      x: snakeList.value[0].x - 1,
      y: snakeList.value[0].y,
    })
  }
  else if (currentLocation.value === 'KeyS') {
    snakeList.value.unshift({
      x: snakeList.value[0].x,
      y: snakeList.value[0].y + 1,
    })
  }
  else if (currentLocation.value === 'KeyD') {
    snakeList.value.unshift({
      x: snakeList.value[0].x + 1,
      y: snakeList.value[0].y,
    })
  }
  if (isEatFood()) {
    resetFood()
  }
  else {
    snakeList.value.pop()
  }
}
function isEatFood() {
  const headItem = snakeList.value[0]
  if (headItem.x === foodLocation.value.x && headItem.y === foodLocation.value.y) {
    return true
  }
  return false
}
function resetFood() {
  const { x, y } = getRandomFoodLocation(foodCanInBorder.value)
  foodLocation.value = { x, y }
  renderFood()
}

function restartGame() {
  snakeList.value = cloneDeep(initSnakeList)
  renderSnake()
  currentLocation.value = 'KeyA'
  clearInterval(t)
}
function startGame() {
  restartGame()
  addKeyBoardWatch()
  t = setInterval(() => {
    context.value!.clearRect(0, 0, WIDTH, HEIGHT)
    renderSnake()
    renderFood()
    moveSnake()
  }, 100)
}
function watchKeyCallBack(event: KeyboardEvent) {
  if (event.code === 'KeyW') {
    currentLocation.value = 'KeyW'
  }
  if (event.code === 'KeyS') {
    currentLocation.value = 'KeyS'
  }
  if (event.code === 'KeyA') {
    currentLocation.value = 'KeyA'
  }
  if (event.code === 'KeyD') {
    currentLocation.value = 'KeyD'
  }
}
function addKeyBoardWatch() {
  document.addEventListener('keydown', watchKeyCallBack)
}
function removeKeyBoardWatch() {
  document.removeEventListener('keydown', watchKeyCallBack)
}
onMounted(() => {
  canvasInit()
  renderSnake()
  renderFood()
})

onUnmounted(() => {
  removeKeyBoardWatch()
})
</script>

<template>
  <div class="game flex flex-col justify-center items-center">
    <button ref="btn" class="mb-1" @click="startGame">
      start
    </button>
    <canvas ref="canvas" />
  </div>
</template>

<style lang="scss" scoped>
.game {
  width: 100vw;
  height: 100vh;
  position: relative;
  button {
    box-sizing: border-box;
    padding: 4px 10px;
    border-radius: 4px;
    background: #409eff;
    line-height: 1;
    color: #fff;
    outline: none;
    font-size: 12px;
  }
  button:hover {
    background: #66b1ff;
  }
  canvas {
    border: 1px solid #ccc;
  }
}
</style>
