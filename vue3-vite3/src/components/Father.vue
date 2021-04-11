<template>
  <div>我是父亲</div>
  <Son />
</template>

<script>
  import Son from "./Son.vue";
  export default {
    name: "Father",
    components: {
      Son,
    },
  };
</script>