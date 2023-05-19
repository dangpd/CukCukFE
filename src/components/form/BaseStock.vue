<template>
    <div>
        <BaseContentTitle :title="titleF"></BaseContentTitle>
        <BaseFunction></BaseFunction>
    </div>
</template>
  
<script>
import BaseContentTitle from '../base/BaseContentTitle.vue';
import Resource from '../../js/resource';
import BaseFunction from '../base/BaseFunction.vue';
export default {
    name: "BaseStock",
    props: [""],
    components: { BaseContentTitle, BaseFunction },
    data() {
        return {
            titleF: Resource.TextVi.TitleContent.Stock,
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