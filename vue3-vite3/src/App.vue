<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>
</template>

<script>
  import { provide, ref } from "vue";
  import Father from "./components/Father.vue";

  export default {
    components: {
      Father,
    },
    setup() {
      const name = ref("陈尼克");
      provide("name", name); // 单个声明形式
      provide("info", {
        work: "前端开发",
        age: "18",
      }); // 多个声明形式

      const changeName = () => {
        name.value = "李尼克";
      };

      provide("changeName", changeName);
    },
  };
</script>