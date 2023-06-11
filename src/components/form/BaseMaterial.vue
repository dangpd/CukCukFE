<template>
  <div>
    <BaseContentTitleVue :title="titleF"></BaseContentTitleVue>
    <div class="table">
      <div class="material_function">
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-add" colorIcon="#2281c1" val="Thêm"
          styleCss="" funC @click="addForm" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-copy" colorIcon="#2281c1"
          val="Nhân bản" styleCss="" funC @click="duplicateForm" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-pen-to-square" colorIcon="#2281c1"
          val="Sửa" styleCss="" funC @click="updateForm" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-xmark" colorIcon="red" val="Xóa"
          styleCss="" funC @click="deleteItem" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-rotate" colorIcon="#2281c1"
          val="Nạp" styleCss="" funC @click="reloadTable" />
        <input type="file" ref="fileInput" style="display: none" @change="onFileChange">
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-file-import" colorIcon="#2281c1"
          val="Nhập khẩu" styleCss="" funC @click="importFile" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid  fa-file-arrow-down"
          colorIcon="#2281c1" val="Xuất khẩu" styleCss="" funC @click="exportFile" />
      </div>
      <div class="table__content">
        <BaseLoading v-if="isLoading"></BaseLoading>
        <table class="m-table" border="1" style="margin-bottom: 8px;">
          <thead>
            <tr>
              <th style="min-width: 170px">
                <div style="margin-top: 8px; font-weight: 100">
                  Mã nguyên vật liệu
                </div>
                <div style="display: flex; min-width: 100%; margin: 8px 0">
                  <BaseFilterSearch type="string" field="materialCode" ref="materiCode" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 220px">
                <div style="margin-top: 8px; font-weight: 100">
                  Tên nguyên vật liệu
                </div>
                <div style="display: flex; min-width: 100%; margin: 8px 0">
                  <BaseFilterSearch type="string" field="materialName" ref="materialName" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 180px">
                <div style="margin-top: 8px; font-weight: 100">Tính chất</div>
                <div style="display: flex; min-width: 100%; margin: 8px 0">
                  <BaseFilterSearch type="string" field="feature" ref="feature" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 170px">
                <div style="margin-top: 8px; font-weight: 100">Đơn vị tính</div>
                <div style="display: flex; min-width: 100%; margin: 8px 0">
                  <BaseFilterSearch type="string" field="conversionUnitName" ref="conversionUnitName"
                    @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 170px">
                <div style="margin-top: 8px; font-weight: 100">
                  Nhóm nguyên vật liệu
                </div>
                <div style="display: flex; min-width: 100%; margin: 8px 0">
                  <BaseFilterSearch type="string" field="categoryName" ref="categoryName" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 170px">
                <div style="margin-top: 8px; font-weight: 100">Diễn giải</div>
                <div style="display: flex; min-width: 100%; margin: 8px 0">
                  <BaseFilterSearch type="string" field="description" ref="description" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="width: 100px">
                <div style="margin-top: 8px; font-weight: 100">
                  Ngừng theo dõi
                </div>
                <div style="display: flex; margin: 8px 0">
                  <BaseSelectBoxDown :data="[
                    { status: 'Có', value: '2' },
                    { status: 'Không', value: '1' },
                  ]" :style="`background-color: #fff;width:150px`" fieldNameShow="status" fieldNameValue="value"
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
              <td class="text-align-left tooltips" style="max-width: 170px;" :title="item.materialCode">{{
                item.materialCode }}</td>

              <td class="text-align-left tooltips" style="max-width: 220px;" :title="item.materialName">{{
                item.materialName }}</td>
              <td class="text-align-left tooltips" style="max-width: 180px;" :title="item.feature">{{ item.feature }}</td>
              <td class="text-align-left tooltips" style="max-width: 170px;" :title="item.conversionUnitName">{{
                item.conversionUnitName }}</td>
              <td class="text-align-left tooltips" style="max-width: 170px;" :title="item.categoryName">{{
                item.categoryName }}</td>
              <td class="text-align-left tooltips" style="max-width: 170px;" :title="item.description">{{ item.description
              }}</td>
              <td class="text-align-center" style="align-items: center;">
                <BaseCheckBox style="cursor: default;" @dblclick.stop.prevent="noClick" class="checkbox_table_status"
                  disable :modelCheckbox="item.status === statusPage" :value="item.status" />
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
        <BaseContentButtom :totalCount="totalRecord" :totalPage="totalPage" ref="pageNumber"
          @getDataNumberTable="getDataNumberTable" @reloadAll="reloadTable"></BaseContentButtom>
      </div>
    </div>
    <TheFormMaterial v-if="showForm" @onClose="showForm = false" :id="id" :type="type" :reloadForm="reloadForm"
      @reloadFormSuccess="reloadFormSuccess" @saveDataSucces="saveDataSucces" @saveDataFail="saveDataFail"
      @saveDataAndAddSuccess="saveDataAndAddSuccess" @saveDataAndAddFail="saveDataAndAddFail" @getNewForm="getNewForm"
      @showFormUnit="showFormUnits" @showFormStock="showFormStocks" @showFormCategory="showFormCategorys">
    </TheFormMaterial>
    <TheFormUnit v-if="showFormUnit" @onClose="showFormUnit = false" :id="idUnit" :type="typeUnit"
      @saveDataSucces="saveDataSuccesAndReload" @saveDataFail="saveDataFail"
      @saveDataAndAddSuccess="saveDataAndAddSuccessAndReload" @saveDataAndAddFail="saveDataAndAddFail"
      @getNewForm="getNewFormUnit"></TheFormUnit>
    <TheFormStock v-if="showFormStock" @onClose="showFormStock = false" :id="idStock" :type="typeStock"
      @saveDataSucces="saveDataSuccesAndReload" @saveDataFail="saveDataFail"
      @saveDataAndAddSuccess="saveDataAndAddSuccessAndReload" @saveDataAndAddFail="saveDataAndAddFail"
      @getNewForm="getNewFormStock"></TheFormStock>
    <TheFormMaterialCategory v-if="showFormCategory" @onClose="showFormCategory = false" :id="idCategory"
      :type="typeCategory" @saveDataSucces="saveDataSuccesAndReload" @saveDataFail="saveDataFail"
      @saveDataAndAddSuccess="saveDataAndAddSuccessAndReload" @saveDataAndAddFail="saveDataAndAddFail"
      @getNewForm="getNewFormCategory">
    </TheFormMaterialCategory>
    <TheFormImportExcel v-if="showImprt" @reloadData="reloadTable" @onClose="showImprt = false">
    </TheFormImportExcel>
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
import callAPI from "@/js/callAxios";
import BaseCheckBox from "../base/BaseCheckBox.vue";
import BaseSelectBoxDown from "../base/BaseSelectBoxDown.vue";
import BaseButtonIcon from "../base/BaseButtonIcon.vue";
import BaseToast from "../base/BaseToast.vue";
import BasePopUp from "../base/BasePopUp.vue";
import { fetchAPI } from "@/js/common";
import materialService from "@/js/apiMaterial";
import TheFormMaterial from "./TheFormMaterial.vue";
import TheFormUnit from "./TheFormUnit.vue";
import TheFormStock from "./TheFormStock.vue";
import TheFormMaterialCategory from "./TheFormMaterialCategory.vue";
import enumMISA from '../../js/enum';
// import axios from 'axios';
import TheFormImportExcel from "./TheFormImportExcel.vue";
export default {
  name: "BaseMaterial",
  directives: {
    tooltip: {
      bind: function (el) {
        el.addEventListener('mouseover', function (evt) {
          let targetEl = evt.target;
          if (targetEl.offsetWidth < targetEl.scrollWidth) {
            targetEl.setAttribute('title', evt.target.textContent);
          } else {
            targetEl.hasAttribute('title') && targetEl.removeAttribute('title');
          }
        });
      }
    }
  },
  props: [""],
  components: {
    BaseContentTitleVue,
    BaseFilterSearch,
    BaseLoading,
    BaseContentButtom,
    BaseCheckBox,
    BaseSelectBoxDown,
    BaseButtonIcon,
    BaseToast,
    BasePopUp,
    TheFormMaterial,
    TheFormStock,
    TheFormUnit,
    TheFormMaterialCategory,
    TheFormImportExcel
  },
  data() {
    return {
      titleF: Resource.TitleContent.Material,
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
      showFormUnit: false,
      idUnit: "",
      typeUnit: "",
      showFormStock: false,
      idStock: "",
      typeStock: "",
      showFormCategory: false,
      idCategory: "",
      typeCategory: "",
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
      reloadForm: false,
      statusPage: enumMISA.statusPage.Yes,
      showImprt: false,
    };
  },
  methods: {
    /**
     * Thay đổi value của search input
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    changeFilter(value) {
      try {
        // console.log(this.pageNumber);
        // console.log(this.pageSize);
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

    /**
     * Thay đổi status
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    changeFilterStatus(value) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Load data
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    getPaging(pageSize, pageChoice, sort, dataFilter) {
      try {
        this.isLoading = true;
        const data = callAPI(
          "POST",
          materialService.filterAndPaging(pageSize, pageChoice, sort),
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

    /**
     * Reload data
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    reloadTable() {
      try {
        this.$refs.pageNumber.pageSize = 20;
        this.$refs.pageNumber.pageChoice = 1;
        // Clear text search
        this.$refs.materiCode.clearData();
        this.$refs.materialName.clearData();
        this.$refs.feature.clearData();
        this.$refs.conversionUnitName.clearData();
        this.$refs.categoryName.clearData();
        this.$refs.description.clearData();
        // console.log(this.dataFilter);
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
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thay đổi page number
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    getDataNumberTable(data) {
      this.pageSize = data.pageSize;
      this.pageNumber = data.pageNumber;
      this.getPaging(
        data.pageSize,
        data.pageNumber,
        this.sort,
        this.dataFilter
      );
      // console.log(data);
    },

    /**
     * Mở form thêm mới
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    addForm() {
      this.showForm = true;
      this.id = null;
      this.type = Resource.TYPE_FORM.ADD;
    },

    /**
     * ShowForm Unit
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    showFormUnits() {
      this.showFormUnit = true;
      this.idUnit = null;
      this.typeUnit = Resource.TYPE_FORM.ADD;
    },

    /**
     * Show form kho
     * Created: PDDang(24/5/2023)
     * @param {*} value
     */
    showFormStocks() {
      this.showFormStock = true;
      this.idStock = null;
      this.typeStock = Resource.TYPE_FORM.ADD;
    },

    /**
     * show form nhóm nguyên vật liệu
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    showFormCategorys() {
      this.showFormCategory = true;
      this.idCategory = null;
      this.typeCategory = Resource.TYPE_FORM.ADD;
    },

    /**
     * tr click
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    trClick(data) {
      this.dataSelceted = data;
      // console.log("data", this.dataSelceted);
    },

    /**
     * db click
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    duplicateForm() {
      try {
        if (this.dataSelceted.materialId) {
          this.showForm = true;
          this.id = this.dataSelceted.materialId;
          this.type = Resource.TYPE_FORM.DUPLICATE;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * cập nhật form
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    updateForm() {
      try {
        if (this.dataSelceted.materialId) {
          this.showForm = true;
          this.id = this.dataSelceted.materialId;
          this.type = Resource.TYPE_FORM.UPDATE;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * db click form
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    dbUpdateForm(data) {
      this.showForm = true;
      this.id = data.materialId;
      this.type = Resource.TYPE_FORM.UPDATE;
    },

    /**
     * Xóa phần tử
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    deleteItem() {
      try {
        if (this.dataSelceted && this.popup.callbackFunc) {
          // show popup xác nhận xóa
          this.customPopup(
            true,
            `${Resource.ERROR_VALIDATE_FE.QuestionDeleteMaterial} << ${this.dataSelceted.materialCode} - ${this.dataSelceted.materialName} >> ?`,
            Resource.VUE_APP_POPUP.WARNING_DEL
          );
          // Hàm xử lý khi click có
          this.popup.callbackFunc.callbackWarningDeleteYes = () => {
            // Call API xóa
            fetchAPI(
              materialService.deleteRecord(this.dataSelceted.materialId),
              Resource.HTTP_METHOD.DELETE,
              (res) => {
                console.log(res);
                if (res == enumMISA.response.Success) {
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
            `${Resource.ERROR_VALIDATE_FE.RequireChoiceMaterial}`,
            Resource.VUE_APP_POPUP.ERROR
          );
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi form mới
     * Created: PDDang(24/5/2023)
     * @param {*} value 
     */
    getNewForm() {
      this.showForm = true;
      this.id = null;
      this.type = Resource.TYPE_FORM.ADD;
    },

    /**
     * Gọi form thêm mới
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} value 
     */
    getNewFormCategory() {
      this.showFormCategorys();
    },

    /**
     * Gọi lại form thêm mới 
     * CreatedBy: PDDang(24/5/2023)
     * @param {*} value 
     */
    getNewFormStock() {
      this.showFormStocks();
    },

    /**
     * Gọi lại form thêm mới 
     * CreatedBy: PDDang(24/5/2023)
     * @param {*} value 
     */
    getNewFormUnit() {
      this.showFormUnits();
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
        // this.reloadForm = true;
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
        // this.reloadForm = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * CreateBy :PDDang(24/5/2023)
     * Reload lại form
     */
    reloadFormSuccess() {
      this.reloadForm = false;
    },
    saveDataSuccesAndReload() {
      try {
        this.reloadForm = true;
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
     * Thêm thành công kho đơn vị hoặc nhóm nguyên vật liệu thì reload
     */
    saveDataAndAddSuccessAndReload() {
      try {
        this.reloadForm = true;
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
     * CreatedBy: PDDang (24/5/2023)
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

    noClick() {
      console.log("dbclick");
    },

    /**
    * Xuất Excel danh sách nguyên vật liệu
    * CreateBy: DangPD(24/5/2023)
    */
    exportFile() {
      try {
        this.isLoading = true;
        fetchAPI(
          materialService.getExcel(),
          "POST",
          (blob) => {
            // Tạo đường dẫn url
            const url = window.URL.createObjectURL(blob);
            // Tạo phần tử chứa danh sách
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "Danh_sach_nguyen_vat_lieu.xlsx";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            this.isLoading = false;
          },
          "",
          "blob"
        );
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện import file
     */
    importFile() {
      this.showImprt = true;
    },

  },
  created() {
    this.getPaging(this.pageSize, this.pageChoice, this.sort, this.dataFilter);
  },
  watch: {
    reloadPage(newVal) {
      if (newVal == true) {
        this.getPaging(
          this.pageSize,
          this.pageChoice,
          this.sort,
          this.dataFilter
        );
        this.reloadPage = false;
      }
    },
    pageSize(newVal) {
      this.pageSize = newVal;
    },

  },
};
</script>
      
<style>
@import url(../../css/form/material.css);
</style>
