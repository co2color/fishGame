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
  context.value!.strokeStyle = '#ccc'
  context.value!.fillStyle = 'skyblue'
  // context.value!.fillRect(0, 0, 100, 100)
  //   context.value!.fillStyle = 'rgb(212,175,146)'
  //   context.value!.fillRect(0, 0, 450, 450)
}
const renderFood = (color: string, x: number, y: number) => {
  context.value!.fillStyle = color
  context.value!.fillRect(x * SIZE, y * SIZE, SIZE, SIZE)
}
const renderSnake = () => {
  context.value!.clearRect(0, 0, WIDTH, HEIGHT)
}
let x = 0,
  y = 0
const move = () => {
  const t = setInterval(() => {
    context.value!.clearRect(0, 0, WIDTH, HEIGHT)
    renderFood('red', x, y)
    x++
    if (x > 49) {
      x = 0
      y++
    }
  }, 60)
}
function drawChessBoard() {
  for (var i = 0; i <= WIDTH / SIZE; i++) {
    //设置横线起始点的坐标
    context.value!.moveTo(0, i * SIZE + 0.5)
    //设置横线结束点的坐标
    context.value!.lineTo(WIDTH, i * SIZE + 0.5)
    //连接2点
    context.value!.stroke()

    // 设置竖线的起始点坐标
    context.value!.moveTo(i * SIZE + 0.5, 0)
    //设置竖线的结束点坐标
    context.value!.lineTo(i * SIZE + 0.5, HEIGHT)
    //连接2点
    context.value!.stroke()
  }
}
onMounted(() => {
  canvasInit()
  //   drawChessBoard()
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
