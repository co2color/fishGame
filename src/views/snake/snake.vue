<script setup lang="ts">
import { ref, onMounted } from 'vue'
const canvas = ref<HTMLCanvasElement | null>(null)
const context = ref<CanvasRenderingContext2D | null>(null)
const WIDTH = 500,
  HEIGHT = 500,
  SIZE = 10
const canvasInit = () => {
  canvas.value!.width = WIDTH
  canvas.value!.height = HEIGHT
  context.value = canvas.value!.getContext('2d')
  // context.value!.strokeStyle = '#ccc'
  // context.value!.fillStyle = 'skyblue'
}
const renderFood = (color: string, x: number, y: number) => {
  context.value!.fillStyle = color
  context.value!.fillRect(x * SIZE, y * SIZE, SIZE, SIZE)
}
const renderSnake = () => {
  context.value!.clearRect(0, 0, WIDTH, HEIGHT)
}

const move = () => {
  context.value!.clearRect(0, 0, WIDTH, HEIGHT)
  renderFood('pink', location.value.x, location.value.y)
  return
  const t = setInterval(() => {
    context.value!.clearRect(0, 0, WIDTH, HEIGHT)
    renderFood('pink', location.value.x, location.value.y)
  }, 30)
}

document.addEventListener(
  'keydown',
  event => {
    console.log(event)
    if (event.code === 'KeyW') {
      if (location.value.y > 0) {
        location.value.y--
      }
    }
    if (event.code === 'KeyS') {
      if (location.value.y < HEIGHT / SIZE - 1) {
        location.value.y++
      }
    }
    if (event.code === 'KeyA') {
      if (location.value.x > 0) {
        location.value.x--
      }
    }
    if (event.code === 'KeyD') {
      if (location.value.x < WIDTH / SIZE - 1) {
        location.value.x++
      }
    }
    move()
  },
  true
)

const location = ref({
  x: WIDTH / SIZE / 2,
  y: WIDTH / SIZE / 2,
  currentLocation: 'w'
})
onMounted(() => {
  canvasInit()
  move()
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
