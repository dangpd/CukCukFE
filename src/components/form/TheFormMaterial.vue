<template>
  <div class="form_material" @keydown="keyboardShortcuts">
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
                {{ this.feildCode }} <span style="color: red">(*)</span>
              </div>
              <BaseInput style="width: 200px" v-model="dataForm.material.materialCode" :required="true" :focus="focusCode"
                ref="materialCode" :messError="materialCodeNotEmpty" tabIndex="1" />
            </div>
            <div class="add_material_item">
              <div class="add_material_name">
                {{ this.feildFeature }} <span style="color: red">(*)</span>
              </div>
              <BaseCombobox style="width: 200px" :dataMain="dataFeature" v-model="dataForm.material.feature"
                propValue="feildValue" :focus="focusFeature" propName="feildName" ref="cbxFeature"
                styleButton="position:absolute;right:5%;" :typeForm="typeForm" tabIndex="3">
              </BaseCombobox>
            </div>
            <div class="add_material_item">
              <div class="add_material_name">
                {{ this.feildUnit }} <span style="color: red">(*)</span>
              </div>
              <BaseCombobox :addSelect="true" :api="apiUnit" v-model="dataForm.material.conversionUnitId"
                :focus="focusUnit" propValue="conversionUnitId" propName="conversionUnitName" ref="cbxUnit"
                :required="true" styleButton="margin-right:8px" width="90px" :messError="unitIDNotEmpty"
                @dataUpdate="dataUpdateUnit" @showBoxAddSelect="showBoxAddUnit" tabIndex="5">
              </BaseCombobox>
            </div>
            <div class="add_material_item">
              <div class="add_material_name">{{ this.feildExdate }}</div>
              <BaseInput style="width: 90px;margin-right: 10px;" styleVal="text-align:right" v-model="valueExp"
                tabIndex="7" ref="expiryDate" type="int" />
              <BaseCombobox :dataMain="dataExp" v-model="typeExp" propValue="feildValue" propName="feildName"
                styleButton="position:absolute;" ref="cbxExp" :styleCombobox="`width:100px`" width="100px"
                :typeForm="typeForm" tabIndex="7">
              </BaseCombobox>
            </div>
          </div>
          <div class="group2">
            <div class="add_material_item">
              <div class="add_material_name">
                {{ this.feildName }} <span style="color: red">(*)</span>
              </div>
              <BaseInput style="width: 200px" v-model="dataForm.material.materialName" :required="true" ref="materialName"
                :messError="materialNameNotEmpty" :focus="focusName" tabIndex="2" />
            </div>
            <div class="add_material_item">
              <div class="add_material_name">{{ this.feildCategory }}</div>
              <BaseCombobox :addSelect="true" :api="apiCategory" v-model="dataForm.material.categoryId"
                propValue="categoryID" propName="categoryName" ref="cbxCategory" width="200px" styleSlect="right:5.5%"
                @showBoxAddSelect="showBoxAddCategory" tabIndex="4">
              </BaseCombobox>
            </div>
            <div class="add_material_item">
              <div class="add_material_name">{{ this.feildStock }}</div>
              <BaseSelectBoxDown :data="listStock" addSelect v-model:setData="dataForm.material.stockId"
                addSelectIcon="fa-solid fa-plus" addSelectColor="#2281c1" width="200px" ref="stockId"
                fieldNameShow="stockName" fieldNameValue="stockId" fieldName="stockId" :fieldListHide="[
                  { field: 'stockCode', title: 'Mã kho' },
                  { field: 'stockName', title: 'Tên kho' },
                ]" styleValHide="top: calc(100% + 5px)" @showBoxAddSelect="showBoxAddStock" tabIndex="6" />
            </div>
            <div class="add_material_item">
              <div class="add_material_name">{{ this.feildIventionNumber }}</div>
              <BaseInput style="width: 100px" styleVal="text-align:right" textRight
                v-model="dataForm.material.inventoryNumber" lengthAfterComma="2" tabIndex="8" type="int" />
            </div>
          </div>
        </div>
        <div class="add_material_item2">
          <div class="add_material_name">{{ this.feildDescription }}</div>
          <BaseTextArea :style="`min-width: 540px;max-width:540px;
          min-height:60px;
                    max-height: 60px;
                    padding-left: 8px;
                    padding-top: 8px;`" v-model="dataForm.material.description" tabIndex="9" />
        </div>
        <div class="info_w100 info_unit">
          <div class="info_title_unit">
            <span>{{ this.formConvertionUnit }}</span>
          </div>
          <div class="table_unit">
            <table class="m-table-material" style="
                line-height: 26px;box-sizing: border-box;
              ">
              <thead style="background-color: #ededed;position: sticky;top: 0;z-index: 10;margin-bottom: 2px;">
                <th style="width: 40px;font-weight: 100;">{{ this.formStt }}</th>
                <th style="width: 150px;font-weight: 100;">{{ this.formConvertionUnit }}</th>
                <th style="width: 150px;font-weight: 100;">{{ this.formConversionRate }}</th>
                <th style="width: 100px;font-weight: 100;">{{ this.formCalculation }}</th>
                <th style="width: 200px;font-weight: 100;">{{ this.formDescribe }}</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in this.dataForm.listConversionUnits" @click="trClick(item)" :key="index" :class="{
                  'row-selected': dataSelcetedDelete == item
                }" class="table_tr" ref="table_row">
                  <td style="padding-left: 20px;background-color: #ededed;border-right:1px solid #bbb;">{{ index + 1 }}
                  </td>
                  <td class="td_hover" style="max-width: 150px;max-height: 26px;">
                    <BaseSelectBoxDown :style="`max-width: 100%;height:25px`" :data="listUnit" :id="item.conversionUnitId"
                      v-model:setData="item.unitId" addSelect addSelectIcon="fa-solid fa-plus" addSelectColor="#2281c1"
                      width="150px" showBorder ref="tdConvertionUnit" fieldNameShow="conversionUnitName"
                      fieldNameValue="conversionUnitId" fieldName="conversionUnitId"
                      :fieldListHide="[{ field: 'conversionUnitName' }]" focusFirstData :focus="focusConvertionUnit"
                      @showBoxAddSelect="showBoxAddUnit" @getValue="getDataUnitConversion" />
                  </td>
                  <td class="td_hover" style="max-width: 150px;max-height: 26px;">
                    <BaseInput v-model="item.conversionRate" :style="`max-width: 100%;`" textRight lengthAfterComma="2"
                      styleVal="height:26px;text-align:right;" :noneShowBorder="true" type="float" />
                  </td>
                  <td class="td_hover" style="max-width: 130px;height: 26px;">
                    <BaseCombobox style="max-width: 100%;" :dataMain="[
                      { calculation: '*', value: 1 },
                      {
                        calculation: '/',
                        value: 2,
                      },
                    ]" v-model="item.calculation" propValue="value" propName="calculation"
                      styleButton="position:absolute;" :noneShowBorder="true"
                      :styleCombobox="`width:130px;height:26px;background-color:#fff`" width="130px;height:26px">
                    </BaseCombobox>
                  </td>
                  <td style="border-left: 1px solid #bbb;padding-left: 8px;background-color: #ededed;">
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
            <BaseButtonIcon icon="fa-solid fa-add" class="buttonIcon" colorIcon="#2281c1" val="Thêm dòng"
              styleCss="padding:2px 16px 2px 16px;" buttonIconForm @click="addNewUnitMaterial" tabindex="10" />
            <BaseButtonIcon icon="fa-solid fa-close" class="buttonIcon" colorIcon="red"
              styleCss="padding:2px 16px 2px 16px;margin-left: 5px;" buttonIconForm val="Xóa dòng"
              @click="deleteNewUnitMaterial" tabindex="11" />
          </div>
        </div>
        <div class="add_unit_func">
          <div style="
              display: flex;
              align-items: center;
              width: 100%;
              justify-content: space-between;
            ">
            <BaseButtonIcon icon="fa-solid  fa-circle-question" class="buttonIcon" colorIcon="#2281c1" val="Giúp"
              styleCss="padding:4px 8px;" buttonIconForm tabIndex="12" />
            <div>
              <BaseButtonIcon icon="fa-sharp fa-solid fa-floppy-disk" class="buttonIcon" colorIcon="#2281c1" styleCss=""
                val="Cất" @click="saveAndClose" buttonIconForm :title="toolTipSave" tabIndex="13" />
              <BaseButtonIcon icon="fa-solid fa-file-export" class="buttonIcon" colorIcon="#2281c1" styleCss=""
                val="Cất và thêm" buttonIconForm @click="saveAndAdd" :title="toolTipSaveAndAdd" tabIndex="14" />
              <BaseButtonIcon icon="fa-regular fa-circle-xmark" class="buttonIcon" colorIcon="red" val="Hủy" styleCss=""
                @click="btnOnCancel" buttonIconForm :title="toolTipCancel" tabIndex="15"
                @focusFirstInput="focusFirstInput" />
            </div>
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
import { isNull, shallowEqual, compareArrays, generateUUID, } from "@/js/common";
import materialCategoryService from "@/js/apiMaterialCategory";
import materialService from "@/js/apiMaterial";
import BaseSelectBoxDown from "../base/BaseSelectBoxDown.vue";
import unitService from "@/js/apiUnit";
import stockService from "@/js/apiStock";
import enumMISA from '../../js/enum';
import errorBE from "@/js/errorBE";
import BaseCombobox from "../base/BaseCombobox.vue";

export default {
  name: "TheFormMaterial",
  components: {
    BaseLoading,
    BasePopUp,
    BaseInput,
    BaseButtonIcon,
    BaseTextArea,
    BaseCombobox,
    BaseSelectBoxDown,
  },
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
  props: ["id", "type", "reloadForm"],
  data() {
    return {
      dataSelceted: {},
      loadingForm: false,
      dataForm: {
        material: {
          materialId: null,
          materialCode: "",
          materialName: "",
          description: "",
          feature: "",
          expiryDate: "",
          inventoryNumber: 0,
          status: 1,
          categoryId: null,
          conversionUnitId: null,
          stockId: null,
        },
        listConversionUnits: [],
      },
      dataOrigin: {
        material: {
          materialId: null,
          materialCode: "",
          materialName: "",
          description: "",
          feature: "",
          expiryDate: "",
          inventoryNumber: 0,
          status: 1,
          categoryId: null,
          conversionUnitId: null,
          stockId: null,
        },
        listConversionUnits: [],
      },
      dataDefault: {
        material: {
          materialId: null,
          materialCode: "",
          materialName: "",
          description: "",
          feature: "",
          expiryDate: "",
          inventoryNumber: 0,
          status: 1,
          categoryId: null,
          conversionUnitId: null,
          stockId: null,
        },
        listConversionUnits: [],
      },
      dataNew: {},
      getNewForm: false,
      materialCodeNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
      materialNameNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
      featureNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
      unitIDNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
      convertionUnit: Resource.ERROR_VALIDATE_FE.NotEmpty,
      apiUnit: unitService.getAll(),
      apiStock: stockService.getAll(),
      apiCategory: materialCategoryService.getAll(),
      typeForm: "",
      focusCode: false,
      focusName: false,
      focusFeature: false,
      focusUnit: false,
      focusConvertionUnit: false,
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
      dataFeature: [
        { feildValue: "Bán thành phẩm", feildName: "Bán thành phẩm" },
        { feildValue: "Đồ uống đóng chai", feildName: "Đồ uống đóng chai" },
        { feildValue: "Mặt hàng khác", feildName: "Mặt hàng khác" },
        { feildValue: "Nguyên vật liệu", feildName: "Nguyên vật liệu" },
      ],
      dataExp: [
        { feildValue: "1", feildName: "Ngày" },
        { feildValue: "2", feildName: "Tháng" },
        { feildValue: "3", feildName: "Năm" },
      ],
      typeExp: null,
      valueExp: null,
      toolTipSave: Resource.KeyboardShortcuts.Save,
      toolTipSaveAndAdd: Resource.KeyboardShortcuts.SaveAndInsert,
      toolTipCancel: Resource.KeyboardShortcuts.Esc,
      feildCode: Resource.FIELD_NAME_MATERIAL.materialCode,
      feildName: Resource.FIELD_NAME_MATERIAL.materialName,
      feildFeature: Resource.FIELD_NAME_MATERIAL.feature,
      feildCategory: Resource.FIELD_NAME_MATERIAL.categoryName,
      feildUnit: Resource.FIELD_NAME_MATERIAL.unitName,
      feildStock: Resource.FIELD_NAME_MATERIAL.stockName,
      feildExdate: Resource.FIELD_NAME_MATERIAL.expiryDate,
      feildIventionNumber: Resource.FIELD_NAME_MATERIAL.inventoryNumber,
      feildDescription: Resource.FIELD_NAME_MATERIAL.description,
      formStt: Resource.FIELD_NAME_MATERIAL.stt,
      formConvertionUnit: Resource.FIELD_NAME_MATERIAL.convertionUnit,
      formConversionRate: Resource.FIELD_NAME_MATERIAL.conversionRate,
      formCalculation: Resource.FIELD_NAME_MATERIAL.calculation,
      formDescribe: Resource.FIELD_NAME_MATERIAL.describe,
    };
  },
  methods: {
    /**
     * Gọi form đơn vị chuyển đổi
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    showBoxAddUnit() {
      this.$emit("showFormUnit");
    },
    /**
     * Gọi form nhóm
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    showBoxAddCategory() {
      this.$emit("showFormCategory");
    },
    /**
     * Gọi form đơn vị
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    showBoxAddStock() {
      this.$emit("showFormStock");
    },

    /**
     * Focus phần tử đầu tiên
     * CreateBy: DangPD
     */
    focusFirstInput() {
      this.$refs.materialCode.focusCode = true;
      this.$refs.materialCode.focusFunc();
    },

    /**
     * Format lại dữ liệu dạng 100.900,10 về 100900.10
     * CreatedBy : DangPD(24/5/2023)
     * @param {*} data 
     */
    formatFloat(data) {
      try {
        return parseFloat(data.replace(/[.]/g, '').replace(',', '.'));
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Click 1 dòng
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    trClick(data) {
      if (data) {
        this.dataSelcetedDelete = data;
      }
    },

    /**
     * Thêm mới đơn vị chuyển đổi
     * CreatedBy : PDDang(24/5/2023)
     */
    addNewUnitMaterial() {
      try {
        if (this.dataForm.listConversionUnits && this.dataForm.material) {
          this.dataForm.listConversionUnits.push({
            conversionUnitId: generateUUID(),
            materialId: this.dataForm.material.materialId,
            conversionRate: enumMISA.conversionRate,
            calculation: enumMISA.calculation,
          });
          // console.log(this.dataForm.listConversionUnits);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Xóa đơn vị chuyển đổi
     * CreatedBy : PDDang(24/5/2023)
     */
    deleteNewUnitMaterial() {
      try {
        if (
          this.dataForm.listConversionUnits &&
          this.dataForm.listConversionUnits != null
        ) {
          // Giá trị được chọn bằng null
          // console.log(this.dataSelcetedDelete);
          if (this.dataSelcetedDelete === null) {
            // Nếu không có hàng được chọn xóa phần tử cuối cùng
            console.log(this.dataForm.listConversionUnits.length);
            if (this.dataForm.listConversionUnits.length >= 0) {
              this.dataForm.listConversionUnits.splice(
                this.dataForm.listConversionUnits.length - 1,
                1
              );
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
     * Thay đổi đơn vị chính
     * CreatedBy : PDDang(24/5/2023)
     * @param {} data 
     */
    dataUpdateUnit(data) {
      try {
        // Kiểm tra có phần tử trùng với mã đơn vị chuyển đổi chính không
        if (this.dataForm.listConversionUnits.length > 0) {
          let position = -1;
          const myPromise = new Promise((resolve) => {
            setTimeout(() => {
              // console.log(this.dataForm.listConversionUnits);
              let index = this.dataForm.listConversionUnits.findIndex((e) => {
                return e.unitId == data.idUpdate;
              });
              resolve(index); // Đưa resolve(index) vào trong hàm setTimeout
            }, 0);
          });
          // console.log(position);
          myPromise.then((index) => {
            position = index;
            if (position == -1) {
              return;
            } else {
              this.dataForm.listConversionUnits[position].unitId = "";
              // Show popup
              this.customPopup(
                true,
                Resource.ERROR_VALIDATE_FE.DuplicateUnit,
                process.env.VUE_APP_POPUP_WARNING
              );
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thay đổi đơn vị chuyển đổi của list Unit
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    getDataUnitConversion(data) {
      // console.log(data);
      // Check có trùng với đơn vị tính ban đầu không
      if (data.val == this.dataForm.material.conversionUnitId) {
        // Show popup
        this.customPopup(
          true,
          Resource.ERROR_VALIDATE_FE.DuplicateUnit,
          process.env.VUE_APP_POPUP_WARNING
        );
        let position = -1;

        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            // console.log(this.dataForm.listConversionUnits);
            let index = this.dataForm.listConversionUnits.findIndex((e) => {
              return e.unitId == data.val;
            });
            resolve(index); // Đưa resolve(index) vào trong hàm setTimeout
          }, 0);
        });

        myPromise.then((index) => {
          position = index;
          this.dataForm.listConversionUnits[position].unitId = "";
        });
      }

      // Kiểm tra đơn vị chuyển đổi thêm vào đã tồn tại chưa
      var checkDuplicateUnit = this.dataForm.listConversionUnits.some(
        (item) => {
          if (item.unitId && item.conversionRate && item.calculation) {
            return item.unitId == data.val;
          }
          return false;
        }
      );

      if (checkDuplicateUnit) {
        this.customPopup(
          true,
          Resource.ERROR_VALIDATE_FE.DuplicateConversionUnit,
          process.env.VUE_APP_POPUP_WARNING
        );
        let positionDuplicateList = -1;
        // console.log(positionDuplicateList);
        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            // console.log(this.dataForm.listConversionUnits);
            let index = this.dataForm.listConversionUnits.findIndex((e) => {
              return e.conversionUnitId == data.id;
            });
            resolve(index); // Đưa resolve(index) vào trong hàm setTimeout
          }, 0);
        });
        myPromise.then((index) => {
          positionDuplicateList = index;
          // console.log(index);
          this.dataForm.listConversionUnits[positionDuplicateList].unitId = "";
        });
      }
    },

    /**
     * Mô tả đơn vị chuyển đổi
     * @param {*} conversionUnit
     * @param {*} conversionRate
     * @param {*} calculation
     * CreatedBy : PDDang(24/5/2023)
     */
    descriptionConversionUnit(conversionUnit, conversionRate, calculation) {
      if (this.dataForm.material.conversionUnitId && conversionUnit && conversionRate && calculation) {
        // check null
        // Lấy tên đơn vị chuyển đổi gốc
        var unitID = this.dataForm.material.conversionUnitId;
        let data = this.listUnit.filter((item) => {
          return item.conversionUnitId == unitID;
        });
        // Lấy tên đơn vị chuyển đổi
        let nameUnitMaterial = ""
        if (data.length > 0) {
          nameUnitMaterial = data[0].conversionUnitName;
        }

        // Lọc trong danh sách đơn vị chuyển đổi để lấy tên đơn vị chuyển đổi qua id
        var nameConversionUnit = this.listUnit.filter((item) => {
          return item.conversionUnitId == conversionUnit;
        });
        var showUnitName = "";
        // Check nếu tìm được đơn vị chuyển đổi lấy tên và show
        if (nameConversionUnit.length > 0) {
          let description = "";
          showUnitName = nameConversionUnit[0].conversionUnitName;
          if (calculation == enumMISA.calculations.divison) {
            description = `1 ${nameUnitMaterial} = 1 / ${conversionRate}  ${showUnitName} `;
          } else if (calculation == enumMISA.calculations.multiple) {
            description = `1 ${nameUnitMaterial} = ${conversionRate} * ${showUnitName} `;
          }
          return description;
        }
      }
    },

    /**
     * Đóng form
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    btnOnExit() {
      try {
        // tạo biến để chuyển đổi để so sánh 
        // format lại tỷ lệ chuyển đổi về số thực và phép tính(vd 10,20 => 10.20)
        let dataList = JSON.parse(JSON.stringify(this.dataForm.listConversionUnits))
        let listConvertionUnit = dataList.map(item => {
          if (item.conversionRate) {
            item.conversionRate = this.formatFloat(item.conversionRate)
          }
          else {
            item.conversionRate = enumMISA.nullValue;
          }
          if (!item.calculation) {
            item.calculation = enumMISA.nullValue;
          }
          return item
        })
        // So sánh 2 nguyên vật liệu và 2 mảng đơn vị chuyển đổi
        if (
          !shallowEqual(this.dataForm.material, this.dataOrigin.material) || !compareArrays(listConvertionUnit, this.dataOrigin.listConversionUnits) &&
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
            this.saveAndClose();
          };
        } else {
          this.$emit("onClose");
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hủy đóng form
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    btnOnCancel() {
      try {
        this.$emit("onClose");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Validate dữ liệu trước khi lưu
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    validateData() {
      let validate = true;
      var errorMess = ""; // Danh sách các trường lỗi
      var errorList = []; // Danh sách các trường lỗi
      let checkConvertUnit = false;
      // Kiểm tra null mã nguyên vật liệu
      if (!isNull(this.dataForm.material.materialCode)) {
        this.$refs.materialCode.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.MaterialCodeNotEmpty + "\n";
        validate = false;
        errorList.push("materialCode")
      }
      // Kiểm tra null tên nguyên vật liệu
      if (!isNull(this.dataForm.material.materialName)) {
        this.$refs.materialName.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.MaterialNameNotEmpty + "\n";
        validate = false;
        errorList.push("materialName")
      }
      // Kiểm tra null tính chất
      if (!isNull(this.dataForm.material.feature)) {
        // this.$refs.cbxFeature.validate();
        // errorMess += Resource.ERROR_VALIDATE_FE.FeatureNotEmpty + "\n";
        // validate = false;
        // errorList.push("feature")
        this.dataForm.material.feature = this.dataFeature[0].feildValue;
      }
      // Kiểm tra null đơn vị chuyển đổi
      if (!isNull(this.dataForm.material.conversionUnitId)) {
        this.$refs.cbxUnit.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.UnitIDNotEmpty + "\n";
        validate = false;
        errorList.push("unitID")
      }

      // true thì check danh sách đơn vị chuyển đổi
      if (validate && this.dataForm.listConversionUnits.length > 0) {
        // let emptyElement = null;
        for (let i = 0; i < this.dataForm.listConversionUnits.length; i++) {
          if (!this.dataForm.listConversionUnits[i].unitId) {
            // Gán vị trí thiếu đơn vị tính đầu tiên
            this.positionConvertionIndex = i;
            // console.log(this.positionConvertionIndex);
            checkConvertUnit = true;
            break;
          }
        }
        if (checkConvertUnit) {
          errorMess += Resource.ERROR_VALIDATE_FE.ConversionUnitNotEmpty + "\n";
          validate = false;
          errorList.push("convertionUnitId")
        }
      }
      return {
        validate: validate,
        errorMess: errorMess,
        errorList: errorList
      };
    },

    /**
     * Lưu và đóng form
     * CreatedBy : PDDang(24/5/2023)
     * @param {*}  
     */
    saveAndClose() {
      try {
        // Validate bằng false thì handle error front end không thì thực hiện lưu dữ liệu
        if (!this.validateData().validate) {
          this.handleErrorFE();
        } else {
          this.saveData();
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Lưu và mở form thêm mới
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} 
     */
    saveAndAdd() {
      try {
        // Validate bằng false thì handle error front end không thì thực hiện lưu dữ liệu
        if (!this.validateData().validate) {
          this.handleErrorFE();
        } else {
          console.log(this.getNewForm);
          this.getNewForm = true;
          this.saveData();
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Lưu data
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} 
     */
    saveData() {
      // format hạn sử dụng
      if (this.valueExp && this.typeExp) {
        this.dataForm.material.expiryDate = `${this.valueExp}_${this.typeExp}`;
      } else if (this.valueExp == null || this.valueExp == "") {
        this.dataForm.material.expiryDate = `0_${this.typeExp}`;
      } else if (this.typeExp == null || this.typeExp == "") {
        this.dataForm.material.expiryDate = `${this.valueExp}_1`;
      } else {
        this.dataForm.material.expiryDate = `0_1`;
      }
      // format lại số lượng tối thiểu
      if (this.dataForm.material.inventoryNumber === null || this.dataForm.material.inventoryNumber === "") {
        this.dataForm.material.inventoryNumber = enumMISA.nullValue;
      }
      // format lại tỷ lệ chuyển đổi về số thực và phép tính(vd 10,20 => 10.20)
      this.dataForm.listConversionUnits = this.dataForm.listConversionUnits.map(item => {
        if (item.conversionRate) {
          item.conversionRate = this.formatFloat(item.conversionRate)
        }
        else {
          item.conversionRate = enumMISA.nullValue;
        }
        if (!item.calculation) {
          item.calculation = enumMISA.nullValue;
        }
        return item
      })
      // Thực hiện lưu dữ liệu với type là thêm mới
      if (this.type == Resource.TYPE_FORM.ADD) {
        const response = callAPI(
          Resource.HTTP_METHOD.POST,
          materialService.insertRecord(),
          this.dataForm
        );
        // console.log(response);
        response
          .then((res) => {
            if (res == enumMISA.response.Success) {
              this.$emit("onClose");
              this.$emit("saveDataSucces");
            } else {
              this.$emit("onClose");
              this.$emit("saveDataFail");
            }
            if (this.getNewForm) {
              this.callNewForm();
            }
          })
          .catch((err) => {
            // Có lỗi bắt được bên phía backend
            console.log(err);
            this.handleError(err);
          });
      } else {
        const response = callAPI(
          Resource.HTTP_METHOD.PUT,
          materialService.updatedRecord(this.dataForm.material.materialId),
          this.dataForm
        );
        // console.log(this.dataForm);
        response
          .then((res) => {
            if (res == enumMISA.response.Success) {
              this.$emit("onClose");
              this.$emit("saveDataSucces");
            } else {
              this.$emit("onClose");
              this.$emit("saveDataFail");
            }
            if (this.getNewForm) {
              this.callNewForm();
            }
          })
          .catch((err) => {
            // Có lỗi bắt được bên phía backend
            console.log(err);
            this.handleError(err);
          });
      }
    },


    /**
     * Handle lỗi Front end
     * CreatedBy :PDDang(24/5/2023)
     */
    handleErrorFE() {
      // Hiển thị lỗi trống tương ứng
      this.customPopup(
        true,
        this.validateData().errorMess,
        Resource.VUE_APP_TOAST.ERROR
      );
      // focus
      for (let i = 0; i < this.validateData().errorList.length; i++) {
        // console.log(this.validateData().errorList);
        // Thiếu mã nguyên vật liệu thực hiện focus mã nguyên vật liệu bằng true
        if (this.validateData().errorList[i] == Resource.FIELD_MATERIAL.materialCode) {
          this.$refs.materialCode.focusCode = true;
        }

        // Thiếu tên nguyên vật liệu thực hiện focus tên nguyên vật liệu bằng true
        if (this.validateData().errorList[i] == Resource.FIELD_MATERIAL.materialName) {
          this.$refs.materialName.focusName = true;
        }

        // Thiếu mã tính chất thực hiện focus mã tính chất bằng true
        if (this.validateData().errorList[i] == Resource.FIELD_MATERIAL.feature) {
          this.dataForm.material.feature = this.dataFeature[0].feildValue;
        }

        // Thiếu mã đơn vị tính thực hiện focus mã đơn vị tính bằng true
        if (this.validateData().errorList[i] == Resource.FIELD_MATERIAL.unitID) {
          this.$refs.cbxUnit.focusUnit = true;
        }

        // Thiếu đơn vị chuyển đổi
        // console.log(this.positionConvertionIndex);
        if (this.validateData().errorList[i] == Resource.FIELD_MATERIAL.convertionUnitId) {
          this.focusConvertionUnit = true;
          // Tìm tham chiếu đến phần tử <tr> tương ứng
          this.$refs.tdConvertionUnit[this.positionConvertionIndex].focusFunc();
        }
      }
    },

    /**
     * Handle lỗi backend
     * CreatedBy : PDDang(24/5/2023)
     * @param {*}  
     */
    handleError(err) {
      if (err.response.status == enumMISA.response.BadRequest) {
        var listMessError = [];
        var error = err.response.data.moreInfo;
        // Trùng mã
        if (error == errorBE.DuplicateCodeMaterial) {
          {
            this.$refs.materialCode.validate();
            listMessError += Resource.ERROR_BE.DuplicateCodeMaterial + "\n";
            this.materialCodeNotEmpty = Resource.ERROR_BE.DuplicateCodeMaterial;
            this.$emit("update:materialCodeNotEmpty", Resource.ERROR_BE.DuplicateCodeMaterial)
            this.$refs.materialCode.focusCode = true;
          }
          this.customPopup(true, listMessError, Resource.VUE_APP_POPUP.ERROR);
        } else {
          for (let i = 0; i < error.length; i++) {
            // Thiếu mã nguyên vật liệu thực hiện focus mã nguyên vật liệu bằng true
            if (
              error[i] ==
              errorBE.DuplicateCodeMaterial
            ) {
              this.$refs.materialCode.validate();
              listMessError += Resource.ERROR_BE.DuplicateCodeMaterial + "\n";
              this.materialCodeNotEmpty = Resource.ERROR_BE.DuplicateCodeMaterial;
              this.$emit("update:materialCodeNotEmpty", Resource.ERROR_BE.DuplicateCodeMaterial)
              this.$refs.materialCode.focusCode = true;
            }

            // Thiếu mã nguyên vật liệu thực hiện focus mã nguyên vật liệu bằng true
            if (
              error[i] ==
              errorBE.MaterialCodeNotEmpty
            ) {
              this.$refs.materialCode.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.MaterialCodeNotEmpty + "\n";
              this.materialCodeNotEmpty = Resource.ERROR_VALIDATE_FE.NotEmpty;
              this.$emit("update:materialCodeNotEmpty", Resource.ERROR_VALIDATE_FE.NotEmpty)
              this.$refs.materialCode.focusCode = true;
            }
            // Thiếu tên nguyên vật liệu thực hiện focus tên nguyên vật liệu bằng true
            if (
              error[i] ==
              errorBE.MaterialNameNotEmpty
            ) {
              this.$refs.materialName.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.MaterialNameNotEmpty + "\n";
              this.materialNameNotEmpty = Resource.ERROR_VALIDATE_FE.NotEmpty;
              this.$emit("update:materialNameNotEmpty", Resource.ERROR_VALIDATE_FE.NotEmpty)
              this.$refs.materialName.focusName = true;
            }
            // Thiếu tính chất thực hiện focus tính chất bằng true
            if (
              error[i] ==
              errorBE.FeatureNotEmpty
            ) {
              this.$refs.cbxFeature.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.FeatureNotEmpty + "\n";
              this.featureNotEmpty = Resource.ERROR_VALIDATE_FE.NotEmpty;
              this.$emit("update:featureNotEmpty", Resource.ERROR_VALIDATE_FE.NotEmpty)
              this.$refs.feature.focusFeature = true;
            }
            // Thiếu đơn vị tính thực hiện focus đơn vị tính bằng true
            if (
              error[i] ==
              errorBE.ConverunitNotEmpty
            ) {
              this.$refs.cbxUnit.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.UnitIDNotEmpty + "\n";
              this.unitIDNotEmpty = Resource.ERROR_VALIDATE_FE.NotEmpty;
              this.$emit("update:unitIDNotEmpty", Resource.ERROR_VALIDATE_FE.NotEmpty)
              this.$refs.cbxUnit.focusUnit = true;
            }
            // Sai độ dài mã nguyên vật liệu thực hiện focus độ dài mã nguyên vật liệu bằng true
            if (
              error[i] ==
              errorBE.MaxCodeMaterialCode
            ) {
              this.$refs.materialCode.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCode + "\n";
              this.materialCodeNotEmpty = Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCode;
              this.$emit("update:materialCodeNotEmpty", Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCode)
              this.$refs.materialCode.focusCode = true;
            }
            // Sai độ dài mã nguyên vật liệu thực hiện focusđộ dài mã nguyên vật liệu bằng true
            if (
              error[i] ==
              errorBE.MaxCodeMaterialName
            ) {
              this.$refs.materialName.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.MaxLengthMaterialName + "\n";
              this.materialNameNotEmpty = Resource.ERROR_VALIDATE_FE.MaxLengthMaterialName;
              this.$emit("update:materialNameNotEmpty", Resource.ERROR_VALIDATE_FE.MaxLengthMaterialName)
              this.$refs.materialName.focusName = true;
            }

            // Danh sách đơn vị chuyển đổi thiếu đơn vị chuyển đổi
            if (
              error[i] ==
              errorBE.ConverunitNotEmptys
            ) {
              this.focusConvertionUnit = true;
              listMessError += Resource.ERROR_VALIDATE_FE.ConversionUnitNotEmpty + "\n";
              // this.materialNameNotEmpty = Resource.ERROR_VALIDATE_FE.MaxLengthMaterialName;
              // this.$emit("update:materialNameNotEmpty", Resource.ERROR_VALIDATE_FE.MaxLengthMaterialName)
              // this.$refs.materialName.focusName = true;
            }
            this.customPopup(true, listMessError, Resource.VUE_APP_POPUP.ERROR);
          }
        }
      }

      // Lỗi exception
      if (err.response.status == enumMISA.response.Exception || err.response.status == enumMISA.response.Error) {
        this.customPopup(true, Resource.ERROR_BE.Unknow, Resource.VUE_APP_POPUP.ERROR);
      }
    },

    /**
     * Gọi lại form thêm mưới
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    callNewForm() {
      // Gán lại thể loại form
      this.title = Resource.TitleForm.AddMaterial;
      this.typeForm = Resource.TYPE_FORM.ADD;
      // Gán dữ liệu cho form mới
      this.dataForm = JSON.parse(JSON.stringify(this.dataDefault));
      this.dataOrigin = JSON.parse(JSON.stringify(this.dataDefault));
      this.dataForm.material.feature = this.dataFeature[0].feildValue;
      // Re render lại combobox
      this.$refs.cbxCategory.foreceRender();
      this.$refs.cbxExp.foreceRender();
      this.$refs.cbxUnit.foreceRender();
      this.$refs.cbxFeature.foreceRender();
      this.$refs.materialCode.focusFunc();
      this.getMaxCode();
      this.typeExp = enumMISA.expridate.typeExp;
      this.valueExp = enumMISA.expridate.valueExp;
      this.$emit("getNewForm");
      this.getNewForm = false;
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
        // Nếu show custom bằng false thì thực hiện focus vào từng dòng
        if (isShow == false) {
          // Nếu focus mã nguyên vật liệu bằng true thì focus vào input
          if (this.$refs.materialCode.focusCode) {
            this.$refs.materialCode.focusFunc();
            // Gán lại giá trị cho focus mã nguyên vật liệu
            this.$refs.materialCode.focusCode = false;
            return;
          }

          // Nếu focus tên nguyên vật liệu bằng true thì focus vào input
          if (this.$refs.materialName.focusName) {
            this.$refs.materialName.focusFunc();
            // Gán lại giá trị cho focus tên nguyên vật liệu
            this.$refs.materialName.focusName = false;
            return;
          }
          // Nếu focus tính chất bằng true thì focus vào input
          if (this.$refs.cbxFeature.focusFeature) {
            this.$refs.cbxFeature.focusFunc();
            this.$refs.cbxFeature.validate();
            // Gán lại giá trị cho focus mã phòng ban
            this.$refs.cbxFeature.focusFeature = false;
            return;
          }

          // Nếu focus mã đơn vị tính bằng true thì focus vào input
          if (this.$refs.cbxUnit.focusUnit) {
            // Gán lại giá trị cho focus emailS
            this.$refs.cbxUnit.validate();
            this.$refs.cbxUnit.focusFunc();
            this.$refs.cbxUnit.focusUnit = false;
            return;
          }

          // Nếu focus vào đơn vị chuyển đổi
          if (this.focusConvertionUnit) {
            this.$refs.tdConvertionUnit[this.positionConvertionIndex].focusFunc();
            this.focusConvertionUnit = false;
            return;
          }
        }
      }
    },
    /**
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    async getForm() {
      try {
        this.focusCode = true;
        // console.log(this.type);
        this.isLoadingDataForm = true;
        // Khởi tạo lấy giá trị id truyền vào
        if (this.id) {
          // Bật loadding
          this.title = Resource.TitleForm.UpdateMaterial;
          // Lấy dữ liệu
          const data = callAPI(
            Resource.HTTP_METHOD.GET,
            materialService.getById(this.id)
          );
          data.then((res) => {
            if (res) {
              this.dataOrigin = {
                material: JSON.parse(JSON.stringify(res.material)),
                listConversionUnits: JSON.parse(JSON.stringify(res.listConversionUnits))
              };

              this.dataForm = {
                material: JSON.parse(JSON.stringify(res.material)),
                listConversionUnits: JSON.parse(JSON.stringify(res.listConversionUnits))
              };
              // console.log(res);
              if (this.dataForm.material.expiryDate == "" || this.dataForm.material.expiryDate == null) {
                this.valueExp = enumMISA.expridate.valueExp;
                this.typeExp = enumMISA.expridate.typeExp;
              } else {
                this.valueExp = this.dataForm.material.expiryDate.substring(0, this.dataForm.material.expiryDate.indexOf("_"));
                this.typeExp = this.dataForm.material.expiryDate.substring(this.dataForm.material.expiryDate.indexOf("_") + 1);
              }
              if (this.type == Resource.TYPE_FORM.DUPLICATE) {
                this.getMaxCode();
              }
            }
          });
        } else {
          // k có id thì là form thêm mới
          this.title = Resource.TitleForm.AddMaterial;
          this.dataForm.material.materialId = generateUUID();
          this.valueExp = enumMISA.expridate.valueExp;
          this.typeExp = enumMISA.expridate.typeExp;
          this.getMaxCode();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy danh sách chuyển đổi
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    getListUnit() {
      const dataUnit = callAPI(Resource.HTTP_METHOD.GET, unitService.getAll());
      dataUnit.then((res) => {
        // console.log(res);
        this.listUnit = res;
      });
    },
    /**
     * Lấy danh sách nhóm
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
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
    /**
     * Lấy danh sahcs kho
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
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
    /**
     * Lấy mã mới
     * CreatedBy : PDDang(24/5/2023)
     * @param {*} data 
     */
    getMaxCode() {
      const maxCode = callAPI(Resource.HTTP_METHOD.GET, materialService.getMaxCode())
      maxCode.then((res) => {
        this.dataForm.material.materialCode = res;
      })
    },

    /**
    * Phím tắt
    * CreateBy :DangPD
    */
    keyboardShortcuts(event) {
      // Bắt Ctrl + S và Ctrl + Shift + S
      if (
        event.keyCode === enumMISA.KEY_CODE.S &&
        (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)
      ) {
        event.preventDefault();
        // Ctrl shift S
        if (event.shiftKey) {
          this.saveAndAdd();
        }
        // Ctrl S
        else {
          // Xử lý sự kiện
          this.saveAndClose();
        }
      }

      // Bắt Esc
      if (event.keyCode == enumMISA.KEY_CODE.ESC) {
        this.$emit("onClose");
      }

      // Bắt Enter
      if (event.keyCode == enumMISA.KEY_CODE.ENTER) {
        this.customPopup();
      }
    },
  },

  created() {
    this.typeForm = this.type;
    this.getForm();
    this.getListUnit();
    this.getListCategory();
    this.getListStock();
  },
  /**
   * Theo dõi thay đổi
   */
  watch: {
    typeForm(newVal) {
      this.typeForm = newVal;
    },

    reloadForm(newVal) {
      console.log(newVal);
      if (newVal == true) {
        this.getListUnit();
        this.getListCategory();
        this.getListStock();
        this.getForm();
        this.$refs.cbxUnit.foreceRender();
        this.$refs.cbxCategory.foreceRender();
        this.$emit("reloadFormSuccess");
      }
    },

    dataForm: {
      handler: function (newVal) {
        if (typeof newVal === 'object') {
          this.dataForm = newVal;
          this.descriptionConversionUnit();
          // console.log('da', this.dataForm);
          // console.log('or', this.dataOrigin);
          // console.log('new', newVal);
        }
      },
      deep: true,
    },
  },
  computed: {},
};
</script>
<style>
@import url(../../css/form/form.css);
</style>