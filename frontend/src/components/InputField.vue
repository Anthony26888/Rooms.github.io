<template lang="">
  <v-text-field
    variant="outlined"
    clearable
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :rules="[required]"
  ></v-text-field>
</template>
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
<style lang=""></style>
