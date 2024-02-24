<template>
  <v-stepper :items="['Tạo phòng', 'Thông tin người thuê']" width="700">
    <template v-slot:item.1>
      <v-card flat>
        <v-text-field label="Nhập tên phòng"></v-text-field>
        <v-text-field label="Nhập số tiền phòng"></v-text-field>
        <div class="d-flex justify-center">
          <v-checkbox label="Điện" color="red"></v-checkbox>
          <v-checkbox label="Nước" color="primary"></v-checkbox>
          <v-checkbox label="Rác" color="success"></v-checkbox>
          <v-checkbox label="Wifi" color="secondary"></v-checkbox>
          <v-checkbox label="Cáp" color="orange"> </v-checkbox>
        </div>
      </v-card>
    </template>

    <template v-slot:item.2>
      <v-card flat>
        <div>
          <v-select v-model="steps" :items="[2, 3, 4, 5, 6]" label="Số thành viên"></v-select>

          <v-stepper v-model="e1">
            <template v-slot:default="{ prev, next }">
              <v-stepper-header>
                <template v-for="n in steps" :key="`${n}-step`">
                  <v-stepper-item :complete="e1 > n" :step="`Step {{ n }}`" :value="n" editable></v-stepper-item>

                  <v-divider v-if="n !== steps" :key="n"></v-divider>
                </template>
              </v-stepper-header>

              <v-stepper-window>
                <v-stepper-window-item v-for="n in steps" :key="`${n}-content`" :value="n">
                  <div class="d-flex">
                    <v-text-field label="Họ và tên" class="ma-1 mb-1"></v-text-field>
                    <v-text-field label="Năm sinh" class="ma-1 mb-1"></v-text-field>
                    <v-select label="Giới tính"
                      :items="['Nam', 'Nữ']"></v-select>
                  </div>

                  <v-text-field label="Nhập số tiền phòng"></v-text-field>
                </v-stepper-window-item>
              </v-stepper-window>

              <v-stepper-actions :disabled="disabled" @click:prev="prev" @click:next="next"></v-stepper-actions>
            </template>
          </v-stepper>
        </div>
      </v-card>
    </template>
  </v-stepper>
</template>
<script>
export default {
  data() {
    return {
      e1: 1,
      steps: 2,
    };
  },
  computed: {
    disabled() {
      return this.e1 === 1
        ? "prev"
        : this.e1 === this.steps
          ? "next"
          : undefined;
    },
  },
};
</script>
<style lang=""></style>
