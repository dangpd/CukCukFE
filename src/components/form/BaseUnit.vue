<template>
    <div>
        <BaseContentTitleVue :title="titleF"></BaseContentTitleVue>
        <BaseFunction></BaseFunction>
        <table class="m-table" border="1">
            <thead>
                <tr>
                    <th style="min-width: 550px;border: 1px solid #bbb;">
                        <div style="margin-top: 8px;font-weight: 100;">Đơn vị tính</div>
                        <div style="display: flex;min-width: 100%;margin: 8px 0;">
                            <BaseFilterSearch type="string" field="conversionUnitName" @changeFilter="changeFilter" />
                        </div>
                    </th>
                    <th style="min-width: 550px;border: 1px solid #bbb;">
                        <div style="margin-top: 8px;font-weight: 100;">Diễn giải</div>
                        <div style="display: flex;min-width: 100%;margin: 8px 0;">
                            <BaseFilterSearch type="string" field="description"
                                @changeFilter="changeFilter" />
                        </div>
                    </th>
                    <th style="min-width: 150px;border: 1px solid #bbb;">
                        <div style="margin-top: 8px;font-weight: 100;">Ngừng theo dõi</div>
                        <div style="display: flex;min-width: 100%;margin: 8px 0;">
                            <!-- <BaseSelectbox :data="
                    [
                      { feildShow: 'Có', feildValue: '2' },
                      { feildShow: 'Không', feildValue: '1' }
                    ]
                  " style="width: 200px;"></BaseSelectbox> -->
                            <BaseFilterSearch type="string" field="status" addition="AND" @changeFilter="changeFilter" />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- <div class="notFound" v-show="showNotFound">
              <p>{{ this.label }}</p>
            </div> -->
                <tr v-for="(item, index) in dataTable" :key="index">
                    <td class="text-align-left">{{ item.materialCode }}</td>
                    <td class="text-align-left">{{ item.materialName }}</td>
                    <td class="text-align-left">{{ item.feature }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import BaseContentTitleVue from '../base/BaseContentTitle.vue';
import Resource from '../../js/resource';
import BaseFunction from '../base/BaseFunction.vue';
import BaseFilterSearch from '../base/BaseFilterSearch.vue';
export default {
    name: "BaseUnit",
    props: [""],
    components: { BaseContentTitleVue, BaseFunction, BaseFilterSearch },
    data() {
        return {
            titleF: Resource.TextVi.TitleContent.Unit,
            dataTable: [],
            dataFilter: [
                {
                    field: 'Status',
                    filterType: '=',
                    filterVal: '1'
                }
            ],
        }
    },
    methods: {
        changeFilter(value) {
            try {
                if(value.filterVal != ""){
                    // Tạo đối tượng search lọc thông tin
                    var addFilter = {
                        Field: value.field.charAt(0).toUpperCase() + value.field.slice(1),
                        Operate: value.filterType,
                        Value: value.filterVal
                    }
                    // Xóa phần tử cần tìm kiếm nếu có Field cần search trùng với addFilter vừa tạo ở trên
                    this.dataFilter = this.dataFilter.filter((data) => {
                        return data.Field != addFilter.Field
                    })
                    this.dataFilter.push(addFilter);
                    console.log(this.dataFilter);
                    // Call hàm load lại dữ liệu cần search
                    // this.loadData(
                    //     ''.filterMaterialAPI(50,1,JSON.stringify(this.dataFilter)),
                    //     true
                    // )
                }
                else{
                    // var lengthOrigin = this.dataFilter.length // Độ dài của dữ liệu cần lọc ban đầu
                    this.dataFilter = this.dataFilter.filter((data) => {
                        return data.Field != value.field.charAt(0).toUpperCase() + value.field.slice(1)
                    })
                    console.log(this.dataFilter);

                    // Nếu sau khi xóa phần từ cần lọc độ dài thay đổi thì call api
                    // if(lengthOrigin > this.dataFilter.length){
                    //     this.loadData(
                    //     ''.filterMaterialAPI(50,1,JSON.stringify(this.dataFilter)),
                    //     true
                    // )
                    // }
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    created() {
        console.log(this.dataFilter);
    },
    watch: {
    }
}
</script>
  
<style></style>