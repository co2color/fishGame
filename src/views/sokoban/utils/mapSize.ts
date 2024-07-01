// 写一个hooks，用来获取地图的大小和设置地图的大小，vue3
import { ref } from 'vue'
import { EmapType, type IMapItemContent } from '../types/map'

export default function useMapSize(len: number) {
  const size = ref(len)
  const setSize = (_size: number) => {
    size.value = _size
  }

  const resetMapList = () => {
    const map: IMapItemContent[][] = []
    for (let i = 0; i < size.value; i++) {
      const row: IMapItemContent[] = []
      for (let j = 0; j < size.value; j++) {
        if (i === 0 || i === size.value - 1 || j === 0 || j === size.value - 1)
          row.push({ y: i, x: j, type: EmapType.Border })

        else row.push({ y: i, x: j, type: EmapType.Empty })
      }
      map.push(row)
    }
    return map
  }

  return {
    size,
    setSize,
    resetMapList,
  }
}
