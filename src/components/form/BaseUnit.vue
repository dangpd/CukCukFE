<template>
    <div>
        <BaseContentTitleVue :title="titleF"></BaseContentTitleVue>
        <div class="table">
            <div class="material_function">
                <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-add" colorIcon="#2281c1"
                    val="Thêm" styleCss="padding:0 8px" @click="addForm" />
                <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-copy" colorIcon="#2281c1"
                    val="Nhân bản" styleCss="padding:0 8px" @click="duplicateForm" />
                <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-pen-to-square"
                    colorIcon="#2281c1" val="Sửa" styleCss="padding:0 8px" @click="updateForm" />
                <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-xmark" colorIcon="red"
                    val="Xóa" styleCss="padding:0 8px" @click="deleteItem" />
                <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-rotate" colorIcon="#2281c1"
                    val="Nạp" styleCss="padding:0 8px" @click="reloadTable" />
            </div>
            <div class="table__content">
                <BaseLoading v-if="isLoading"></BaseLoading>
                <table class="m-table" border="1">
                    <thead>
                        <tr>
                            <th style="min-width: 500px;border: 1px solid #bbb;">
                                <div style="margin-top: 8px;font-weight: 100;">Đơn vị tính</div>
                                <div style="display: flex;min-width: 100%;margin: 8px 0;">
                                    <BaseFilterSearch type="string" field="conversionUnitName"
                                        @changeFilter="changeFilter" />
                                </div>
                            </th>
                            <th style="min-width: 500px;border: 1px solid #bbb;">
                                <div style="margin-top: 8px;font-weight: 100;">Diễn giải</div>
                                <div style="display: flex;min-width: 100%;margin: 8px 0;">
                                    <BaseFilterSearch type="string" field="description" @changeFilter="changeFilter" />
                                </div>
                            </th>
                            <th style="width: calc(100% - 1000px);border: 1px solid #bbb;">
                                <div style="margin-top: 8px;font-weight: 100;">Ngừng theo dõi</div>
                                <div style="display: flex;margin: 8px 0;">
                                    <BaseSelectBoxDown :data="[
                                        { status: 'Có', value: '2' },
                                        { status: 'Không', value: '1' }
                                    ]
                                        " :style="`background-color: #fff;`" fieldNameShow="status"
                                        fieldNameValue="value" fieldName="status"
                                        :setData="dataFilter.find((item) => item.field == 'status').value"
                                        @getValue="changeFilterStatus" :fieldListHide="[
                                            { field: 'status' },
                                        ]">
                                    </BaseSelectBoxDown>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <div class="notFound" v-show="showNotFound">
              <p>{{ this.label }}</p>
            </div> -->
                        <tr v-for="(item, index) in dataTable" :key="index">
                            <td class="text-align-left">{{ item.conversionUnitName }}</td>
                            <td class="text-align-left">{{ item.description }}</td>
                            <td class="text-align-center" style="padding-left: 100px;z-index: 0;">
                                <BaseCheckBox class="checkbox_table_status" disable :modelCheckbox="item.status == '2'"
                                    :value="item.status" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table__paging">
                <BaseContentButtom :totalCount="totalRecord" :totalPage="totalPage" ref="pageNumber"
                    @getDataNumberTable="getDataNumberTable" @reloadAll="reloadTable"></BaseContentButtom>
            </div>
        </div>
        <TheFormUnit v-if="showForm" @onClose="showForm = false" :id="id"></TheFormUnit>
    </div>
</template>
  
<script>
import BaseContentTitleVue from '../base/BaseContentTitle.vue';
import Resource from '../../js/resource';
import BaseFilterSearch from '../base/BaseFilterSearch.vue';
import BaseLoading from '../base/BaseLoading.vue';
import BaseContentButtom from '../base/BaseContentButtom.vue';
import unitService from '../../js/apiUnit';
import callAPI from '@/js/callAxios'
import BaseCheckBox from '../base/BaseCheckBox.vue';
import BaseSelectBoxDown from '../base/BaseSelectBoxDown.vue';
import TheFormUnit from './TheFormUnit.vue';
import BaseButtonIcon from '../base/BaseButtonIcon.vue';
export default {
    name: "BaseUnit",
    props: [""],
    components: { BaseContentTitleVue, BaseFilterSearch, BaseLoading, BaseContentButtom, BaseCheckBox, BaseSelectBoxDown, TheFormUnit, BaseButtonIcon },
    data() {
        return {
            titleF: Resource.TextVi.TitleContent.Unit,
            dataTable: [],
            dataFilter: [
                {
                    field: 'status',
                    operater: '=',
                    value: "1"
                }
            ],
            pageChoice: 1,
            // Khởi tạo giá trị của page là 20 bản ghi/ trang
            pageSize: 20,
            sort: "",
            isLoading: false,
            totalRecord: 0,
            totalPage: 0,
            showForm: false,
            TYPE_FORM: {},
            id: "",
        }
    },
    methods: {
        changeFilter(value) {
            try {
                if (value.filterVal != "") {
                    // Tạo đối tượng search lọc thông tin
                    var addFilter = {
                        Field: value.field.charAt(0).toUpperCase() + value.field.slice(1),
                        Operater: value.filterType,
                        Value: value.filterVal
                    }
                    // Xóa phần tử cần tìm kiếm nếu có Field cần search trùng với addFilter vừa tạo ở trên
                    this.dataFilter = this.dataFilter.filter((data) => {
                        return data.field != addFilter.field
                    })
                    this.dataFilter.push(addFilter);
                    console.log(this.dataFilter);
                    this.getPaging(this.pageSize, this.pageChoice, this.sort, this.dataFilter);
                }
                else {
                    // var lengthOrigin = this.dataFilter.length // Độ dài của dữ liệu cần lọc ban đầu
                    this.dataFilter = this.dataFilter.filter((data) => {
                        return data.field != value.field.charAt(0).toUpperCase() + value.field.slice(1)
                    })
                    console.log(this.dataFilter);
                    this.getPaging(this.pageSize, this.pageChoice, this.sort, this.dataFilter);
                }
            } catch (error) {
                console.log(error)
            }
        },

        getPaging(pageSize, pageChoice, sort, dataFilter) {
            try {
                this.isLoading = true;
                const data = callAPI('POST', unitService.filterAndPaging(pageSize, pageChoice, sort), "", dataFilter);
                data.then((res) => {
                    console.log('res', res);
                    this.isLoading = false;
                    this.dataTable = res.data;
                    this.totalRecord = res.totalCount;
                    this.totalPage = res.totalPage;
                })
            } catch (error) {
                console.log(error);
            }
        },

        changeFilterStatus(value) {
            if (value) {
                // Thông tin gửi lên server search
                var addFilter = {
                    field: value.fieldName,
                    operater: "=",
                    value: value.val
                }
                this.dataFilter = this.dataFilter.filter((data) => {
                    return data.field != addFilter.field
                })
                this.dataFilter.push(addFilter);
                // call lấy data
                this.getPaging(this.pageSize, this.pageChoice, this.sort, this.dataFilter);
            }
        },

        getDataNumberTable(data) {
            this.getPaging(data.pageSize, data.pageNumber, this.sort, this.dataFilter);
            // console.log(data);
        },

        addForm(){
            this.showForm = true;
        },

        duplicateForm(){
            this.showForm = true;
        },

        updateForm(){
            this.showForm = true;
        },

        deleteItem(){
            this.showForm = true;
        },
    },
    created() {
        this.getPaging(this.pageSize, this.pageChoice, this.sort, this.dataFilter);
    },
    watch: {
    }
}
</script>
  
<style></style>