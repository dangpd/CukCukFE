<template>
  <div>
    <textarea id="area" :style="style" v-model="value" :tabindex="tabIndex"></textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      textFocusc: false,
    };
  },
  props: {
    style: [String], // css cho text area
    modelValue: [String, Number], // giá trị của input nhậ từ parent
    tabIndex: [Number,String]
  },
  methods: {
  },

  created() {
    this.value = this.modelValue;
  },
  watch: {
    value(newVal) {
      this.$emit("update:modelValue", newVal);
    },
    modelValue(newVal) {
      this.value = newVal;
    },
  },
};
</script>
<style>
textarea {
  border: 1px solid #bbb;
  border-radius: 2px;
}

#area:focus {
  border-color: #0072bc;
  outline: none;
}
</style>