<template>
  <button
    :type="type"
    class="base-button"
    :class="`base-button_${variant}`"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
}

.base-button_primary {
  background-color: var(--color-accent);
  color: var(--color-text-white);
}

.base-button_primary:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
}

.base-button_secondary {
  background-color: transparent;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
}

.base-button_secondary:hover:not(:disabled) {
  background-color: var(--color-accent-light);
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
