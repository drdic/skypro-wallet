<template>
  <span class="base-icon" :style="{ width: `${size}px`, height: `${size}px` }" v-html="icon" />
</template>

<script setup>
import { computed } from 'vue'
import trash from '@/assets/icons/trash.svg?raw'
import user from '@/assets/icons/user.svg?raw'
import food from '@/assets/icons/food.svg?raw'
import transport from '@/assets/icons/transport.svg?raw'
import home from '@/assets/icons/home.svg?raw'
import entertainment from '@/assets/icons/entertainment.svg?raw'
import education from '@/assets/icons/education.svg?raw'
import other from '@/assets/icons/other.svg?raw'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 16,
  },
})

const icons = { trash, user, food, transport, home, entertainment, education, other }

const icon = computed(() => icons[props.name] || '')
</script>

<style scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.base-icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
