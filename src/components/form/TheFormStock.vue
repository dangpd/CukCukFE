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
            {{ this.stockCode }} <span style="color: red">(*)</span>
          </div>
          <BaseInput style="width: 250px" v-model="stock.stockCode" :required="true" ref="stockCode"
            :messError="stockCodeNotEmpty" :focus="focusStockCode" tabIndex="1" />
        </div>
        <div class="add_unit_item">
          <div class="add_unit_name">
            {{ this.stockName }} <span style="color: red">(*)</span>
          </div>
          <BaseInput style="width: 250px" v-model="stock.stockName" :required="true" ref="stockName"
            :messError="stockNameNotEmpty" :focus="focusStockName" tabIndex="2" />
        </div>

        <div class="add_unit_item">
          <div class="add_unit_name">{{ this.address }}</div>
          <BaseTextArea :style="`min-width: 250px;max-width:250px;
          min-height:80px;
                    max-height: 80px;
                padding-left: 8px;
                padding-top: 8px;`" v-model="stock.address" tabIndex="3" />
        </div>
        <div class="add_unit_func">
          <div style="
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 100%;
            ">
            <BaseButtonIcon icon="fa-solid  fa-circle-question" colorIcon="#2281c1" val="Giúp"
              styleCss="margin-right: 5px;" buttonIconForm buttonIcon tabIndex="4" />
            <BaseButtonIcon icon="fa-sharp fa-solid fa-floppy-disk" colorIcon="#2281c1" styleCss="margin-right: 5px;"
              buttonIconForm buttonIcon val="Cất" @click="saveAndClose" :title="toolTipSave" tabIndex="5" />
            <BaseButtonIcon icon="fa-solid fa-file-export" colorIcon="#2281c1" styleCss="margin-right: 5px;"
              buttonIconForm buttonIcon val="Cất và thêm" @click="saveAndAdd" :title="toolTipSaveAndAdd" tabIndex="6" />
            <BaseButtonIcon icon="fa-regular fa-circle-xmark" colorIcon="red" val="Hủy" styleCss="margin-right: 5px;"
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
import stockService from '@/js/apiStock';
import enumMISA from '../../js/enum';
import errorBE from '../../js/errorBE';

export default {
  name: "TheFormStock",
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
      stock: {
        stockCode: "",
        stockName: "",
        address: "",
      },
      dataOrigin: {
        stockCode: "",
        stockName: "",
        address: "",
      },
      dataDefault: {
        stockCode: "",
        stockName: "",
        address: "",
      },
      getNewForm: false,
      stockCodeNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
      stockNameNotEmpty: Resource.ERROR_VALIDATE_FE.NotEmpty,
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
      focusStockCode: false,
      focusStockName: false,
      toolTipSave: Resource.KeyboardShortcuts.Save,
      toolTipSaveAndAdd: Resource.KeyboardShortcuts.SaveAndInsert,
      toolTipCancel: Resource.KeyboardShortcuts.Esc,
      stockCode: Resource.FIELD_STOCK.stockCode,
      stockName: Resource.FIELD_STOCK.stockName,
      address: Resource.FIELD_STOCK.address,
    };
  },
  methods: {
    // Click nút exit để đóng form
    btnOnExit() {
      try {
        if (
          !shallowEqual(this.dataOrigin, this.stock) &&
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
            for (let key in this.stock) {
              this.stock[key] = this.dataOrigin[key];
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
      var errorList = []; // Danh sách các trường lỗi
      if (!isNull(this.stock.stockCode)) {
        this.$refs.stockCode.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.StockCodeNotEmpty + "\n";
        validate = false;
        errorList.push("stockCode");
      }
      if (!isNull(this.stock.stockName)) {
        this.$refs.stockName.validate();
        errorMess += Resource.ERROR_VALIDATE_FE.StockNameNotEmpty + "\n";
        validate = false;
        errorList.push("stockName");
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
          stockService.insertRecord(),
          this.stock
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
          stockService.updatedRecord(this.id),
          this.stock
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
        if (this.validateData().errorList[i] == Resource.FIELD_STOCK.stockCode) {
          this.$refs.stockCode.focusStockCode = true;
        }

        // Thiếu tên nhân viên thực hiện focus tên nhân viên bằng true
        if (this.validateData().errorList[i] == Resource.FIELD_STOCK.stockName) {
          this.$refs.stockName.focusStockName = true;
        }
      }
    },


    /**
     * Handle lỗi backend
     * CreatedBy : PDDang(24/5/2023)
     */
    handleError(err) {
      if (err.response.data.errorCode == enumMISA.response.BadRequest) {
        var listMessError = [];
        var error = err.response.data.moreInfo;
        if (error == errorBE.DuplicateCodeStock) {
          this.$refs.stockCode.validate();
          this.stockCodeNotEmpty = Resource.ERROR_BE.DuplicateCodeStock;
          this.$emit(
            "update:stockCodeNotEmpty",
            Resource.ERROR_BE.DuplicateCodeStock
          );
          listMessError += Resource.ERROR_BE.DuplicateCodeStock;
          this.$refs.stockCode.focusStockCode = true;
        } else {
          for (let i = 0; i < error.length; i++) {
            // Thiếu mã nhân viên thực hiện focus mã nhân viên bằng true
            if (
              error[i] ==
              errorBE.DuplicateCodeStock
            ) {
              this.$refs.stockCode.validate();
              listMessError += Resource.ERROR_BE.DuplicateCodeStock;
              this.$refs.stockCode.focusStockCode = true;
            }

            if (
              error[i] ==
              errorBE.MaxCodeStockCode
            ) {
              this.$refs.stockCode.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.MaxLengthStockCode + "\n";
              this.stockCodeNotEmpty = Resource.ERROR_VALIDATE_FE.MaxLengthStockCode;
              this.$emit("update:stockCodeNotEmpty", Resource.ERROR_VALIDATE_FE.MaxLengthStockCode)
              this.$refs.stockCode.focusStockCode = true;
            }

            if (
              error[i] ==
              errorBE.MaxCodeStockName
            ) {
              this.$refs.stockName.validate();
              listMessError += Resource.ERROR_VALIDATE_FE.MaxLengthStockName + "\n";
              this.stockNameNotEmpty = Resource.ERROR_VALIDATE_FE.MaxLengthStockName;
              this.$emit("update:stockNameNotEmpty", Resource.ERROR_VALIDATE_FE.MaxLengthStockName)
              this.$refs.stockName.focusStockName = true;
            }
          }
        }
        this.customPopup(true, listMessError, Resource.VUE_APP_POPUP.ERROR);
      }
      if (err.response.status == enumMISA.response.Exception || err.response.status == enumMISA.response.Error) {
        this.customPopup(true, Resource.ERROR_BE.Unknow, Resource.VUE_APP_POPUP.ERROR);
      }
    },

    /**
     * Gọi lại form thêm mới
     * CreatedBy : PDDang(24/5/2023)
     */
    callNewForm() {
      if (this.getNewForm == true) {
        this.$emit("getNewForm");
        this.title = Resource.TitleForm.AddStock;
        this.$refs.stockCode.focusFunc();
        this.$emit("update:type", Resource.TYPE_FORM.ADD);
        this.stock = { ...this.dataDefault };
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
          if (this.$refs.stockCode.focusStockCode) {
            this.$refs.stockCode.focusFunc();
            // Gán lại giá trị cho focus mã nhân viên
            this.$refs.stockCode.focusStockCode = false;
            return;
          }

          // Nếu focus tên nhân viên bằng true thì focus vào input
          if (this.$refs.stockName.focusStockName) {
            this.$refs.stockName.focusFunc();
            // Gán lại giá trị cho focus tên nhân viên
            this.$refs.stockName.focusStockName = false;
            return;
          }
        }
      }
    },

    getForm() {
      try {
        this.focusStockCode = true;
        // Khởi tạo lấy giá trị id truyền vào
        if (this.id) {
          // Bật loadding
          this.isLoadingDataForm = true;
          this.title = Resource.TitleForm.UpdateStock;
          // Lấy dữ liệu
          const data = callAPI(
            Resource.HTTP_METHOD.GET,
            stockService.getById(this.id)
          );
          data.then((res) => {
            if (res) {
              this.dataOrigin = { ...res };
              this.stock = res;
            }
          });
        } else {
          // k có id thì là form thêm mới
          this.title = Resource.TitleForm.AddStock;
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