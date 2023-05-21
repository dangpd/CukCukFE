<template>
  <div class="nav">
    <nav>
      <div class="nav_item">
        <div class="background_image icon overview"></div>
        Tổng quan
      </div>
      <div class="nav_item">
        <div class="background_image icon report"></div>
        Báo cáo
      </div>
      <div class="nav_item">
        <div class="background_image icon purchase"></div>
        Mua hàng
      </div>
      <div class="nav_item">
        <div class="background_image icon warehouse"></div>
        Kho
      </div>
      <div class="nav_item">
        <div class="background_image icon cash"></div>
        Quỹ tiền mặt
      </div>
      <div class="nav_item">
        <div class="background_image icon deposit_fund"></div>
        Quỹ tiền gửi
      </div>
      <div class="nav_item">
        <div class="background_image icon expense"></div>
        Chi phí
      </div>
      <div class="nav_item">
        <div class="background_image icon promotion"></div>
        Khuyến mại
      </div>
      <div class="nav_item">
        <div class="background_image icon menu"></div>
        Thực đơn
      </div>
      <div class="nav_item" @click="showSubmenu">
        <div class="background_image icon category"></div>
        <div>Danh mục</div>
      </div>
      <div class="nav_item">
        <div class="background_image icon cancel"></div>
        Hủy hóa đơn
      </div>
      <div class="nav_item">
        <div class="background_image icon setting"></div>
        Cài đặt hệ thống
      </div>
      <div class="nav_item">
        <div class="background_image icon application"></div>
        Ứng dụng
      </div>
      <div class="nav_item">
        <div class="background_image icon help"></div>
        Trợ giúp
      </div>
    </nav>
    <div class="submenu" v-show="showMenu" v-clickoutside="() => hideMenu()">
      <div class="title-submenu">
        <div class="background_image icon itemsubmenu"></div>
        NGUYÊN VẬT LIỆU
      </div>
      <div class="submenu-item">
        <div class="itemtext" @click="clickMaterial">
          Nguyên vật liệu
        </div>
      </div>
      <div class="submenu-item">
        <div class="itemtext" @click="clickMaterialCategory">
          Nhóm nguyên vật liệu
        </div>
      </div>
      <div class="submenu-item">
        <div class="itemtext" @click="clickStock">
          Kho
        </div>
      </div>
      <div class="submenu-item">
        <div class="itemtext" @click="clickUnit">
          Đơn vị tính
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { clickoutside } from '@/js/common';
export default {
  name: "TheNavbar",
  directives: {
    clickoutside, // ẩn khi click outside
  },
  methods: {
    showSubmenu() {
      this.showMenu = !this.showMenu;
    },
    hideMenu() {
      this.showMenu = false;
    },
    showFormMaterial() {
    },
    clickMaterial(){
      this.$router.push('/');
      this.showMenu = false;
    },

    clickMaterialCategory(){
      this.$router.push('/materialCategory');
      this.showMenu = false;
    },

    clickStock(){
      this.$router.push('/stock');
      this.showMenu = false;
    },

    clickUnit(){
      this.$router.push('/unit');
      this.showMenu = false;
    }
    
  },
  data() {
    return {
      showMenu: false
    }
  }
}
</script>
<style scoped>
nav {
  background-color: #0973b9;
  height: 100%;
  width: 230px;
  overflow-y: auto;
}

.nav_item {
  background-color: #0973b9;
  height: 45px;
  font-size: 14px !important;
  padding-left: 15px;
  color: #fff;
  line-height: 45px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.background_image {
  background-image: url(../assets/Resource/iconMenu.png);
  background-repeat: no-repeat;
}

.icon {
  height: 30px;
  width: 30px;
  padding-right: 4px;
}

.overview {
  background-position: 0 1px;
}

.report {
  background-position: 0 -189px;
  padding-left: 1px;
}

.purchase {
  background-position: 0 -374px;
}

.warehouse {
  background-position: 0 -38px;
}

.cash {
  background-position: 0 -77px;
}

.promotion {
  background-position: 0 -116px;
}

.menu {
  background-position: -1px -457px;

}

.category {
  background-position: 0 -414px;
}

.deposit_fund {
  background-image: url(https://cukcukcomnew.misacdn.net/QLNH/resources/Image/icon-deposit.png);
  margin-left: 4px;
}

.expense {
  background-image: url(https://cukcukcomnew.misacdn.net/QLNH/resources/Image/icon-cost.png);
  margin-left: 2px;
}

.cancel {
  background-image: url(https://cukcukcomnew.misacdn.net/QLNH/resources/Image/cancel-invoice.png);
  margin-left: 2px;
}

.setting {
  background-position: 0 -231px;
}

.application {
  background-image: url(https://cukcukcomnew.misacdn.net/QLNH/resources/Image/ic_menu_list_connect_application.svg);
}

.help {
  background-image: url(https://cukcukcomnew.misacdn.net/QLNH/resources/Image/iconHelp.png);
  margin-left: 2px;
}

.nav_item:hover {
  background-color: #e38f3b;
  color: #fff;
}

.menu-list {
  display: flex;
  height: 100%;
  width: 230px;
  align-items: center;
  /* position: relative; */
}

.submenu {
  width: 230px;
  background-color: #872424;
  position: absolute;
  left: 230px;
  /* top: -405px; */
  /* height: 653px; */
  height: calc(100vh - 60px);
  padding-left: 20px;
  top: 60px;
  align-items: center;
  color: black;
  background-color: #fff;
  overflow-y: auto;
  box-shadow: rgb(38, 43, 48) 1px 2px 5px;
  z-index: 10;
}

.itemsubmenu {
  background-image: url(https://cukcukcomnew.misacdn.net/QLNH/resources/Image/menu/InventoryItemMaterial.png);
  margin-top: 4px;
}

.title-submenu {
  display: flex;
  align-items: center;
  margin: 4px 0;
}

.submenu-item {
  height: 30px;
  padding-left: 4px;
  display: flex;
  align-items: center;
  border: 1px solid white;
  font-family: url(../assets/font/tahoma.ttf);
  text-decoration: none;
}

.submenu-item:hover {
  width: 140px;
  background-color: #cfe9fb;
  cursor: pointer;
  padding: auto;
  border: 1px solid #1482d1;
}
</style>