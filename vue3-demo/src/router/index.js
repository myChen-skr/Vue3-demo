// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"

// createRouter 创建路由实例
const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [
        {
          path: "/",
          name: "Home",
          component: Home,
        },
        {
          path: "/page1",
          name: "Page1",
          component: () => import("../views/Page1.vue"),
        },
          {
          path: '/page2/:id',  //主要改这里
          name: "Page2",
          component: () => import("../views/Page2.vue"),
      },
        ],
})

// 抛出路由实例, 在 main.js 中引用
export default router