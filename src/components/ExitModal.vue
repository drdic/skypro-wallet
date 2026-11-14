<template>
  <div class="exit-modal" @click.self="$emit('close')">
    <div class="exit-modal__card" role="dialog" aria-modal="true">
      <h2 class="exit-modal__title">Выйти из аккаунта?</h2>
      <p class="exit-modal__text">Вы уверены, что хотите выйти?</p>
      <div class="exit-modal__actions">
        <BaseButton variant="secondary" @click="$emit('close')">Отмена</BaseButton>
        <BaseButton @click="$emit('confirm')">Выйти</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'

defineEmits(['close', 'confirm'])
</script>

<style scoped>
.exit-modal {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--color-overlay);
}

.exit-modal__card {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 20px 50px var(--color-shadow-popup);
  text-align: center;
}

.exit-modal__title {
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.exit-modal__text {
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-secondary);
}

.exit-modal__actions {
  display: flex;
  gap: 12px;
}

@media screen and (max-width: 480px) {
  .exit-modal {
    padding: 16px;
  }

  .exit-modal__card {
    padding: 24px 20px;
    border-radius: 16px;
  }

  .exit-modal__title {
    font-size: 20px;
  }

  .exit-modal__actions {
    flex-direction: column-reverse;
    gap: 8px;
  }
}
</style>
