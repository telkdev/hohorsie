import { ref } from 'vue'
import type { Round } from '@/entities/race'

export function makeDummyRound(params: Partial<Round> = {}): Round {
  return {
    id: 1,
    distance: 1200,
    horses: [
      ref({
        id: 1,
        name: 'Thunder',
        distanceInRound: 1200,
        timeInRound: 20.02,
        speed: () => 10,
        finishTime: null,
        color: 'red',
        condition: 1,
      }),
      ref({
        id: 2,
        name: 'Lightning',
        distanceInRound: 1100,
        timeInRound: 21.02,
        speed: () => 9,
        finishTime: null,
        color: 'red',
        condition: 1,
      }),
      ref({
        id: 3,
        name: 'Storm',
        distanceInRound: 1000,
        timeInRound: 22.02,
        speed: () => 8,
        finishTime: null,
        color: 'red',
        condition: 1,
      }),
    ],
    scoreBoard: [],
    start: () => {},
    ...params,
  }
}
