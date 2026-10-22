<template>
  <section class="period">
    <h2 class="period__title">Период</h2>

    <div class="period__weekdays">
      <span v-for="day in weekdays" :key="day" class="period__weekday">{{ day }}</span>
    </div>

    <div class="period__months">
      <div v-for="month in months" :key="month.title" class="period__month">
        <h3 class="period__month-title">{{ month.title }}</h3>
        <div class="period__grid">
          <span
            v-for="(day, index) in month.days"
            :key="`${month.title}-${index}`"
            class="period__day"
            :class="{
              'period__day_empty': !day,
              'period__day_selected': isSelected(month.title, day),
            }"
          >
            {{ day }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  selectedMonth: {
    type: String,
    default: 'Июль 2024',
  },
  selectedDay: {
    type: Number,
    default: 10,
  },
})

const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

const months = [
  {
    title: 'Июль 2024',
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31,
    ],
  },
  {
    title: 'Август 2024',
    days: [
      null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
]

const isSelected = (monthTitle, day) =>
  monthTitle === props.selectedMonth && day === props.selectedDay
</script>

<style scoped>
.period {
  padding: 32px;
  border-radius: 20px;
  background-color: var(--color-bg-white);
  box-shadow: 0 10px 30px var(--color-shadow-card);
}

.period__title {
  margin-bottom: 20px;
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
  margin-bottom: 16px;
}

.period__weekday {
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-secondary);
  text-transform: lowercase;
}

.period__months {
  max-height: 420px;
  overflow-y: auto;
  padding-right: 6px;
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
  border-radius: 50%;
  background-color: var(--color-bg);
  font-size: 13px;
  line-height: 18px;
  color: var(--color-text-primary);
}

.period__day_empty {
  background-color: transparent;
}

.period__day_selected {
  background-color: var(--color-accent-border);
}

@media screen and (max-width: 768px) {
  .period {
    padding: 20px 16px;
  }
}
</style>
