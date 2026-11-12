<script setup lang="ts">
import { ref } from 'vue'
import { DxButton, DxButtonGroup } from '@dexa-ui/vue'
import { buttonVariants, intents, sizes } from '../../shared/demo'

const loading = ref(false)
function save() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
  <section class="pg-section">
    <h2>Buttons</h2>
    <div v-for="variant in buttonVariants" :key="variant" class="pg-row">
      <DxButton v-for="intent in intents" :key="intent" :intent="intent" :variant="variant">
        {{ intent }}
      </DxButton>
    </div>
    <div class="pg-row">
      <DxButton v-for="size in sizes" :key="size" :size="size">Size {{ size }}</DxButton>
      <DxButton pill>Pill</DxButton>
      <DxButton icon-only aria-label="Add">+</DxButton>
      <DxButton :loading="loading" @click="save">
        <template #start>★</template>
        Save
      </DxButton>
      <DxButton disabled>Disabled</DxButton>
      <DxButton href="#" variant="outline" intent="secondary">Link</DxButton>
    </div>
    <div class="pg-row">
      <DxButtonGroup aria-label="Alignment" variant="outline" intent="secondary">
        <DxButton>Left</DxButton>
        <DxButton>Center</DxButton>
        <DxButton>Right</DxButton>
      </DxButtonGroup>
      <DxButtonGroup aria-label="Actions">
        <DxButton>One</DxButton>
        <DxButton>Two</DxButton>
        <DxButton>Three</DxButton>
      </DxButtonGroup>
      <DxButtonGroup dir="rtl" aria-label="RTL" variant="soft">
        <DxButton>يمين</DxButton>
        <DxButton>وسط</DxButton>
        <DxButton>يسار</DxButton>
      </DxButtonGroup>
      <DxButtonGroup vertical aria-label="Vertical" variant="outline" intent="secondary">
        <DxButton>Top</DxButton>
        <DxButton>Bottom</DxButton>
      </DxButtonGroup>
    </div>
  </section>
</template>
