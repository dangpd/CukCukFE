<template>
  <div ref="selectBoxShow" style="position: relative;" class="select-box" :style="`${style}`" @mouseover="mouseOver"
    @mouseout="mouseOut" v-click-out-side="hideListData">
    <div class="select_container" style="height: 26px;" v-click-out-side="hideBorder">
      <div class="select-box-show" :class="{
        'select-box-error': isRequired,
        'hidden_border': setShowBorder,
        'focus_input ': focusBorder, 'onBlurInput': onBlurInput
      }" ref="selectBoxShow">
        <input type="text" class="select-box-main" v-model="textInput" ref="inputSelectBox" @input="inputOnChange"
          @focus="onFocusInput" @keydown="selecItemUpDown" @click="setShowBorder = false" :tabindex="tabIndex"
          @blur="onBlur" />
        <button v-if="!setShowBorder" tabindex="-1" @click="btnSelectDataOnClick" @keydown="selecItemUpDown">
          <div class="icon_background_1 select-box-iconc"></div>
        </button>
        <div v-if="addSelect && !setShowBorder" class="add_select_box" @click="clickAddSelect">
          <i :class="addSelectIcon" :style="{ color: addSelectColor }"></i>
        </div>
        <!-- <div v-show="showError" class="error-selecbox-alert">
          <p class="error-selecbox-arrow"></p>
          <div class="error-selecbox-content">
            <p>
              {{ messError }}
            </p>
          </div>
        </div> -->
      </div>
    </div>

    <!-- :style="styleValHide" -->
    <div v-show="isShowListData" ref="selectBoxHidden" class="select-box-hidden"
      style="position: absolute;top: 28px; left: 0;border: 1px solid #bbb;">
      <button v-if="fieldListHide.length > 1" class="select-box-title">
        <div v-for="(showItem, index) in fieldListHide" :key="index" class="selecbox-show-list-item"
          :style="'width: ' + showItem.width + '%'">
          {{ showItem.title }}
        </div>
      </button>
      <button v-for="(item, index) in dataMain" :key="index" :ref="'toFocus_' + index" :class="{
        'select-box-focus': index == indexItemFocus,
        'select-box-choice': index == indexItemSelected,
      }" :value="item[fieldNameShow]" @click="itemOnSelect(item, index)" @focus="saveItemFocus(index)"
        @keydown="selecItemUpDown(index)" @keyup="selecItemUpDown(index)" tabindex="1">
        <div v-for="(showItem, index) in fieldListHide" :key="index" class="selecbox-show-list-item"
          :style="'width: ' + showItem.width + '%'">
          {{ item[showItem.field] }}
        </div>
      </button>
    </div>
  </div>
</template>
<script>

import clickOutSide from "@mahdikhashan/vue3-click-outside";
import enumMISA from '../../js/enum';

export default {
  data() {
    return {
      dataMain: [], //Dữ liệu
      textInput: null, // input v-model
      dataFilter: [], //Dữ liệu gốc
      isShowListData: false, // Hiển thị list data hay không
      indexItemFocus: null, // Index của item focus hiện tại
      indexItemSelected: null, // Index của item được selected
      isRequired: false, // Trường dữ liệu bắt buộc phải chọn
      showError: false, // Hiển thị box nội dung lỗi
      setShowBorder: false, // set show border
      focusBorder: false,
      onBlurInput: false,
    };
  },
  directives: {
    clickOutSide,
  },
  props: {
    data: Array, //Truyền data cố định không get từ API
    url: String, //Get data từ url
    fieldListHide: Array, // Danh sách các trường cần hiển thị
    fieldNameShow: String, //Trường dữ liệu show combobox
    fieldNameValue: String, //Trường dữ liệu lấy value
    fieldName: String, // Trường dữ liệu của data khi gửi lên server
    styleValHide: String, //style form hide
    style: String, // Css cho selectbox
    required: Boolean, // Trường dữ liệu bắt buộc phải chọn
    focusFirstData: Boolean, // Chọn dữ liệu đầu tiên trong data show lên combobox
    setData: [String, Number], // Set dữ liệu cho checkbox
    messError: String, // nội dung lỗi khi validate selectbox
    width: String, // set độ rộng của selectbox
    addSelect: Boolean, // có chức năng thêm select hay không
    addSelectIcon: String, // icon select add
    addSelectColor: String, // color select
    showBorder: Boolean, // show border
    id: [String, Number],
    tabIndex: [Number, String]
  },

  methods: {
    /**
     * Lưu lại index của item đã focus
     * CreatedBy: PDDang (24/5/2023)
     */
    saveItemFocus(index) {
      this.indexItemFocus = index;
    },

    /**
     * Ẩn danh sách item
     * CreatedBy: PDDang (24/5/2023)
     */
    hideListData() {
      this.isShowListData = false;
      this.focusBorder = false;
    },

    /**
     * Nhấn vào button thì hiển thị hoặc ẩn List Item
     * CreatedBy: PDDang (24/5/2023)
     */
    btnSelectDataOnClick() {
      this.dataFilter = this.data;
      this.isShowListData = !this.isShowListData;
    },

    /**
     * Click chọn item trong danh sách
     * CreatedBy: PDDang (24/5/2023)
     */
    itemOnSelect(item, index) {
      if ((item && index) || (item && index == 0)) {
        const text = item[this.fieldNameShow];
        const value = item[this.fieldNameValue];
        this.textInput = text; // Hiển thị text lên input.
        this.indexItemSelected = index;
        this.isShowListData = false;
        // console.log('i',item);
        this.isRequired = false; // Ẩn class error nếu có trường bắt buộc
        this.$emit("getValue", {
          val: value,
          fieldName: this.fieldName,
          id: this.id,
        });
        this.$emit("update:setData", value);
      }
    },

    onBlur() {
      this.onBlurInput = false;
      this.focusBorder = false;
    },

    selecItemUpDown() {
      var me = this;
      var keyCodePress = event.keyCode;
      var elToFocus = null;
      var elToFocusPrev = null;
      var selecboxHide = this.$refs["selectBoxHidden"];
      switch (keyCodePress) {
        case enumMISA.KEY_CODE.ESC:
          this.isShowListData = false;
          break;
        case enumMISA.KEY_CODE.ROW_DOWN:
          this.isShowListData = true;
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus + 1}`];
          elToFocusPrev = this.$refs[`toFocus_${me.indexItemFocus}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = 0;
            selecboxHide.scrollTop = 0;
          } else {
            if (
              selecboxHide.scrollTop <=
              elToFocusPrev[0].offsetTop +
              elToFocusPrev[0].offsetHeight -
              selecboxHide.offsetHeight &&
              elToFocusPrev[0].offsetTop +
              elToFocusPrev[0].offsetHeight -
              selecboxHide.offsetHeight >=
              0
            ) {
              selecboxHide.scrollTop =
                elToFocus[0].offsetTop +
                elToFocus[0].offsetHeight -
                selecboxHide.offsetHeight;
            }
            this.indexItemFocus += 1;
          }

          break;
        case enumMISA.KEY_CODE.ROW_UP:
          this.isShowListData = true;
          if (me.indexItemFocus == null || me.indexItemFocus == 0) {
            this.indexItemFocus = 1;
          }
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus - 1}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = this.dataFilter.length - 1;
            elToFocus = this.$refs[`toFocus_${this.indexItemFocus}`];
            selecboxHide.scrollTop =
              elToFocus[0].offsetTop + elToFocus[0].offsetHeight;
          } else {
            if (elToFocus[0].offsetTop <= selecboxHide.scrollTop) {
              selecboxHide.scrollTop =
                elToFocus[0].offsetTop - elToFocus[0].offsetHeight;
            }
            // else{
            //     selecboxHide.scrollTop = 0;
            // }
            this.indexItemFocus -= 1;
          }
          break;
        case enumMISA.KEY_CODE.ENTER:
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus}`];
          if (elToFocus && elToFocus.length > 0) {
            elToFocus[0].click();
            // console.log(this.data);
            // let value = this.data.find((item) => {
            //   return item.conversionUnitName == elToFocus[0].value;
            // })
            // console.log({
            //   val: value.conversionUnitId,
            //   fieldName: value.conversionUnitName,
            //   id: this.id,
            // });
            this.isShowListData = false;
          }
          break;
        case enumMISA.KEY_CODE.TAB:
          // Ẩn data show
          this.setShowBorder = false;
          break;
        default:
          break;
      }
    },

    /**
     * Lấy giá trị của selectbox
     * CreatedBy: PDDang (24/5/2023)
     */
    getValueSelectBox() {
      var value = {
        show: null,
        value: null,
      };
      if (!this.dataFilter && this.url) {
        fetch(this.url, {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((res) => {
            this.dataMain = res;
            this.dataFilter = res;
            if (this.dataFilter[this.indexItemSelected])
              value = {
                show: this.dataFilter[this.indexItemSelected][
                  this.fieldNameShow
                ],
                value:
                  this.dataFilter[this.indexItemSelected][this.fieldNameValue],
              };
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.dataFilter[this.indexItemSelected])
        value = {
          show: this.dataFilter[this.indexItemSelected][this.fieldNameShow],
          value: this.dataFilter[this.indexItemSelected][this.fieldNameValue],
        };

      return value;
    },

    /**
     * Nhập text thì thực hiện filter dữ liệu và hiển thị
     * CreatedBy: PDDang (24/5/2023)
     */
    inputOnChange() {
      var me = this;
      // Thực hiện lọc các phần tử phù hợp trong data:
      this.dataMain = this.dataFilter.filter((e) => {
        if (
          e[me.fieldNameShow]
            .toLowerCase()
            .search(me.textInput.toLowerCase()) >= 0
        ) {
          return true;
        }
      });
      if (this.textInput == "") {
        this.dataMain = this.dataFilter;
        this.indexItemSelected = null;
        this.$emit("getValue", {
          val: "",
          fieldName: this.fieldNameid,
          id: this.id,
        });
        if (
          this.required &&
          !this.indexItemSelected &&
          !this.textInput &&
          Object.keys(this.dataMain).length
        ) {
          this.isRequired = true;
        } else {
          this.isRequired = false;
        }
      }
      this.isShowListData = true;
      // Kiểm tra dữ liệu bắt buọc
    },

    /**
     * Hover selectbox
     * CreatedBy: PDDang (24/5/2023)
     */
    mouseOver() {
      if (this.isRequired) this.showError = true;
    },

    /**
     * mouseOut
     * CreatedBy: PDDang (24/5/2023)
     */
    mouseOut() {
      this.showError = false;
    },

    /**
     * focus
     */
    onFocusInput() {
      this.setShowBorder = false;
      this.focusBorder = true;
      // this.onBlurInput = false;
    },

    /**
     * check dữ liệu validate
     * CreatedBy: PDDang (24/5/2023)
     */
    validate() {
      if (this.required && !this.textInput) {
        this.isRequired = true;
        this.showErorr = false;
        return {
          status: false,
          messError: this.messError,
        };
      } else {
        this.isRequired = false;
        return {
          status: true,
        };
      }
    },

    /**
     * Set combobox với giá trị được truyền vào
     * @param {*} dataSet
     * CreatedBy: PDDang (24/5/2023)
     */
    setDataSelecBox(dataSet) {
      if (dataSet) {
        var indexChoiced;
        // Lấy item được chọn
        var itemChoiced = this.dataMain.find((item, index) => {
          indexChoiced = index; // Set vị trí chứa item được chọn
          return item[this.fieldNameValue] == dataSet;
        });

        if (itemChoiced) {
          const text = itemChoiced[this.fieldNameShow];
          this.textInput = text; // Hiển thị text lên input.
          this.indexItemSelected = indexChoiced;
          this.isShowListData = false;
          this.isRequired = false;
        }
      } else {
        this.textInput = ""; // Hiển thị text lên input.
        this.indexItemSelected = -1;
      }
    },

    /**
     * focus
     * CreatedBy: PDDang (24/5/2023)
     */
    focusFunc() {
      this.$refs.inputSelectBox.focus();
      this.focusBorder = true;
    },

    /**
     * Gọi hàm hiển thị show box thêm select
     * CreatedBy: PDDang (29/9/2022)
     */
    clickAddSelect() {
      this.$emit("showBoxAddSelect");
    },

    /**
     * Ẩn border khi click outside
     */
    hideBorder() {
      if (this.showBorder) {
        this.setShowBorder = true;
      }
    },
  },

  watch: {
    setData(newVal) {
      this.setDataSelecBox(newVal);
    },
    data(newVal) {
      this.dataFilter = newVal;
      this.dataMain = newVal;
      this.setDataSelecBox(this.setData);
    },
    // isShowListData(newVal) {
    //   if (newVal) {
    //     if (this.styleValHide == 'top') {
    //       this.$nextTick(() => {
    //         this.$refs.selectBoxHidden.style.left = this.$refs.selectBoxShow.getBoundingClientRect().left + 'px'
    //         this.$refs.selectBoxHidden.style.top = this.$refs.selectBoxShow.getBoundingClientRect().top - this.$refs.selectBoxHidden.offsetHeight - 3 + 'px'
    //       })
    //     }
    //     else {
    //       this.$nextTick(() => {
    //         console.log(this.$refs.selectBoxShow.getBoundingClientRect().left + 'px');
    //         console.log(this.$refs.selectBoxShow.getBoundingClientRect().bottom + 'px');
    //         console.log(this.$refs.selectBoxShow.offsetWidth + "px");
    //         this.$refs.selectBoxHidden.style.left = this.$refs.selectBoxShow.getBoundingClientRect().left + 'px'
    //         this.$refs.selectBoxHidden.style.top = this.$refs.selectBoxShow.getBoundingClientRect().bottom + 3 + 'px'
    //       })
    //     }
    //   }
    // },
    // tabIndex(newVal) {
    //   console.log(newVal);
    // }
  },

  async created() {
    if (this.showBorder) {
      this.setShowBorder = this.showBorder;
    }
    this.dataMain = this.data;
    // Láy dữ liệu cho bảng từ url
    if (this.url) {
      await fetch(this.url, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.dataMain = res;
          this.dataFilter = res;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //Focus giá trị đầu tiên của combobox
    if (this.focusFirstData && this.dataMain.length > 0) {
      const text = this.dataMain[0][this.fieldNameShow];
      // const value = this.dataMain[0][this.fieldNameValue];
      this.textInput = text; // Hiển thị text lên input.
      this.indexItemSelected = 0;
      this.isShowListData = false;
      this.isRequired = false;
    }

    // Set combobox với giá trị được truyền vào
    this.setDataSelecBox(this.setData);
  },
  mounted() {
    this.$refs.selectBoxHidden.style.width =
      this.$refs.selectBoxShow.offsetWidth + "px";
  },
};
</script>
<style scoped>
@import url("@/css/base/selectbox.css");
</style>
