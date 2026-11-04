<template>
  <div class="not-found">
    <div class="not-found__card">
      <p class="not-found__code">404</p>
      <h1 class="not-found__title">Страница не найдена</h1>
      <p class="not-found__text">Запрашиваемая страница не существует или была перемещена.</p>
      <div class="not-found__actions">
        <router-link to="/" class="not-found__btn">Вернуться на главную</router-link>
        <button type="button" class="not-found__btn not-found__btn_secondary" @click="goBack">
          Вернуться назад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--color-bg);
}

.not-found__card {
  width: 100%;
  max-width: 520px;
  padding: 48px 32px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 20px 50px var(--color-shadow-card);
  text-align: center;
}

.not-found__code {
  margin-bottom: 12px;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-accent);
}

.not-found__title {
  margin-bottom: 12px;
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  color: var(--color-text-primary);
}

.not-found__text {
  margin-bottom: 28px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
}

.not-found__actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.not-found__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 8px;
  background-color: var(--color-accent);
  color: var(--color-text-white);
  font-size: 14px;
  font-weight: 600;
}

.not-found__btn:hover {
  background-color: var(--color-accent-hover);
}

.not-found__btn_secondary {
  background-color: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

.not-found__btn_secondary:hover {
  background-color: var(--color-accent-light);
}
</style>
