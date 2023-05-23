<template>
  <div>
    <BaseContentTitleVue :title="titleF"></BaseContentTitleVue>
    <div class="table">
      <div class="material_function">
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-add" colorIcon="#2281c1" val="Thêm"
          styleCss="padding:0 8px" @click="addForm" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-copy" colorIcon="#2281c1"
          val="Nhân bản" styleCss="padding:0 8px" @click="duplicateForm" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-pen-to-square" colorIcon="#2281c1"
          val="Sửa" styleCss="padding:0 8px" @click="updateForm" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-xmark" colorIcon="red" val="Xóa"
          styleCss="padding:0 8px" @click="deleteItem" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-rotate" colorIcon="#2281c1"
          val="Nạp" styleCss="padding:0 8px" @click="reloadTablePageChoice" />
      </div>
      <div class="table__content">
        <BaseLoading v-if="isLoading"></BaseLoading>
        <table class="m-table" border="1">
          <thead>
            <tr>
              <th style="min-width: 500px; border: 1px solid #bbb">
                <div style="margin-top: 8px; font-weight: 100">Đơn vị tính</div>
                <div style="display: flex; min-width: 100%; margin: 8px 0">
                  <BaseFilterSearch type="string" field="conversionUnitName" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 500px; border: 1px solid #bbb">
                <div style="margin-top: 8px; font-weight: 100">Diễn giải</div>
                <div style="display: flex; min-width: 100%; margin: 8px 0">
                  <BaseFilterSearch type="string" field="description" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="width: calc(100% - 1000px); border: 1px solid #bbb">
                <div style="margin-top: 8px; font-weight: 100">
                  Ngừng theo dõi
                </div>
                <div style="display: flex; margin: 8px 0">
                  <BaseSelectBoxDown :data="[
                    { status: 'Có', value: '2' },
                    { status: 'Không', value: '1' },
                  ]" :style="`background-color: #fff;`" fieldNameShow="status" fieldNameValue="value"
                    fieldName="status" :setData="dataFilter.find((item) => item.field == 'status').value
                      " @getValue="changeFilterStatus" :fieldListHide="[{ field: 'status' }]">
                  </BaseSelectBoxDown>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataTable" :key="index" @dblclick="dbUpdateForm(item)" @click="trClick(item)"
              :class="{
                'row-selected': dataSelceted == item,
              }">
              <td class="text-align-left">{{ item.conversionUnitName }}</td>
              <td class="text-align-left">{{ item.description }}</td>
              <td class="text-align-center" style="padding-left: 100px; z-index: 0">
                <BaseCheckBox class="checkbox_table_status" disable :modelCheckbox="item.status == '2'"
                  :value="item.status" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="notFound" v-show="showNotFound">
          <img src="@/assets/Image/Nodata.jpg" alt="" />
          <p>{{ this.label }}</p>
        </div>
      </div>
      <div class="table__paging">
        <BaseContentButtom :totalCount="totalRecord" :totalPage="totalPage" :pageSize="pageSize" ref="pageNumber"
          @getDataNumberTable="getDataNumberTable" @reloadAll="reloadTable"></BaseContentButtom>
      </div>
    </div>
    <TheFormUnit v-if="showForm" @onClose="showForm = false" :id="id" :type="type" @saveDataSucces="saveDataSucces"
      @saveDataFail="saveDataFail" @saveDataAndAddSuccess="saveDataAndAddSuccess" @saveDataAndAddFail="saveDataAndAddFail"
      @getNewForm="getNewForm"></TheFormUnit>
    <BaseToast v-if="toast.isShowToast" :icon="toast.iconToast" :message="toast.messageToast"
      @closeToast="closeToastItem()"></BaseToast>
    <BasePopUp v-if="popup.isShowPopup" :message="popup.messagePopup" :type="popup.typePopup" @closePopup="customPopup()"
      @clickWarningDeleteYes="popup.callbackFunc.callbackWarningDeleteYes" />
  </div>
</template>
  
<script>
import BaseContentTitleVue from "../base/BaseContentTitle.vue";
import Resource from "../../js/resource";
import BaseFilterSearch from "../base/BaseFilterSearch.vue";
import BaseLoading from "../base/BaseLoading.vue";
import BaseContentButtom from "../base/BaseContentButtom.vue";
import unitService from "../../js/apiUnit";
import callAPI from "@/js/callAxios";
import BaseCheckBox from "../base/BaseCheckBox.vue";
import BaseSelectBoxDown from "../base/BaseSelectBoxDown.vue";
import TheFormUnit from "./TheFormUnit.vue";
import BaseButtonIcon from "../base/BaseButtonIcon.vue";
import BaseToast from "../base/BaseToast.vue";
import BasePopUp from "../base/BasePopUp.vue";
import { fetchAPI } from "@/js/common";
export default {
  name: "BaseUnit",
  props: [""],
  components: {
    BaseContentTitleVue,
    BaseFilterSearch,
    BaseLoading,
    BaseContentButtom,
    BaseCheckBox,
    BaseSelectBoxDown,
    TheFormUnit,
    BaseButtonIcon,
    BaseToast,
    BasePopUp,
  },
  data() {
    return {
      titleF: Resource.TitleContent.Unit,
      dataTable: [],
      dataFilter: [
        {
          field: "status",
          operater: "=",
          value: "1",
        },
      ],
      pageChoice: 1,
      // Khởi tạo giá trị của page là 20 bản ghi/ trang
      pageSize: 20,
      sort: "",
      isLoading: false,
      totalRecord: 0,
      totalPage: 0,
      showForm: false,
      TYPE_FORM: {},
      id: "",
      type: "",
      dataSelceted: {},
      label: Resource.Nodata,
      showNotFound: false,
      // Toast
      toast: {
        isShowToast: false, // Trạng thái ẩn hiện toast
        iconToast: "", // icon toast
        messageToast: "", //message toast
      },
      reloadPage: false,
      //Popup
      popup: {
        isShowPopup: false, // Trạng thái ẩn hiện popup
        messagePopup: "", // nội dung popup
        typePopup: "", // loại popup
        callbackFunc: {
          callbackWarningDeleteYes: () => { }, // xử lý khi click không popup question
        },
      },
    };
  },
  methods: {
    changeFilter(value) {
      try {
        if (value.filterVal != "") {
          // Tạo đối tượng search lọc thông tin
          var addFilter = {
            field: value.field,
            operater: value.filterType,
            value: value.filterVal,
          };
          // Xóa phần tử cần tìm kiếm nếu có Field cần search trùng với addFilter vừa tạo ở trên
          this.dataFilter = this.dataFilter.filter((data) => {
            return data.field != addFilter.field;
          });
          this.dataFilter.push(addFilter);
          this.getPaging(
            this.pageSize,
            this.pageChoice,
            this.sort,
            this.dataFilter
          );
        } else {
          this.dataFilter = this.dataFilter.filter((data) => {
            return data.field != value.field;
          });
          this.getPaging(
            this.pageSize,
            this.pageChoice,
            this.sort,
            this.dataFilter
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    getPaging(pageSize, pageChoice, sort, dataFilter) {
      try {
        this.isLoading = true;
        const data = callAPI(
          "POST",
          unitService.filterAndPaging(pageSize, pageChoice, sort),
          dataFilter
        );
        data.then((res) => {
          if (res.data.length > 0) {
            this.isLoading = false;
            this.dataTable = res.data;
            this.totalRecord = res.totalCount;
            this.totalPage = res.totalPage;
            this.showNotFound = false;
            this.dataSelceted = this.dataTable[0];
          } else {
            this.isLoading = false;
            this.dataTable = res.data;
            this.totalRecord = res.totalCount;
            this.totalPage = res.totalPage;
            this.showNotFound = true;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    changeFilterStatus(value) {
      if (value) {
        // Thông tin gửi lên server search
        var addFilter = {
          field: value.fieldName,
          operater: "=",
          value: value.val,
        };
        this.dataFilter = this.dataFilter.filter((data) => {
          return data.field != addFilter.field;
        });
        this.dataFilter.push(addFilter);
        // call lấy data
        this.getPaging(
          this.pageSize,
          this.pageChoice,
          this.sort,
          this.dataFilter
        );
      }
    },
    reloadTablePageChoice() {
      this.$emit("update:pageSize", 20)
    },

    reloadTable() {
      this.pageChoice = 1;
      this.dataFilter = [
        {
          field: "status",
          operater: "=",
          value: "1",
        },
      ];
      this.sort = "";
      this.getPaging(
        this.pageSize,
        this.pageChoice,
        this.sort,
        this.dataFilter
      );
    },

    getDataNumberTable(data) {
      this.getPaging(
        data.pageSize,
        data.pageNumber,
        this.sort,
        this.dataFilter
      );
      // console.log(data);
    },

    addForm() {
      this.showForm = true;
      this.id = null;
      this.type = Resource.TYPE_FORM.ADD;
    },

    trClick(data) {
      this.dataSelceted = data;
      console.log("data", this.dataSelceted);
    },

    duplicateForm() {
      if (this.dataSelceted.conversionUnitId) {
        this.showForm = true;
        this.id = this.dataSelceted.conversionUnitId;
        this.type = Resource.TYPE_FORM.DUPLICATE;
      }
    },

    updateForm() {
      if (this.dataSelceted.conversionUnitId) {
        this.showForm = true;
        this.id = this.dataSelceted.conversionUnitId;
        this.type = Resource.TYPE_FORM.UPDATE;
      }
    },

    dbUpdateForm(data) {
      this.showForm = true;
      this.id = data.conversionUnitId;
      this.type = Resource.TYPE_FORM.UPDATE;
    },

    deleteItem() {
      if (this.dataSelceted && this.popup.callbackFunc) {
        // show popup xác nhận xóa
        this.customPopup(
          true,
          `${Resource.ERROR_VALIDATE_FE.QuestionDeleteUnit} << ${this.dataSelceted.conversionUnitName} >> ?`,
          Resource.VUE_APP_POPUP.WARNING_DEL
        );
        // Hàm xử lý khi click có
        this.popup.callbackFunc.callbackWarningDeleteYes = () => {
          // Call API xóa
          fetchAPI(
            unitService.deleteRecord(this.dataSelceted.conversionUnitId),
            Resource.HTTP_METHOD.DELETE,
            (res) => {
              console.log(res);
              if (res == Resource.Response.Success) {
                this.customPopup();
                this.deleteSuccess();
              } else {
                this.customPopup();
                this.deleteFail();
              }
            }
          );
        };
      } else if (!this.dataSelceted && this.popup.callbackFunc) {
        this.customPopup(
          true,
          `${Resource.ERROR_VALIDATE_FE.RequireChoiceUnit}`,
          Resource.VUE_APP_POPUP.ERROR
        );
      }
    },

    getNewForm() {
      this.showForm = true;
      this.id = null;
      this.type = Resource.TYPE_FORM.ADD;
    },
    /**
     * Lưu data thất bại
     * CreateBy: DangPD
     */
    saveDataFail() {
      try {
        this.customToast(
          true,
          Resource.VUE_APP_TOAST.ADDERROR,
          Resource.ToastMessage.Failed.Save
        );
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Lưu data thành công
     * CreateBy :Đăng 12/2/2023
     */
    saveDataSucces() {
      try {
        // Nếu thêm thành công thực hiện load lại tablê
        this.reloadPage = true;
        this.customToast(
          true,
          Resource.VUE_APP_TOAST.ADDSUCCESS,
          Resource.ToastMessage.Success.Save
        );
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Lưu và tạo mới data thất bại
     * CreateBy :Đăng 12/2/2023
     */
    saveDataAndAddFail() {
      try {
        this.customToast(
          true,
          Resource.VUE_APP_TOAST.ADDERROR,
          Resource.ToastMessage.Failed.Save
        );
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lưu và tạo mới data thành công
     * CreateBy :Đăng 12/2/2023
     */
    saveDataAndAddSuccess() {
      try {
        // Nếu thêm thành công thực hiện load lại tablê
        this.reloadPage = true;
        this.isReloadTable = true;
        this.customToast(
          true,
          Resource.VUE_APP_TOAST.ADDSUCCESS,
          Resource.ToastMessage.Success.Save
        );
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Xóa data thành công
     * CreateBy :Đăng 12/2/2023
     */
    deleteSuccess() {
      try {
        // Nếu thêm thành công thực hiện load lại tablê
        this.reloadPage = true;
        this.customToast(
          true,
          Resource.VUE_APP_TOAST.DELETESUCCESS,
          Resource.ToastMessage.Success.Delete
        );
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Xóa data thất bại
     * CreateBy :Đăng 12/2/2023
     */
    deleteFail() {
      try {
        this.customToast(
          true,
          Resource.VUE_APP_TOAST.ERROR,
          Resource.ToastMessage.Failed.Delete
        );
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Xử lí toast
     * CreateBy: DangPD
     * @param {*} isShowT
     * @param {*} icon
     * @param {*} message
     */
    customToast(isShowT = false, icon = "", message = "") {
      this.toast.isShowToast = isShowT; //Ẩn hiện toast
      this.toast.iconToast = icon; //icon popup
      this.toast.messageToast = message; //icon popup
    },

    /**
     * Ẩn hiện popup
     * @param {Boolean} isShow true- show popup, false - ẩn popup
     * @param {String} message nội dung của popup
     * @param {String} type loại popup
     * CreatedBy: NDCHIEN (18/8/2022)
     */
    customPopup(isShow = false, message = "", type = "") {
      if (this.popup) {
        this.popup.isShowPopup = isShow; // ẩn hiện popup
        this.popup.messagePopup = message; // nội dung popup
        this.popup.typePopup = type; // loại popup
      }
    },

    /**
     * Đóng 1 toast message
     * CreateBy: DangPD
     */
    closeToastItem() {
      try {
        this.customToast();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getPaging(this.pageSize, this.pageChoice, this.sort, this.dataFilter);
  },
  watch: {
    reloadPage(newVal) {
      if (newVal) {
        this.getPaging(
          this.pageSize,
          this.pageChoice,
          this.sort,
          this.dataFilter
        );
      }
      this.reloadPage = false;
    },
    pageSize(newVal) {
      this.pageSize = newVal;
      this.reloadTable();
      console.log(newVal);
    },
  },
};
</script>
  
<style></style>