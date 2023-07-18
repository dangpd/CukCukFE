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
            {{ this.categoryCode }} <span style="color: red">(*)</span>
          </div>
          <BaseInput style="width: 250px" v-model="materialCategory.categoryCode" :required="true" ref="categoryCode"
            :messError="categoryCodeNotEmpty" :focus="focusCategoryCode" tabIndex="1" />
        </div>
        <div class="add_unit_item">
          <div class="add_unit_name">
            {{ this.categoryName }} <span style="color: red">(*)</span>
          </div>
          <BaseInput style="width: 250px" v-model="materialCategory.categoryName" :required="true" ref="categoryName"
            :messError="categoryNameNotEmpty" :focus="focusCategoryName" tabIndex="2" />
        </div>

        <div class="add_unit_item">
          <div class="add_unit_name">{{ this.description }}</div>
          <BaseTextArea :style="`min-width: 250px;max-width:250px;
          min-height:80px;
                    max-height: 80px;
                  padding-left: 8px;
                  padding-top: 8px;`" v-model="materialCategory.description" tabIndex="3" />
        </div>
        <div class="add_unit_func">
          <div style="
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 100%;
            ">
            <BaseButtonIcon icon="fa-solid  fa-circle-question" colorIcon="#2281c1" val="Giúp"
              styleCss="margin-right: 5px" buttonIconForm buttonIcon tabIndex="4" />
            <BaseButtonIcon icon="fa-sharp fa-solid fa-floppy-disk" colorIcon="#2281c1" styleCss="margin-right: 5px"
              buttonIconForm buttonIcon val="Cất" @click="saveAndClose" :title="toolTipSave" tabIndex="5" />
            <BaseButtonIcon icon="fa-solid fa-file-export" colorIcon="#2281c1" styleCss="margin-right: 5px" buttonIconForm
              buttonIcon val="Cất và thêm" @click="saveAndAdd" :title="toolTipSaveAndAdd" tabIndex="6" />
            <BaseButtonIcon icon="fa-regular fa-circle-xmark" colorIcon="red" val="Hủy" styleCss="margin-right: 5px"
              buttonIconForm buttonIcon @click="btnOnCancel" :title="toolTipCancel" tabIndex="7" />
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
import { isNull, shallowEqual } from "@/js/common";
import materialCategoryService from '@/js/apiMaterialCategory';
import enumMISA from '../../js/enum';
import errorBE from '../../js/errorBE';

export default {
  name: "TheFormMaterialCategory",
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
      materialCategory: {
        categoryCode: "",
        categoryName: "",
        description: "",
      },
      dataOrigin: {
        categoryCode: "",
        categoryName: "",
        description: "",
      },
      dataDefault: {
        categoryCode: "",
        categoryName: "",
        description: "",
      },
      getNewForm: false,
      categoryCodeNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
      categoryNameNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
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
      focusCategoryCode: false,
      focusCategoryName: false,
      toolTipSave: Resource.KeyboardShortcuts.Save,
      toolTipSaveAndAdd: Resource.KeyboardShortcuts.SaveAndInsert,
      toolTipCancel: Resource.KeyboardShortcuts.Esc,
      categoryCode: Resource.FEILD_CATEGORY.categoryCode,
      categoryName: Resource.FEILD_CATEGORY.categoryName,
      description: Resource.FEILD_CATEGORY.description,
    };
  },
  methods: {
    // Click nút exit để đóng form
    btnOnExit() {
      try {
        if (
          !shallowEqual(this.dataOrigin, this.materialCategory) &&
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
            for (let key in this.materialCategory) {
              this.materialCategory[key] = this.dataOrigin[key];
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
      var errorList = []; // Danh sách các trường lỗi
      // Check null mã nhóm nguyên vật liệu
      if (!isNull(this.materialCategory.categoryCode)) {
        this.$refs.categoryCode.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.CategoryCodeNotEmpty + "\n";
        validate = false;
        errorList.push("categoryCode")
      }

      // Check null tên nhóm nguyên vật liệu
      if (!isNull(this.materialCategory.categoryName)) {
        this.$refs.categoryName.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.CategoryNameNotEmpty + "\n";
        validate = false;
        errorList.push("categoryName")
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
     */
    saveAndAdd() {
      try {
        // Validate bằng false thì handle error front end không thì thực hiện lưu dữ liệu
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
          materialCategoryService.insertRecord(),
          this.materialCategory
        );
        response
          .then((res) => {
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
          });
      } else {
        const response = callAPI(
          Resource.HTTP_METHOD.PUT,
          materialCategoryService.updatedRecord(this.id),
          this.materialCategory
        );
        response
          .then((res) => {
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
          });
      }
    },

    /**
     * handle lỗi Front end
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
        if (this.validateData().errorList[i] == Resource.FIELD_MATERIALCATEGORY.categoryCode) {
          this.$refs.categoryCode.focusCategoryCode = true;
        }

        // Thiếu tên nhân viên thực hiện focus tên nhân viên bằng true
        if (this.validateData().errorList[i] == Resource.FIELD_MATERIALCATEGORY.categoryName) {
          this.$refs.categoryName.focusCategoryName = true;
        }
      }
    },

    /**
     * handle lỗi backend
     * CreatedBy : PDDang(24/5/2023)
     */
    handleError(err) {
      try {
        console.log(err);
        if (err.response.data.errorCode == enumMISA.response.BadRequest) {
          var listMessError = [];
          var error = err.response.data.moreInfo;
          if (error == errorBE.DuplicateCodeMaterialCategory) {
            this.$refs.categoryCode.validate();
            this.categoryCodeNotEmpty = Resource.ERROR_BE.DuplicateCodeMaterialCategory;
            this.$emit(
              "update:categoryCodeNotEmpty",
              Resource.ERROR_BE.DuplicateCodeMaterialCategory
            );
            listMessError += Resource.ERROR_BE.DuplicateCodeMaterialCategory;
            this.$refs.categoryCode.focusCategoryCode = true;
            this.customPopup(true, listMessError, Resource.VUE_APP_POPUP.ERROR);

          } else {
            for (let i = 0; i < error.length; i++) {
              // Thiếu mã nhân viên thực hiện focus mã nhân viên bằng true
              if (
                error[i] ==
                errorBE.DuplicateCodeMaterialCategory
              ) {
                this.$refs.categoryCode.validate();
                listMessError += Resource.ERROR_BE.DuplicateCodeMaterialCategory;
                this.categoryCodeNotEmpty = Resource.ERROR_BE.DuplicateCodeMaterialCategory;
                this.$emit("update:categoryCodeNotEmpty", Resource.ERROR_BE.DuplicateCodeMaterialCategory)
                this.$refs.categoryCode.focusCategoryCode = true;
              }

              if (
                error[i] ==
                errorBE.MaxCodeCategoryCode
              ) {
                this.$refs.categoryCode.validate();
                listMessError += Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCategoryCode + "\n";
                this.categoryCodeNotEmpty = Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCategoryCode;
                this.$emit("update:categoryCodeNotEmpty", Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCategoryCode)
                this.$refs.categoryCode.focusCategoryCode = true;
              }

              if (
                error[i] ==
                errorBE.MaxCodeMaterialCategoryName
              ) {
                this.$refs.categoryName.validate();
                listMessError += Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCategoryName + "\n";
                this.categoryNameNotEmpty = Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCategoryName;
                this.$emit("update:categoryNameNotEmpty", Resource.ERROR_VALIDATE_FE.MaxLengthMaterialCategoryName)
                this.$refs.categoryName.focusCategoryName = true;
              }
            }
            this.customPopup(true, listMessError, Resource.VUE_APP_POPUP.ERROR);
          }
        }

        // Lỗi exception
        if (err.response.status == enumMISA.response.Exception || err.response.status == enumMISA.response.Error) {
          this.customPopup(true, Resource.ERROR_BE.Unknow, Resource.VUE_APP_POPUP.ERROR);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi form thêm mới
     * CreatedBy : PDDang(24/5/2023)
     */
    callNewForm() {
      if (this.getNewForm == true) {
        this.$emit("getNewForm");
        this.title = Resource.TitleForm.AddMaterialCategory;
        this.$emit("update:type", Resource.TYPE_FORM.ADD);
        this.materialCategory = { ...this.dataDefault };
        this.$refs.categoryCode.focusFunc();
        this.dataOrigin = { ...this.dataDefault };
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
        // Nếu show custom bằng false thì thực hiện focus vào từng dòng
        if (isShow == false) {
          // Nếu focus mã nhân viên bằng true thì focus vào input
          if (this.$refs.categoryCode.focusCategoryCode) {
            this.$refs.categoryCode.focusFunc();
            // Gán lại giá trị cho focus mã nhân viên
            this.$refs.categoryCode.focusCategoryCode = false;
            return;
          }

          // Nếu focus tên nhân viên bằng true thì focus vào input
          if (this.$refs.categoryName.focusCategoryName) {
            this.$refs.categoryName.focusFunc();
            // Gán lại giá trị cho focus tên nhân viên
            this.$refs.categoryName.focusCategoryName = false;
            return;
          }
        }
      }
    },

    getForm() {
      try {
        this.focusCategoryCode = true;
        // Khởi tạo lấy giá trị id truyền vào
        if (this.id) {
          // Bật loadding
          this.isLoadingDataForm = true;
          this.title = Resource.TitleForm.UpdateMaterialCategory;
          // Lấy dữ liệu
          const data = callAPI(
            Resource.HTTP_METHOD.GET,
            materialCategoryService.getById(this.id)
          );
          data.then((res) => {
            if (res) {
              this.dataOrigin = { ...res };
              this.materialCategory = res;
              if (this.type == Resource.TYPE_FORM.DUPLICATE) {
                this.materialCategory.categoryCode = null;
              }
            }
          });
        } else {
          // k có id thì là form thêm mới
          this.title = Resource.TitleForm.AddMaterialCategory;
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
    
<style></style>