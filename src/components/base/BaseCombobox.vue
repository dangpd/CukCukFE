<template>
    <div :style="styleCombobox" class="m-combobox" :key="renderCombobox">
        <div ref="combobox" :style="{ width: width }" class="field-combobox" v-click-out-side="hideBorder"
            :class="{ 'select-box-error': isRequired, 'border-green': isShowBoderGreen, 'noneBorderCBX': noneBorder }">
            <input class="m-inputc" type="text" autocomplete="off" v-model="textSelected" @keydown="inputOnKeyDown"
                @click="onClick" @blur="onBlur" @input="onSearchItem" @focus="onFocus" :tabindex="tabIndex"
                ref="inputFocus" />
            <button :style="styleButton" style="margin-top: 4px;cursor: pointer;" class="combobox__button select-box-iconc"
                @click="onShowHideData" @keydown="buttonOnKeyDown">
            </button>
            <div v-show="addSelect" class="add_select_box combobox__add" @click="clickAddSelect" :style="styleSlect"
                style="cursor: pointer;">
                <i class="fa-solid fa-plus" style="color:#2281c1"></i>
            </div>
        </div>
        <div v-show="isShowData" class="combobox__data" v-clickoutside="hideListData">
            <a class="combobox__item" :ref="`item_${index}`" :class="{ 'item--selected': index == indexItemSelect }"
                v-for="(entity, index) in entitySearch" :key="index" :value="entity[propValue]"
                @click="itemOnSelect(entity, index)">{{ entity[propName] }}</a>
        </div>
        <div v-show="showError" class="error_Combobox">
            <img src="../../assets/Image/exclamation.png" @mouseover="mouseOver" @mouseout="mouseOut">
            <label for="" v-show="showText"
                style="display: flex;width: 240px;border-radius: 2px;z-index: 10;position: absolute;top: 20px;left: 8px;background-color: white;border: 1px solid #bbb;padding: 4px 8px;box-shadow: 2px 4px 6px #888888;">
                <img src="../../assets/Image/exclamation.png" alt="" style="margin-right: 4px;">
                {{ messError }}
                <!-- Trường này không được bỏ trống -->
            </label>
            <!-- <p class="error-selecbox-arrow"></p>
                <div class="error-selecbox-content">
                    <p>
                        {{ messError }}
                    </p>
                </div> -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { clickoutside } from "@/js/common";
import enumMISA from '../../js/enum';
import Resource from '../../js/resource';
import clickOutSide from "@mahdikhashan/vue3-click-outside";
export default {
    name: "BaseCombobox",
    props: [
        "id",
        "DepartName",
        "api",
        "propName",
        "propValue",
        "modelValue",
        "required",
        "messError",
        "tabIndex",
        "focus",
        "addSelectIcon",
        "addSelectColor",
        "addSelect",
        "width",
        "styleButton",
        "typeForm",
        "dataMain",
        "type",
        "styleCombobox",
        "styleSlect",
        "noneShowBorder"
    ],
    directives: {
        clickoutside,
        clickOutSide
    },
    // emits: ["update:modelValue", "update:typeForm"],
    data() {
        return {
            isShowData: false,
            entities: [],
            entitySearch: [],
            textSelected: null,
            indexItemSelect: 0,
            itemSelected: null,
            isRequired: false, // Trường dữ liệu bắt buộc phải chọn
            showError: false, // Hiển thị box nội dung lỗi
            renderCombobox: 0,
            isShowBoderGreen: false,
            showText: false,
            noneBorder: false
        };
    },
    /**
     * Lập created cho load api
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    created() {
        this.noneBorder = this.noneShowBorder;
        this.getData();
    },
    /**
     * Lắng nghe sự kiện computed
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    computed: {
        // trả vị trí của item tìm kiếm được
        findIndexSelected: function () {
            var me = this;
            // Kiểm tra lấy vị trí của nó trong data search có thì return về
            let findIndex = this.entitySearch.findIndex(
                (item) => item[me.propValue] == me.itemSelected[me.propValue]
            );
            return findIndex;
        },
    },
    /**
     * Lăng nghe sự kiện thay đổi của giá trị
     * CreateBy : Đăng
     */
    watch: {
        // Thay đổi giá trị model
        modelValue(newVal) {
            // Kiểm tra giá trị thay đổi có trong data search không
            let data = this.entities.find((item) => item[this.propValue] == newVal);
            if (data) {
                // Giá trị hiển thị lên bằng tên
                this.textSelected = data[this.propName];
                // Vị trí của nó trong danh sách
                this.indexItemSelect = this.entities.indexOf(data);
                // Tắt class css của comboxbox
                this.isRequired = false;
                // this.isShowBoderGreen = true;
                if (this.textSelected != null || newVal != null) {
                    this.showError = false;
                    // this.isShowBoderGreen = true;
                }
            }
        },

        // Thực hiện render lại combobox
        renderCombobox(newVal) {
            // thực hiện get lại data
            if (newVal > 0) {
                this.$emit("update:typeForm", Resource.TYPE_FORM.ADD);
                this.getData();
            }
        },
    },
    /**
     * Lập các methord cho combobox
     * CreatedBy :Đăng(10/01/2022)
     * EditedBy : Đăng(11/01/2022)
     */
    methods: {
        getData() {
            // Lấy api
            if (this.api) {
                axios
                    .get(this.api)
                    .then((data) => {
                        // Gán data bằng data load được
                        this.entities = data.data;
                        // Gán data tìm kiếm bằng data load được
                        this.entitySearch = data.data;
                        // console.log(this.entitySearch);
                        // Nếu là form thêm mới thì focus dữ liệu lên dòng đầu tiên
                        if (this.typeForm == Resource.TYPE_FORM.ADD) {
                            //Focus giá trị đầu tiên của combobox
                            if (this.entities.length > 0) {
                                // Hiển thị tên phần tử đầu tiên
                                const text = this.entities[0][this.propName];
                                // Lấy giá trị đầu tiên
                                const value = this.entities[0][this.propValue];
                                // Gán lên form detail
                                this.textSelected = text; // Hiển thị text lên input.
                                // update giá trị
                                this.$emit("update:modelValue", value);
                            }
                        } else {
                            this.setItemSelected();
                        }
                        // bingding dữ liệu lên data load được
                        // Hiển thị giá trị data load được
                        // }
                    })
                    .catch((res) => {
                        console.log(res);
                    });
                // console.log(this.entities);
                // console.log(this.entitySearch);
            } else {
                this.entities = this.dataMain;
                this.entitySearch = this.dataMain;
                if (this.typeForm == Resource.TYPE_FORM.ADD) {
                    // Hiển thị tên phần tử đầu tiên
                    const text = this.entities[0][this.propName];
                    // Lấy giá trị đầu tiên
                    const value = this.entities[0][this.propValue];
                    // Gán lên form detail
                    this.textSelected = text; // Hiển thị text lên input.
                    // update giá trị
                    this.$emit("update:modelValue", value);
                } else {
                    this.setItemSelected();
                }
            }

        },
        /**
         * Thực hiện cộng để render lại
         */
        foreceRender() {
            this.renderCombobox += 1;
        },



        /**
         * Gọi hàm hiển thị show box thêm select
         * CreatedBy: PDDang (29/9/2022)
         */
        clickAddSelect() {
            this.$emit("showBoxAddSelect");
        },
        /**
         * Foocus
         * CreatedBy :Đăng(10/01/2022)
         * EditedBy : Đăng(11/01/2022)
         */
        focusFunc() {
            this.$refs.inputFocus.focus();
            this.onClick();
            // this.isRequired = false;
            this.isShowBoderGreen = true;
        },
        /**
         * sự kiện oninput
         * CreatedBy :Đăng(10/01/2022)
         * EditedBy : Đăng(11/01/2022)
         */
        onInput() {
            // Giá trị nhập vào của input
            this.textSelected = event.target.value;
            // Không show lỗi
            this.showErorr = false;
            // Không xâu css error của combobox
            this.isRequired = false;

            this.isShowBoderGreen = true;
            // Nếu giá trị input rỗng gán giá trị model là null
            if (this.textSelected.trim().length <= 0) {
                this.$emit("update:modelValue", null);
            }

        },

        onFocus() {
            this.isRequired = false;
            this.isShowBoderGreen = true;
        },
        /**
         * Ẩn danh sách item
         */
        hideListData() {
            this.isShowData = false;
        },
        /**
         * Check dữ liệu khi người dùng nhập
         * CreatedBy :Đăng(10/01/2022)
         * EditedBy : Đăng(11/01/2022)
         */
        validate() {
            // Nếu vừa requied và giá trị input rỗng thực hiện show css combobox không thì tắt css combobox
            if (this.required && !this.textSelected) {
                this.isRequired = true;
                this.showError = true;
                return {
                    status: false,
                    messError: this.messError,
                };
            } else {
                this.isRequired = false;
                return {
                    status: true,
                };
            }
        },

        //Hover chuột vào combobx hiện thị lỗi
        mouseOver() {
            if (this.required && this.showError) {
                this.showText = true;
            }
        },

        // mouseOut ra combobox tắt hiện lỗi
        mouseOut() {
            this.showText = false;
        },

        onClick() {
            this.isShowBoderGreen = true;
        },

        onBlur() {
            if (this.required && this.textSelected.trim().length <= 0) {
                this.isShowBoderGreen = false;
            }
            else if (!this.required) {
                this.isShowBoderGreen = false;
            }
            this.isShowBoderGreen = false;
        },

        // Ẩn hiện data
        onShowHideData() {
            this.entitySearch = this.entities;
            this.isShowData = !this.isShowData;
            // this.isRequired = false;
            // this.isShowBoderGreen = true;
        },
        /**
         * Đóng bảng chọn khi click vào thẻ cha
         * CreateBy: Đăng (26/12/2022)
         */
        closeData() {
            this.isShowData = false;
        },
        /**
         * Lấy item được chọn
         * CreatedBy :Đăng(10/01/2022)
         * EditedBy : Đăng(11/01/2022)
         */
        itemOnSelect(entity) {
            var me = this;
            // Reset lại danh sách
            this.entitySearch = this.entities;
            this.itemSelected = entity;
            // Set index cuar item duwojc chon
            this.indexItemSelect = me.findIndexSelected; //Lấy tại computed
            // Gán giá trị hiển thị bằng giá trị propName
            this.textSelected = entity[this.propName];
            // Thực hiện update data khi dữ liệu thay đổi
            this.$emit("dataUpdate", {
                idUpdate: entity[this.propValue]
            })
            this.$emit("update:modelValue", entity[this.propValue]);
            if (this.modelValue != null) {
                this.showError = false;
            }
            // Ẩn data
            this.isShowData = false;
        },
        /**
         * Set vị trí tìm được lên input
         * CreatedBy :Đăng(10/01/2022)
         * EditedBy : Đăng(11/01/2022)
         */
        setItemSelected() {
            var me = this;
            // Item tương ứng với model value
            let entitySelected = this.entities.find(
                (item) => item[me.propValue] == me.modelValue
            );
            if (entitySelected) {
                this.textSelected = entitySelected[this.propName];
            } else {
                this.textSelected = "";
            }
        },

        hideBorder() {
            this.isShowBoderGreen = false;
        },
        /**
         * Thực hiện tìm kiếm bằng input
         * CreatedBy :Đăng(10/01/2022)
         * EditedBy : Đăng(11/01/2022)
         */
        onSearchItem() {
            var me = this;
            // console.log(this.textSelected);
            // Item tương ứng với model value
            this.entitySearch = this.entities.filter((item) =>
                item[me.propName].toLowerCase().includes(me.textSelected.toLowerCase())
            );
            this.onInput();
            // console.log(this.entitySearch);
            if (this.entitySearch.length > 0) {
                // Hiện data
                this.isShowData = true;
            } else {
                this.isShowData = false;
            }
        },
        /**
         * Lập sự kiện cho nút lên xuống
         * CreatedBy :Đăng(10/01/2022)
         * EditedBy : Đăng(11/01/2022)
         */
        inputOnKeyDown(event) {
            const keyCode = event.keyCode;
            switch (keyCode) {
                // Án enter
                case enumMISA.KEY_CODE.ENTER:
                    // Gán giá trị item trên data search
                    // eslint-disable-next-line no-case-declarations
                    const item = this.entitySearch[this.indexItemSelect];
                    this.itemOnSelect(item);
                    break;
                case enumMISA.KEY_CODE.ROW_UP:
                    // Hiển thị data
                    this.isShowData = true;
                    if (this.indexItemSelect > 0) {
                        this.indexItemSelect--;
                    }
                    break;
                case enumMISA.KEY_CODE.ROW_DOWN:
                    // Chạy giá trị xuống dưới
                    // eslint-disable-next-line no-case-declarations
                    let maxLength = this.entitySearch.length;
                    if (this.indexItemSelect < maxLength - 1) {
                        this.indexItemSelect++;
                    }
                    break;
                case enumMISA.KEY_CODE.TAB:
                    this.isShowData = false;
                    break;
                default:
                    break;
            }
        },

        /**
         * Lập sự kiện cho button
         * CreatedBy :Đăng(10/01/2022)
         * EditedBy : Đăng(11/01/2022)
         */
        buttonOnKeyDown(event) {
            // console.log(event.keyCode);
            const keyCode = event.keyCode;
            switch (keyCode) {
                // Án enter
                case enumMISA.KEY_CODE.ENTER:
                    // Gán giá trị item trên data search
                    // eslint-disable-next-line no-case-declarations
                    const item = this.entitySearch[this.indexItemSelect];
                    this.itemOnSelect(item);
                    setTimeout(() => {
                        this.isShowData = false;
                    }, 0);
                    break;
                case enumMISA.KEY_CODE.ROW_UP:
                    // Hiển thị data
                    this.isShowData = true;
                    if (this.indexItemSelect > 0) {
                        this.indexItemSelect--;
                    }
                    break;
                case enumMISA.KEY_CODE.ROW_DOWN:
                    // Chạy giá trị xuống dưới
                    // eslint-disable-next-line no-case-declarations
                    let maxLength = this.entitySearch.length;
                    if (this.indexItemSelect < maxLength - 1) {
                        this.indexItemSelect++;
                    }
                    break;
                case enumMISA.KEY_CODE.TAB:
                    // Ẩn data show
                    this.isShowData = false;
                    break;
                default:
                    break;
            }
        },
    },
    mounted() {
        if (this.focus) {
            this.$refs.inputFocus.focus();
            // this.isRequired = false;
            this.isShowBoderGreen = true;
        }
    },
};
</script>
<style scoped>
@import url(../../css/base/combobox.css);
</style>
  