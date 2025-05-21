<template>
  <v-select
    variant="outlined"
    v-model="selectedValue"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :item-text="itemText"
    :item-value="itemValue"
    :rules="rules"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :multiple="multiple"
    :chips="chips"
    :persistent-hint="persistentHint"
    :hint="hint"
    @change="emitChangeEvent"
  >
    <slot></slot>
  </v-select>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "VSelectCustom",
  props: {
    modelValue: [String, Number, Array, Object],
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    itemText: {
      type: String,
      default: "text",
    },
    itemValue: {
      type: String,
      default: "value",
    },
    rules: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    persistentHint: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        selectedValue.value = newValue;
      }
    );

    watch(selectedValue, (newValue) => {
      emit("update:modelValue", newValue);
    });

    const emitChangeEvent = (value) => {
      emit("change", value);
    };

    return {
      selectedValue,
      emitChangeEvent,
    };
  },
};
</script>
