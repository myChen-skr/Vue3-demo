<template>
  <p @click="goto('/page1', 2)">page1</p>
  <p @click="gotopage2('/page2/9')">page2</p>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const goto = (path, count) => {
      router.push({ path, query: { count } });
      // router.push(path)
    };
    const gotopage2 = (path) => {
      router.push({ path });
    };
    return { goto, gotopage2 };
  },
};
</script>