<script setup lang="ts">
import { computed, ref } from 'vue'
import { DxConfigProvider, useTheme } from '@dexa-ui/vue'
import { en, tr } from '@dexa-ui/locales'
import { intents, surfaces, swatchStyles, themeOptions } from '../../shared/demo'
import LocaleMessages from './LocaleMessages.vue'

const { theme, setTheme } = useTheme()
const lang = ref<'en' | 'tr'>('en')
const locale = computed(() => (lang.value === 'tr' ? tr : en))
</script>

<template>
  <DxConfigProvider :locale="locale">
    <main class="pg">
      <header class="pg-bar">
        <h1>dexa-ui · Vue</h1>
        <select
          :value="theme"
          aria-label="Theme"
          @change="setTheme(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="t in themeOptions" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>
        <select v-model="lang" aria-label="Language">
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </header>

      <LocaleMessages />

      <section class="pg-section">
        <h2>Intents</h2>
        <div class="pg-grid">
          <div v-for="intent in intents" :key="intent" class="pg-swatch">
            <div :style="swatchStyles(intent).solid">{{ intent }}</div>
            <div :style="swatchStyles(intent).hover">hover</div>
            <div :style="swatchStyles(intent).subtle">subtle</div>
          </div>
        </div>
      </section>

      <section class="pg-section pg-surfaces">
        <h2>Surfaces</h2>
        <div class="pg-grid">
          <div v-for="s in surfaces" :key="s.name" :style="s.style">
            {{ s.name }}<br />
            <small style="color: var(--dx-text-muted)">muted text</small><br />
            <small style="color: var(--dx-text-subtle)">subtle text</small>
          </div>
        </div>
      </section>
    </main>
  </DxConfigProvider>
</template>
