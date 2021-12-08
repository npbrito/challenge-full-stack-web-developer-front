<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Headers/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>
