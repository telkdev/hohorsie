<template>
  <div class="overflow-auto border border-white rounded-[10px]">
    <table class="w-full border-collapse">
      <thead class="sticky top-0 bg-green-700 shadow">
        <tr>
          <th v-for="(header, index) in headers" :key="index" class="py-1 px-2 border-b text-start font-semibold border-gray-200">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-green-300">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="border-b border-white last:border-0">
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :class="{
              'py-1 px-2': !slots.cell,
            }"
          >
            <slot name="cell" :cell="cell" :rowIndex="rowIndex" :cellIndex="cellIndex">
              {{ cell }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { useSlots } from 'vue'

const { headers, rows } = defineProps<{
  headers: string[]
  rows: T[][]
}>()

const slots = useSlots()
</script>
