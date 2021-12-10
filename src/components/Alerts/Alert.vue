<template>
  <b-alert v-model="isOpen" :variant="options.status" fade dismissible>
    {{ options.message }}
  </b-alert>
</template>
<script>
export default {
  name: "Alert",
  props: {
    value: {
      required: true,
    },
    options: {
      message: String,
      status: String,
    },
  },
  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>
