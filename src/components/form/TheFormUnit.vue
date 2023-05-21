<template>
  <div class="form_material">
    <div class="form_detail">
      <div class="form_title">
        {{ this.title }}
        Đơn vị tính
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="content_add_unit">
        <div class="add_unit_item">
          <div class="add_unit_name">
            Đơn vị tính <span style="color: red">(*)</span>
          </div>
          <BaseInput style="width: 250px" />
        </div>
        <div class="add_unit_item">
          <div class="add_unit_name">
            Diễn giải
          </div>
          <BaseTextArea @onInput="getData" style="width: 250px;height: 80px;padding-left: 16px;padding-top: 8px;" />
        </div>
        <div class="add_unit_func">
          <div style="display: flex;align-items: center;justify-content:space-around;width: 100%;">
            <BaseButtonIcon icon="fa-solid  fa-circle-question" colorIcon="#2281c1" val="Giúp"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer" />
            <BaseButtonIcon icon="fa-sharp fa-solid fa-floppy-disk" colorIcon="#2281c1"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer" val="Cất" @click="saveAndClose" />
            <BaseButtonIcon icon="fa-solid fa-file-export" colorIcon="#2281c1"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer" val="Cất và thêm" @click="saveAndAdd" />
            <BaseButtonIcon icon="fa-regular fa-circle-xmark" colorIcon="red" val="Hủy"
              styleCss="margin-right: 5px;padding:4px 8px;cursor:pointer" @click="closeFormMain" />
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
import BaseButtonIcon from '../base/BaseButtonIcon.vue';
import BaseInput from '../base/BaseInput.vue';
import BaseLoading from '../base/BaseLoading.vue';
import BasePopUp from '../base/BasePopUp.vue';
import BaseTextArea from '../base/BaseTextArea.vue';
export default {
  name: "TheFormUnit",
  components: { BaseLoading, BasePopUp, BaseInput, BaseButtonIcon, BaseTextArea },

  data() {
    return {
      loadingForm: false,
      //Popup
      popup: {
        isShowPopup: false, // Trạng thái ẩn hiện popup
        messagePopup: '', // tiêu đề popup
        typePopup: '', // loại popup
        callbackFun: {
          callbackProcessWhenClose: () => { }, // Xử lý khi đóng popup
          callbackWarningDeleteYes: () => { }, // xử lý khi click không popup question
          callbackConfirmPopup: () => { }, // xử lý khi click đồng ý popup warning
          callbackQuestionNo: () => { }, // xử lý khi click không popup question
          callbackQuestionYes: () => { }, // xử lý khi click có popup question
        },
      },
    }
  }
}
</script>

<style>
.form_material {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 150;
  top: 0;
  left: 0;
}

.form_detail {
  position: absolute;
  height: auto;
  width: 400px;
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
  width: 100px
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
  padding: 0 8px;
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