<template>
  <div class="field-input">
    <input class="m-input" type="text" :class="{ 'm-input-error': valRequired }" :placeholder="placeholder || ''"
      :style="styleVal" ref="inputFocus" @input="onInput" @mouseover="mouseOver" @mouseout="mouseOut" :tabindex="tabIndex"
      v-model="value" />
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
  props: ["modelValue","placeholder","messError","focus","styleVal","required","tabIndex"],
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
    onInput() {
      // Kiểm tra giá trị nhập vào tự input
      this.value = event.target.value;
      // Update giá trị value
      this.$emit("update:modelValue", event.target.value);
      // Không show lỗi
      this.showErorr = false;
      this.valRequired = false;
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
    }
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