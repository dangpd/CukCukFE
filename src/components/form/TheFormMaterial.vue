<template>
  <div class="form_material">
    <div class="form_detail_material">
      <div class="form_title">
        {{ this.title }}
        <i class="fa-solid fa-xmark" @click="btnOnExit"
          style="border: 1px solid white; padding: 2px 4px; border-radius: 50%"></i>
      </div>
      <div class="content_add_material">
        <div class="group">
          <div class="group1">
            <div class="add_material_item">
              <div class="add_material_name">
                Mã <span style="color: red">(*)</span>
              </div>
              <BaseInput style="width: 200px" v-model="dataForm.material.materialCode" :required="true" ref="materialCode"
                :messError="materialCodeNotEmpty" />
            </div>
            <div class="add_material_item">
              <div class="add_material_name">
                Tính chất <span style="color: red">(*)</span>
              </div>
              <BaseInput style="width: 200px" v-model="dataForm.material.feature" :required="true" ref="feature"
                :messError="featureNotEmpty" />
            </div>
            <div class="add_material_item">
              <div class="add_material_name">
                ĐVT <span style="color: red">(*)</span>
              </div>
              <BaseSelectBoxDown :data="listUnit" v-model:setData="dataForm.material.conversionUnitId" addSelect
                addSelectIcon="fa-solid fa-plus" addSelectColor="#2281c1" width="100px" ref="convertionUnit"
                fieldNameShow="conversionUnitName" fieldNameValue="conversionUnitId" fieldName="conversionUnitName"
                :messError="unitIDNotEmpty" required :fieldListHide="[{ field: 'conversionUnitName' }]"
                @showBoxAddSelect="showBoxAddUnit" />
            </div>
            <div class="add_material_item">
              <div class="add_material_name">Hạn sử dụng</div>
              <BaseInput style="width: 200px" v-model="dataForm.material.expiryDate" :required="true" ref="expiryDate" />
            </div>
          </div>
          <div class="group2">
            <div class="add_material_item">
              <div class="add_material_name">
                Tên <span style="color: red">(*)</span>
              </div>
              <BaseInput style="width: 200px" v-model="dataForm.material.materialName" :required="true" ref="materialName"
                :messError="materialNameNotEmpty" />
            </div>
            <div class="add_material_item">
              <div class="add_material_name">Nhóm NVL</div>
              <BaseSelectBoxDown :data="listCategory" v-model:setData="dataForm.material.categoryId" addSelect
                addSelectIcon="fa-solid fa-plus" addSelectColor="#2281c1" width="100px" fieldNameShow="categoryName"
                fieldNameValue="categoryID" fieldName="categoryName" :fieldListHide="[{ field: 'categoryName' }]"
                @showBoxAddSelect="showBoxAddCategory"></BaseSelectBoxDown>
            </div>
            <div class="add_material_item">
              <div class="add_material_name">Kho ngầm định</div>
              <BaseSelectBoxDown :data="listStock" addSelect v-model:setData="dataForm.material.stockId"
                addSelectIcon="fa-solid fa-plus" addSelectColor="#2281c1" width="200px" ref="stockId"
                fieldNameShow="stockName" fieldNameValue="stockId" fieldName="stockId" :fieldListHide="[
                  { field: 'stockCode', title: 'Mã kho' },
                  { field: 'stockName', title: 'Tên kho' },
                ]" focusFirstData styleValHide="top: calc(100% + 5px)" @showBoxAddSelect="showBoxAddStock" />
            </div>
            <div class="add_material_item">
              <div class="add_material_name">SL tồn tối thiểu</div>
              <BaseInput style="width: 200px" v-model="dataForm.material.inventoryNumber" :type="typeInput"
                :required="true" ref="inventoryNumber" />
            </div>
          </div>
        </div>
        <div class="add_material_item2">
          <div class="add_material_name">Ghi chú</div>
          <BaseTextArea :style="`width: 540px;
                    height: 60px;
                    padding-left: 8px;
                    padding-top: 8px;`" v-model="dataForm.material.description" />
        </div>
        <div class="info_w100 info_unit">
          <div class="info_title_unit">
            <span>Đơn vị chuyển đổi</span>
            <!-- <span>Nhà cung cấp</span> -->
          </div>
          <div class="table_unit">
            <table class="m-table-material" style="
                font-weight: 100;
                border-collapse: collapse;
                line-height: 30px;
                border-color: #bbb;
              " border="1">
              <thead style="font-weight: 100">
                <th style="width: 40px">STT</th>
                <th style="width: 150px">Đơn vị chuyển đổi</th>
                <th style="width: 150px">Tỷ lệ chuyển đổi</th>
                <th style="width: 150px">Phép tính</th>
                <th style="width: 200px">Mô tả</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataForm.listConversionUnits" @click="trClick(item)" :key="index" :class="{
                  'row-selected': dataSelcetedDelete == item,
                }">
                  <td>{{ index + 1 }}</td>
                  <td style="max-width: 150px; max-height: 30px">
                    <BaseSelectBoxDown :style="`max-width: 100%;max-height:100%`" :data="listUnit"
                      v-model:setData="item.unitId" addSelect addSelectIcon="fa-solid fa-plus" addSelectColor="#2281c1"
                      width="150px" showBorder ref="convertionUnit" fieldNameShow="conversionUnitName"
                      fieldNameValue="conversionUnitId" fieldName="conversionUnitId" :messError="unitIDNotEmpty" required
                      :fieldListHide="[{ field: 'conversionUnitName' }]" @showBoxAddSelect="showBoxAddUnit" />
                  </td>
                  <td style="max-height: 30px">
                    <BaseInput v-model="item.conversionRate" :style="`max-width: 100%;border:none`" type="float"
                      ref="conversionRate" textRight lengthAfterComma="2" styleVal="height:30px;text-align:right"
                      v-model:value="item.conversionRate" />
                  </td>
                  <td style="max-width: 150px">
                    <BaseSelectBoxDown :data="[
                      { calculation: '*', value: 1 },
                      {
                        calculation: '/',
                        value: 2,
                      },
                    ]" :style="`max-width: 100%;`" addSelect addSelectIcon="fa-solid fa-plus" addSelectColor="#2281c1"
                      v-model:setData="item.calculation" ref="calculation" width="100px" showBorder
                      fieldNameShow="calculation" fieldNameValue="value" fieldName="calculation"
                      :fieldListHide="[{ field: 'calculation' }]" focusFirstData styleValHide="top: calc(100% + 3px)">
                    </BaseSelectBoxDown>
                  </td>
                  <td>
                    {{
                      descriptionConversionUnit(
                        item.unitId,
                        item.conversionRate,
                        item.calculation
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="func_unit">
            <BaseButtonIcon icon="fa-solid fa-add" colorIcon="#2281c1" val="Thêm dòng" styleCss="padding: 2px 16px"
              @click="addNewUnitMaterial" />
            <BaseButtonIcon icon="fa-solid fa-close" colorIcon="red" styleCss="padding: 2px 16px;margin-left: 5px"
              val="Xóa dòng" @click="deleteNewUnitMaterial" />
          </div>
        </div>
        <div class="add_unit_func">
          <div style="
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 100%;
            ">
            <BaseButtonIcon icon="fa-solid  fa-circle-question" colorIcon="#2281c1" val="Giúp"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer" />
            <BaseButtonIcon icon="fa-sharp fa-solid fa-floppy-disk" colorIcon="#2281c1"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer" val="Cất" @click="saveAndClose" />
            <BaseButtonIcon icon="fa-solid fa-file-export" colorIcon="#2281c1"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer" val="Cất và thêm" @click="saveAndAdd" />
            <BaseButtonIcon icon="fa-regular fa-circle-xmark" colorIcon="red" val="Hủy"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer" @click="btnOnCancel" />
          </div>
        </div>
      </div>
    </div>
    <BaseLoading v-if="loadingForm"></BaseLoading>
    <BasePopUp v-if="popup.isShowPopup" :message="popup.messagePopup" :type="popup.typePopup" @closePopup="customPopup"
      @processWhenClose="popup.callbackFun.callbackProcessWhenClose"
      @clickWarningDeleteYes="popup.callbackFun.callbackWarningDeleteYes"
      @confirmPopup="popup.callbackFun.callbackConfirmPopup" @clickQuestionNo="popup.callbackFun.callbackQuestionNo"
      @clickQuestionYes="popup.callbackFun.callbackQuestionYes" />
  </div>
</template>
      
<script>
import BaseButtonIcon from "../base/BaseButtonIcon.vue";
import BaseInput from "../base/BaseInput.vue";
import BaseLoading from "../base/BaseLoading.vue";
import BasePopUp from "../base/BasePopUp.vue";
import BaseTextArea from "../base/BaseTextArea.vue";
import Resource from "@/js/resource";
import callAPI from "@/js/callAxios";
import { isNull, shallowEqual, generateUUID } from "@/js/common";
import _ from "underscore";
import materialCategoryService from "@/js/apiMaterialCategory";
import materialService from "@/js/apiMaterial";
import BaseSelectBoxDown from "../base/BaseSelectBoxDown.vue";
import unitService from "@/js/apiUnit";
import stockService from "@/js/apiStock";

export default {
  name: "TheFormMaterial",
  components: {
    BaseLoading,
    BasePopUp,
    BaseInput,
    BaseButtonIcon,
    BaseTextArea,
    BaseSelectBoxDown,
  },
  props: ["id", "type", "reloadForm"],
  data() {
    return {
      dataSelceted: {},
      loadingForm: false,
      typeInput: "float",
      dataForm: {
        material: {
          materialId: "",
          materialCode: "",
          materialName: "",
          description: "",
          expiryDate: "",
          inventoryNumber: 0,
          status: 1,
          categoryId: "",
          conversionUnitId: "",
          stockId: "",
        },
        listConversionUnits: [],
      },
      dataOrigin: {
        material: {
          materialId: "",
          materialCode: "",
          materialName: "",
          description: "",
          expiryDate: "",
          inventoryNumber: 0,
          status: 1,
          categoryId: "",
          conversionUnitId: "",
          stockId: "",
        },
        listConversionUnits: [],
      },
      dataDefault: {
        material: {
          materialId: "",
          materialCode: "",
          materialName: "",
          description: "",
          expiryDate: "",
          inventoryNumber: 0,
          status: 1,
          categoryId: "",
          conversionUnitId: "",
          stockId: "",
        },
        listConversionUnits: [],
      },
      getNewForm: false,
      materialCodeNotEmpty: Resource.ERROR_VALIDATE_FE.MaterialCodeNotEmpty,
      materialNameNotEmpty: Resource.ERROR_VALIDATE_FE.MaterialNameNotEmpty,
      featureNotEmpty: Resource.ERROR_VALIDATE_FE.FeatureNotEmpty,
      unitIDNotEmpty: Resource.ERROR_VALIDATE_FE.UnitIDNotEmpty,
      //Popup
      popup: {
        isShowPopup: false, // Trạng thái ẩn hiện popup
        messagePopup: "", // tiêu đề popup
        typePopup: "", // loại popup
        callbackFun: {
          callbackProcessWhenClose: () => { }, // Xử lý khi đóng popup
          callbackWarningDeleteYes: () => { }, // xử lý khi click không popup question
          callbackConfirmPopup: () => { }, // xử lý khi click đồng ý popup warning
          callbackQuestionNo: () => { }, // xử lý khi click không popup question
          callbackQuestionYes: () => { }, // xử lý khi click có popup question
        },
      },
      listUnit: [],
      listCategory: [],
      listStock: [],
      dataSelcetedDelete: null,
    };
  },
  methods: {
    showBoxAddUnit() {
      this.$emit("showFormUnit");
    },

    showBoxAddCategory() {
      this.$emit("showFormCategory");
    },

    showBoxAddStock() {
      this.$emit("showFormStock");
    },
    /**
     * Thêm mới đơn vị chuyển đổi
     */
    addNewUnitMaterial() {
      try {
        if (this.dataForm.listConversionUnits && this.dataForm.material) {
          this.dataForm.listConversionUnits.push({
            conversionUnitId: generateUUID(),
            materialId: this.dataForm.material.materialId,
            conversionRate: 1,
            calculation: 1,
          });
          console.log(this.dataForm.listConversionUnits);
        }
      } catch (error) {
        console.log(error);
      }
    },
    trClick(data) {
      this.dataSelcetedDelete = data;
      console.log(data);
      // console.log("data", this.dataSelceted);
    },
    /**
     * Xóa đơn vị chuyển đổi
     */
    deleteNewUnitMaterial() {
      try {
        if (this.dataForm.listConversionUnits && this.dataForm.listConversionUnits != null) {
          // Xóa hàng được chọn
          // console.log(this.dataSelcetedDelete);
          if (this.dataSelcetedDelete === null) {
            // Nếu không có hàng được chọn xóa phần tử cuối cùng
            console.log(this.dataForm.listConversionUnits.length);
            if (this.dataForm.listConversionUnits.length >= 0) {
              this.dataForm.listConversionUnits.splice(this.dataForm.listConversionUnits.length - 1, 1);
            }
          } else {
            // Tìm index của nó trong mảng
            var index = this.dataForm.listConversionUnits.findIndex((x) => {
              return (
                x.conversionUnitId === this.dataSelcetedDelete.conversionUnitId
              );
            });
            // Xóa phần tử có index đã tìm được
            if (index !== -1) {
              this.dataForm.listConversionUnits.splice(index, 1);
              this.dataSelcetedDelete = null;
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Mô tả đơn vị chuyển đổi
     * @param {*} conversionUnit
     * @param {*} conversionRate
     * @param {*} calculation
     */
    descriptionConversionUnit(conversionUnit, conversionRate, calculation) {
      if (conversionUnit && conversionRate && calculation) {
        // check null
        // Lấy tên đơn vị chuyển đổi gốc
        var nameUnitMaterial = this.dataForm.material.conversionUnitName;
        // console.log(nameUnitMaterial);
        // K có tên đơn vị chuyển đổi trả về chuoixo rỗng
        if (!nameUnitMaterial) return "";
        // Lọc trong danh sách đơn vị chuyển đổi để lấy tên đơn vị chuyển đổi qua id
        var nameConversionUnit = this.listUnit.filter((item) => {
          return item.conversionUnitId == conversionUnit;
        });
        var showUnitName = "";
        // Check nếu tìm được đơn vị chuyển đổi lấy tên và show
        if (nameConversionUnit.length > 0) {
          let description = "";
          showUnitName = nameConversionUnit[0].conversionUnitName;
          if (calculation == 2) {
            description = `1 ${nameUnitMaterial} = 1 / ${conversionRate}  ${showUnitName} `;
          } else if (calculation == 1) {
            description = `1 ${nameUnitMaterial} = ${conversionRate} * ${showUnitName} `;
          }
          return description;
        }
      }
    },

    // Click nút exit để đóng form
    btnOnExit() {
      try {
        if (
          !shallowEqual(this.dataOrigin, this.dataForm) &&
          this.popup &&
          this.popup.callbackFun
        ) {
          this.customPopup(
            true,
            Resource.Dialog.Title.Change + Resource.Dialog.Text.Save,
            Resource.VUE_APP_POPUP.QUESTION
          );
          this.popup.callbackFun.callbackQuestionNo = () => {
            this.customPopup();
            // khi sửa trong form dữ liệu trong bảng được binding nên khi hủy phải
            // set data của bảng về giá trị ban đầu khi hủy update dữ liệu
            for (let key in this.dataForm) {
              this.dataForm[key] = this.dataOrigin[key];
            }
            this.$emit("onClose");
          };
          // Thực hiện lưu dữ liệu
          this.popup.callbackFun.callbackQuestionYes = async () => {
            this.saveData();
          };
        } else {
          this.$emit("onClose");
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Click hủy exit để đóng form
    btnOnCancel() {
      try {
        this.$emit("onClose");
      } catch (error) {
        console.log(error);
      }
    },

    validateData() {
      let validate = true;
      var errorMess = ""; // Danh sách các trường lỗi
      if (!isNull(this.dataForm.material.materialCode)) {
        this.$refs.materialCode.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.MaterialCodeNotEmpty + "\n";
        validate = false;
      }

      if (!isNull(this.dataForm.material.materialName)) {
        this.$refs.materialName.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.MaterialNameNotEmpty + "\n";
        validate = false;
      }

      if (!isNull(this.dataForm.material.feature)) {
        this.$refs.feature.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.FeatureNotEmpty + "\n";
        validate = false;
      }
      return {
        validate: validate,
        errorMess: errorMess,
      };
    },

    callNewForm() {
      if (this.getNewForm == true) {
        this.$emit("getNewForm");
        this.title = Resource.TitleForm.AddMaterial;
        this.$emit("update:type", Resource.TYPE_FORM.ADD);
        this.dataForm = { ...this.dataDefault };
        this.dataOrigin = { ...this.dataDefault };
        this.getNewForm = false;
      }
    },

    saveData() {
      // Thực hiện lưu dữ liệu
      if (this.type == Resource.TYPE_FORM.ADD) {
        const response = callAPI(
          Resource.HTTP_METHOD.POST,
          materialService.insertRecord(),
          this.dataForm
        );
        response
          .then((res) => {
            if (res == Resource.Response.Success) {
              this.$emit("onClose");
              this.$emit("saveDataSucces");
              this.callNewForm();
            } else {
              this.$emit("onClose");
              this.$emit("saveDataFail");
              this.callNewForm();
            }
          })
          .catch((err) => {
            this.handleError(err);
          });
      } else {
        const response = callAPI(
          Resource.HTTP_METHOD.PUT,
          materialService.updatedRecord(this.dataForm.material.materialId),
          this.dataForm
        );
        console.log(this.dataForm);
        response
          .then((res) => {
            if (res == Resource.Response.Success) {
              this.$emit("onClose");
              this.$emit("saveDataSucces");
              this.callNewForm();
            } else {
              this.$emit("onClose");
              this.$emit("saveDataFail");
              this.callNewForm();
            }
          })
          .catch((err) => {
            this.handleError(err);
          });
      }
    },

    handleError(err) {
      // console.log(err.response)
      // console.log(err.response.data.moreInfo)
      if (err.response.data.errorCode == Resource.Response.BadRequest) {
        // var listErrorBE = [];
        var listMessError = [];
        var error = err.response.data.moreInfo;
        _.size(error);
        console.log(error);
        if (error == Resource.ERRORCODE_BE.DuplicateCodeMaterial) {
          this.$refs.categoryCode.validate();
          this.categoryCodeNotEmpty = Resource.ERROR_BE.DuplicateCodeMaterial;
          this.$emit(
            "update:categoryCodeNotEmpty",
            Resource.ERROR_BE.DuplicateCodeMaterial
          );
          listMessError += Resource.ERROR_BE.DuplicateCodeMaterial;
        } else {
          for (let i = 0; i < error; i++) {
            // Thiếu mã nhân viên thực hiện focus mã nhân viên bằng true
            if (
              err.response.data.moreInfo[i] ==
              Resource.ERRORCODE_BE.DuplicateCodeMaterial
            ) {
              this.$refs.categoryCode.validate();
              listMessError += Resource.ERROR_BE.DuplicateCodeMaterial;
            }
          }
        }
      }
      this.customPopup(true, listMessError, Resource.VUE_APP_POPUP.ERROR);
    },

    saveAndClose() {
      try {
        if (!this.validateData().validate) {
          // Hiển thị lỗi trống tương ứng
          this.customPopup(
            true,
            this.validateData().errorMess,
            Resource.VUE_APP_TOAST.ERROR
          );
        } else {
          this.saveData();
        }
      } catch (err) {
        console.log(err);
      }
    },

    saveAndAdd() {
      try {
        if (!this.validateData().validate) {
          // Hiển thị lỗi trống tương ứng
          this.customPopup(
            true,
            this.validateData().errorMess,
            Resource.VUE_APP_TOAST.ERROR
          );
        } else {
          this.getNewForm = true;
          this.saveData();
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Xử lý popup
     * CreateBy: DangPD
     * @param {Boolean} isShow
     * @param {String} message
     * @param {String} type
     */
    customPopup(isShow = false, message = "", type = "") {
      if (this.popup) {
        this.popup.isShowPopup = isShow; // ẩn hiện popup
        this.popup.messagePopup = message; // nội dung popup
        this.popup.typePopup = type; // loại popup
      }
    },

    getForm() {
      try {
        // Khởi tạo lấy giá trị id truyền vào
        if (this.id) {
          // Bật loadding
          this.isLoadingDataForm = true;
          this.title = Resource.TitleForm.UpdateMaterial;
          // Lấy dữ liệu
          const data = callAPI(
            Resource.HTTP_METHOD.GET,
            materialService.getById(this.id)
          );
          // console.log("data", data);
          data.then((res) => {
            if (res) {
              console.log("res", res);
              this.dataOrigin = { ...res };
              this.dataForm.material = res.material;
              this.dataForm.listConversionUnits = res.listConversionUnits;
            }
          });
        } else {
          // k có id thì là form thêm mới
          this.title = Resource.TitleForm.AddMaterial;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getListUnit() {
      const dataUnit = callAPI(Resource.HTTP_METHOD.GET, unitService.getAll());
      dataUnit.then((res) => {
        // console.log(res);
        this.listUnit = res;
      });
    },

    getListCategory() {
      const dataCategory = callAPI(
        Resource.HTTP_METHOD.GET,
        materialCategoryService.getAll()
      );
      dataCategory.then((res) => {
        // console.log(res);
        this.listCategory = res;
      });
    },

    getListStock() {
      const dataStock = callAPI(
        Resource.HTTP_METHOD.GET,
        stockService.getAll()
      );
      dataStock.then((res) => {
        // console.log(res);
        this.listStock = res;
      });
    },
  },
  created() {
    this.getForm();
    this.getListUnit();
    this.getListCategory();
    this.getListStock();
  },
  watch: {
    reloadForm(newVal) {
      console.log(newVal);
      if (newVal == true) {
        this.getListUnit();
        this.getListCategory();
        this.getListStock();
        this.$emit("reloadForm", false);
      }
    },
  },
  computed: {},
};
</script>
<style>
@import url(../../css/form/form.css);
</style>