<template>
  <div class="base-input-field">
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : undefined"
      :inputmode="inputmode"
      class="base-input"
      :class="{ 'base-input_invalid': error }"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" :id="`${id}-error`" class="base-input__error">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: 'base-input',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  inputmode: {
    type: String,
    default: undefined,
  },
  error: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.base-input {
  width: 100%;
  height: 40px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg-white);
  color: var(--color-text-primary);
  font-size: 14px;
  line-height: 20px;
  transition:
    border-color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}

.base-input::placeholder {
  color: var(--color-text-muted);
}

.base-input:focus {
  outline: none;
  border-color: var(--color-accent);
  background-color: var(--color-accent-light);
}

.base-input_invalid,
.base-input_invalid:focus {
  border-color: var(--color-danger);
  background-color: var(--color-danger-light);
}

.base-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-input__error {
  font-size: 12px;
  line-height: 16px;
  color: var(--color-danger);
}
</style>
