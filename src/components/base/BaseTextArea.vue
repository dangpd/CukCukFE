<template>
  <div>
    <textarea
      :style="style"
      :class="{ focus: textFocusc }"
      v-model="value"
    ></textarea>
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

textarea:focus {
  border-color: green;
}
</style>