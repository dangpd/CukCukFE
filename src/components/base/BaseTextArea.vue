<template>
    <div>
        <textarea :style="style" :class="{ 'focus': textFocusc }" :value="value" @input="getValueOnInput"
            @focus="onTextareaFocus"></textarea>
    </div>
</template>
<script>
export default {
    data() {
        return {
            val: '',
            textFocusc: false,
        }
    },
    props: {
        style: [String], // css cho text area
        value: [String, Number], // giá trị của input nhậ từ parent
    },
    methods: {
        getValueOnInput() {
            this.val = event.target.value;
            this.$emit('update:value', this.val)
            this.$emit('onInput', { val: this.val});
        },

        onTextareaFocus() {
            this.textFocusc = true;
            console.log('Textarea is focused');
        },
    },
}
</script>
<style>
textarea {
    border: 1px solid #bbb;
    border-radius: 2px;
}

.focus{
    border-color: green;
}
</style>