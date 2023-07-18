<template>
    <div class="form_material" @keydown="keyboardShortcuts">
        <div class="form_detail_import">
            <div class="form_title">
                <div>{{ this.header }}</div>

                <i class="fa-solid fa-xmark" @click="btnOnExit"
                    style="border: 1px solid white; padding: 2px 4px; border-radius: 50%"></i>
            </div>
            <div class="content_add_unit">
                <div class="step1" v-show="step == step1">
                    <div class="step">{{ this.title1 }} </div>
                    <div class="s1">
                        <div class="header_step">
                            <div class="nav_step step1nav">{{ this.navstep1 }}</div>
                            <div class="nav_step">{{ this.navstep2 }}</div>
                            <div class="nav_step">{{ this.navstep3 }}</div>
                        </div>
                        <div class="content_step">
                            <div style="margin-bottom: 10px;">Chọn dữ liệu Nguyên vật liệu đã chuẩn bị để nhập khẩu vào phần
                                mềm</div>
                            <div style="display: flex;align-items: center;">
                                <input class="inputtext" readonly
                                    style="padding-left:8px;width: 400px;height: 21px;border: 1px solid #bbb;margin-right: 10px;"
                                    type="text" :value="selectedFile ? selectedFile.name : ''">
                                <input style="margin-top: 3px;cursor: pointer !important;" type="file" id="fileInput"
                                    class="input_file" @change="onFileChange">
                            </div>
                            <div style="margin-top: 10px;">Chưa có tệp mẫu để chuẩn bị dữ liệu? Tải tệp excel mẫu mà phần
                                mềm cung cấp để chuẩn bị dữ
                                liệu nhập khẩu Tại đây</div>
                        </div>
                    </div>
                </div>
                <div class="step1" v-show="step == step2">
                    <div class="step">{{ this.title2 }} </div>
                    <div class="s1">
                        <div class="header_step">
                            <div class="nav_step">{{ this.navstep1 }}</div>
                            <div class="nav_step step2nav">{{ this.navstep2 }}</div>
                            <div class="nav_step">{{ this.navstep3 }}</div>
                        </div>
                        <div class="content_step" style="width: 1000px;">
                            <div
                                style="display: flex;margin-bottom: 10px;font-size: 14px;font-weight: bold;position: fixed;background-color: #fff;height: 20px;">
                                <div>
                                    {{ this.countSuccess }} / {{ this.totalCount }} dòng hợp lệ
                                </div>
                                <div style="margin-left: 200px;">
                                    {{ this.countNotSuccess }} / {{ this.totalCount }} không dòng hợp lệ
                                </div>
                            </div>
                            <div class="table_import" style="margin-top: 20px;">
                                <table border="1" style="width: 1500px;overflow-y: auto;border-collapse: collapse;">
                                    <thead style="background-color: #ededed;margin-left: 20px;">
                                        <th>Mã</th>
                                        <th>Tên</th>
                                        <th>Tính chất</th>
                                        <th>Nhóm NVL</th>
                                        <th>Đơn vị</th>
                                        <th>Kho ngầm định</th>
                                        <th>Ghi chú</th>
                                        <th style="width: 250px;">Tình trạng</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in listMaterialExcel" :key="index">
                                            <td class="tooltips" :title="item.material.materialCode">{{
                                                item.material.materialCode }}</td>
                                            <td class="tooltips" :title="item.material.materialName">{{
                                                item.material.materialName }}</td>
                                            <td class="tooltips" :title="item.material.feature">{{
                                                item.material.feature }}</td>
                                            <td class="tooltips" :title="item.material.categoryName">{{
                                                item.material.categoryName }}</td>
                                            <td class="tooltips" :title="item.material.conversionUnitName">{{
                                                item.material.conversionUnitName }}</td>
                                            <td class="tooltips" :title="item.material.stockName">
                                                {{ item.material.stockName }}</td>
                                            <td class="tooltips" :title="item.material.description">{{
                                                item.material.description }}</td>
                                            <td class="tooltips" style="width: 250px;"
                                                :class="{ 'red': item.statusMaterial == duplicateCode, 'red1': item.statusMaterial == duplicateCodeConvertionUnit }"
                                                :title="formatStatusExcel(item.statusMaterial, item.material.materialCode, item.material.conversionUnitName)">
                                                {{
                                                    formatStatusExcel(item.statusMaterial,
                                                        item.material.materialCode, item.material.conversionUnitName) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step1" v-show="step == step3">
                    <div class="step">{{ this.title3 }} </div>
                    <div class="s1">
                        <div class="header_step">
                            <div class="nav_step">{{ this.navstep1 }}</div>
                            <div class="nav_step">{{ this.navstep2 }}</div>
                            <div class="nav_step step1nav">{{ this.navstep3 }}</div>
                        </div>
                        <div class="content_step">
                            <div style="margin-bottom: 10px;font-size: 24px;">Kết quả nhập khẩu</div>
                            <div>{{ this.recordS }} {{ this.countSuccessInsert }}</div>
                            <div>{{ this.recordNS }} {{ this.countNotSuccessInsert }}</div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div style="
              display: flex;
              align-items: center;
              width: 100%;
              justify-content: space-between;
            ">
                        <BaseButtonIcon icon="fa-solid  fa-circle-question" class="buttonIcon" colorIcon="#2281c1"
                            val="Giúp" styleCss="height: 26px;margin-right: 5px;padding:4px 8px;cursor:pointer;" />
                        <div>
                            <BaseButtonIcon v-show="this.step == step1 || this.step == step2"
                                :notSelect="this.step === step1 ? true : false"
                                :class="{ 'noneSelect': noneSelect, 'blur': step == step1 }" icon="fa-solid fa-left-long"
                                class="buttonIcon" colorIcon="#2281c1"
                                styleCss="height: 26px;margin-right: 10px;padding:4px 16px;cursor:pointer" val="Quay lại"
                                @click="backStep" />
                            <BaseButtonIcon v-show="this.step == step1 || this.step == step2"
                                :notSelect="this.selectedFile === null ? true : false || this.noRecord == true"
                                :class="{ 'blur': step == step1 && this.selectedFile === null || this.noRecord == true }"
                                icon="fa-solid fa-right-long" class="buttonIcon" colorIcon="#2281c1"
                                styleCss="height: 26px;margin-right: 10px;padding:4px 16px;cursor:pointer" val="Tiếp tục"
                                @click="continueStep" />
                            <BaseButtonIcon icon="fa-regular fa-circle-xmark" class="buttonIcon" colorIcon="red"
                                val="Hủy bỏ" styleCss="height: 26px;margin-right: 10px;padding:4px 16px;cursor:pointer"
                                @click="btnOnExit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BaseLoading v-if="loadingForm"></BaseLoading>
        <BasePopUp v-if="popup.isShowPopup" :message="popup.messagePopup" :type="popup.typePopup"
            @closePopup="customPopup()" @clickWarningDeleteYes="popup.callbackFunc.callbackWarningDeleteYes" />
    </div>
</template>
    
<script>
import enumMISA from '../../js/enum';
import BaseButtonIcon from '../base/BaseButtonIcon.vue';
import BaseLoading from '../base/BaseLoading.vue';
import axios from 'axios';
import materialService from '../../js/apiMaterial';
import BasePopUp from '../base/BasePopUp.vue';
import Resource from '../../js/resource';
import callAPI from '../../js/callAxios';
import { formatMaterialExcel } from '@/js/common'

export default {
    name: "TheFormImportExcel",
    components: {
        BaseButtonIcon,
        BaseLoading,
        BasePopUp
    },
    props: [],
    data() {
        return {
            step1: enumMISA.step.One,
            step2: enumMISA.step.Two,
            step3: enumMISA.step.Three,
            loadingForm: false,
            selectedFile: null,
            step: 1,
            countSuccess: 0,
            countNotSuccess: 0,
            totalCount: 0,
            listMaterial: [],
            listInforMaterial: [],
            //Popup
            popup: {
                isShowPopup: false, // Trạng thái ẩn hiện popup
                messagePopup: "", // nội dung popup
                typePopup: "", // loại popup
                callbackFunc: {
                    callbackWarningDeleteYes: () => { }, // xử lý khi click không popup question
                },
            },
            countSuccessInsert: 0,
            countNotSuccessInsert: 0,
            noRecord: false,
            noneSelect: false,
            listMaterialExcel: [],
            header: Resource.Excel.header,
            title1: Resource.Excel.title1,
            title2: Resource.Excel.title2,
            title3: Resource.Excel.title3,
            navstep1: Resource.Excel.step1,
            navstep2: Resource.Excel.step2,
            navstep3: Resource.Excel.step3,
            recordS: Resource.Excel.recordSuccess,
            recordNS: Resource.Excel.recordNotSuccess,
            duplicateCode: enumMISA.statusMAterial.duplicateCode,
            duplicateCodeConvertionUnit: enumMISA.statusMAterial.duplicateConvertionUnit
        };
    },
    methods: {
        /**
         * Format status Excel
         * @param {*} status 
         */
        formatStatusExcel(status, code, text) {
            return formatMaterialExcel(status, code, text);
        },
        /**
         * Thay đổi input file
         * CreatedBy : PDDang(24/5/2023)
         * @param {*} event 
         */
        onFileChange(event) {
            const file = event.target.files[0];
            // Điều kiện file dạng xls hoặc xlsx
            const allowedExtensions = ['.xls', '.xlsx'];

            if (file) {
                // Lấy tên file
                const fileName = file.name;
                // Lấy tên đuôi file
                const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedFile = file;
                } else {
                    // Display an error message or handle the case when the file is not an Excel file
                    this.customPopup(true,Resource.Excel.notFileExcel,Resource.VUE_APP_POPUP.ERROR);
                    this.selectedFile = null;
                }
            }
        },

        /**
         * Đóng form
         * CreatedBy : PDDang(24/5/2023)
         */
        btnOnExit() {
            try {
                this.$emit("onClose");
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Click phím tiếp tục
         * CreatedBy : PDDang(24/5/2023)
         */
        async continueStep() {
            try {
                if (this.selectedFile == null) {
                    this.step = this.step1;
                    return;
                } else {
                    this.step += 1;
                    if (this.step == this.step2) {
                        this.importData();
                    }
                    if (this.step == this.step3) {
                        if (this.noRecord == true) {
                            this.step = this.step2;
                            return;
                        } else {
                            this.insertData();
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },


        /**
         * Quay lại bước trước
         * CreatedBy : PDDang(24/5/2023)
         */
        backStep() {
            if (this.step > 1) {
                this.step -= 1;
                // if(this.step == this.step1){
                //     this.onFileChange();
                // }
                this.noRecord = false;
            } else {
                return;
            }
        },

        /**
         * Import data
         * CreatedBy : PDDang(24/5/2023)
         */
        async importData() {
            try {
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                this.loadingForm = true;

                const response = await axios.post(materialService.ImportExcel(), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.loadingForm = false;
                this.countSuccess = response.data.countMaterial;
                this.countNotSuccess = response.data.countNotIneligible;
                this.totalCount = response.data.totalCount;
                this.listMaterial = response.data.listMaterial;
                this.listInforMaterial = response.data.listInforMaterial;
                this.listMaterialExcel = response.data.listMateriExcel;
                if (this.listMaterialImport.length == 0) {
                    this.noRecord = true;
                } else {
                    this.noRecord = false;
                }
            } catch (error) {
                // Xử lý lỗi (nếu có)
                console.log(error);
                if (error.response.status == enumMISA.response.Exception) {
                    this.noRecord = true;
                    this.loadingForm = false;
                    this.customPopup(true, Resource.ERROR_BE.Unknow, Resource.VUE_APP_POPUP.ERROR);
                    this.listMaterialExcel = [];
                }
            }
        },

        /**
         * Insert Data
         * CreatedBy : PDDang(24/5/2023)
         */
        async insertData() {
            try {
                if (this.noRecord == true) {
                    return;
                } else {
                    this.loadingForm = true;
                    const response = await callAPI("POST", materialService.InsertExcel(), this.listInforMaterial);
                    console.log(response);
                    this.countSuccessInsert = response.success;
                    this.countNotSuccessInsert = response.notSuccess;
                    this.loadingForm = false;
                    this.$emit("reloadData");
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Ẩn hiện popup
         * @param {Boolean} isShow true- show popup, false - ẩn popup
         * @param {String} message nội dung của popup
         * @param {String} type loại popup
         * CreatedBy: PDDang (24/5/2023)
         */
        customPopup(isShow = false, message = "", type = "") {
            if (this.popup) {
                this.popup.isShowPopup = isShow; // ẩn hiện popup
                this.popup.messagePopup = message; // nội dung popup
                this.popup.typePopup = type; // loại popup
            }
        },
        /**
         * Phím tắt
         * CreateBy :DangPD
         */
        keyboardShortcuts(event) {
            // Bắt Esc
            if (event.keyCode == enumMISA.KEY_CODE.ESC) {
                this.$emit("onClose");
            }
        },
    },
    created() {
    },
    watch: {
        step(newVal) {
            this.step = newVal;
        },

        // listMaterialImport(newVal) {
        //     console.log(newVal);
        // },

    },
    computed: {
        listMaterialImport() {
            return this.listMaterialExcel.filter((x) => {
                return x.statusMaterial === 0;
            });
        }

    }
};
</script>
    
<style>
.form_detail_import {
    position: absolute;
    height: auto;
    /* width: 400px; */
    width: 1000px;
    border-radius: 6px;
    border: 1px solid #0072bc;
    top: calc(50% - 300px);
    left: calc(50% - 425px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.s1 {
    display: flex;
}

.step {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    font-family: sans-serif;
}

.nav_step {
    height: 30px;
    line-height: 30px;
    border: 1px solid #bbb;
    /* background-color: #add2ed; */
    border-radius: 2px;
    width: 200px;
    padding-left: 20px;
    margin: 10px 0px 0px 0px;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    font-family: sans-serif;
}

.nav_step:hover {
    background-color: #fac85e;
    border: 1px solid #ffc800;
}

.content_step {
    margin: 10px;
    padding: 10px;
    border: 1px solid #bbb;
    height: 400px;
    width: calc(100% - 200px);
    overflow-y: auto;
}

.input_file {
    height: 26px;
}

.inputtext input:focus {
    border: 1px solid #bbb;
}

.step1nav,
.step2nav {
    background-color: #0072cb;
}

.table_import {
    margin-top: 0px;
    /* border: 1px solid #bbb; */
    /* width: 1000px; */
    position: relative;
}

.table_import thead {
    height: 30px;
    max-width: 150px;
    min-width: 150px;
}

.table_import thead th {
    font-weight: 100;
}

.table_import tbody tr td {
    padding-left: 8px;
    height: 30px;
    max-width: 150px;
    min-width: 150px;

}

.blur {
    opacity: 0.6;
}

.blue2 {
    opacity: 0.6 !important;
}

.red {
    color: red;
}

.red1 {
    color: red;
}
</style>