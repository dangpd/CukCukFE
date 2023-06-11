<template>
  <div class="field-input">
    <input class="m-input" :type="type || 'text'" :class="{ 'm-input-error': valRequired, 'noneBorder': noneBorder }"
      :placeholder="placeholder || ''" :style="styleVal" ref="inputFocus" @input="onInput" :tabindex="tabIndex"
      @blur="onBlur" @keyup="onKeyUp" @keydown="onKeyDown" v-model="value" />
    <div v-show="showErorr" class="error-input-alert">
      <img src="../../assets/Image/exclamation.png" @mouseover="mouseOver" @mouseout="mouseOut">
      <label for="" v-show="showText"
        style="display: flex;color:black;border-radius: 2px;width: 240px;z-index: 10;position: absolute;top: 20px;left: 8px;background-color: white;border: 1px solid #bbb;padding: 4px 8px;box-shadow: 2px 4px 6px #888888;">
        <img src="../../assets/Image/exclamation.png" alt="" style="margin-right: 4px;max-width: 18px;max-height: 18px;">
        {{ messError }}
      </label>
      <!-- <p class="error-input-arrow"></p>
      <div class="error-input-content">
        <p>
          {{ messError }}
        </p>
      </div> -->
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
      showText: false,
      noneBorder: false,
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
    "lengthAfterComma",
    "noneShowBorder"
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
        this.showErorr = true;
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
      // check độ dài tối đa
      if (this.maxLength) {
        if (parseInt(this.maxLength) <= event.target.value.length) {
          event.target.value = event.target.value.substr(0, this.maxLength);
        }
        this.val = event.target.value;
        this.$emit('update:value', event.target.value);
        this.showErorr = false;
        this.valRequired = false;
      } else {
        this.val = event.target.value;
        this.$emit('update:value', event.target.value);
        this.showErorr = false;
        this.valRequired = false;
      }
      if (this.type == "float") {
        let selectionStart = valueInput.target.selectionStart;
        if (valueInput.data >= 0 && valueInput.data <= 9) {
          var positionComma = this.value.indexOf(","); // vị trí dấu phẩy

          // nếu con trỏ ở trên dấu phẩy
          if (selectionStart <= positionComma) {
            this.positionCursor = selectionStart;
            var valueAfterComma = this.value.slice(positionComma);
            let dotsBeforeFormat = this.value.slice(0, selectionStart).split(".");
            let valueBeforeComma = this.value
              .slice(0, positionComma)
              .replace(/[.]/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            let dotsAfterFormat = valueBeforeComma
              .slice(0, selectionStart)
              .split(".");
            this.value = valueBeforeComma + valueAfterComma;
            if (!valueBeforeComma && valueInput.data == null) this.value = "";

            this.inputBeforeChange = JSON.parse(JSON.stringify(this.value));

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
            this.value = `${this.value.slice(0, this.value.length - 1)}${valueInput.data
              },${listZero}`;
            this.inputBeforeChange = JSON.parse(JSON.stringify(this.value));
            this.$nextTick(() => {
              this.$refs.inputFocus.selectionEnd = selectionStart;
            });
          } else if (positionComma < 0 && valueInput.data == null) {
            var positionCommaValueOld = this.inputBeforeChange.indexOf(",");
            if (valueInput.inputType == "deleteContentBackward") {
              this.value =
                this.inputBeforeChange.slice(0, positionCommaValueOld - 1) +
                this.inputBeforeChange.slice(positionCommaValueOld);
              let dotsBeforeFormat = this.value
                .slice(0, selectionStart)
                .split(".");
              let valueBeforeComma = this.value
                .slice(0, positionCommaValueOld - 1)
                .replace(/[.]/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              let dotsAfterFormat = valueBeforeComma
                .slice(0, selectionStart)
                .split(".");

              if (valueBeforeComma)
                this.value =
                  valueBeforeComma +
                  this.inputBeforeChange.slice(positionCommaValueOld);
              else this.value = "";
              this.inputBeforeChange = JSON.parse(JSON.stringify(this.value));
              this.$nextTick(() => {
                if (dotsBeforeFormat.length != dotsAfterFormat.length)
                  this.$refs.inputFocus.selectionEnd =
                    positionCommaValueOld - 2;
                else
                  this.$refs.inputFocus.selectionEnd =
                    positionCommaValueOld - 1;
              });
            } else if (valueInput.inputType == "deleteContentForward") {
              this.value = JSON.parse(JSON.stringify(this.inputBeforeChange));
              this.$nextTick(() => {
                this.$refs.inputFocus.selectionEnd = positionCommaValueOld;
              });
            }
          } else {
            if (valueInput.data) {
              if (selectionStart == this.value.length) {
                this.value =
                  this.value.slice(0, selectionStart - 2) + valueInput.data;
              }
              this.value =
                this.value.slice(0, selectionStart) +
                this.value.slice(selectionStart + 1);
              this.inputBeforeChange = JSON.parse(JSON.stringify(this.value));
              this.$nextTick(() => {
                // this.value = value
                this.$refs.inputFocus.selectionEnd = selectionStart;
              });
            } else {
              if (valueInput.inputType == "deleteContentBackward") {
                if (selectionStart == this.value.length) {
                  this.value = this.value.slice(0, selectionStart) + "0";
                } else {
                  this.value =
                    this.value.slice(0, selectionStart) +
                    this.value.slice(selectionStart) +
                    "0";
                }
                this.inputBeforeChange = JSON.parse(JSON.stringify(this.value));
                this.$nextTick(() => {
                  this.$refs.inputFocus.selectionEnd = selectionStart;
                });
              } else if (valueInput.inputType == "deleteContentForward") {
                this.value =
                  this.value.slice(0, selectionStart) +
                  this.value.slice(selectionStart) +
                  "0";
                this.inputBeforeChange = JSON.parse(JSON.stringify(this.value));
                this.$nextTick(() => {
                  this.$refs.inputFocus.selectionEnd = selectionStart;
                });
              }
            }
          }
        } else if (valueInput.data == "." || valueInput.data == ",") {
          this.value =
            this.value.slice(0, selectionStart - 1) +
            this.value.slice(selectionStart);

          let positionComma = this.value.indexOf(",");
          this.inputBeforeChange = JSON.parse(JSON.stringify(this.value));
          this.$nextTick(() => {
            this.$refs.inputFocus.selectionEnd = positionComma + 1;
          });
        } else {
          this.value =
            this.value.slice(0, selectionStart - 1) +
            this.value.slice(selectionStart);
          this.inputBeforeChange = JSON.parse(JSON.stringify(this.value));
          this.$nextTick(() => {
            this.$refs.inputFocus.selectionEnd = selectionStart - 1;
          });
        }
        this.$emit("update:value", this.value);
        this.$refs.inputFocus.value = this.value;
      }
      if (this.type == 'int') {
        let selectionStart = valueInput.target.selectionStart
        if (!/[0-9]/.test(valueInput.data) && valueInput.inputType != 'deleteContentBackward' && valueInput.inputType != 'deleteContentForward') {
          this.value = this.value.slice(0, selectionStart - 1) + this.value.slice(selectionStart)
          this.$nextTick(() => {
            this.$refs.inputFocus.selectionEnd = selectionStart - 1;
          })
        }
        this.$emit('update:value', this.value);
        this.$refs.inputFocus.value = this.value
      }

    },

    /**
     * Show lỗi khi di chuyển chuột vào
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    mouseOver() {
      if (this.valRequired) this.showText = true;
    },

    /**
     * Show lỗi khi di chuyển chuột ra
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    mouseOut() {
      this.showText = false;
    },

    onKeyUp() {
      this.$emit('keyboard', { val: this.value, keyCode: event.keyCode })
    },

    /**
 * sự kiện khi blur
 */
    onBlur() {
      this.$emit('onBlur', { val: this.value });
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
    this.noneBorder = this.noneShowBorder;
    if (this.type == "float") {
      if (this.modelValue) {
        // console.log(this.modelValue);
        let a = parseInt(this.modelValue)
        // console.log(a);
        let checklengthAfterComma = 2
        if (this.lengthAfterComma)
          checklengthAfterComma = this.lengthAfterComma
        let b = (parseFloat(this.modelValue) - parseInt(this.modelValue)).toFixed(checklengthAfterComma).split('.')[1]
        a = `${a}`.replace(/[.]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        this.$emit('update:modelValue', `${a},${b}`);
        this.$nextTick(() => {
          this.$refs.inputFocus.value = `${a},${b}`
        })
        this.inputBeforeChange = `${a},${b}`
      }
    } else {
      this.value = this.modelValue;
    }
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