<template>
  <div>
    <v-card variant="text" class="overflow-y-auto" height="100vh">
      <v-card-title>
        <h1 class="text-h5 font-weight-bold d-flex justify-space-between mb-4 align-center">
          Danh sách phòng
        </h1>
      </v-card-title>
      <v-card-text>
        <v-alert v-if="error" type="error" class="mb-4">
          {{ error }}
        </v-alert>

        <v-progress-linear
          v-if="loading"
          indeterminate
          class="mb-4"
        ></v-progress-linear>

        <v-data-iterator :items="rooms" :items-per-page="itemsPerPage">
          <template v-slot:header>
            <h1
              class="text-h5 font-weight-bold d-flex justify-space-between mb-4 align-center"
            >
              <v-btn
                color="primary"
                variant="tonal"
                class="text-caption ms-2"
                @click="DialogAdd = true"
                >Thêm phòng</v-btn
              >
              <v-btn
                color="orange"
                variant="tonal"
                class="text-caption ms-2"
                @click="GetService('rtx5ynv6su4127j')"
                >Dịch vụ</v-btn
              >
              <v-spacer></v-spacer>
              <InputSearch v-model="search" />
            </h1>
          </template>
          <template v-slot:default="{ items }">
            <v-row>
              <v-col
                v-for="(item, i) in items"
                :key="i"
                cols="12"
                sm="4"
                xl="3"
              >
                <v-card>
                  <v-list-item
                    :title="'Phòng ' + item.raw.Name"
                    :subtitle="item.raw.Location"
                    lines="two"
                  >
                    <template v-slot:title>
                      <strong class="text-h6">
                        Phòng {{ item.raw.Name }}
                      </strong>
                    </template>
                  </v-list-item>

                  <v-table class="text-caption" density="compact">
                    <tbody>
                      <tr align="right">
                        <th>Số người:</th>
                        <td>{{ item.raw.Members }}</td>
                      </tr>

                      <tr align="right">
                        <th>Tiền phòng:</th>
                        <td>{{ item.raw.Room_Charge }}đ</td>
                      </tr>

                      <tr align="right">
                        <th>Tiền cọc:</th>
                        <td>{{ item.raw.Deposit }}đ</td>
                      </tr>

                      <tr align="right">
                        <th>Số điện:</th>
                        <td>{{ item.raw.Electric }} kW</td>
                      </tr>

                      <tr align="right">
                        <th>Wifi:</th>
                        <td>{{ item.raw.Wifi ? "Có" : "Không" }}</td>
                      </tr>

                      <tr align="right">
                        <th>Cáp:</th>
                        <td>{{ item.raw.Cable ? "Có" : "Không" }}</td>
                      </tr>

                      <tr align="right">
                        <th>Trạng thái:</th>
                        <td>
                          {{ item.raw.Status }}
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      color="success"
                      variant="tonal"
                      class="text-caption"
                      @click="GetCalculation(item.raw.id, 'rtx5ynv6su4127j')"
                    >
                      Tính tiền
                    </v-btn>
                    <v-btn
                      color="primary"
                      variant="tonal"
                      class="text-caption"
                      @click="GetRoom(item.raw.id)"
                    >
                      Sửa
                    </v-btn>
                    <v-btn
                      color="orange"
                      variant="tonal"
                      class="text-caption"
                      @click="GetHistory(item.raw.id)"
                    >
                      Lịch sử
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                density="comfortable"
                icon="mdi-arrow-left"
                variant="tonal"
                rounded
                @click="prevPage"
              ></v-btn>

              <div class="mx-2 text-caption">
                Page {{ page }} of {{ pageCount }}
              </div>

              <v-btn
                :disabled="page >= pageCount"
                density="comfortable"
                icon="mdi-arrow-right"
                variant="tonal"
                rounded
                @click="nextPage"
              ></v-btn>
            </div>
          </template>
        </v-data-iterator>
      </v-card-text>
    </v-card>

    <v-dialog v-model="DialogAdd" width="400">
      <v-card max-width="400">
        <v-card-title class="d-flex align-center pa-4">
          <v-icon icon="mdi-plus" color="primary" class="me-2"></v-icon>
          Thêm phòng
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <InputField label="Tên phòng" v-model="Add_Name" />
            </v-col>
            <v-col cols="6">
              <InputSelect
                label="Vị trí"
                v-model="Add_Location"
                :items="itemsLocation"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <InputField
                type="number"
                label="Số người"
                v-model="Add_Members"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                type="number"
                label="Số điện"
                v-model="Add_Electric"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <InputField
                type="number"
                label="Tiền phòng"
                v-model="Add_Room_Charge"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                type="number"
                label="Tiền cọc"
                v-model="Add_Deposit"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <InputSelect
                label="Trạng thái"
                v-model="Add_Status"
                :items="itemsStatus"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-switch
                color="primary"
                label="Wifi"
                v-model="Add_Wifi"
              ></v-switch>
            </v-col>
            <v-col cols="6">
              <v-switch
                color="orange"
                label="Cáp"
                v-model="Add_Cable"
              ></v-switch>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <ButtonCancel @cancel="DialogAdd = false" />
          <ButtonSave @save="SaveAdd()" />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="DialogEdit" width="400">
      <v-card max-width="400">
        <v-card-title class="d-flex align-center pa-4">
          <v-icon icon="mdi-pencil" color="primary" class="me-2"></v-icon>
          Sửa phòng
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <InputField label="Tên phòng" v-model="Edit_Name" />
            </v-col>
            <v-col cols="6">
              <InputSelect
                label="Vị trí"
                v-model="Edit_Location"
                :items="itemsLocation"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <InputField
                type="number"
                label="Số người"
                v-model="Edit_Members"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                type="number"
                label="Số điện cũ"
                v-model="Edit_Electric_Old"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <InputField
                type="number"
                label="Tiền phòng"
                v-model="Edit_Room_Charge"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                type="number"
                label="Tiền cọc"
                v-model="Edit_Deposit"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <InputSelect
                label="Trạng thái"
                v-model="Edit_Status"
                :items="itemsStatus"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-switch
                color="primary"
                label="Wifi"
                v-model="Edit_Wifi"
              ></v-switch>
            </v-col>
            <v-col cols="6">
              <v-switch
                color="orange"
                label="Cáp"
                v-model="Edit_Cable"
              ></v-switch>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <ButtonRemove @remove="DialogRemove = true" />
          <v-spacer></v-spacer>
          <ButtonCancel @cancel="DialogEdit = false" />
          <ButtonSave @save="SaveEdit()" />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="DialogRemove" width="400">
      <v-card max-width="400">
        <v-card-title class="d-flex align-center pa-4">
          <v-icon icon="mdi-delete" color="error" class="me-2"></v-icon>
          Xóa phòng
        </v-card-title>
        <v-card-text> Bạn có chắc chắn muốn xóa phòng này không? </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <ButtonCancel @cancel="DialogRemove = false" />
          <ButtonRemove @remove="DeleteRoom()" />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="DialogCalculation" width="400">
      <v-card max-width="400">
        <v-card-title class="d-flex align-center pa-4">
          <v-icon icon="mdi-calculator" color="primary" class="me-2"></v-icon>
          Tính tiền
        </v-card-title>
        <v-card-subtitle>
          Phòng: {{ Calculation_Name }} - {{ Calculation_Location }}
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <InputField
                label="Số điện cũ"
                type="number"
                v-model="Calculation_Electric_Old"
                disabled
              />
            </v-col>
            <v-col cols="6">
              <InputField
                label="Số điện mới"
                type="number"
                v-model="Calculation_Electric_New"
              />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-table class="text-caption" density="compact">
            <tbody>
              <tr align="right">
                <th>Tiền phòng:</th>
                <td>{{ Calculation_RoomCharge.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th>Tiền điện:</th>
                <td>
                  ({{ Calculation_Electric_KW.toLocaleString() }} kW)
                  {{ Calculation_Electric.toLocaleString() }}
                </td>
              </tr>

              <tr align="right">
                <th>Tiền nước:</th>
                <td>{{ Calculation_Water.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th>Tiền wifi:</th>
                <td>{{ Calculation_Wifi.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th>Tiền cáp:</th>
                <td>{{ Calculation_Cable.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th>Tiền rác:</th>
                <td>{{ Calculation_Trash.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th><strong>Tổng tiền:</strong></th>
                <td><strong>{{ Calculation_Total.toLocaleString() }}</strong></td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <ButtonCancel @cancel="DialogCalculation = false" />
          <ButtonSave @save="SaveCalculation()" />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="DialogHistory" width="400">
      <v-card max-width="400">
        <v-card-title class="d-flex align-center pa-4"> Lịch sử </v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="history">
            <template #[`item.updated`]="{ item }">
              {{
                new Date(item.updated).toLocaleDateString("en-CA").replace(/-/g, "/")
              }}
            </template>
            <template #[`item.id`]="{ item }">
              <v-btn
                icon="mdi-eye"
                variant="text"
                size="small"
                @click="GetDetailHistory(item.id)"
              ></v-btn>
            </template>
            <template #[`item.Total`]="{ item }">
              {{ item.Total.toLocaleString() }}
            </template>
            <template #[`item.Electric_KW`]="{ item }">
              {{ item.Electric_KW.toLocaleString() }} kW
            </template>

            <template #bottom>
              <div class="text-center pt-2">
                <v-pagination
                  v-model="page"
                  :length="Math.ceil(history.length / 5)"
                ></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="DialogDetailHistory" width="400">
      <v-card max-width="400">
        <v-card-title class="d-flex align-center pa-4">
          Hoá đơn
        </v-card-title>
        <v-card-subtitle>
          Phòng: {{ Calculation_Name }} - {{ Calculation_Location }}
        </v-card-subtitle>
        <v-card-text>
          <v-table class="text-caption" density="compact">
            <tbody>
              <tr align="right">
                <th>Tiền phòng:</th>
                <td>{{ Calculation_RoomCharge_Detail.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th>Tiền điện:</th>
                <td>
                  ({{ Calculation_Electric_KW_Detail.toLocaleString() }} kW)
                  {{ Calculation_Electric_Detail.toLocaleString() }}
                </td>
              </tr>

              <tr align="right">
                <th>Tiền nước:</th>
                <td>{{ Calculation_Water_Detail.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th>Tiền wifi:</th>
                <td>{{ Calculation_Wifi_Detail.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th>Tiền cáp:</th>
                <td>{{ Calculation_Cable_Detail.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th>Tiền rác:</th>
                <td>{{ Calculation_Trash_Detail.toLocaleString() }}</td>
              </tr>

              <tr align="right">
                <th><strong>Tổng tiền:</strong></th>
                <td><strong>{{ Calculation_Total_Detail.toLocaleString() }}</strong></td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="DialogService" width="400">
      <v-card max-width="400">
        <v-card-title class="d-flex align-center pa-4">
          <v-icon icon="mdi-calculator" color="primary" class="me-2"></v-icon>
          Tiền dịch vụ
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <InputField
                label="Tiền điện 50 kW"
                type="number"
                v-model="Electric_Service_50"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                label="Tiền điện 100 kW"
                type="number"
                v-model="Electric_Service_100"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                label="Tiền điện 200 kW"
                type="number"
                v-model="Electric_Service_200"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                label="Tiền điện 300 kW"
                type="number"
                v-model="Electric_Service_300"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                label="Tiền điện 400 kW"
                type="number"
                v-model="Electric_Service_400"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <InputField
                label="Tiền nước"
                type="number"
                v-model="Water_Service"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                label="Tiền rác"
                type="number"
                v-model="Trash_Service"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <InputField
                label="Tiền wifi"
                type="number"
                v-model="Wifi_Service"
              />
            </v-col>
            <v-col cols="6">
              <InputField
                label="Tiền cáp"
                type="number"
                v-model="Cable_Service"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <ButtonCancel @cancel="DialogService = false" />
          <ButtonSave @save="Service()" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-snackbar v-model="Snackbar_Success" color="success" :timeout="timeout">
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import axios from "axios";
import InputSearch from "@/components/InputSearch.vue";
import InputField from "@/components/InputField.vue";
import InputSelect from "@/components/InputSelect.vue";
import ButtonCancel from "@/components/ButtonCancel.vue";
import ButtonSave from "@/components/ButtonSave.vue";
import ButtonRemove from "@/components/ButtonRemove.vue";
import { useRooms } from "@/composables/useRooms";
import { useService } from "@/composables/useService";
import { useHistory } from "@/composables/useHistory";

const Get_Id = ref(null);
const { rooms } = useRooms();
const { services } = useService();
const history = ref([]);

const Url = import.meta.env.VITE_APP_URL;

const itemsPerPage = ref(3);
const search = ref("");
const DialogAdd = ref(false);
const DialogEdit = ref(false);
const DialogRemove = ref(false);
const DialogCalculation = ref(false);
const DialogService = ref(false);
const DialogHistory = ref(false);
const DialogDetailHistory = ref(false);

const Add_Name = ref("");
const Add_Location = ref("");
const Add_Members = ref(0);
const Add_Room_Charge = ref(0);
const Add_Electric = ref(0);
const Add_Wifi = ref(null);
const Add_Cable = ref(null);
const Add_Status = ref(null);

const Edit_Name = ref("");
const Edit_Location = ref("");
const Edit_Members = ref(0);
const Edit_Room_Charge = ref(0);
const Edit_Electric_Old = ref(0);
const Edit_Wifi = ref(false);
const Edit_Cable = ref(false);
const Edit_Status = ref(true);
const itemsLocation = ref(["Dãy cũ", "Dãy mới"]);
const itemsStatus = ref(["Còn trống", "Đã cho thuê"]);

const Electric_Service_50 = ref(0);
const Electric_Service_100 = ref(0);
const Electric_Service_200 = ref(0);
const Electric_Service_300 = ref(0);
const Electric_Service_400 = ref(0);
const Water_Service = ref(0);
const Trash_Service = ref(0);
const Wifi_Service = ref(0);
const Cable_Service = ref(0);

const Calculation_Name = ref("");
const Calculation_Location = ref("");
const Calculation_RoomCharge = ref(0);
const Calculation_Electric_Old = ref(0);
const Calculation_Electric_New = ref(0);
const Calculation_Electric_KW = ref(0);
const Calculation_Water = ref(0);
const Calculation_Trash = ref(0);
const Calculation_Wifi = ref(0);
const Calculation_Cable = ref(0);

const Calculation_RoomCharge_Detail = ref(0);
const Calculation_Electric_Detail = ref(0);
const Calculation_Electric_KW_Detail = ref(0);
const Calculation_Water_Detail = ref(0);
const Calculation_Trash_Detail = ref(0);
const Calculation_Wifi_Detail = ref(0);
const Calculation_Cable_Detail = ref(0);
const Calculation_Total_Detail = ref(0);

const headers = ref([
{ title: "Xem", key: "id" },
  { title: "Ngày", key: "updated" },
  { title: "Số tiền", key: "Total" },
  { title: "Số điện", key: "Electric_KW" }
]);

const Snackbar_Success = ref(false);
const message = ref("");
const timeout = ref(2000);

const Calculation_Total = computed(() => {
  return (
    Calculation_RoomCharge.value +
    Calculation_Electric.value +
    Calculation_Water.value +
    Calculation_Trash.value +
    Calculation_Wifi.value +
    Calculation_Cable.value
  );
});

const Calculation_Electric = computed(() => {
  const difference =
    Calculation_Electric_New.value - Calculation_Electric_Old.value;
  if (difference > 0) {
    Calculation_Electric_KW.value = difference;
  } else {
    Calculation_Electric_KW.value = 0;
  }

  if (difference <= 0) {
    return 0;
  }

  if (difference <= 50) {
    return difference * Electric_Service_50.value;
  } else if (difference <= 100) {
    return 50 * Electric_Service_50.value + (difference - 50) * Electric_Service_100.value;
  } else if (difference <= 200) {
    return 50 * Electric_Service_50.value + 50 * Electric_Service_100.value + (difference - 100) * Electric_Service_200.value;
  } else if (difference <= 300) {
    return 50 * Electric_Service_50.value + 50 * Electric_Service_100.value + 100 * Electric_Service_200.value + (difference - 200) * Electric_Service_300.value;
  } else if (difference <= 400) {
    return 50 * Electric_Service_50.value + 50 * Electric_Service_100.value + 100 * Electric_Service_200.value + 100 * Electric_Service_300.value + (difference - 300) * Electric_Service_400.value;
  } else {
    return 0;
  }
});

const GetRoom = async (id) => {
  DialogEdit.value = true;
  const found = rooms.value.find((room) => room.id === id);

  if (found) {
    Get_Id.value = found.id;
    Edit_Name.value = found.Name;
    Edit_Location.value = found.Location;
    Edit_Members.value = found.Members;
    Edit_Room_Charge.value = found.Room_Charge;
    Edit_Wifi.value = found.Wifi;
    Edit_Cable.value = found.Cable;
    Edit_Status.value = found.Status;
  } else {
    console.error("Room not found");
  }
};

const GetService = async (id) => {
  DialogService.value = true;
  const found = services.value.find((service) => service.id === id);
  Get_Id.value = found.id;
  Electric_Service_50.value = found.Electric_50;
  Electric_Service_100.value = found.Electric_100;
  Electric_Service_200.value = found.Electric_200;
  Electric_Service_300.value = found.Electric_300;
  Electric_Service_400.value = found.Electric_400;
  Water_Service.value = found.Water;
  Trash_Service.value = found.Trash;
  Wifi_Service.value = found.Wifi;
  Cable_Service.value = found.Cable;
};

const GetCalculation = async (id, serviceId) => {
  DialogCalculation.value = true;
  Get_Id.value = id;
  const found = rooms.value.find((room) => room.id === id);
  if (found) {
    Calculation_Name.value = found.Name;
    Calculation_Location.value = found.Location;
    Calculation_RoomCharge.value = found.Room_Charge;
    Calculation_Electric_Old.value = found.Electric;
  } else {
    console.error("Room not found");
  }
  const foundService = services.value.find(
    (service) => service.id === serviceId
  );
  if (foundService) {
    Calculation_Water.value = foundService.Water;
    Calculation_Trash.value = foundService.Trash;
    Calculation_Wifi.value = foundService.Wifi;
    Calculation_Cable.value = foundService.Cable;
    Electric_Service_50.value = foundService.Electric_50;
    Electric_Service_100.value = foundService.Electric_100;
    Electric_Service_200.value = foundService.Electric_200;
    Electric_Service_300.value = foundService.Electric_300;
    Electric_Service_400.value = foundService.Electric_400;
  } else {
    console.error("Service not found");
  }
};

const GetHistory = async (id) => {
  DialogHistory.value = true;
  Get_Id.value = id;
  const found = rooms.value.find((room) => room.id === id);
  if (found) {
    Calculation_Name.value = found.Name;
    Calculation_Location.value = found.Location;
  }
  const { history: historyData, cleanup } = useHistory(id);

  // Đợi dữ liệu được cập nhật
  watch(historyData, (newValue) => {
    history.value = newValue;
  }, { immediate: true, deep: true });

  // Cleanup khi dialog đóng
  watch(DialogHistory, (newValue) => {
    if (!newValue) {
      cleanup();
    }
  });
};

const GetDetailHistory = async (id) => {
  DialogDetailHistory.value = true;
  Get_Id.value = id;
  const found = history.value.find((history) => history.id === id);
  if (found) {
    Calculation_RoomCharge_Detail.value = found.Room_Charge;
    Calculation_Electric_Detail.value = found.Electric_Charge;
    Calculation_Water_Detail.value = found.Water;
    Calculation_Trash_Detail.value = found.Trash;
    Calculation_Wifi_Detail.value = found.Wifi;
    Calculation_Cable_Detail.value = found.Cable;
    Calculation_Total_Detail.value = found.Total;
  }
};

const Service = async () => {
  DialogService.value = true;
  const services = {
    Electric_50: Electric_Service_50.value,
    Electric_100: Electric_Service_100.value,
    Electric_200: Electric_Service_200.value,
    Electric_300: Electric_Service_300.value,
    Electric_400: Electric_Service_400.value,
    Water: Water_Service.value,
    Trash: Trash_Service.value,
    Wifi: Wifi_Service.value,
    Cable: Cable_Service.value,
  };
  try {
    await axios.put(`${Url}/api/services/${Get_Id.value}`, services);
    DialogService.value = false;
    message.value = "Thêm dịch vụ thành công";
    Snackbar_Success.value = true;
  } catch (error) {
    console.error("Error adding service:", error);
  }
};

const SaveAdd = async () => {
  const room = {
    Name: Add_Name.value,
    Location: Add_Location.value,
    Members: Add_Members.value,
    Room_Charge: Add_Room_Charge.value,
    Electric: Add_Electric.value,
    Wifi: Add_Wifi.value,
    Cable: Add_Cable.value,
    Status: Add_Status.value,
  };
  try {
    await axios.post(`${Url}/api/rooms`, room);
    DialogAdd.value = false;
    message.value = "Thêm phòng thành công";
    Snackbar_Success.value = true;
  } catch (error) {
    console.error("Error adding room:", error);
  }
};

const SaveEdit = async () => {
  const room = {
    Name: Edit_Name.value,
    Location: Edit_Location.value,
    Members: Edit_Members.value,
    Room_Charge: Edit_Room_Charge.value,
    Electric: Edit_Electric_Old.value,
    Wifi: Edit_Wifi.value,
    Cable: Edit_Cable.value,
    Status: Edit_Status.value,
  };
  try {
    await axios.put(`${Url}/api/rooms/${Get_Id.value}`, room);
    DialogEdit.value = false;
    message.value = "Sửa phòng thành công";
    Snackbar_Success.value = true;
  } catch (error) {
    console.error("Error updating room:", error);
  }
};

const DeleteRoom = async () => {
  try {
    await axios.delete(`${Url}/api/rooms/${Get_Id.value}`);
    DialogRemove.value = false;
    DialogEdit.value = false;
    message.value = "Xóa phòng thành công";
    Snackbar_Success.value = true;
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};

const SaveCalculation = async () => {
  const calculation = {
    Name: Calculation_Name.value,
    Location: Calculation_Location.value,
    Room_Charge: Calculation_RoomCharge.value,
    Electric_Old: Calculation_Electric_Old.value,
    Electric_New: Calculation_Electric_New.value,
    Electric_KW: Calculation_Electric_KW.value,
    Electric_Charge: Calculation_Electric.value,
    Water: Calculation_Water.value,
    Trash: Calculation_Trash.value,
    Wifi: Calculation_Wifi.value,
    Cable: Calculation_Cable.value,
    Total: Calculation_Total.value,
    Room_Id: Get_Id.value,
  };
  try {
    await axios.post(`${Url}/api/history`, calculation);
    await axios.put(`${Url}/api/rooms/electric/${Get_Id.value}`, {
      Electric: Calculation_Electric_New.value,
    });
    message.value = "Tính toán thành công";
    Snackbar_Success.value = true;
    DialogCalculation.value = false;
  } catch (error) {
    message.value = "Lỗi khi tính toán";
    Snackbar_Success.value = true;
    console.error("Error updating calculation:", error);
  }
};
</script>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.text-title {
  font-size: 1.2rem;
  font-weight: 500;
}

.text-num {
  font-size: 1.5rem;
  font-weight: 600;
}

.text-green {
  color: #28a745;
}

.text-red {
  color: #dc3545;
}
</style>
