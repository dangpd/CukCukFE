<template>
  <div class="container-number-pages">
    <div class="number-pages">
      <div class="number-pages-right">
        <div class="number-pages-navigate">
          <div class="prev-page">
            <BaseButtonIcon
              noneBg
              noneBorder
              icon="fa-solid fa-angles-left"
              colorIcon="#bbb"
              @click="getPage(1)"
            />
            <BaseButtonIcon
              noneBg
              noneBorder
              icon="fa-solid fa-angle-left"
              colorIcon="#bbb"
              @click="getPage(pageChoice - 1)"
            />
          </div>
          <div class="list-pages">
            Trang &ensp;
            <span style="width: 60px">
              <BaseInput v-model="pageChoice" />
            </span>
            &ensp;trên {{ totalPage }}
          </div>
          <div class="next-page">
            <BaseButtonIcon
              noneBg
              noneBorder
              icon="fa-solid fa-angle-right"
              colorIcon="#bbb"
              @click="getPage(pageChoice + 1)"
            />
            <BaseButtonIcon
              noneBg
              noneBorder
              icon="fa-solid fa-angles-right"
              colorIcon="#bbb"
              @click="getPage(totalPage)"
            />
          </div>
          <div class="reload">
            <BaseButtonIcon
              noneBg
              noneBorder
              icon="fa-solid fa-arrow-rotate-right"
              colorIcon="#bbb"
              @click="reloadAll"
            />
          </div>
        </div>
        <div class="number-item-on-pages">
          <BaseSelectbox
            :data="listDataEmpInPage"
            v-model="this.pageSizeNew"
            :style="`width: 100px`"
          ></BaseSelectbox>
        </div>
      </div>
      <div class="number-pages-left">
        Hiển thị {{ (pageChoiceOld - 1) * pageSize + 1 }} -
        {{
          pageChoiceOld * pageSizeNew < totalCount
            ? pageChoiceOld * pageSizeNew
            : totalCount
        }}
        trên <b>{{ totalCount }}</b> kết quả
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonIcon from "./BaseButtonIcon.vue";
import BaseInput from "./BaseInput.vue";
import BaseSelectbox from "./BaseSelectbox.vue";
export default {
  name: "BaseContentButtom",
  data() {
    return {
      pageChoice: 1, // page number được chọn
      pageChoiceOld: 1, // page number được chọn
      totalEmployee: 0, // tổng số nhân viên
      // totalPage: 0, // tổng số trang
      pageSizeNew: 20, // kích thước một trang
      // Danh sách hiển thị số bản ghi trên trang
      listDataEmpInPage: [
        { feildShow: "20", feildValue: 20 },
        { feildShow: "40", feildValue: 40 },
        { feildShow: "50", feildValue: 50 },
        { feildShow: "70", feildValue: 70 },
        { feildShow: "100", feildValue: 100 },
      ],
    };
  },
  components: { BaseButtonIcon, BaseInput, BaseSelectbox },
  props: ["totalCount", "totalPage", "pageSize"],
  created() {
    this.pageSizeNew = this.pageSize;
    console.log(this.pageSize);
  },
  methods: {
    /**
     * Lấy trang
     * @param {*} pagePosition
     */
    getPage(pagePosition) {
      if (pagePosition <= this.totalPage && pagePosition >= 1) {
        this.pageChoice = pagePosition;
        this.pageChoiceOld = pagePosition;
        this.$emit("getDataNumberTable", {
          pageNumber: this.pageChoice,
          pageSize: this.pageSizeNew,
        });
      } else {
        this.pageChoice = this.pageChoiceOld;
      }
    },

    /**
     * Blur text search number page
     */
    blurTextSearchNumberPage(data) {
      try {
        if (data) {
          console.log(data.modelValue);
          this.pageChoice = data.modelValue;
          this.pageChoiceOld = data.modelValue;
          this.$emit("getDataNumberTable", {
            pageNumber: this.pageChoice,
            pageSize: this.pageSizeNew,
          });
          this.pageChoiceOld = this.pageChoice;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * thay đổi
     */
    changeNumberPage(data) {
      try {
        if (data) {
          switch (data.keyCode) {
            case 13: // Enter
              this.pageChoice = data.modelValue;
              this.pageChoiceOld = data.modelValue;
              this.$emit("getDataNumberTable", {
                pageNumber: this.pageChoice,
                pageSize: this.pageSizeNew,
              });
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    reloadAll() {
      this.pageSizeNew = 20;
      this.$emit("reloadAll");
    },
  },
  watch: {
    pageSizeNew(newVal) {
      this.$emit("update:pageSize", newVal);
      console.log(newVal);
      this.pageSizeNew = newVal;
      this.$emit("getDataNumberTable", {
        pageNumber: 1,
        pageSize: this.pageSizeNew,
      });
      this.pageChoice = 1;
    },

    pageChoice(newVal) {
      console.log(newVal);
      this.pageChoice = newVal;
      this.$emit("getDataNumberTable", {
        pageNumber: this.pageChoice,
        pageSize: this.pageSizeNew,
      });
    },

    pageSize(newVal) {
      console.log(newVal);
      this.pageSizeNew = newVal;
      console.log(this.pageSizeNew);
    },
  },
};
</script>

<style>
@import url(../../css/base/basecontentbuttom.css);
</style>