<template>
  <div class="form_material" @keydown="keyboardShortcuts">
    <div class="form_detail">
      <div class="form_title">
        {{ this.title }}
        <i class="fa-solid fa-xmark" @click="btnOnExit"
          style="border: 1px solid white; padding: 2px 4px; border-radius: 50%"></i>
      </div>
      <div class="content_add_unit">
        <div class="add_unit_item">
          <div class="add_unit_name">
            {{ this.unitName }} <span style="color: red">(*)</span>
          </div>
          <BaseInput style="width: 250px" v-model="unit.conversionUnitName" :required="true" ref="conversionUnitName"
            :messError="conversionUnitNameNotEmpty" :focus="focusUnit" tabIndex="1" />
        </div>
        <div class="add_unit_item">
          <div class="add_unit_name">{{ this.description }}</div>
          <BaseTextArea :style="`min-width: 250px;max-width:250px;
          min-height:80px;
                    max-height: 80px;
              padding-left: 8px;
              padding-top: 8px;`" v-model="unit.description" tabIndex="2" />
        </div>
        <div class="add_unit_func">
          <div style="
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 100%;
            ">
            <BaseButtonIcon icon="fa-solid  fa-circle-question" colorIcon="#2281c1" val="Giúp"
              styleCss="margin-right: 5px;" buttonIconForm buttonIcon tabIndex="3" />
            <BaseButtonIcon icon="fa-sharp fa-solid fa-floppy-disk" colorIcon="#2281c1" styleCss="margin-right: 5px;"
              buttonIconForm buttonIcon val="Cất" @click="saveAndClose" :title="toolTipSave" tabIndex="4" />
            <BaseButtonIcon icon="fa-solid fa-file-export" colorIcon="#2281c1" styleCss="margin-right: 5px;"
              buttonIconForm buttonIcon val="Cất và thêm" @click="saveAndAdd" :title="toolTipSaveAndAdd" tabIndex="5" />
            <BaseButtonIcon icon="fa-regular fa-circle-xmark" colorIcon="red" val="Hủy" styleCss="margin-right: 5px;"
              buttonIconForm buttonIcon @click="btnOnCancel" :title="toolTipCancel" tabIndex="6" />
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
import unitService from "@/js/apiUnit";
import Resource from "@/js/resource";
import callAPI from "@/js/callAxios";
import { isNull, shallowEqual } from "@/js/common";
import enumMISA from '../../js/enum';
import errorBE from '../../js/errorBE';

export default {
  name: "TheFormUnit",
  components: {
    BaseLoading,
    BasePopUp,
    BaseInput,
    BaseButtonIcon,
    BaseTextArea,
  },
  props: ["id", "type"],
  data() {
    return {
      loadingForm: false,
      unit: {
        conversionUnitName: "",
        description: "",
      },
      dataOrigin: {
        conversionUnitName: "",
        description: "",
      },
      dataDefault: {
        conversionUnitName: "",
        description: "",
      },
      getNewForm: false,
      conversionUnitNameNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
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
      focusUnit: false,
      toolTipSave: Resource.KeyboardShortcuts.Save,
      toolTipSaveAndAdd: Resource.KeyboardShortcuts.SaveAndInsert,
      toolTipCancel: Resource.KeyboardShortcuts.Esc,
      unitName: Resource.FIELD_UNIT.unitName,
      description: Resource.FIELD_UNIT.description,
    };
  },
  methods: {
    // Click nút exit để đóng form
    btnOnExit() {
      try {
        if (
          !shallowEqual(this.dataOrigin, this.unit) &&
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
            for (let key in this.unit) {
              this.unit[key] = this.dataOrigin[key];
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

    /**
     * Validate dữ liệu
     * CreatedBy : PDDang(24/5/2023)
     */
    validateData() {
      let validate = true;
      var errorMess = ""; // Danh sách các trường lỗi
      var errorList = [];
      if (!isNull(this.unit.conversionUnitName)) {
        this.$refs.conversionUnitName.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.UnitIDNotEmpty;
        validate = false;
        errorList.push("conversionUnitName")
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
     */
    saveAndClose() {
      try {
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
     */
    saveAndAdd() {
      try {
        if (!this.validateData().validate) {
          this.handleErrorFE();
        } else {
          this.getNewForm = true;
          this.saveData();
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Lưu dữ liệu
     * CreatedBy : PDDang(24/5/2023)
     */
    saveData() {
      // Thực hiện lưu dữ liệu
      if (this.type == Resource.TYPE_FORM.ADD) {
        const response = callAPI(
          Resource.HTTP_METHOD.POST,
          unitService.insertRecord(),
          this.unit
        );
        response.then((res) => {
          if (res == enumMISA.response.Success) {
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
          })
      } else {
        const response = callAPI(
          Resource.HTTP_METHOD.PUT,
          unitService.updatedRecord(this.id),
          this.unit
        );
        response.then((res) => {
          if (res == enumMISA.response.Success) {
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
          })
      }
    },

    /**
    * Error Front end
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
        // Thiếu mã nhân viên thực hiện focus mã nhân viên bằng true
        if (this.validateData().errorList[i] == Resource.FIELD_CONVERSION_UNIT.conversionUnitName) {
          this.$refs.conversionUnitName.focusUnit = true;
        }
      }
    },

    /**
     * Handle lỗi backend
     * CreatedBy : PDDang(24/5/2023)
     */
    handleError(err) {
      // console.log(err.response)
      // console.log(err.response.data.moreInfo)
      if (err.response.data.errorCode == enumMISA.response.BadRequest) {
        var listMessError = [];
        var error = err.response.data.moreInfo;
        if (error == errorBE.DuplicateCodeUnit) {
          this.$refs.conversionUnitName.validate();
          listMessError += Resource.ERROR_BE.DuplicateCodeUnit + "\n";
          this.conversionUnitNameNotEmpty = Resource.ERROR_BE.DuplicateCodeUnit;
          this.$emit("update:conversionUnitNameNotEmpty", Resource.ERROR_BE.DuplicateCodeUnit)
          this.$refs.conversionUnitName.focusUnit = true;
        } else {
          for (let i = 0; i < error.length; i++) {
            // Thiếu mã nhân viên thực hiện focus mã nhân viên bằng true
            if (error[i] == errorBE.DuplicateCodeUnit) {
              this.$refs.conversionUnitName.validate();
              listMessError += Resource.ERROR_BE.UnitNameNotEmpty;
              this.$emit("update:conversionUnitNameNotEmpty", Resource.ERROR_BE.DuplicateCodeUnit)
              this.$refs.conversionUnitName.focusUnit = true;
            }

            if (
              error[i] ==
              errorBE.MaxCodeUnitName
            ) {
              this.$refs.conversionUnitName.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.MaxLengthUnitName + "\n";
              this.conversionUnitNameNotEmpty = Resource.ERROR_VALIDATE_FE.MaxLengthUnitName;
              this.$emit("update:conversionUnitNameNotEmpty", Resource.ERROR_VALIDATE_FE.MaxLengthUnitName)
              this.$refs.conversionUnitName.focusUnit = true;
            }
          }
        }
        this.customPopup(true, listMessError, Resource.VUE_APP_POPUP.ERROR);
      }
      // Lỗi exception
      if (err.response.status == enumMISA.response.Exception || err.response.status == enumMISA.response.Error) {
        this.customPopup(true, Resource.ERROR_BE.Unknow, Resource.VUE_APP_POPUP.ERROR);
      }
    },

    /**
     * Form thêm mới
     * CreatedBy : PDDang(24/5/2023)
     */
    callNewForm() {
      if (this.getNewForm == true) {
        this.$emit("getNewForm");
        this.title = Resource.TitleForm.AddUnit;
        this.$emit("update:type", Resource.TYPE_FORM.ADD);
        this.unit = { ...this.dataDefault };
        this.dataOrigin = { ...this.dataDefault };
        this.$refs.conversionUnitName.focusFunc();
        this.getNewForm = false;
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
        if (isShow == false) {
          // Nếu focus mã nhân viên bằng true thì focus vào input
          if (this.$refs.conversionUnitName.focusUnit) {
            this.$refs.conversionUnitName.focusFunc();
            // Gán lại giá trị cho focus mã nhân viên
            this.$refs.conversionUnitName.focusUnit = false;
            return;
          }
        }
      }
    },
    /**
     * CreatedBy : PDDang(24/5/2023)
     */
    getForm() {
      try {
        this.focusUnit = true;
        // Khởi tạo lấy giá trị id truyền vào
        if (this.id) {
          // Bật loadding
          this.isLoadingDataForm = true;
          this.title = Resource.TitleForm.UpdateUnit;
          // Lấy dữ liệu
          const data = callAPI(
            Resource.HTTP_METHOD.GET,
            unitService.getById(this.id)
          );
          data.then((res) => {
            if (res) {
              this.dataOrigin = { ...res };
              this.unit = res;
            }
          });
        } else {
          // k có id thì là form thêm mới
          this.title = Resource.TitleForm.AddUnit;
        }
      } catch (error) {
        console.log(error);
      }
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
    this.getForm();
  },
  watch: {},
};
</script>

<style>
.form_material {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
}

.form_detail {
  position: absolute;
  height: auto;
  /* width: 400px; */
  width: auto;
  border-radius: 6px;
  border: 5px solid #0072bc;
  background-color: #0072bc;
  top: calc(50% - 300px);
  left: calc(50% - 425px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}

.form_title {
  background-color: #0072bc;
  color: #fff;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.title_right {
  display: flex;
}

.title_right i {
  margin: 0;
  margin-left: 10px;
  cursor: pointer;
}

.info_container_1 {
  display: flex;
  flex-wrap: wrap;
}

.info_material {
  width: 50%;
  padding: 0 10px;
  margin: 3px 0;
  display: flex;
}

.detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
  background-color: #fff;
}

.info_name {
  width: 100px;
}

.info_w100 {
  width: 100%;
  display: flex;
}

.info_w100 textarea {
  height: 60px;
  max-height: 60px;
  padding: 5px 10px;
  border: 1px solid #bbb;
  flex: 1;
}

.info_w100 textarea:focus {
  border: 1px solid #0072bc;
  outline: none;
}

.info_unit {
  flex-direction: column;
  padding: 0 10px;
}

.info_title_unit {
  height: 30px;
  background-color: rgb(233, 233, 233);
  padding: 0 2px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.info_title_unit span {
  color: #0072bc;
  background-color: #fff;
  height: 100%;
  line-height: 26px;
  padding: 0 8px;
  border-top: 2px solid #0072bc;
}

.table_unit {
  height: 220px;
  border: 1px solid #bbb;
  overflow: auto;
  position: relative;
  z-index: 5;
}

.selectbox_table_unit {
  z-index: 10;
}

.func_unit {
  margin-top: 12px;
}

.func_form {
  padding: 0 10px;
  justify-content: space-between;
}

.content_add_unit {
  padding: 8px 10px;
  background-color: #fff;
}

/* .add_unit_list{

    } */

.add_unit_item {
  display: flex;
  margin: 8px 0;
  background-color: #fff;
}

.add_unit_name {
  min-width: 120px;
}

.add_unit_func {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  width: 100%;
}
</style>