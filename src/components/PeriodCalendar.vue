<template>
  <section class="period">
    <h2 class="period__title">Период</h2>

    <div class="period__weekdays">
      <span v-for="day in weekdays" :key="day" class="period__weekday">{{ day }}</span>
    </div>

    <div ref="scrollRef" class="period__scroll">
      <div v-for="month in months" :key="month.key" :data-month="month.key" class="period__month">
        <p class="period__month-title">{{ month.title }}</p>

        <div class="period__grid">
          <template v-for="(day, index) in month.days" :key="`${month.key}-${index}`">
            <span v-if="!day" class="period__day period__day_empty" />
            <button
              v-else
              type="button"
              class="period__day"
              :class="{
                period__day_selected: isSelected(month.year, month.month, day),
                period__day_today: isToday(month.year, month.month, day),
              }"
              :aria-pressed="isSelected(month.year, month.month, day)"
              @click="selectDay(month.year, month.month, day)"
            >
              {{ day }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { formatMonthTitle, parseDate, toISODate } from '@/utils/format.js'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: '', end: '' }),
  },
})

const emit = defineEmits(['update:modelValue'])

const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

const MONTHS_BEFORE = 12
const MONTHS_AFTER = 12

const today = new Date()
const scrollRef = ref(null)

const monthKey = (year, month) => `${year}-${String(month + 1).padStart(2, '0')}`

const buildDays = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7
  const cells = Array.from({ length: firstWeekday }, () => null)

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day)
  }

  return cells
}

const months = computed(() =>
  Array.from({ length: MONTHS_BEFORE + MONTHS_AFTER + 1 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() + index - MONTHS_BEFORE, 1)

    return {
      key: monthKey(date.getFullYear(), date.getMonth()),
      year: date.getFullYear(),
      month: date.getMonth(),
      title: formatMonthTitle(date),
      days: buildDays(date.getFullYear(), date.getMonth()),
    }
  }),
)

const normalize = (a, b) => (a <= b ? { start: a, end: b } : { start: b, end: a })

const range = computed(() => {
  const start = toISODate(props.modelValue?.start)
  const end = toISODate(props.modelValue?.end)

  if (!start) {
    return { start: '', end: '' }
  }

  return normalize(start, end || start)
})

const isSelected = (year, month, day) => {
  if (!range.value.start) {
    return false
  }

  const iso = toISODate(new Date(year, month, day))

  return iso >= range.value.start && iso <= range.value.end
}

const isToday = (year, month, day) =>
  today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

const selectDay = (year, month, day) => {
  const iso = toISODate(new Date(year, month, day))
  const { start, end } = props.modelValue || {}

  if (!start || end) {
    emit('update:modelValue', { start: iso, end: '' })
    return
  }

  emit('update:modelValue', normalize(start, iso))
}

const scrollToMonth = async (value) => {
  const date = parseDate(value)

  if (!date) {
    return
  }

  await nextTick()

  const container = scrollRef.value
  const target = container?.querySelector(
    `[data-month="${monthKey(date.getFullYear(), date.getMonth())}"]`,
  )

  if (!container || !target) {
    return
  }

  container.scrollTop = target.offsetTop
}

onMounted(() => {
  if (range.value.start) {
    scrollToMonth(range.value.start)
  }
})

watch(
  () => props.modelValue?.start,
  (value) => {
    if (value) {
      scrollToMonth(value)
    }
  },
)
</script>

<style scoped>
.period {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 10px 30px var(--color-shadow-card);
}

.period__title {
  margin-bottom: 12px;
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  color: var(--color-text-primary);
}

.period__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
}

.period__scroll {
  position: relative;
  height: 320px;
  margin-top: 16px;
  padding-right: 10px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.period__scroll::-webkit-scrollbar {
  width: 4px;
}

.period__scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

.period__scroll::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: var(--color-border);
}

.period__month + .period__month {
  margin-top: 20px;
}

.period__month-title {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  color: var(--color-text-primary);
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
  border: 1px solid transparent;
  border-radius: 50%;
  background-color: var(--color-bg);
  font-size: 13px;
  line-height: 18px;
  color: var(--color-text-primary);
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.period__day:hover {
  background-color: var(--color-accent-light);
  color: var(--color-accent);
}

.period__day_empty {
  background-color: transparent;
}

.period__day_today {
  border-color: var(--color-accent-border);
}

.period__day_selected {
  background-color: var(--color-accent-light);
  font-weight: 600;
  color: var(--color-accent);
}

.period__day_selected:hover {
  background-color: var(--color-accent-border);
}

@media screen and (max-width: 768px) {
  .period {
    padding: 20px 16px;
  }

  .period__scroll {
    height: 260px;
  }
}
</style>
