<template>
  <div>
    <BaseContentTitle :title="titleF"></BaseContentTitle>
    <div class="table">
      <BaseFunction></BaseFunction>
      <div class="table__content">
        <BaseLoading v-if="isLoading"></BaseLoading>
        <table class="m-table" border="1">
          <thead>
            <tr>
              <th style="min-width: 150px;border: 1px solid #bbb;">
                <div style="margin-top: 8px;font-weight: 100;">Mã nguyên vật liệu</div>
                <div style="display: flex;min-width: 100%;margin: 8px 0;">
                  <BaseFilterSearch type="string" field="materialCode" addition="AND" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 150px;border: 1px solid #bbb;">
                <div style="margin-top: 8px;font-weight: 100;">Tên nguyên vật liệu</div>
                <div style="display: flex;min-width: 100%;margin: 8px 0;">
                  <BaseFilterSearch type="string" field="materialName" addition="AND" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 150px;border: 1px solid #bbb;">
                <div style="margin-top: 8px;font-weight: 100;">Tính chất</div>
                <div style="display: flex;min-width: 100%;margin: 8px 0; ">
                  <BaseFilterSearch type="string" field="feature" addition="AND" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 150px;border: 1px solid #bbb;">
                <div style="margin-top: 8px;font-weight: 100;">Đơn vị tính chính</div>
                <div style="display: flex;min-width: 100%;margin: 8px 0;">
                  <BaseFilterSearch type="string" field="conversionUnitName" addition="AND"
                    @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 150px;border: 1px solid #bbb;">
                <div style="margin-top: 8px;font-weight: 100;">Nhóm nguyên vật liệu</div>
                <div style="display: flex;min-width: 100%;margin: 8px 0; ">
                  <BaseFilterSearch type="string" field="categoryName" addition="AND" @changeFilter="changeFilter" />
                </div>
              </th>
              <th style="min-width: 150px;border: 1px solid #bbb;">
                <div style="margin-top: 8px;font-weight: 100;">Ghi chú</div>
                <div style="display: flex;min-width: 100%;margin: 8px 0;">
                  <BaseFilterSearch type="string" field="description" addition="AND" @changeFilter="changeFilter" />
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
              <td class="text-align-left">{{ item.conversionUnitName }}</td>
              <td class="text-align-left">{{ item.categoryName }}</td>
              <td class="text-align-left">{{ item.description }}</td>
              <td class="text-align-left">{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- table pagding -->
      <div class="table__paging">
        <BaseContentButtom :totalCount="totalRecord" :totalPage="totalPage" ref="pageNumber"
          @getDataNumberTable="getDataNumberTable" @reloadAll="reloadTable"></BaseContentButtom>
      </div>
    </div>
  </div>
</template>
  
<script>
import BaseFilterSearch from '../base/BaseFilterSearch.vue';
import BaseContentTitle from '../base/BaseContentTitle.vue';
import Resource from '../../js/resource';
import BaseFunction from '../base/BaseFunction.vue';
import { fetchAPI } from '../../js/common';
import materialService from '../../js/apiMaterial';
import BaseContentButtom from '../../components/base/BaseContentButtom.vue';
import BaseLoading from '../base/BaseLoading.vue';
// import BaseSelectbox from '../base/BaseSelectbox.vue';


export default {
  name: "BaseMaterial",
  props: ["title"],
  components: { BaseContentTitle, BaseFunction, BaseContentButtom, BaseLoading, BaseFilterSearch, },
  data() {
    return {
      titleF: Resource.TitleContent.Material,
      isLoading: false,
      dataTable: {},
      totalRecord: 0,
      totalPage: 0,
      pageChoice: 1,
      dataFilter: [],
      // Khởi tạo giá trị của page là 20 bản ghi/ trang
      pageSize: 20,
    }
  },
  methods: {
    getPaging() {
      this.isLoading = true;
      try {
        fetchAPI(materialService.filterAndPaging(this.dataFilter, this.pageSize, this.pageChoice), 'GET', (res) => {
          if (res.totalCout != 0) {
            this.dataTable = res.data;
            this.totalRecord = res.totalCount;
            this.totalPage = res.totalPage;
            this.isLoading = false;
          }
        })
      } catch (error) {
        console.log(error);
      }
    },
    /**
        * Thay đổi loại lọc tìm kiếm
        */
    changeFilter(value) {
      try {
        if (value.filterVal != "") {
          // Tạo đối tượng search lọc thông tin
          var addFilter = {
            Field: value.field.charAt(0).toUpperCase() + value.field.slice(1),
            Operate: value.filterType,
            Addition: value.addition,
            Value: value.filterVal
          }
          // Xóa phần tử cần tìm kiếm nếu có Field cần search trùng với addFilter vừa tạo ở trên
          this.dataFilter = this.dataFilter.filter((data) => {
            return data.Field != addFilter.Field
          })
          this.dataFilter.push(addFilter);
          this.dataFilter[0].Addition = "";
          // Call hàm load lại dữ liệu cần search
          fetchAPI(materialService.filterAndPaging(JSON.stringify(this.dataFilter)),
          )
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
 * reload lại table
 * CreatedBy: NDCHIEN (18/8/2022) 
 */
    reloadTable() {
      try {
        this.pageChoice = this.$refs.pageNumber.pageChoice // trang được chọn 
        this.pageSize = this.$refs.pageNumber.pageSize // kích thước mỗi trang
        this.getPaging();
      } catch (error) {
        console.log(error);
      }
    },
    /**
         * Lấy data cho table khi có pagesize
         */
    getDataNumberTable() {
      this.pageChoice = this.$refs.pageNumber.pageChoice // trang được chọn 
      this.pageSize = this.$refs.pageNumber.pageSize // kích thước mỗi trang
      this.getPaging();
    },
  },
  created() {
    this.getPaging();
  },
  watch: {
  }
}
</script>
  
<style>
@import url(../../css/form/material.css);
</style>