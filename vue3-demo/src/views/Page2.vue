<template>Page2 {{ $route.params.id }}</template>
<script>
import { useRoute } from "vue-router";
export default {
  name: "Page2",
  setup() {
    const route = useRoute();
    console.log("route.params", route.params);
  },
};
</script>