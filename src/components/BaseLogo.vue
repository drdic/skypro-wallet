<template>
  <router-link :to="to" class="logo" aria-label="Skypro.Wallet">
    <span class="logo__image" v-html="logoIcon" />
  </router-link>
</template>

<script setup>
import logoIcon from '@/assets/icons/logo.svg?raw'

defineProps({
  to: {
    type: String,
    default: '/',
  },
})
</script>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  line-height: 0;
  color: var(--color-text-primary);
}

.logo__image {
  display: inline-flex;
  align-items: center;
  line-height: 0;
}

.logo__image :deep(svg) {
  display: block;
  width: auto;
  height: 19px;
}

/* В тёмной теме заливка логотипа становится светлой */
.logo__image :deep(svg path) {
  fill: currentColor;
}
</style>
