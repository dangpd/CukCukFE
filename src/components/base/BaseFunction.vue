<template>
    <div class="material_function">
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-add" colorIcon="#2281c1" val="Thêm"
            styleCss="padding:0 8px" @click="formDetailOnClick(TYPE_FORM.ADD)" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-copy" colorIcon="#2281c1"
            val="Nhân bản" styleCss="padding:0 8px" @click="formDetailOnClick(TYPE_FORM.DUPLICATE)" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-pen-to-square" colorIcon="#2281c1"
            val="Sửa" styleCss="padding:0 8px" @click="formDetailOnClick(TYPE_FORM.UPDATE)" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-xmark" colorIcon="red" val="Xóa"
            styleCss="padding:0 8px" @click="deleteOneMaterial" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-rotate" colorIcon="#2281c1" val="Nạp"
            styleCss="padding:0 8px" @click="reloadTable" />
        <!-- <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-file-export" colorIcon="#2281c1"
            val="Nhập khẩu" styleCss="padding:0 8px" @click="reloadTable" />
        <BaseButtonIcon noneBg noneBorder class="btn-function-main" icon="fa-solid fa-file-arrow-down" colorIcon="#2281c1"
            val="Xuất khẩu" styleCss="padding:0 8px" @click="reloadTable" /> -->
    </div>
</template>

<script>
import BaseButtonIcon from './BaseButtonIcon.vue';
export default {
    name: "BaseFunction",
    components: { BaseButtonIcon }
}
</script>

<style></style>