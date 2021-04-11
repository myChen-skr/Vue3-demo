<template>
  <Cart />
  <p>购物车数量：{{ count }}</p>
</template>

<script>
import { ref } from "vue";
import Cart from "../components/Cart.vue";
export default {
  name: "Home",
  components: {
    Cart,
  },
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
};
</script>