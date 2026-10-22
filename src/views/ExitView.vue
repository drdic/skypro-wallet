<template>
  <div class="auth">
    <div class="auth__header">
      <div class="container">
        <BaseLogo to="/" />
      </div>
    </div>

    <div class="auth__content">
      <div class="auth__card">
        <h1 class="auth__title">Выход</h1>
        <p class="auth__text">Вы вышли из аккаунта.</p>
        <router-link to="/login" class="auth__button">Войти снова</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseLogo from '@/components/BaseLogo.vue'
</script>

<style scoped>
.auth {
  min-height: 100vh;
  background-color: var(--color-bg);
}

.auth__header {
  padding: 20px 0;
  background-color: var(--color-bg-white);
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
  text-align: center;
}

.auth__title {
  margin-bottom: 12px;
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
  color: var(--color-text-primary);
}

.auth__text {
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
}

.auth__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background-color: var(--color-accent);
  color: var(--color-text-white);
  font-size: 14px;
  font-weight: 600;
}

.auth__button:hover {
  background-color: var(--color-accent-hover);
}
</style>
