<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    class="base-input"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
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
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
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
</style>
