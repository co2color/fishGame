<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 这项目想模仿原神的钓鱼，但好像有点麻烦。
// 还没做完，有空再说。。。
const is_click_btn = ref(false)
function btnMouseDownClick(e: MouseEvent) {
  is_click_btn.value = true
  console.log(e)
}
function btnMouseUpClick(e: MouseEvent) {
  if (is_click_btn.value) {
  }
  is_click_btn.value = false
}
const p = useProgressMove()

function btnClick(e: MouseEvent) {
  // console.log(e)
  p.is_start.value ? p.stop() : p.start()
}
onMounted(() => {
  document.addEventListener('mouseup', btnMouseUpClick)
})
function useProgressMove(step: number = 1) {
  const progress_left_px = ref('0px')
  let position = 'right'
  const is_start = ref(false)
  let t = 0
  const start = () => {
    is_start.value = true
    t = setInterval(() => {
      let temp_num = +progress_left_px.value.slice(0, progress_left_px.value.length - 2)
      if (temp_num >= 250) {
        position = 'left'
        temp_num -= step
      }
      if (temp_num <= 0) {
        position = 'right'
        temp_num += step
      }
      if (position === 'right')
        progress_left_px.value = `${temp_num + step}px`
      else
        progress_left_px.value = `${temp_num - step}px`

      progress_left_px.value = `${position === 'right' ? temp_num + step : temp_num - step}px`
    }, 10)
  }
  const stop = () => {
    is_start.value = false
    clearInterval(t)
  }
  return { progress_left_px, start, stop, is_start }
}
// const { progress_left_px, start, stop, is_start } = useProgressMove()

const { progress_left_px, is_start } = p
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="box">
      <div class="box-progress" />
    </div>
    <button id="btn" class="mt-10" @mousedown="btnMouseDownClick" @click="btnClick">
      {{ is_start ? '暂停' : '启动' }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 300px;
  height: 100px;
  background-color: skyblue;
  margin: 100px auto 0;
  .box-progress {
    width: 50px;
    height: 100px;
    border: 2px solid pink;
    transform: translateX(v-bind(progress_left_px));
  }
}
</style>
