<template>
  <div>我是子组件</div>
</template>

<script>
  import { onBeforeUnmount, onUnmounted } from "vue";
  export default {
    name: "Test",
    setup() {
      onBeforeUnmount(() => {
        console.log("子组件-onBeforeUnmount");
      });

      onBeforeUnmount(() => {
        console.log("子组件-onUnmounted");
      });
    },
  };
</script>