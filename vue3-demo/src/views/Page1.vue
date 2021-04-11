<template>Page1</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: "Page1",
  setup() {
    const route = useRoute();
    console.log("route.query", route.query);
  },
};
</script>