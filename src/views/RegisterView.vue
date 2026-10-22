<template>
  <div class="auth">
    <div class="auth__header">
      <div class="container">
        <BaseLogo to="/register" />
      </div>
    </div>

    <div class="auth__content">
      <div class="auth__card">
        <h1 class="auth__title">Регистрация</h1>

        <form class="auth__form" @submit.prevent>
          <BaseInput v-model="name" placeholder="Ева Иванова" autocomplete="name" />
          <BaseInput v-model="email" type="email" placeholder="Эл. почта" autocomplete="email" />
          <BaseInput
            v-model="password"
            type="password"
            placeholder="Пароль"
            autocomplete="new-password"
          />
          <BaseButton type="submit">Зарегистрироваться</BaseButton>
        </form>

        <p class="auth__hint">Уже есть аккаунт?</p>
        <router-link to="/login" class="auth__link">Войдите здесь</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLogo from '@/components/BaseLogo.vue'

const name = ref('')
const email = ref('')
const password = ref('')
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

.auth__form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
}

.auth__hint {
  text-align: center;
  font-size: 13px;
  line-height: 18px;
  color: var(--color-text-secondary);
}

.auth__link {
  display: block;
  text-align: center;
  font-size: 13px;
  line-height: 18px;
  color: var(--color-text-secondary);
  text-decoration: underline;
}

.auth__link:hover {
  color: var(--color-accent);
}
</style>
