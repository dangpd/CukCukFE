<template >
    <div class="popup-main" @keyup="keyboard">
        <!-- Popup Warning delete  -->
        <div class="popup" v-if="isShowWarningDelete || false">

            <div class="popup-background"></div>
            <div class="popup-main-content">
                <div class="title_popup">
                    <div class="title_popup_left">CUKCUK - Quản lý nhà hàng</div>
                    <div class="title_popup_right">
                        <div @click="closePopup"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                </div>
                <div class="popup-main-top">
                    <div class="icon_background_1 icon-warning"></div>
                    <div class="popup-content">{{ message }}</div>
                </div>
                <div class="popup-main-bottom">
                    <div style="position: absolute;right: 0;">
                        <!-- <div ref="refFirstWD" @focus="focusLast('btn1WD')" tabindex="0"></div> -->
                        <BaseButtonIcon class="buttonIcon" val="Có" styleCss="width:80px;padding:4px 8px 4px 0px;"
                            :autofocus="isFocusWarningDelete" buttonIconForm @click="clickWarningDeleteYes" />
                        <BaseButtonIcon class="buttonIcon" val="Không" styleCss="width:80px;padding:4px 8px 4px 0px;"
                            buttonIconForm @click="closePopup" />

                        <!-- <BaseButton ref="btn1WD" style="padding: 4px 10px;" val="Không" @click="closePopup" /> -->
                    </div>
                    <!-- <div>
                        <BaseButton ref="btn2WD" style="padding: 4px 10px;" val="Có" :autofocus="isFocusWarningDelete"
                            @click="clickWarningDeleteYes" />
                        <div ref="refLastWD" @focus="focusFirst('btn1WD')" tabindex="0"></div>
                    </div> -->
                </div>
            </div>
        </div>

        <!-- Popup Warning -->
        <div class="popup" v-if="isShowWarning || false">
            <div class="popup-background"></div>
            <div class="popup-main-content">
                <div class="title_popup">
                    <div class="title_popup_left">CUKCUK - Quản lý nhà hàng</div>
                    <div class="title_popup_right">
                        <div @click="closePopup"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                </div>
                <div class="popup-main-top">
                    <div class="icon_background_1 icon-warning"></div>
                    <div class="popup-content">
                        {{ message }}
                    </div>
                </div>
                <div class="popup-main-center"></div>
                <div class="popup-main-bottom popup-right">
                    <BaseButtonIcon class="buttonIcon" val="Đồng ý" styleCss="width:80px;padding:4px 8px 4px 0px;"
                        buttonIconForm @click="closePopup" />
                    <!-- <BaseButton val="Đồng ý" :autofocus="isFocusWarning" @click="closePopup" /> -->
                </div>
            </div>
        </div>

        <!-- Popup Error -->
        <div class="popup" v-if="isShowError || false">
            <div class="popup-background"></div>
            <div class="popup-main-content">
                <div class="title_popup">
                    <div class="title_popup_left">CUKCUK - Quản lý nhà hàng</div>
                    <div class="title_popup_right">
                        <div @click="closePopup"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                </div>
                <div class="popup-main-top">
                    <div class="icon_background_1 icon-error"></div>
                    <div class="popup-content">{{ message }}</div>
                </div>
                <div class="popup-main-center"></div>
                <div class="popup-main-bottom popup-center">
                    <BaseButtonIcon class="buttonIcon" val="Đồng ý" styleCss="width:80px;padding:4px 8px 4px 0px;"
                        buttonIconForm @click="closePopup" />
                    <!-- <BaseButton val="Đóng" :autofocus="isFocusError" @click="closePopup" /> -->
                </div>
            </div>
        </div>

        <!-- Popup Question -->
        <div class="popup" v-if="isShowQuestion || false">
            <div class="popup-background"></div>
            <div class="popup-main-content">
                <div class="title_popup">
                    <div class="title_popup_left">CUKCUK - Quản lý nhà hàng</div>
                    <div class="title_popup_right">
                        <div @click="closePopup"><i class="fa-solid fa-xmark"></i></div>
                    </div>
                </div>
                <div class="popup-main-top">
                    <div class="icon_background_1 icon-question"></div>
                    <div class="popup-content">{{ message }}</div>
                </div>
                <div class="popup-main-center"></div>
                <div class="popup-main-bottom" style="display: flex;justify-content: space-between;">
                    <div>
                    </div>
                    <div style="display: flex;">
                        <!-- <div ref="refFirstQ" @focus="focusLast('btn3Q')" tabindex="0"></div> -->
                        <BaseButtonIcon class="buttonIcon" val="Có" styleCss="width:80px;padding:4px 8px 4px 0px;"
                            buttonIconForm @click="clickQuestionYes" />
                        <BaseButtonIcon class="buttonIcon" val="Không" styleCss="width:80px;padding:4px 8px 4px 0px;"
                            buttonIconForm @click="clickQuestionNo" />
                        <BaseButtonIcon class="buttonIcon" val="Hủy" styleCss="width:80px;padding:4px 8px 4px 0px;"
                            buttonIconForm @click="closePopup" />
                        <!-- <BaseButton ref="btn3Q" val="Có" style="padding: 4px 10px;" :autofocus="isFocusQuestion"
                            @click="clickQuestionYes" />
                        <BaseButton ref="btn2Q" val="Không" style="margin:0 6px;padding: 4px 10px;"
                            @click="clickQuestionNo" />
                        <BaseButton ref="btn1Q" val="Hủy" style="padding: 4px 10px;" @click="closePopup" />
                        <div ref="refLastQ" @focus="focusFirst('btn1Q')" tabindex="0"></div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BaseButtonIcon from './BaseButtonIcon.vue';

export default {
    name: "BasePopUp",
    components: { BaseButtonIcon },
    data() {
        return {
            isShowWarningDelete: false, // popup cảnh báo xóa
            isShowWarning: false, // popup cảnh báo
            isShowError: false, // popup lỗi
            isShowQuestion: false, //popup hỏi
            isFocusWarningDelete: false, // focus popup cảnh báo
            isFocusWarning: false, // focus popup cảnh báo
            isFocusError: false, // focus popup cảnh báo
            isFocusQuestion: false, // focus popup cảnh báo
        };
    },
    props: {
        message: String, // Message thông báo
        type: String, // Type popup (warning-delete, warning, error, question)
    },
    methods: {
        /**
         * Đóng popup
         * CreatedBy: PDDang (24/5/2023)
         */
        closePopup() {
            this.$emit('closePopup');
            this.$emit('processWhenClose')
        },

        /**
         * Click yes warning delete
         * CreatedBy: PDDang (24/5/2023)
         */
        clickWarningDeleteYes() {
            this.$emit('clickWarningDeleteYes');
        },

        /**
         * Click đồng ý popup Warning
         * CreatedBy: PDDang (24/5/2023)
         */
        clickConfirmPopup() {
            this.$emit('confirmPopup', true);
        },

        /**
         * Click no popup Question
         * CreatedBy: PDDang (24/5/2023)
         */
        clickQuestionNo() {
            this.$emit('clickQuestionNo');
        },

        /**
         * Click yes popup Question
         * CreatedBy: PDDang (24/5/2023)
         */
        clickQuestionYes() {
            this.$emit('clickQuestionYes');
        },

        /**
         * Sự kiện bàn phím
         * CreatedBy: PDDang (24/5/2023)
         */
        keyboard() {
            // switch (event.keyCode) {
            //     case 27:
            //         this.closePopup();
            //         break;

            //     default:
            //         break;
            // }
        },

        /**
         * Focus giá trị đầu tiên
         * @param {*} ref 
         * CreatedBy: PDDang (24/5/2023)
         */
        focusFirst(ref) {
            this.$refs[ref].focusFunc();
        },

        /**
         * Focus giá trị cuối cùng
         * @param {*} ref 
         * CreatedBy: PDDang (24/5/2023)
         */
        focusLast(ref) {
            this.$refs[ref].focusFunc();
        }
    },

    created() {
        if (this.type == process.env.VUE_APP_POPUP_WARNING_DEL) {
            // Popup warning delete
            this.isShowWarningDelete = true;
            this.isShowWarning = false;
            this.isShowError = false;
            this.isShowQuestion = false;
        } else if (this.type == process.env.VUE_APP_POPUP_WARNING) {
            // Popup warning
            this.isShowWarningDelete = false;
            this.isShowWarning = true;
            this.isShowError = false;
            this.isShowQuestion = false;
        } else if (this.type == process.env.VUE_APP_POPUP_ERROR) {
            // Popup error
            this.isShowWarningDelete = false;
            this.isShowWarning = false;
            this.isShowError = true;
            this.isShowQuestion = false;
        } else if (this.type == process.env.VUE_APP_POPUP_QUESTION) {
            //Popup question
            this.isShowWarningDelete = false;
            this.isShowWarning = false;
            this.isShowError = false;
            this.isShowQuestion = true;
        }
    },
    mounted() {
        if (this.type == process.env.VUE_APP_POPUP_WARNING_DEL) {
            // Popup warning delete
            this.isFocusWarningDelete = true;
        } else if (this.type == process.env.VUE_APP_POPUP_WARNING) {
            // Popup warning
            this.isFocusWarning = true;
        } else if (this.type == process.env.VUE_APP_POPUP_ERROR) {
            // Popup error
            this.isFocusError = true;
        } else if (this.type == process.env.VUE_APP_POPUP_QUESTION) {
            // Popup question
            this.isFocusQuestion = true;
        }
    },
    watch: {
        type(newVal) {
            if (newVal == process.env.VUE_APP_POPUP_WARNING_DEL) {
                // Popup warning delete
                this.isShowWarningDelete = true;
                this.isShowWarning = false;
                this.isShowError = false;
                this.isShowQuestion = false;
            } else if (newVal == process.env.VUE_APP_POPUP_WARNING) {
                // Popup warning
                this.isShowWarningDelete = false;
                this.isShowWarning = true;
                this.isShowError = false;
                this.isShowQuestion = false;
            } else if (newVal == process.env.VUE_APP_POPUP_ERROR) {
                // Popup error
                this.isShowWarningDelete = false;
                this.isShowWarning = false;
                this.isShowError = true;
                this.isShowQuestion = false;
            } else if (newVal == process.env.VUE_APP_POPUP_QUESTION) {
                //Popup question
                this.isShowWarningDelete = false;
                this.isShowWarning = false;
                this.isShowError = false;
                this.isShowQuestion = true;
            }
        }
    }
};
</script>
<style scoped>
@import url('@/css/base/popup.css');
</style>
