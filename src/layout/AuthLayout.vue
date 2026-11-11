<template>
  <div class="auth">
    <div class="auth__header">
      <div class="container">
        <BaseLogo :to="logoTo" />
      </div>
    </div>

    <div class="auth__content">
      <div class="auth__card">
        <h1 class="auth__title">{{ title }}</h1>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseLogo from '@/components/BaseLogo.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  logoTo: {
    type: String,
    default: '/login',
  },
})
</script>

<style scoped>
.auth {
  min-height: 100vh;
  background-color: var(--color-bg);
}

.auth__header {
  display: flex;
  align-items: center;
  height: 64px;
  background-color: var(--color-bg-white);
}

.auth__header .container {
  display: flex;
  align-items: center;
}

.auth__content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding: 40px 16px;
}

.auth__card {
  width: 100%;
  max-width: 380px;
  padding: 40px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 20px 50px var(--color-shadow-card);
}

.auth__title {
  margin-bottom: 28px;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
  color: var(--color-text-primary);
}

@media screen and (max-width: 480px) {
  .auth__header {
    height: 56px;
  }

  .auth__content {
    min-height: calc(100vh - 56px);
    padding: 24px 12px;
  }

  .auth__card {
    padding: 28px 20px;
    border-radius: 16px;
  }

  .auth__title {
    margin-bottom: 20px;
    font-size: 24px;
    line-height: 30px;
  }
}
</style>
