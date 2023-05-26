<template>
  <div class="form_material">
    <div class="form_detail_material">
      <div class="form_title">
        {{ this.title }}
        <i
          class="fa-solid fa-xmark"
          @click="btnOnExit"
          style="border: 1px solid white; padding: 2px 4px; border-radius: 50%"
        ></i>
      </div>
      <div class="content_add_material">
        <div class="group">
          <div class="group1">
            <div class="add_material_item">
              <div class="add_material_name">
                Mã <span style="color: red">(*)</span>
              </div>
              <BaseInput
                style="width: 250px"
                v-model="material.materialCode"
                :required="true"
                ref="materialCode"
                :messError="materialCodeNotEmpty"
              />
            </div>
          </div>
          <div class="group2">
            <div class="add_material_item">
              <div class="add_material_name">
                Tên <span style="color: red">(*)</span>
              </div>
              <BaseInput
                style="width: 250px"
                v-model="material.materialName"
                :required="true"
                ref="materialName"
                :messError="materialNameNotEmpty"
              />
            </div>
          </div>
        </div>
        <div class="add_material_item">
          <div class="add_material_name">Diễn giải</div>
          <BaseTextArea
            :style="`width: 250px;
                    height: 80px;
                    padding-left: 8px;
                    padding-top: 8px;`"
            v-model="material.description"
          />
        </div>
        <div class="add_unit_func">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 100%;
            "
          >
            <BaseButtonIcon
              icon="fa-solid  fa-circle-question"
              colorIcon="#2281c1"
              val="Giúp"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer"
            />
            <BaseButtonIcon
              icon="fa-sharp fa-solid fa-floppy-disk"
              colorIcon="#2281c1"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer"
              val="Cất"
              @click="saveAndClose"
            />
            <BaseButtonIcon
              icon="fa-solid fa-file-export"
              colorIcon="#2281c1"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer"
              val="Cất và thêm"
              @click="saveAndAdd"
            />
            <BaseButtonIcon
              icon="fa-regular fa-circle-xmark"
              colorIcon="red"
              val="Hủy"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer"
              @click="btnOnCancel"
            />
          </div>
        </div>
      </div>
    </div>
    <BaseLoading v-if="loadingForm"></BaseLoading>
    <BasePopUp
      v-if="popup.isShowPopup"
      :message="popup.messagePopup"
      :type="popup.typePopup"
      @closePopup="customPopup"
      @processWhenClose="popup.callbackFun.callbackProcessWhenClose"
      @clickWarningDeleteYes="popup.callbackFun.callbackWarningDeleteYes"
      @confirmPopup="popup.callbackFun.callbackConfirmPopup"
      @clickQuestionNo="popup.callbackFun.callbackQuestionNo"
      @clickQuestionYes="popup.callbackFun.callbackQuestionYes"
    />
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
import _ from "underscore";
import materialCategoryService from "@/js/apiMaterialCategory";
import materialService from "@/js/apiMaterial";

export default {
  name: "TheFormMaterial",
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
      material: {
        materialCode: "",
        materialName: "",
        description: "",
      },
      dataOrigin: {
        materialCode: "",
        materialName: "",
        description: "",
      },
      dataDefault: {
        materialCode: "",
        materialName: "",
        description: "",
      },
      getNewForm: false,
      materialCodeNotEmpty: Resource.ERROR_VALIDATE_FE.MaterialCodeNotEmpty,
      materialNameNotEmpty: Resource.ERROR_VALIDATE_FE.MaterialNameNotEmpty,
      //Popup
      popup: {
        isShowPopup: false, // Trạng thái ẩn hiện popup
        messagePopup: "", // tiêu đề popup
        typePopup: "", // loại popup
        callbackFun: {
          callbackProcessWhenClose: () => {}, // Xử lý khi đóng popup
          callbackWarningDeleteYes: () => {}, // xử lý khi click không popup question
          callbackConfirmPopup: () => {}, // xử lý khi click đồng ý popup warning
          callbackQuestionNo: () => {}, // xử lý khi click không popup question
          callbackQuestionYes: () => {}, // xử lý khi click có popup question
        },
      },
    };
  },
  methods: {
    // Click nút exit để đóng form
    btnOnExit() {
      try {
        if (
          !shallowEqual(this.dataOrigin, this.material) &&
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
            for (let key in this.material) {
              this.material[key] = this.dataOrigin[key];
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
      if (!isNull(this.material.materialCode)) {
        this.$refs.materialCode.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.MaterialCodeNotEmpty + "\n";
        validate = false;
      }
      if (!isNull(this.material.materialName)) {
        this.$refs.materialName.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.MaterialNameNotEmpty + "\n";
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
        this.title = Resource.TitleForm.AddMaterialCategory;
        this.$emit("update:type", Resource.TYPE_FORM.ADD);
        this.materialCategory = { ...this.dataDefault };
        this.dataOrigin = { ...this.dataDefault };
        this.getNewForm = false;
      }
    },

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
          materialCategoryService.updatedRecord(this.id),
          this.materialCategory
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
        if (error == Resource.ERRORCODE_BE.DuplicateCodeMaterialCategory) {
          this.$refs.categoryCode.validate();
          this.categoryCodeNotEmpty =
            Resource.ERROR_BE.DuplicateCodeMaterialCategory;
          this.$emit(
            "update:categoryCodeNotEmpty",
            Resource.ERROR_BE.DuplicateCodeMaterialCategory
          );
          listMessError += Resource.ERROR_BE.DuplicateCodeMaterialCategory;
        } else {
          for (let i = 0; i < error; i++) {
            // Thiếu mã nhân viên thực hiện focus mã nhân viên bằng true
            if (
              err.response.data.moreInfo[i] ==
              Resource.ERRORCODE_BE.DuplicateCodeMaterialCategory
            ) {
              this.$refs.categoryCode.validate();
              listMessError += Resource.ERROR_BE.DuplicateCodeMaterialCategory;
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
          data.then((res) => {
            if (res) {
              this.dataOrigin = { ...res };
              this.material = res;
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
  },
  created() {
    this.getForm();
  },
  watch: {},
};
</script>
<style>
@import url(../../css/form/form.css);
</style>