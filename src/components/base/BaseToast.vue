<template>
    <div class="m-toast-box">
      <div class="m-toast-item">
        <div class="m-toast-icon m-toast-background" :class="iconShow"></div>
        <div class="m-toast-text" :class="textColorShow">{{ messageShow }}</div>
        <div class="m-toast-close" @click="closeToast"></div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "BaseToast",
    data() {
      return {
        iconShow: "",
        textColorShow: "",
        messageShow : this.message
      };
    },
    props: {
      icon: String, // icon toast message
      message: String,
    },
    methods: {
      /**
       * Đóng toast message
       */
      closeToast() {
        this.$emit("closeToast");
      },
  
      /**
       * Set thời gian tắt toast là 5s
       * CreateBy: DangPD
       */
      setTimeRemove() {
        // Thời gian đóng toast message
        setTimeout(() => {
          this.$emit("closeToast");
        }, 5000);
      },
    },
    created() {
      // Chọn toast message
      switch (this.icon) {
        case "deleteSuccess":
          this.iconShow = "t-icon-success";
          this.textColorShow = "text-green";
          break;
        case "addSuccess":
          this.iconShow = "t-icon-success";
          this.textColorShow = "text-green";
          break;
        case "editSuccess":
          this.iconShow = "t-icon-success";
          this.textColorShow = "text-green";
          break;
        case "copySuccess":
          this.iconShow = "t-icon-success";
          this.textColorShow = "text-green";
          break;
        case "warning":
          this.iconShow = "t-icon-warning";
          this.textColorShow = "text-yellow";
          break;
        case "error":
          this.iconShow = "t-icon-error";
          this.textColorShow = "text-red";
          break;
        case "deleteError":
          this.iconShow = "t-icon-error";
          this.textColorShow = "text-red";
          break;
        case "addError":
          this.iconShow = "t-icon-error";
          this.textColorShow = "text-red";
          break;
        default:
          break;
      }
    },
    mounted() {
      this.setTimeRemove();
    },
  };
  </script>
  <style scoped>
  @import url(../../css/base/toast.css);
  </style>