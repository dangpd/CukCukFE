<template lang="">
    <button 
        class="btn-icon"
        ref="buttonIcon"
        :class="{'btn_border_none': noneBorder, 'btn_bg_none': noneBg,'not_select': notSelect , 'buttonIconForm' : buttonIconForm , 'buttonIcon' : buttonIcon, 'func' : funC}"
        :style="styleCss" :tabindex="tabIndex" @keydown.tab="focusFirstInput"
    >
        <i :class="icon" :style="{color: colorIcon}"></i>
        <span style="margin-left:8px;">{{ val }}</span>
    </button>
</template>

<script>
export default {
    props: {
        val: String,
        colorIcon: String,
        icon: String,
        styleCss: String,
        noneBorder: Boolean,
        noneBg: Boolean,
        notSelect: Boolean,
        buttonIconForm: Boolean,
        buttonIcon: Boolean,
        funC: Boolean,
        tabIndex: [Number, String]
    },
    methods: {
        /**
         * Focus button
         */
        focusFunc() {
            this.$refs.buttonIcon.focus();
        },
        /**
         * Khi tab đến ô input cuối cùng thì tự động focus vào ô input đầu
         * @param {*} event sự kiện tab
         */
        focusFirstInput(event) {
            if (this.tabIndex === '15' && !event.shiftKey) {
                event.preventDefault();
                this.$emit("focusFirstInput");
            }
        },
    },
};
</script>

<style scoped>
@import url('@/css/base/input-icon.css');
</style>
