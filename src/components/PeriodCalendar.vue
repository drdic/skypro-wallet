<template>
  <section class="period">
    <div class="period__head">
      <h2 class="period__title">Период</h2>
      <div class="period__controls">
        <button
          type="button"
          class="period__control"
          aria-label="Предыдущий месяц"
          @click="shiftMonth(-1)"
        >
          ‹
        </button>
        <span class="period__month-title">{{ monthTitle }}</span>
        <button
          type="button"
          class="period__control"
          aria-label="Следующий месяц"
          @click="shiftMonth(1)"
        >
          ›
        </button>
      </div>
    </div>

    <div class="period__weekdays">
      <span v-for="day in weekdays" :key="day" class="period__weekday">{{ day }}</span>
    </div>

    <div class="period__grid">
      <button
        v-for="(day, index) in days"
        :key="`${monthKey}-${index}`"
        type="button"
        class="period__day"
        :class="{
          'period__day_empty': !day,
          'period__day_selected': isSelected(day),
          'period__day_today': isToday(day),
        }"
        :disabled="!day"
        @click="day && selectDay(day)"
      >
        {{ day }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { formatMonthTitle, parseDate, toISODate } from '@/utils/format.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

const initialDate = parseDate(props.modelValue) || new Date()
const cursor = ref(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1))

const monthTitle = computed(() => formatMonthTitle(cursor.value))

const monthKey = computed(
  () => `${cursor.value.getFullYear()}-${String(cursor.value.getMonth() + 1).padStart(2, '0')}`,
)

const days = computed(() => {
  const year = cursor.value.getFullYear()
  const month = cursor.value.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7

  const cells = Array.from({ length: firstWeekday }, () => null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day)
  }

  return cells
})

const selectedDate = computed(() => parseDate(props.modelValue))

const isSelected = (day) => {
  if (!day || !selectedDate.value) {
    return false
  }

  return (
    selectedDate.value.getFullYear() === cursor.value.getFullYear() &&
    selectedDate.value.getMonth() === cursor.value.getMonth() &&
    selectedDate.value.getDate() === day
  )
}

const isToday = (day) => {
  if (!day) {
    return false
  }

  const today = new Date()

  return (
    today.getFullYear() === cursor.value.getFullYear() &&
    today.getMonth() === cursor.value.getMonth() &&
    today.getDate() === day
  )
}

const selectDay = (day) => {
  const next = new Date(cursor.value.getFullYear(), cursor.value.getMonth(), day)
  emit('update:modelValue', toISODate(next))
}

const shiftMonth = (delta) => {
  const next = new Date(cursor.value.getFullYear(), cursor.value.getMonth() + delta, 1)
  cursor.value = next

  if (!selectedDate.value) {
    return
  }

  const daysInNextMonth = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()
  const day = Math.min(selectedDate.value.getDate(), daysInNextMonth)

  emit('update:modelValue', toISODate(new Date(next.getFullYear(), next.getMonth(), day)))
}

watch(
  () => props.modelValue,
  (value) => {
    const date = parseDate(value)

    if (!date) {
      return
    }

    if (
      date.getFullYear() !== cursor.value.getFullYear() ||
      date.getMonth() !== cursor.value.getMonth()
    ) {
      cursor.value = new Date(date.getFullYear(), date.getMonth(), 1)
    }
  },
)
</script>

<style scoped>
.period {
  padding: 32px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 10px 30px var(--color-shadow-card);
}

.period__head {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.period__title {
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  color: var(--color-text-primary);
}

.period__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.period__control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: transparent;
  font-size: 18px;
  line-height: 1;
  color: var(--color-text-primary);
  transition:
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.period__control:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.period__month-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  color: var(--color-text-primary);
}

.period__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 16px;
}

.period__weekday {
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-secondary);
  text-transform: lowercase;
}

.period__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.period__day {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 50%;
  background-color: var(--color-bg);
  font-size: 13px;
  line-height: 18px;
  color: var(--color-text-primary);
  transition: background-color 0.2s ease-in-out;
}

.period__day:hover:not(:disabled) {
  background-color: var(--color-accent-light);
}

.period__day_empty {
  background-color: transparent;
  cursor: default;
}

.period__day_today {
  border: 1px solid var(--color-accent-border);
}

.period__day_selected {
  background-color: var(--color-accent-border);
  font-weight: 700;
}

@media screen and (max-width: 768px) {
  .period {
    padding: 20px 16px;
  }
}
</style>
