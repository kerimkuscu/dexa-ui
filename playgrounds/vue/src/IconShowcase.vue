<script setup lang="ts">
import { DxIcon } from '@dexa-ui/vue'
import { iconArrowRight, iconCheck, iconChevronRight, iconSpinner } from '@dexa-ui/icons'
import { allIcons, iconSizes, intents } from '../../shared/demo'
</script>

<template>
  <section class="pg-section">
    <h2>Icons</h2>
    <div class="pg-row">
      <DxIcon v-for="size in iconSizes" :key="size" :icon="iconCheck" :size="size" />
      <DxIcon
        v-for="intent in intents"
        :key="intent"
        :icon="iconCheck"
        :size="24"
        :color="`var(--dx-color-${intent})`"
      />
      <DxIcon :icon="iconSpinner" spin label="Loading" :size="24" />
      <span>Inline <DxIcon :icon="iconCheck" /> with text</span>
      <span dir="rtl"
        >RTL <DxIcon :icon="iconChevronRight" /> <DxIcon :icon="iconArrowRight"
      /></span>
    </div>
    <div class="pg-icons">
      <div v-for="icon in allIcons" :key="icon.name" class="pg-icon">
        <DxIcon :icon="icon" />
        {{ icon.name }}
      </div>
    </div>
  </section>
</template>
