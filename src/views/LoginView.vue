<template>
  <div class="auth">
    <div class="auth__header">
      <div class="container">
        <BaseLogo to="/login" />
      </div>
    </div>

    <div class="auth__content">
      <div class="auth__card">
        <h1 class="auth__title">Вход</h1>

        <form class="auth__form" novalidate @submit.prevent="submit">
          <BaseInput
            id="login"
            v-model="form.login"
            placeholder="ivanova"
            autocomplete="username"
            :error="errors.login"
            :disabled="isSubmitting"
          />
          <BaseInput
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Пароль"
            autocomplete="current-password"
            :error="errors.password"
            :disabled="isSubmitting"
          />

          <p v-if="serverError" class="auth__error" role="alert">{{ serverError }}</p>

          <BaseButton type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Входим...' : 'Войти' }}
          </BaseButton>
        </form>

        <p class="auth__hint">Нужно зарегистрироваться?</p>
        <router-link to="/register" class="auth__link">Регистрируйтесь здесь</router-link>
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
import { signIn } from '@/services/auth.js'
import { saveSession } from '@/services/session.js'
import { validateLogin, validatePassword, hasErrors } from '@/utils/validation.js'

const router = useRouter()

const form = reactive({
  login: '',
  password: '',
})

const errors = reactive({
  login: '',
  password: '',
})

const serverError = ref('')
const isSubmitting = ref(false)

const validate = () => {
  errors.login = validateLogin(form.login)
  errors.password = validatePassword(form.password)

  return !hasErrors(errors)
}

const clearErrors = () => {
  errors.login = ''
  errors.password = ''
  serverError.value = ''
}

const submit = async () => {
  serverError.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    const user = await signIn({
      login: form.login.trim(),
      password: form.password,
    })

    saveSession(user)
    clearErrors()
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
