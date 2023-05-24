<template>
  <div class="container">
    <TheHeader></TheHeader>
    <TheNavbar></TheNavbar>
    <TheContent></TheContent>
  </div>
</template>

<script>
import TheHeader from './layout/TheHeader.vue';
import TheNavbar from './layout/TheNavbar.vue';
import TheContent from './layout/TheContent.vue';
import materialService from './js/apiMaterial';
import materialCategoryService from './js/apiMaterialCategory';
import stockService from './js/apiStock';
import unitService from './js/apiUnit';
materialService;
materialCategoryService;
stockService;
unitService;
export default {
  name: 'App',
  components: {
    TheHeader,
    TheNavbar,
    TheContent
  }
}
</script>

<style>
@font-face {
  font-family: 'Tahoma1';
  src: url('@/assets/font/tahoma.ttf');
}

* {
  margin: 0;
  padding: 0;
  font-family: Tahoma1;
  font-size: 13px;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}

.header {
  height: 56px;
  width: 100%;
}

.nav {
  width: 230px;
  height: calc(100vh - 60px);
}

.content {
  height: calc(100vh - 60px);
  width: calc(100% - 230px);
  /* background-color: #EEEFF1; */
  padding: 8px;
}

.icon_background_1 {
  background-image: url('./assets/Resource/Sprites.64af8f61.svg');
  background-repeat: no-repeat;
}

/* ::-webkit-scrollbar {
  width: 8px;
  border-radius: 4px;
  height: 8px;
} */

/* Track */
/* ::-webkit-scrollbar-track {
  background: #f1f1f1;
} */

/* Handle */
/* ::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
} */

/* Handle on hover */
/* ::-webkit-scrollbar-thumb:hover {
  background: #555;
} */
</style>
