<template>
  <AuthLayout title="Выход" logo-to="/">
    <p class="exit__text">Вы вышли из аккаунта.</p>
    <BaseButton @click="goToLogin">Войти снова</BaseButton>
  </AuthLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import AuthLayout from '@/layout/AuthLayout.vue'
import { removeSession } from '@/services/session.js'

const router = useRouter()

const goToLogin = () => {
  router.push({ name: 'login' })
}

onMounted(removeSession)
</script>

<style scoped>
.exit__text {
  margin-bottom: 24px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
}
</style>
