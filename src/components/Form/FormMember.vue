<template lang="">
  <!--Edit of member-->
  <v-dialog v-model="edit" width="500" transition="dialog-bottom-transition">
    <v-card title="Chỉnh sửa">
      <template v-slot:append>
        <v-btn
          class="mx-auto"
          variant="text"
          icon="mdi-close"
          @click="edit = false"
        ></v-btn>
      </template>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Họ và tên"
              v-model=""
            ></v-text-field>
            <v-text-field
              label="Năm sinh"
              v-model=""
            ></v-text-field>
            <v-text-field
              label="Số điện thoại"
              v-model=""
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              label="Giới tính"
              :items="['Nam', 'Nữ']"
              v-model=""
            ></v-select>
            <v-text-field
              label="Căn cước công nhân"
              v-model=""
            ></v-text-field>
            <v-text-field
              label="Công việc"
              v-model=""
            ></v-text-field>
          </v-col>
          <v-text-field
            label="Quê quán"
            v-model=""
          ></v-text-field>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="edit = false">Lưu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {};
</script>
<style lang=""></style>
