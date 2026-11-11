<script setup lang="ts">
import { useLocale } from '@dexa-ui/vue'

const { t, locale } = useLocale()
const keys = ['close', 'clear', 'confirm', 'cancel', 'loading', 'noData']
</script>

<template>
  <section class="pg-section">
    <h2>Locale: {{ locale.name }}</h2>
    <p>{{ keys.map((k) => t(`common.${k}`)).join(' · ') }}</p>
  </section>
</template>
