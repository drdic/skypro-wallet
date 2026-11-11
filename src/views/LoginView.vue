<template>
  <AuthLayout title="Вход">
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
  </AuthLayout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import AuthLayout from '@/layout/AuthLayout.vue'
import { signIn } from '@/services/auth.js'
import { saveSession } from '@/services/session.js'
import { hasErrors, validateLogin, validatePassword } from '@/utils/validation.js'

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
    router.push({ name: 'home' })
  } catch (error) {
    serverError.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
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
