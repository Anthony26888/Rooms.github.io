<template lang="">
  <v-text-field
    density="compact"
    label="Tìm kiếm"
    prepend-inner-icon="mdi-magnify"
    variant="solo"
    flat
    hide-details
    single-line
    clearable
    max-width="400"
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></v-text-field>
</template>
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
<style lang=""></style>
