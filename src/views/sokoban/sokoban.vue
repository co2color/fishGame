<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { EmapType } from './types/map'
import useMapSize from './utils/mapSize'

const map = useMapSize(10)

const mapList = ref(map.getMapList())

const computedMapWidth = computed(() => {
  return `${map.size.value * 40}px`
})

function resetPlayer() {
  // 生成玩家或球的位置
  const x = Math.floor(Math.random() * (map.size.value - 2)) + 1
  const y = Math.floor(Math.random() * (map.size.value - 2)) + 1
  const currentType = mapList.value[x][y].type
  if (currentType === EmapType.Empty)
    return { x, y }

  return resetPlayer()
}

function initMap() {
  const { x, y } = resetPlayer()
  mapList.value[x][y].type = EmapType.Player
  const { x: bx, y: by } = resetPlayer()
  mapList.value[bx][by].type = EmapType.Box
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="container border flex flex-wrap">
      <div v-for="(row, rowIndex) in mapList" :key="rowIndex" class="flex">
        <div
          v-for="(col, colIndex) in row" :key="colIndex" :class="{
            'bg-neutral-100': col.type === EmapType.Box,
            'bg-zinc-400': col.type === EmapType.Border,
          }" class="flex items-center justify-center w-10 h-10"
        >
          <div v-if="col.type === EmapType.Border" />
          <div v-else-if="col.type === EmapType.Empty" />
          <div v-else-if="col.type === EmapType.Player" class="player" />
          <div v-else-if="col.type === EmapType.Box" class="box" />
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
}

// 球
.box {
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
}
</style>
