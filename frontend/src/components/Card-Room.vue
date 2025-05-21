<template>
  <v-card
    class="card-room rounded-lg"
    :title="title"
    :subtitle="subtitle"
    variant="flat"
  >
    <template v-slot:prepend>
      <v-avatar color="blue-darken-2">
        <v-icon icon="mdi-home"></v-icon>
      </v-avatar>
    </template>
    <template v-slot:append>
      <div class="ribbon-wrap">
        <div class="ribbon bg-success" v-if="status == 'true'">
          Đã thuê
        </div>
        <div class="ribbon bg-red" v-else>Trống</div>
      </div>
    </template>
    <v-card-text>
      <p><b>Số người:</b> {{ qty }} người</p>
      <p>
        <b>Tiền phòng:</b>
        {{ Number(roomcharge).toLocaleString("en-GB") }}
      </p>
      <div class="d-flex">
        <b>Dịch vụ thêm:</b>
        <p v-if="wifi == true" class="ms-2">Wifi</p>
        <p v-if="cable == true" class="ms-2">Cáp</p>
      </div>
      <p>
        <b>Tiền cọc:</b>
        {{ Number(deposit).toLocaleString("en-GB") }}
      </p>
      <p><b>Ngày vào:</b> {{ date }}</p>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex flex-wrap justify-center algin-center mx-auto">
        <div class="ma-1 mb-1">
          <v-btn
            class="button-card"
            color="primary"
            variant="tonal"
            icon="mdi-account-group"
            @click="$emit('view-profile')"
          >
          </v-btn>
        </div>
        <div class="ma-1 mb-1">
          <v-btn
            class="button-card"
            color="orange"
            variant="tonal"
            icon="mdi-home-edit"
            @click="$emit('edit-room')"
          >
          </v-btn>
        </div>
        <div class="ma-1 mb-1">
          <v-btn
            class="button-card"
            color="success"
            variant="tonal"
            icon="mdi-calculator-variant"
            @click="$emit('calculate-charge')"
          >
          </v-btn>
        </div>
        <div class="ma-1 mb-1">
          <v-btn
            class="button-card"
            color="red"
            variant="tonal"
            icon="mdi-close-circle"
            @click="$emit('notify-room')"
          >
          </v-btn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  qty: {
    type: [String, Number],
    required: true,
  },
  roomcharge: {
    type: [String, Number],
    required: true,
  },
  wifi: {
    type: String,
    default: "false",
  },
  cable: {
    type: String,
    default: "false",
  },
  deposit: {
    type: [String, Number],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

defineEmits(["view-profile", "edit-room", "calculate-charge", "notify-room"]);
</script>

<style scoped>
.card-room {
  position: relative;
  margin: 10px;
}

.ribbon-wrap {
  width: 120px;
  height: 50px;
}
.ribbon {
  width: 200px;
  font-size: 0.8rem;
  text-align: center;
  padding: 5px 0;
  transform: rotate(40deg);
}

.ribbon span {
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  line-height: 20px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79a70a;
  background: linear-gradient(#9bc90d 0%, #79a70a 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  right: -21px;
}

.ribbon span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #79a70a;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79a70a;
}

.ribbon span::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid transparent;
  border-right: 3px solid #79a70a;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79a70a;
}

.bg-success {
  background: #28a745 !important;
}

.bg-red {
  background: #dc3545 !important;
}
</style>
