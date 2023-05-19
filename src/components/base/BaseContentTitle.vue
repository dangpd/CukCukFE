<template>
  <div class="title-content">
    <div class="title-left">
      <div class="title">
        Danh mục
        <div class="icon_background_1 icontitle"></div>
        <div class="textTitle">{{ this.titleShow }}</div>
      </div>
    </div>
    <div class="title-right">
      <BaseButtonIcon colorIcon="#2281c1" val="Quay lại thiết lập ban đầu"
        styleCss="height:24px; margin: 8px 0 0 8px;padding:0 8px" />
      <BaseButtonIcon icon="fa-solid fa-bullhorn" colorIcon="#2281c1" val="Phản hổi"
        styleCss="height:24px; margin: 8px 0 0 8px;padding:0 8px" />
    </div>
  </div>
</template>

<script>
import BaseButtonIcon from './BaseButtonIcon.vue';
export default {
  name: "BaseContentTitle",
  props: ["title"],
  components: { BaseButtonIcon },
  data() {
    return {
      titleShow: this.title,
    }
  },
  methods: {

  },
  created() {
  },
  watch: {
    title(newVal) {
      this.titleShow = newVal;
    }
  }
}
</script>

<style>
@import url(../../css/base/basecontenttitle.css);
</style>