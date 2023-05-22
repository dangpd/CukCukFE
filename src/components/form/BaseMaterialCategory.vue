<template>
    <div>
        <BaseContentTitle :title="titleF"></BaseContentTitle>
        <BaseFunction></BaseFunction>
    </div>
</template>
  
<script>
import Resource from '@/js/resource';
import BaseContentTitle from '../base/BaseContentTitle.vue';
import BaseFunction from '../base/BaseFunction.vue';
export default {
    name: "BaseMaterialCategory",
    props: [""],
    components: { BaseContentTitle, BaseFunction },
    data() {
        return{
            titleF: Resource.TitleContent.MaterialCategory
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