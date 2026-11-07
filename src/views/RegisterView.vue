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

        <form class="auth__form" novalidate @submit.prevent="submit">
          <BaseInput
            id="name"
            v-model="form.name"
            placeholder="Ева Иванова"
            autocomplete="name"
            :error="errors.name"
            :disabled="isSubmitting"
          />
          <BaseInput
            id="email"
            v-model="form.login"
            type="email"
            placeholder="Эл. почта"
            autocomplete="email"
            :error="errors.login"
            :disabled="isSubmitting"
          />
          <BaseInput
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Пароль"
            autocomplete="new-password"
            :error="errors.password"
            :disabled="isSubmitting"
          />

          <p v-if="serverError" class="auth__error" role="alert">{{ serverError }}</p>

          <BaseButton type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться' }}
          </BaseButton>
        </form>

        <p class="auth__hint">Уже есть аккаунт?</p>
        <router-link to="/login" class="auth__link">Войдите здесь</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLogo from '@/components/BaseLogo.vue'
import { signUp } from '@/services/auth.js'
import { saveSession } from '@/services/session.js'
import { validateLogin, validateName, validatePassword, hasErrors } from '@/utils/validation.js'

const router = useRouter()

const form = reactive({
  name: '',
  login: '',
  password: '',
})

const errors = reactive({
  name: '',
  login: '',
  password: '',
})

const serverError = ref('')
const isSubmitting = ref(false)

const validate = () => {
  errors.name = validateName(form.name)
  errors.login = validateLogin(form.login)
  errors.password = validatePassword(form.password)

  return !hasErrors(errors)
}

const submit = async () => {
  serverError.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    const user = await signUp({
      name: form.name.trim(),
      login: form.login.trim(),
      password: form.password,
    })

    saveSession(user)
    router.push('/')
  } catch (error) {
    serverError.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
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

.auth__error {
  padding: 10px 12px;
  border-radius: 8px;
  background-color: var(--color-danger-light);
  font-size: 13px;
  line-height: 18px;
  color: var(--color-danger);
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
