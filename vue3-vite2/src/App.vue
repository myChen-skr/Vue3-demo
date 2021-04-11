<template>
  <div>
    <h1>{{ state.search }}</h1>
    <button @click="handleSearch">改变查询字段</button>
  </div>
</template>

<script>
  import { reactive, watch } from "vue";

  export default {
    setup() {
      let timer = null;
      let state = reactive({
        search: Date.now(),
      });
      watch(
        () => {
          return state.search;
        },
        (nextData, preData) => {
          console.log("preData", preData);
          console.log("nextData", nextData);
        }
      );

      const handleSearch = () => {
        state.search = Date.now();
      };
      return {
        state,
        handleSearch,
      };
    },
  };
</script>