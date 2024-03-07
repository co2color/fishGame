<script lang="ts" setup>
// 写一个推箱子的游戏

// 画格子,定义二维数组
const mapList = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="box border flex flex-wrap">
      <div v-for="(row, rowIndex) in mapList" :key="rowIndex" class="flex">
        <div
          v-for="(col, colIndex) in row"
          :key="colIndex"
          :class="{
            'bg-zinc-400': col === 1,
            'bg-neutral-100': col === 0,
          }"
          class="w-10 h-10 flex"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  transition: all 0.3s;

}
</style>
