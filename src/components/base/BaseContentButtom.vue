<template>
    <div class="container-number-pages">
        <div class="number-pages">

            <div class="number-pages-right">
                <div class="number-pages-navigate">
                    <div class="prev-page">
                        <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-angles-left" colorIcon="#bbb"
                            @click="getPage(1)" />
                        <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-angle-left" colorIcon="#bbb"
                            @click="getPage(pageChoice - 1)" />
                    </div>
                    <div class="list-pages">
                        Trang &ensp;
                        <span style="width: 60px">
                            <BaseInput v-model="pageChoice" @keyboard="changeNumberPage"
                                @onBlur="blurTextSearchNumberPage" />
                        </span>
                        &ensp;trên {{ totalPage }}
                    </div>
                    <div class="next-page">
                        <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-angle-right" colorIcon="#bbb"
                            @click="getPage(pageChoice + 1)" />
                        <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-angles-right" colorIcon="#bbb"
                            @click="getPage(totalPage)" />
                    </div>
                    <div class="reload">
                        <BaseButtonIcon noneBg noneBorder icon="fa-solid fa-arrow-rotate-right" colorIcon="#bbb"
                            @click="reloadAll()" />
                    </div>
                </div>
                <div class="number-item-on-pages">
                    <BaseSelectbox :data="listDataEmpInPage" v-model="pageSize" :style="`width: 100px`"></BaseSelectbox>
                </div>
            </div>
            <div class="number-pages-left">
                Hiển thị {{ (pageChoiceOld - 1) * pageSize + 1 }} - {{ pageChoiceOld * pageSize < totalCount ? pageChoiceOld
                    * pageSize : totalCount }} trên <b>{{ totalCount }}</b> kết quả
            </div>
        </div>
    </div>
</template>

<script>
import BaseButtonIcon from './BaseButtonIcon.vue';
import BaseInput from './BaseInput.vue';
import BaseSelectbox from './BaseSelectbox.vue';
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
                { feildShow: '20', feildValue: 20 },
                { feildShow: '40', feildValue: 40 },
                { feildShow: '50', feildValue: 50 },
                { feildShow: '70', feildValue: 70 },
                { feildShow: '100', feildValue: 100 },
            ],
        }
    },
    components: { BaseButtonIcon, BaseInput, BaseSelectbox },
    props: ["totalCount", "totalPage"],
    created() {
        // this.pageChoice = this.pageNumber;
        // this.pageSize  = this.totalPage;
        // this.totalRecord = this.totalCount;
    },
    methods: {
        /**
         * Blur text search number page
         */
        blurTextSearchNumberPage(data) {
            try {
                if (data) {
                    this.pageChoice = data.modelValue
                    this.pageChoiceOld = data.modelValue
                    this.$emit('getDataNumberTable', {
                        pageNumber: this.pageChoice,
                        pageSize: this.pageSize,
                    });
                    this.pageChoiceOld = this.pageChoice
                }

            } catch (error) {
                console.log(error)
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
                            this.pageChoice = data.modelValue
                            this.pageChoiceOld = data.modelValue
                            this.$emit('getDataNumberTable', {
                                pageNumber: this.pageChoice,
                                pageSize: this.pageSize,
                            });
                            break;
                        default:
                            break;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        getValue() {
            // if (dataValue.val && dataValue.fieldName) {
            //     this.pageNumber = []; // Khỏi tạo lại danh sách số trang
            //     this.pageSize = dataValue.val; // gán kích thước một trang
            //     this.totalPage = parseInt(this.totalCount / this.pageSize);
            //     if (this.totalCount % dataValue.val != 0) this.totalPage++;

            // this.pageNumber = pageNumberShow
            this.$emit('getDataNumberTable', {
                pageNumber: this.pageChoice,
                pageSize: this.pageSize,
            });
            this.pageChoiceOld = this.pageChoice
            // }
        },
    },
    watch: {
    }
}
</script>

<style>
@import url(../../css/base/basecontentbuttom.css);
</style>