<template>
  <div class="field-input">
    <input
      class="m-input"
      type="text"
      :class="{ 'm-input-error': valRequired }"
      :placeholder="placeholder || ''"
      :style="styleVal"
      ref="inputFocus"
      @input="onInput"
      @mouseover="mouseOver"
      @mouseout="mouseOut"
      :tabindex="tabIndex"
      v-model="value"
    />
    <div v-show="showErorr" class="error-input-alert">
      <p class="error-input-arrow"></p>
      <!-- <i class="fa-sharp fa-solid fa-circle-exclamation" style="color: red;"></i> -->
      <div class="error-input-content">
        <p>
          {{ messError }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseInput",
  data() {
    return {
      value: "", // v-model input
      valRequired: false, // không được bỏ trống dữ liệu
      showErorr: false, // Thông báo lỗi
    };
  },
  props: [
    "modelValue",
    "placeholder",
    "messError",
    "focus",
    "styleVal",
    "required",
    "tabIndex",
    "type",
  ],
  // {
  //   : String, // giá trị của placeholder input
  //   : String, // nội dung lỗi khi validate input
  //   : String, // giá trị của input nhậ từ parent
  //   : Boolean, // focus vào input hay không
  //   : String, // css cho input
  //   : Boolean, // bắt buộc phải nhập dữ liệu
  //   : String,
  // },
  methods: {
    /**
     * Check dữ liệu khi người dùng nhập
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    validate() {
      // Kiểm tra quan tọng nếu nhập lỗi validate thì hiển thị css class input error không thì tắt css error input
      if (this.required) {
        this.valRequired = true;
        this.showErorr = false;
        return {
          status: false,
          messError: this.messError,
        };
      } else {
        this.valRequired = false;
        return {
          status: true,
        };
      }
    },

    /**
     * sự kiện oninput
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    onInput(valueInput) {
      // // Kiểm tra giá trị nhập vào tự input
      // this.value = event.target.value;
      // // Update giá trị value
      // this.$emit("update:modelValue", event.target.value);
      // // Không show lỗi
      // this.showErorr = false;
      // this.valRequired = false;
      if (this.maxLength) {
        if (parseInt(this.maxLength) <= event.target.value.length) {
          event.target.value = event.target.value.substr(0, this.maxLength);
        }
        this.val = event.target.value;
        this.$emit("update:value", event.target.value);
        this.showErorr = false;
        this.valRequired = false;
      } else {
        this.val = event.target.value;
        this.$emit("update:value", event.target.value);
        this.showErorr = false;
        this.valRequired = false;
      }
      if (this.type == "float") {
        let selectionStart = valueInput.target.selectionStart;
        if (valueInput.data >= 0 && valueInput.data <= 9) {
          var positionComma = this.val.indexOf(","); // vị trí dấu phẩy

          // nếu con trỏ ở trên dấu phẩy
          if (selectionStart <= positionComma) {
            this.positionCursor = selectionStart;
            var valueAfterComma = this.val.slice(positionComma);
            let dotsBeforeFormat = this.val.slice(0, selectionStart).split(".");
            let valueBeforeComma = this.val
              .slice(0, positionComma)
              .replace(/[.]/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            let dotsAfterFormat = valueBeforeComma
              .slice(0, selectionStart)
              .split(".");
            this.val = valueBeforeComma + valueAfterComma;
            if (!valueBeforeComma && valueInput.data == null) this.val = "";

            this.inputBeforeChange = JSON.parse(JSON.stringify(this.val));

            this.$nextTick(() => {
              if (
                dotsBeforeFormat.length != dotsAfterFormat.length &&
                valueInput.data == null
              ) {
                this.$refs.inputFocus.selectionEnd = selectionStart - 1;
              } else if (
                dotsBeforeFormat.length != dotsAfterFormat.length &&
                valueInput.data != null
              ) {
                this.$refs.inputFocus.selectionEnd = selectionStart + 1;
              } else {
                this.$refs.inputFocus.selectionEnd = selectionStart;
              }
            });
          } else if (positionComma < 0 && valueInput.data != null) {
            let listZero = Array.from({ length: this.lengthAfterComma })
              .fill("0")
              .join("");
            this.val = `${this.val.slice(0, this.val.length - 1)}${
              valueInput.data
            },${listZero}`;
            this.inputBeforeChange = JSON.parse(JSON.stringify(this.val));
            this.$nextTick(() => {
              this.$refs.inputFocus.selectionEnd = selectionStart;
            });
          } else if (positionComma < 0 && valueInput.data == null) {
            var positionCommaValueOld = this.inputBeforeChange.indexOf(",");
            if (valueInput.inputType == "deleteContentBackward") {
              this.val =
                this.inputBeforeChange.slice(0, positionCommaValueOld - 1) +
                this.inputBeforeChange.slice(positionCommaValueOld);
              let dotsBeforeFormat = this.val
                .slice(0, selectionStart)
                .split(".");
              let valueBeforeComma = this.val
                .slice(0, positionCommaValueOld - 1)
                .replace(/[.]/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              let dotsAfterFormat = valueBeforeComma
                .slice(0, selectionStart)
                .split(".");

              if (valueBeforeComma)
                this.val =
                  valueBeforeComma +
                  this.inputBeforeChange.slice(positionCommaValueOld);
              else this.val = "";
              this.inputBeforeChange = JSON.parse(JSON.stringify(this.val));
              this.$nextTick(() => {
                if (dotsBeforeFormat.length != dotsAfterFormat.length)
                  this.$refs.inputFocus.selectionEnd =
                    positionCommaValueOld - 2;
                else
                  this.$refs.inputFocus.selectionEnd =
                    positionCommaValueOld - 1;
              });
            } else if (valueInput.inputType == "deleteContentForward") {
              this.val = JSON.parse(JSON.stringify(this.inputBeforeChange));
              this.$nextTick(() => {
                this.$refs.inputFocus.selectionEnd = positionCommaValueOld;
              });
            }
          } else {
            if (valueInput.data) {
              if (selectionStart == this.val.length) {
                this.val =
                  this.val.slice(0, selectionStart - 2) + valueInput.data;
              }
              this.val =
                this.val.slice(0, selectionStart) +
                this.val.slice(selectionStart + 1);
              this.inputBeforeChange = JSON.parse(JSON.stringify(this.val));
              this.$nextTick(() => {
                // this.val = value
                this.$refs.inputFocus.selectionEnd = selectionStart;
              });
            } else {
              if (valueInput.inputType == "deleteContentBackward") {
                if (selectionStart == this.val.length) {
                  this.val = this.val.slice(0, selectionStart) + "0";
                } else {
                  this.val =
                    this.val.slice(0, selectionStart) +
                    this.val.slice(selectionStart) +
                    "0";
                }
                this.inputBeforeChange = JSON.parse(JSON.stringify(this.val));
                this.$nextTick(() => {
                  this.$refs.inputFocus.selectionEnd = selectionStart;
                });
              } else if (valueInput.inputType == "deleteContentForward") {
                this.val =
                  this.val.slice(0, selectionStart) +
                  this.val.slice(selectionStart) +
                  "0";
                this.inputBeforeChange = JSON.parse(JSON.stringify(this.val));
                this.$nextTick(() => {
                  this.$refs.inputFocus.selectionEnd = selectionStart;
                });
              }
            }
          }
        } else if (valueInput.data == "." || valueInput.data == ",") {
          this.val =
            this.val.slice(0, selectionStart - 1) +
            this.val.slice(selectionStart);

          let positionComma = this.val.indexOf(",");
          this.inputBeforeChange = JSON.parse(JSON.stringify(this.val));
          this.$nextTick(() => {
            this.$refs.inputFocus.selectionEnd = positionComma + 1;
          });
        } else {
          this.val =
            this.val.slice(0, selectionStart - 1) +
            this.val.slice(selectionStart);
          this.inputBeforeChange = JSON.parse(JSON.stringify(this.val));
          this.$nextTick(() => {
            this.$refs.inputFocus.selectionEnd = selectionStart - 1;
          });
        }
        this.$emit("update:value", this.val);
        this.$refs.inputFocus.value = this.val;
      }
    },

    /**
     * Show lỗi khi di chuyển chuột vào
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    mouseOver() {
      if (this.valRequired) this.showErorr = true;
    },

    /**
     * Show lỗi khi di chuyển chuột ra
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    mouseOut() {
      this.showErorr = false;
    },

    /**
     * Foocus
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    focusFunc() {
      this.$refs.inputFocus.focus();
    },
  },
  watch: {
    value(newVal) {
      this.$emit("update:modelValue", newVal);
    },
    modelValue(newVal) {
      this.value = newVal;
    },
  },
  created() {
    this.value = this.modelValue;
  },
  mounted() {
    if (this.focus) {
      this.$refs.inputFocus.focus();
    }
  },
};
</script>
<style scoped>
@import url(../../css/base/input.css);
</style>