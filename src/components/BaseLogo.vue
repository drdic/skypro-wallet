<template>
  <router-link :to="to" class="logo">
    <span class="logo__mark">
      <img :src="logoIcon" alt="" class="logo__image" />
    </span>
    <span class="logo__text">Skypro.Wallet</span>
  </router-link>
</template>

<script setup>
import logoIcon from '@/assets/icons/logo.svg'

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
  gap: 10px;
}

.logo__mark {
  display: flex;
  width: 24px;
  height: 24px;
}

.logo__image {
  width: 24px;
  height: 24px;
  display: block;
}

.logo__text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: var(--color-text-primary);
}
</style>
