<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <BaseLogo to="/" />

        <nav class="header__nav">
          <router-link
            v-for="link in links"
            :key="link.name"
            :to="link.to"
            class="header__link"
            exact-active-class="header__link_active"
          >
            {{ link.title }}
          </router-link>
        </nav>

        <button type="button" class="header__exit _hover02" @click="$emit('exit')">Выйти</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import BaseLogo from '@/components/BaseLogo.vue'

defineEmits(['exit'])

const links = [
  { name: 'home', title: 'Мои расходы', to: '/' },
  { name: 'analysis', title: 'Анализ расходов', to: '/analysis' },
]
</script>

<style scoped>
.header {
  width: 100%;
  background-color: var(--color-bg-white);
}

.header__block {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.header__block > .logo {
  flex: 1;
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.header__exit {
  flex: 1;
  text-align: right;
}

.header__link {
  position: relative;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-primary);
  padding-bottom: 2px;
}

.header__link_active {
  color: var(--color-accent);
  border-bottom: 1px solid var(--color-accent);
}

.header__exit {
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-text-primary);
}

@media screen and (max-width: 768px) {
  .header__block {
    height: 60px;
    gap: 12px;
  }

  .header__nav {
    gap: 12px;
  }
}
</style>
