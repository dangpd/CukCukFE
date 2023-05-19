<template>
    <div>
        <BaseContentTitleVue :title="titleF"></BaseContentTitleVue>
        <BaseFunction></BaseFunction>
    </div>
</template>
  
<script>
import BaseContentTitleVue from '../base/BaseContentTitle.vue';
import Resource from '../../js/resource';
import BaseFunction from '../base/BaseFunction.vue';
export default {
    name: "BaseUnit",
    props: [""],
    components: { BaseContentTitleVue, BaseFunction },
    data() {
        return {
            titleF: Resource.TextVi.TitleContent.Unit,
        }
    },
    methods: {

    },
    created() {
    },
    watch: {
    }
}
</script>
  
<style></style>