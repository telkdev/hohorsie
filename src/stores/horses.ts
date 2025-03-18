import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Horse } from '@/entities/horse'

const colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'brown',
  'black',
  'white',
  'gray',
  'cyan',
  'magenta',
  'lime',
  'teal',
  'indigo',
  'violet',
  'fuchsia',
  'gold',
  'silver',
] as const

const names = [
  'Pegasus',
  'Shadowfax',
  'Binky',
  'Rocinante',
  'Bucephalus',
  'Hengroen',
  'Strider',
  'Rapidash',
  'Tornado',
  'Fury',
  'Thunderbolt',
  'Blaze',
  'Cinder',
  'Ghost',
  'Sable',
  'Midnight',
  'Bolt',
  'Havoc',
  'Rage',
  'Blizzard',
]

const HORSES_COUNT = 20
const DEFAULT_SPEED = 17

export const useHorsesStore = defineStore('horses', () => {
  const horses = ref<Horse[]>([])

  function generateHorses() {
    horses.value = Array.from({ length: HORSES_COUNT }).map((_, i) => ({
      id: i,
      name: names[i] ?? `Horse ${i + 1}`,
      color: colors[i] ?? 'black',
      condition: Math.floor(Math.random() * 100) || 1,
      speed: DEFAULT_SPEED,
      distanceInRound: 0,
      timeInRound: 0,
    }))
  }

  return {
    horses,
    generateHorses,
  }
})
