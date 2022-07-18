<script setup lang="ts">
import { ref, onMounted } from 'vue'
const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const WIDTH = 500,
  HEIGHT = 500,
  SIZE = 10

const initSnakeList = [
  { x: 20, y: 10 },
  { x: 20, y: 11 },
  { x: 20, y: 12 }
]
const snakeList = ref(initSnakeList)
const currentLocation = ref('KeyS')

const canvasInit = () => {
  canvas.value!.width = WIDTH
  canvas.value!.height = HEIGHT
  context.value = canvas.value!.getContext('2d')
  // context.value!.strokeStyle = '#ccc'
  // context.value!.fillStyle = 'skyblue'
}
const renderItem = (color: string, x: number, y: number) => {
  context.value!.fillStyle = color
  context.value!.fillRect(x * SIZE, y * SIZE, SIZE, SIZE)
}
const renderSnake = () => {
  snakeList.value.forEach(item => {
    renderItem('pink', item.x, item.y)
  })
}

const touchWallWatch = () => {
  const headItem = snakeList.value[0]
  if (headItem.y === 0 - 1 || headItem.y === HEIGHT / SIZE || headItem.x === 0 - 1 || headItem.x === WIDTH / SIZE) {
    return true
  }
  return false
}
const moveSnake = () => {
  if (currentLocation.value === 'KeyW') {
    snakeList.value.unshift({
      x: snakeList.value[0].x,
      y: snakeList.value[0].y - 1
    })
    snakeList.value.pop()
  } else if (currentLocation.value === 'KeyS') {
    snakeList.value.unshift({
      x: snakeList.value[0].x,
      y: snakeList.value[0].y + 1
    })
    snakeList.value.pop()
  } else if (currentLocation.value === 'KeyA') {
    snakeList.value.unshift({
      x: snakeList.value[0].x - 1,
      y: snakeList.value[0].y
    })
    snakeList.value.pop()
  } else if (currentLocation.value === 'KeyD') {
    snakeList.value.unshift({
      x: snakeList.value[0].x + 1,
      y: snakeList.value[0].y
    })
    snakeList.value.pop()
  }
}
const startGame = () => {
  const t = setInterval(() => {
    context.value!.clearRect(0, 0, WIDTH, HEIGHT)
    renderSnake()
    moveSnake()
    if (touchWallWatch()) {
      clearInterval(t)
    }
  }, 50)
}

document.addEventListener(
  'keydown',
  event => {
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
  },
  true
)

onMounted(() => {
  canvasInit()
  startGame()
})
</script>
<template>
  <div class="game flex justify-center items-center">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.game {
  width: 100vw;
  height: 100vh;
  canvas {
    border: 1px solid #ccc;
  }
}
</style>
