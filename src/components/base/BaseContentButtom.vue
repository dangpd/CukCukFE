<template>
  <div class="container-number-pages">
    <div class="number-pages">
      <div class="number-pages-right">
        <div class="number-pages-navigate">
          <div class="prev-page">
            <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-angles-left" colorIcon="#bbb" @click="getPage(1)"
              :notSelect="pageChoice === 1 ? true : false" :title="firstPage" />
            <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-angle-left" colorIcon="#bbb"
              @click="getPage(parseInt(pageChoice) - 1)" :notSelect="pageChoice === 1 ? true : false" :title="prevPage" />
          </div>
          <div class="list-pages">
            Trang &ensp;
            <span style="width: 60px">
              <BaseInput v-model="pageChoice" @keyboard="changeNumberPage" type="int" />
            </span>
            &ensp;trên {{ totalPage }}
          </div>
          <div class="next-page">
            <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-angle-right" colorIcon="#bbb"
              @click="getPage(parseInt(pageChoice) + 1)" :notSelect="pageChoice === totalPage ? true : false"
              :title="nextPage" />
            <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-angles-right" colorIcon="#bbb" @click="getPage(totalPage)"
              :notSelect="pageChoice === totalPage ? true : false" :title="LastPage" />
          </div>
          <div class="reload">
            <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-arrow-rotate-right" colorIcon="#bbb" @click="reloadAll" title="Tải lại" />
          </div>
        </div>
        <div class="number-item-on-pages">
          <BaseSelectbox :data="listDataEmpInPage" v-model="this.pageSize" :style="`width: 100px`"></BaseSelectbox>
        </div>
      </div>
      <div class="number-pages-left">
        Hiển thị {{ (pageChoiceOld - 1) * pageSize + 1 }} -
        {{
          pageChoiceOld * pageSize < totalCount ? pageChoiceOld * pageSize : totalCount }} trên {{ totalCount }} kết quả
          </div>
      </div>
    </div>
</template>

<script>
import BaseButtonIcon from "./BaseButtonIcon.vue";
import BaseInput from "./BaseInput.vue";
import BaseSelectbox from "./BaseSelectbox.vue";
import enumMISA from '../../js/enum';
import Resource from '../../js/resource';
export default {
  name: "BaseContentButtom",
  data() {
    return {
      pageChoice: 1, // page number được chọn
      pageChoiceOld: 1, // page number được chọn
      totalEmployee: 0, // tổng số nhân viên
      // totalPage: 0, // tổng số trang
      pageSize: 20, // kích thước một trang
      // Danh sách hiển thị số bản ghi trên trang
      listDataEmpInPage: [
        { feildShow: "20", feildValue: 20 },
        { feildShow: "40", feildValue: 40 },
        { feildShow: "50", feildValue: 50 },
        { feildShow: "70", feildValue: 70 },
        { feildShow: "100", feildValue: 100 },
      ],
      notSelect: false,
      firstPage: Resource.KeyboardShortcuts.FirstPage,
      prevPage: Resource.KeyboardShortcuts.PrevPage,
      nextPage: Resource.KeyboardShortcuts.NextPage,
      LastPage: Resource.KeyboardShortcuts.LastPage,
    };
  },
  components: { BaseButtonIcon, BaseInput, BaseSelectbox },
  props: ["totalCount", "totalPage",],
  created() {
    // this.pageSize = this.pageSize;
    // console.log(this.pageSize);
  },
  methods: {
    /**
     * Lấy trang
     * @param {*} pagePosition
     */
    getPage(pagePosition) {
      if (pagePosition == 1 && pagePosition <= this.totalPage && this.pageChoice == 1) {
        return;
      }
      if (pagePosition == this.totalPage && this.pageChoice == this.totalPage) {
        return;
      }
      if (pagePosition <= this.totalPage && pagePosition >= 1) {
        this.pageChoice = pagePosition;
        this.pageChoiceOld = pagePosition;
        this.$emit("getDataNumberTable", {
          pageNumber: this.pageChoice,
          pageSize: this.pageSize,
        });
      } else {
        this.pageChoice = this.pageChoiceOld;
      }
    },

    /**
     * thay đổi
     */
    changeNumberPage(data) {
      try {
        if (data) {
          // console.log(data);
          switch (data.keyCode) {
            case enumMISA.KEY_CODE.ENTER: // Enter
              if (data.val <= this.totalPage && data.val >= 1) {
                this.pageChoice = data.val
                this.pageChoiceOld = data.val
                this.$emit('getDataNumberTable', {
                  pageNumber: this.pageChoice,
                  pageSize: this.pageSize,
                });
              }
              else {
                this.pageChoice = this.pageChoiceOld
              }
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
      this.pageSize = 20;
      this.$emit("reloadAll");
    },
  },
  watch: {
    pageSize(newVal) {
      this.pageSize = newVal;
      this.pageChoiceOld = 1;
      this.pageChoice = 1;
      this.$emit("getDataNumberTable", {
        pageNumber: 1,
        pageSize: this.pageSize,
      });
    },

    totalCount(newVal) {
      if (newVal < this.pageChoice * this.pageSize) {
        this.pageChoiceOld = 1;
        this.pageChoice = 1;
        this.$emit("getDataNumberTable", {
          pageNumber: 1,
          pageSize: this.pageSize,
        });
      }
    },

    // totalPage(newVal){
    //   let total = parseInt(this.totalCount / this.pageChoice);
    //   if(total == newVal){
    //     return;
    //   }
    //   console.log(newVal);
    // }

    // pageChoice(newVal) {
    //   console.log(newVal);
    //   this.pageChoice = newVal;
    //   this.pageChoiceOld = this.pageChoice;
    //   this.$emit("getDataNumberTable", {
    //     pageNumber: this.pageChoice,
    //     pageSize: this.pageSize,
    //   });
    // },

  },
  computed: {
  }
};
</script>

<style>
@import url(../../css/base/basecontentbuttom.css);
</style>