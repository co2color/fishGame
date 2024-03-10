<script lang="ts" setup>
import { computed, ref } from 'vue'
import { EmapType } from './types/map'
import useMapSize from './utils/mapSize'

const map = useMapSize(10)

// 画格子,定义二维数组
const mapList = ref(map.getMapList())

const computedMapWidth = computed(() => {
  return `${map.size.value * 40}px`
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="box border flex flex-wrap">
      <div v-for="(row, rowIndex) in mapList" :key="rowIndex" class="flex">
        <div
          v-for="(col, colIndex) in row"
          :key="colIndex"
          :class="{
            'bg-zinc-400': col.type === EmapType.Border,
            'bg-neutral-100': col.type === EmapType.Content,
          }"

          class="w-10 h-10 flex items-center justify-center"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: v-bind(computedMapWidth);
  height: v-bind(computedMapWidth);
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
</style>
