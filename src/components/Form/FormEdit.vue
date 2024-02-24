<template>
  <v-stepper
    alt-labels
    :items="['Step 1', 'Step 2', 'Step 3']"
    width="500"
    height="500"
  >
    <template v-slot:item.1>
      <v-card flat>
        <v-container>
          <v-text-field label="Nhập tên phòng"></v-text-field>
          <v-text-field label="Nhập số tiền phòng"></v-text-field>
          <v-checkbox
            v-model="ex4"
            label="primary"
            color="primary"
            value="primary"
            hide-details
          ></v-checkbox>
        </v-container>
      </v-card>
    </template>

    <template v-slot:item.2>
      <v-card title="Step Two" flat>...</v-card>
    </template>

    <template v-slot:item.3>
      <v-card title="Step Three" flat>...</v-card>
    </template>
  </v-stepper>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
<style lang=""></style>
