# Vue3的学习

## 		一. Vue3.x简介及开发环境搭建

​				1.1.Vue 3 带来的变化

  Vue 3 从 2020 年年初就开始说要发布正式版本，一月拖一月，直到2020年 9 月 18 号，历时两年多的开发与迭代，2600 多次的提交，628 次 PR，Vue 3 终于发布正式版了。这意味着我们可以尝试着将其投入到生产环境中。当然，真正全面铺开来使用 Vue 3 还需一段时间。保守估计要到 2021 年初的样子，Vue 3 周边插件才能完善。所以这个时候开始学习 Vue 3 是最好不过的时候，机会总是留给有准备的人。

[官方地址](https://v3.vuejs.org/) 在此，由于官方网站部署在国外服务器，所以国内的小伙伴打开可能会比较慢，这里提供一个 [国内 CDN 加速版](https://vue3js.cn/)。

​               Vue 3 为我们带来的新特性

​			**1. Vue 3 采用的是渐进式开发，向下兼容**

Vue 3 支持大多数的 Vue 2 的语法，这让升级变得不是那么死板，你不必每个页面组件都改写成 Vue 3 的写法，它们在某种程度上是可以共存的。

​			**2. 性能的提升**

​				打包大小变小。

​				首次渲染加快。

​				更新更快。

​				内存使用减少。

​			**3. Composition API**

在使用 Vue 2 开发复杂组件的时候，业务逻辑多且复杂的情况下，难以复用。新推出的 Composition API 解决了这一问题。

​			**4. 新增 API**

​				Teleport 瞬移组件。

​				Suspense 解决异步组件问题。

​				Fragements。

​				Emits。

​			**5. 更好的 TypeScript 支持**

Vue 3 自身采用 TS 开发，更严谨的代码风格，以及更好的联想拓展。

## 		1.2.初始化项目之 CDN 模式

对于制作原型或学习，你可以这样使用最新版本。

<script src="https://unpkg.com/vue@next"></script>

对于生产环境，推荐链接到一个明确的版本号和构建文件，如 `vue@3.0.2`，以避免新版本造成的不可预期的破坏。

新建vue3.html文件，内容如下

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>mychen</title>
  </head>
  <style>
    [v-cloak] {
      display: none;
    }
  </style>
  <body>
    <div id="app" v-cloak>
      <p>姓名：{{ name }}</p>
      <p>职业：{{ state.work }}</p>
    </div>
    <script src="https://unpkg.com/vue@next"></script>
    <script>
      // Vue 现在存在于 window 全局变量下，所以直接通过 ES6 解构出 createApp、ref、reactive
      const { createApp, ref, reactive } = Vue;
      const App = {
        setup() {
          const name = ref("mychen");
          const state = reactive({
            work: "平平无奇秃头小公主",
          });
          return {
            state,
            name,
          };
        },
      };
      createApp(App).mount("#app");
      console.log(Vue);
    </script>
  </body>
</html>

```

效果如下

![image-20210410234436255](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210410234436255.png)

静态 CDN 的开发形式，适用于一些简单的活动页、宣传页、官网等小项目，易于灵活的添加修改页面。但不利于项目的模块化开发，所以不适用一些中大型综合项目的开发。

在上述 html 代码中打印 Vue 实例

```html
console.log(Vue);
```

可以看到所有的Vue属性，如下图

![image-20210410234755292](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210410234755292.png)

## 			1.3.初始化项目之 Vite 模式

Vite 是一个 Web 开发构建工具，由于其原生 ES 模块导入方法，它允许快速提供代码。

[官网](https://cn.vitejs.dev/)

他有三个特点（**快速的冷启动**，**即时的热模块更新**，**真正的按需编译**）

快速的冷启动，其实也有类似的解决方案如 Vue CLI、create-react-app、umi 等等诸如此类快速启动工具。热更新也有相应的 Webpack 解决方案。但是按需编译需要我们自行在代码中使用 `import` 语法实现。

Vite 的按需编译按照尤雨溪的微博原话是这样解释的：

​			Vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 Vue 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 rollup 打包。虽然现在还比较粗糙，但这个方向我觉得是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题。

接下来我们看看如何使用 Vite 创建和启动项目。

在终端输入如下指令，其中vue3-vite为自定义的项目名

```bash
npm init vite-app vue3-vite
```

出现如下所示，表示初始化项目成功。

![image-20210411000325849](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411000325849.png)

![image-20210411000239577](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411000239577.png)

 **vite 默认启动的是 3000 端口**，我们可以进行修改

在 `vue3-vite` 项目根目录下新建 `vite.config.js` 文件，这个配置文件类似 `Vue-CLI` 生成项目的配置文件 `vue.config.js`，指定端口号。(不用打开vscode，直接在文件夹中改)

```javascript
module.exports = {
  port: "8080",
};
```

我们通过 `npm run dev` 启动项目。

![image-20210411000700281](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411000700281.png)

## 			1.4.浅析 Vite 运行原理

在上述 Vite 构建项目的过程中，我们发现启动项目的时候，明显比 Vue CLI 启动项目快一些，我们简单地分析一下快从何来。

ES module

[ES module](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules?spm=a2c6h.12873639.0.0.58f832acSuXjmc) 是 Vite 的核心，我们先来看看 ES module 的浏览器支持情况。

可以看到主流浏览器 Edge、Firefox、Chrome、Safari、Opera 的较新版本都已经支持了 ES module，除了万恶的 IE 浏览器。

它最大的特点就是在浏览器端直接使用 `export` 和 `import` 的方式进行导入和导出模块，前提必须在 `script` 标签里设置 `type=module`。大致使用如下所示：

```html
<script type="module">
  import { user } from "./user.js";
</script>
```

上述代码运行时，浏览器会发起 http 请求，请求 http server 托管的 `foo.js`，在 `foo.js` 内，我们可以使用 `export` 导出模块：

```javascript
// user.js
export const name = "Nick";
```

## 			1.5.Vite 如何利用 ES module

打开上述 `vue3-vite` 项目，在页面中打开控制台，点击 `Sources`，如下所示：

![image-20210411124750911](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411124750911.png)

红框内就是引入了 `type=module` 属性，并且 src 引入 `/src/main.js`，我们打开它如下所示：

![image-20210411124840403](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411124840403.png)

script 标签内的内容如下：

```javascript
import { createApp } from "/@modules/vue.js";
import App from "/src/App.vue";
import "/src/index.css?import";
createApp(App).mount("#app");
```

从上述代码我们可以得到一些信息：

​				1.`createVue` 方法是从 `http://localhost:3000/@modules/vue` 中获取					的。

​				2.入口页面 `App.vue` 是从 `http://localhost:3000/src/App.vue` 中获					取的。

​				3.通过 `createVue` 方法，将应用挂在到了 `#app` 下。

**`createVue` 是 Vue 3 新增的 API**，**它用来创建应用**。

Vue 2.x 时代的创建应用需要**将代码通过 Webpack 工具打包之后才能在浏览器运行**，而 Vite 通过 ES module 的能力，省去了打包过程，直接在浏览器内通过 `@module/vue.js` 的形式引入代码。

通过 Webpack 打包实现编译，很难做到按需加载，因为都是静态资源，不管模块代码是否被使用到，都会被打包到 bundle 文件里。随着业务量增大，打包后的 bundle 随之越来越大。后来为了减小 bundle 的体积，开发者们使用 `import()` 的方式实现按需加载的形式，但是被引入的模块依然需要提前打包，后来使用 tree shaking 等方式去掉未使用到的代码块。但是上述的努力均没能比 Vite 更加优雅，Vite 可以在需要某个模块的时候动态引入，并且不需要提前打包。要注意的是，目前 Vite 这种形式只能用于开发环境，但是就这样已经能大大地提升开发效率了，这就足够了。

## 			1.6.项目初始化之 Vue CLI 模式

Vue 提供了一个[官方的 CLI](https://github.com/vuejs/vue-cli)，为单页应用（SPA）快速搭建复杂的脚手架。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。

对于 Vue 3，Vue CLI 版本也有所升级，目前想要生成 Vue 3 项目，需要将其升级到 `4.5.x` 版本，具体操作如下：

```bash
yarn global add @vue/cli@next
# OR
npm install -g @vue/cli@next
```

在此之前，需要先将本地的 `@vue/cli` 卸载，通过命令行 `yarn remove global @vue/cli` 或者 `npm uninstall -g @vue/cli`。

安装成功之后查看版本号，如下所示表示成功。

![image-20210411130006079](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411130006079.png)

然后我们通过如下命令初始化项目：

```bash
vue create vue3-cli
```

如下图所示：

![image-20210411130544493](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411130544493.png)

第三个选项为创建 Vue 2 纯净版（不带路由、状态管理、样式预处理等）。

同理第四个选项为创建 Vue 3 纯净版。

![image-20210411130919417](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411130919417.png)

关键是第一个 `Choose Vue version`，选择它之后敲回车键会让你选择 Vue 的版本：

![image-20210411131137830](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411131137830.png)

之后的选择基本上和 Vue CLI 旧版本大同小异。如下所示：

![image-20210411131354709](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411131354709.png)

创建完成之后，目录结构如下所示：

![image-20210411143050717](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411143050717.png)

运行命令行 `npm run serve`，启动 8081 端口，浏览器展示如下表示配置成功：

![image-20210411143407614](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411143407614.png)

## 			1.7.小结

上面着重介绍了 Vue 3 初始化项目的几种形式，以及 Vite 实现快速启动的原理浅析。由于周边配套插件还未完善，大量的 UI 组件库也未来得及更新为 Vue 3 版本，所以 Vue 3 目前还未能大规模使用于生产环境。我们可以抓住这样的机会，在红利到来之前，将 Vue 3 学习到位，以便来日项目重构迭代或者面试问到相关问题，能做到游刃有余。

## 			2、Vue 3.x 新特性之 setup

### 		2.1.介绍

本节通过实例代码的形式，深入分析 `setup` 的使用技巧。对标 `Vue 2.x` 模式下同样形式的新写法，如子组件如何接收父组件的传值及注意事项、如何触发父组件的方法等。

​		知识点

​			setup 简介

​			模板中使用

​			渲染函数/JSX 中使用

​			setup 接收的参数

## 		2.2.setup 简介

介绍 `setup` 之前，我们先来解释一下什么叫组合 API（Composition API）。`Vue 3` 将 `Vue 2.x` 的选项 API（options API）制作成一个个 `hook`（钩子）函数，如 `watch`、`computed` 等方法，在 Vue 2.x 中是以选项 API 的形式出现，如下：

```js
// options API
export default {
  name: "App",
  watch: {},
  computed: {},
};
```

而 `Vue 3` 新增的 `setup` 方法，也是以选项的形式出现在抛出的对象中，但是诸如上述代码中的 `watch`、`computed` 等属性，都变成 `hook` 函数的形式，通过 `vue` 解构出来，在 `setup` 方法中使用，如下所示：

```js
// Composition API
import { watch, computed } from "vue";
export default {
  name: "App",
  setup() {
    watch(
      () => {},
      () => {}
    );
    const a = computed(() => {});
  },
};
```

`setup` 存在的意义，就是为了让你能够使用新增的组合 API。并且这些组合 API 只能在 `setup` 函数内使用。

`setup` 调用的时机是创建组件实例，然后初始化 props，紧接着就是调用 `setup` 函数。从生命周期钩子的角度来看，它会在 `beforeCreate` 钩子之前被调用，所以 `setup` 内是拿不到 `methods` 和 `data` 内的方法和数据，所以官方为了不让大家产生疑惑，索性就将 `setup` 内的 `this` 变量设置为 `undefined`。

`setup` 不支持异步操作，如 `async setup() {}`，如果你这样操作了，函数的 `return` 将会失效，导致页面没有数据。

## 		2.3.模板中使用 setup

用 `Vite` 初始化项目，然后install，运行

```bash
npm init vite-app vue3-setup
cd vue3-setup
npm installnpm
npm run dev
```

![image-20210411144911908](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411144911908.png)

接下来我们修改 `src/App.vue` 文件如下：

```html
<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script>
  import { ref, reactive } from "vue";

  export default {
    setup() {
      const count = ref(0);
      const object = reactive({ foo: "bar" });

      // 暴露给模板
      return {
        count,
        object,
      };
    },
  };
</script>
```

上述代码 `setup` 函数内，通过 `ref`、`reactive` 创建两个变量，如果 `setup` 返回一个对象，则对象的属性将会被合并到模板变量的渲染上下文中，也就是在 `template` 模板里，可以使用 `setup` 函数返回的对象内容（包括函数方法）。

这里插播一则小知识，通过 `ref`、`reactive` 方法包括的变量，都会变成响应式的变量，也就是说你在 `setup` 函数内改变他们，如下所示：

```html
<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script>
  import { ref, reactive } from "vue";

  export default {
    setup() {
      const count = ref(0);
      const object = reactive({ foo: "bar" });
      // 暴露给模板

      setTimeout(() => {
        // 通过 ref 包裹的变量，需要通过 .value 的形式修改变量，在模板中使用无需 .value，在模板中会自动解开。
        count.value = 1;
        object.foo = "foo";
      }, 2000);
      return {
        count,
        object,
      };
    },
  };
</script>
```

运行结果

![image-20210411145318594](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411145318594.png)

## 		2.4.渲染函数中使用 setup

`setup` 也可以返回一个函数，函数中也能使用当前 `setup` 函数作用域中的响应式数据，我们将上述代码修改为如下：

```html
<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script>
  import { ref, reactive, h } from "vue";

  export default {
    setup() {
      const count = ref(0);
      const object = reactive({ foo: "bar" });
      return () => h("h1", [count.value, object.foo]);
    },
  };
</script>
```

通过 `h` 函数，将 `count.value`（在 setup 函数作用于内，需要使用 .value 获取值）和 `object.foo` 渲染到 `h1` 标签内。

## 		2.5.setup 接收的参数

`setup` 函数接收两个参数，第一个是 **`props` 对象**，第二个是 **`context` 上下文**。

**props 对象**

函数接收 `props` 作为第一个参数，我们现在需要一个父子组件的传值实例，修改上述 `src/App.vue` 文件如下：

```html
<template>
  <Test :count="count"></Test>
</template>

<script>
  import { ref } from "vue";
  import Test from "./components/Test.vue";

  export default {
    components: {
      Test,
    },
    setup() {
      const count = ref(0);
      return {
        count,
      };
    },
  };
</script>
```

在 `src/components` 下新增 `Test.vue` 组件：

```html
<template>
  <div>{{ count }}</div>
</template>

<script>
  export default {
    name: "Test",
    props: {
      count: Number,
    },
    setup(props) {
      console.log("props", props);
    },
  };
</script>

```

在页面中我们打印了 `props`，可以发现它被 `Proxy` 代理过，这是 `Vue 3` 实现响应式的核心 API，也就是说从父亲组件传到子组件的 `count` 变量，已经是响应式数据。

并且在自组件内，可以通过 `watchEffect` 和 `watch` 观察到数据的变化情况，我们来试试让数据变化起来，对两个文件分别修改如下：

App.vue

```vue
<template>
  <Test :count="count"></Test>
</template>

<script>
import { ref } from "vue";
import Test from "./components/Test.vue";

export default {
  components: {
    Test,
  },
  setup() {
    const count = ref(0);
    setTimeout(() => {
      count.value = 100;
    }, 2000);
    return {
      count,
    };
  },
};
</script>
```

Test.vue

```vue
<template>
  <div>{{ count }}</div>
</template>

<script>
import { watchEffect } from "vue";
export default {
  name: "Test",
  props: {
    count: Number,
  },
  setup(props) {
    watchEffect(() => {
      console.log("props.count = ", props.count);
    });
  },
};
</script>
```

![image-20210411150127988](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411150127988.png)

**注意 `props` 不要进行解构，如 `setup(...props)`，这样会让 `props` 失去响应式。**

## 		2.6.小结

通过一系列的测试代码逐一分析了 `setup` 的一些使用方法和技巧，发现小小的一个函数，内涵丰富的知识点，想要更加深入学习的同学，可以阅读它的源码，这样对它可以有一个更全面而细致的了解。

## 		3、Vue 3.x 之响应式系统 API

## 		3.1.介绍

响应式系统 API，顾名思义，就是指在新的特性中是如何去实现 Vue 的响应式功能。我们通过简单实例的形式讲解分析 reactive、ref、computed、readonly、watchEffect、watch 六个响应式 API 的使用方法。

​		知识点

​			reactive

​			ref

​			computed

​			readonly

​			watchEffect

​			watch

## 		3.2.reactive

`reactive` 是 Vue 3.x 中提供的实现响应式数据的方法。在 Vue 2.x 中实现响应式数据是通过 Object 的属性 [defineProPerty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 来实现的，而在 Vue 3.x 中的响应式是通过 ES2015 的 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 来实现。

那么在业务开发使用中，我们需要注意几个要点，下面我们来进一步分析。

**reactive 参数必须是对象**（json 或 Array）

新建一个项目并编辑：

```bash
npm init vite-app vue3-vite
<!--App.vue-->
<template>
  <p>{{ state.title }}</p>
</template>

<script>
  import { reactive } from "vue";
  export default {
    name: "App",
    setup() {
      const state = reactive({
        title: "json",
      });

      return {
        state,
      };
    },
  };
</script>
```

尝试着修改上面的代码为：

```html
<template>
  <p>{{ state }}</p>
</template>

将js中的state修改为：
const state = reactive(["arr1", "arr2", "arr3"]);
```

你会在浏览器上看到如下所示：

![image-20210411151956617](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411151956617.png)

为什么数组也可以直接渲染呢？这里你可以把数组理解为特殊的对象。我们平时常用的普通对象如下所示：

```javascript
const obj = { a: "1", b: "2" };
```

而我们可以通过键去获取相对应的值，如 `obj.a` 或者 `obj['a']`。

数组作为特殊的对象，如下：

```javascript
const arr = ["a", "b"];
```

此时你可以把它看作：

```javascript
const arr = { 0: "a", 1: "b" };
```

所以我们同样可以使用键值对的形式获取值，如 `arr[0]`。所以这就解释了为什么 `reactive` 还可以接受数组作为参数的原因。

`reactive` 包裹的对象，已经通过 Proxy 进行响应式的赋能，所以我们可以通过如下形式修改值，会直接体现在模板上。

```html
<template>
  <p>{{ state.title }}</p>
</template>

<script>
  import { reactive } from "vue";
  export default {
    name: "App",
    setup() {
      const state = reactive({
        title: "陈尼克",
      });

      setTimeout(() => {
        state.title = "李尼克";
      }, 2000);

      return {
        state,
      };
    },
  };
</script>
```

2 秒后你将会在浏览器上看到“陈尼克”变成了“李尼克”。

响应式转换是“深层的”：会影响对象内部所有嵌套的属性。基于 ES2015 的 Proxy 实现，返回的代理对象不等于原始对象。建议仅使用代理对象而避免依赖原始对象。

## 		3.3.ref

`ref` 和 `reactive` 一样，同样是实现响应式数据的方法。在业务开发中，我们可以使用它来定义一些简单数据，如下所示：

```html
<template>
  <p>{{ count }}</p>
</template>

<script>
  import { ref } from "vue";
  export default {
    name: "App",
    setup() {
      const count = ref(0);

      return {
        count,
      };
    },
  };
</script>
```

那么修改数据，可以通过 `count.value = 1` 类似这样的语法去修改。但是为什么它需要这样去修改变量，而 `reactive` 返回的对象可以直接修改如 `state.count = 1`。

原因是 Vue 3.x 内部将 `ref` 悄悄的转化为 `reactive`，如上述代码会被这样转换：

```javascript
ref(0) => reactive({ value: 0 })
```

所以 `count` 相当于 `reactive` 返回的一个值，根据 `reactive` 修改值的方式，就可以理解为什么 `ref` 返回的值是通过 `.value` 的形式修改值了。

还有一点需要注意，当 `ref` 作为渲染上下文的属性返回（即在 `setup()` 返回的对象中）并在模板中使用时，它会自动解套，无需在模板内额外书写 `.value`。之所以会自动解套，是因为 `template` 模板在被解析的时候，Vue 3.x 内部通过判断模板内的变量是否是 `ref` 类型。如果是，那就加上 `.value`，如果不是则为 `reactive` 创建的响应集代理数据。

我们不妨打印一下 `ref` 创建的对象 `console.log(count)`，浏览器控制台如下图所示：

![image-20210411154037412](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411154037412.png)

就是通过上图 `__v_isRef` 变量去判断，模板内的变量是否为 `ref` 类型。判断类型也可以通过 `isRef` 方法，如下：

```html
<template>
  <p>{{ count }}</p>
</template>

<script>
  import { ref, isRef } from "vue";
  export default {
    name: "App",
    setup() {
      const count = ref(0);
      console.log(isRef(count)); // true
      return {
        count,
      };
    },
  };
</script>
```

## 		3.4.computed

Vue 2.x 时代，`computed` 作为选项出现在页面中，而到了 Vue 3.x 时代，它将会以**钩子函数**的形式出现。

```html
<template>
  <p>{{ text }}</p>
</template>

<script>
  import { reactive, computed } from "vue";
  export default {
    name: "App",
    setup() {
      const state = reactive({
        name: "陈尼克",
        desc: "你好",
      });
      const text = computed(() => {
        console.log("11");
        return state.name + state.desc;
      });

      setTimeout(() => {
        state.name = "李尼克";
      }, 2000);

      return {
        text,
      };
    },
  };
</script>
```

上述代码通过 `computed` 函数将 name 和 desc 变量拼接，返回 `text` 渲染。

这里要注意的是 2 秒后，name 变量将会被重新赋值，那么 `computed` 函数内带有 `state.name`，所以会被动态计算，重新返回 `text` 值，浏览器会有如下变化：

![image-20210411154654312](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411154654312.png)

若是将 `computed` 方法内的函数做如下改动：

```javascript
const text = computed(() => {
  console.log("11");
  return state.desc;
});
```

2 秒后，你将不会看到控制台打印 `11`，因为函数内不会被检测执行。

上述形式 `computed` 返回的值是不可修改的，通过 `get` 和 `set` 的形式返回的值是可修改的，不过这种情况的使用场景不多，这里不作深究。

## 		3.5.readonly

`readonly` 顾名思义，用于创建一个只读的数据，并且所有的内容都是只读，不可修改。我们看如下代码：

```html
<template>
  <p>{{ state.name }}</p>
  <p>{{ state.desc }}</p>
  <button @click="fn">修改</button>
</template>

<script>
  import { reactive, computed, readonly } from "vue";
  export default {
    name: "App",
    setup() {
      const state = readonly({
        name: "陈尼克",
        desc: "你好",
      });

      const fn = () => {
        state.name = "李尼克";
        state.desc = "他好";
        console.log("state", state);
      };

      return {
        state,
        fn,
      };
    },
  };
</script>
```

我们用 `readonly` 创建一个数据，将其渲染在 `template` 模板下，并且通过 fn 函数修改这个数据，看看浏览器会有什么反馈。

![image-20210411160038836](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411160038836.png)

点击按钮之后，如上图所示，控制台报警告了，并且 `state` 打印出来之后，内部数据也没有变化。

## 		3.6.watchEffect

首先 `watchEffect` 会追踪响应式数据的变化，并且还会在第一次渲染的时候立即执行，我们来看看下面的例子：

```html
<template>
  <div>
    <h1>{{ state.search }}</h1>
    <button @click="handleSearch">改变查询字段</button>
  </div>
</template>

<script>
  import { reactive, watchEffect } from "vue";

  export default {
    setup() {
      let state = reactive({
        search: Date.now(),
      });
      watchEffect(() => {
        console.log(`监听查询字段${state.search}`);
      });

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
```

`watchEffect` 接受一个回调函数作为参数，并且该回调函数内如果有响应式变量，那么当我执行 `handleSearch` 方法改变 `search` 变量时，回调函数也会被执行，如下所示：

![image-20210411160350012](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411160350012.png)

`watchEffect` 函数返回一个新的函数，我们可以通过执行这个函数或者当组件被卸载的时候，来停止监听行为。来看下面代码：

```javascript
setup() {
  let timer = null
  let state = reactive({
    search: Date.now()
  })

  // 返回停止函数
  const stop = watchEffect((onInvalidate) => {
    console.log(`监听查询字段${state.search}`)
  })

  const handleSearch = () => {
    state.search = Date.now()
  }

  setTimeout(() => {
    console.log('执行 stop 停止监听')
    stop() // 2 秒后停止监听行为
  }, 2000)

  return {
    state,
    handleSearch
  }
}
```

我们一直点击按钮，控制台会一直打印改变的数据。当 2 秒是 `stop` 方法被执行，停止监听后，控制台不再打印数据。如下图所示：

![image-20210411161048751](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411161048751.png)

`watchEffect` 的回调方法内有一个很重要的方法，用于清除副作用。它接受的回调函数也接受一个函数 `onInvalidate`。名字不重要，重要的是它将会在 `watchEffect` 监听的变量改变之前被调用一次，具体执行顺序我们通过代码来解释：

```html
<template>
  <div>
    <h1>{{ state.search }}</h1>
    <button @click="handleSearch">改变查询字段</button>
  </div>
</template>

<script>
  import { reactive, watchEffect } from "vue";

  export default {
    setup() {
      let state = reactive({
        search: Date.now(),
      });
      const stop = watchEffect((onInvalidate) => {
        console.log(`监听查询字段${state.search}`);
        onInvalidate(() => {
          console.log("执行 onInvalidate");
        });
      });

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
```

![image-20210411161156808](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411161156808.png)

每当我点击按钮，改变 `search` 值时，`onInvalidate` 会在监听打印之前被执行一次。

那么要它何用呢？用处非常大。举个例子，我们需要监听 `search` 的变化，去请求接口数据，此时接口是异步返回的，每当我改变 `search` 都会去请求一次接口，那么有可能 `search` 改变得很频繁，那就会频繁地去请求接口，导致服务端压力倍增。我们可以通过这个特性去降低服务端的压力，具体逻辑如下：

```html
<template>
  <div>
    <h1>{{ state.search }}</h1>
    <button @click="handleSearch">改变查询字段</button>
  </div>
</template>

<script>
  import { reactive, watchEffect } from "vue";

  export default {
    setup() {
      let timer = null;
      let state = reactive({
        search: Date.now(),
      });
      watchEffect((onInvalidate) => {
        console.log(`监听查询字段${state.search}`);
        timer = setTimeout(() => {
          console.log("模拟接口异步请求，3 秒之后返回详情信息");
        }, 3000);
        onInvalidate(() => {
          console.log("清除");
          clearInterval(timer);
        });
      });

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
```

在 `watchEffect` 回调函数内，我用 `setTimeout` 的形式去模拟响应时间为 3 秒的异步请求，上面代码可以理解为 3 秒之内如果你不去改变 `search` 变量，那么页面就成功返回接口数据。如果在 3 秒之内你再次点击按钮改变了 `search` 变量，`onInvalidate` 将会被触发，从而清理掉上一次的接口请求，然后根据新的 `search` 变量去执行新的请求。我们来看浏览器的表现：

![image-20210411161616819](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411161616819.png)

## 		3.7.watch

`watch` 的功能和之前的 Vue 2.x 的 `watch` 是一样的。和 `watchEffect` 相比较，区别在 `watch` 必须制定一个特定的变量，并且不会默认执行回调函数，而是等到监听的变量改变了，才会执行。并且你可以拿到改变前和改变后的值，代码如下：

```html
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
```

![image-20210411162513182](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411162513182.png)

## 		3.7.小结

上述这六个响应式系统 API 会是日后使用频率最高的几个 API。细心阅读每一个响应式 API，这将会对后面的实战项目很有帮助。将这些 API 灵活的运用于项目中，可以让代码变得更加优雅，增加代码的可读性。

## 		4、Vue 3.x 之生命周期钩子函数

世间万物都有生死轮回，Vue 同样也有属于自己的生命周期。本实验通过对比 Vue2.x 和 Vue3.x 的生命周期，来更好地理解 Vue 3.x 的生命周期，以便日后写业务代码时，不会犯一些低级错误。

 		知识点

​				onBeforeMount

​				onMounted

​				onBeforeUpdate

​				onUpdated

​				onBeforeUnmount

​				onUnmounted

​				onErrorCaptured

​				onRenderTracked

​				onRenderTriggered

## 		4.2.Vue 2.x 生命周期解读

 Vue 2.x 时期的生命周期示意图

<img src="https://niit-soft.oss-cn-hangzhou.aliyuncs.com/uPic/8f3db4b69fcbabfd5ea5d3d93f1d4922-0.png" alt="1" style="zoom:45%;margin-left:0;" />

将上述生命周期标点，以便接下来的讲解，首先我们看标记 1，`new Vue()` 初始化实例，想必学过 Vue 的同学都有所了解，来到标记 2 是初始化事件和组件生命周期，此时会执行 **beforeCreate** 钩子函数，这是在组件创建之前执行的。接下来来到标记 3，初始化注入和响应式，也就是说在这个时候，`data` 数据就已经创建了。接下来执行 **created** 钩子函数，它会判断你是否有 `el` 选项，`el` 就是在项目入口页初始化的选项，代码如下所示：

```javascript
new Vue({
  el: "#app",
});
```

如果没有，通过 `vm.$mount(el)` 的形式去手动挂载，其实和 `el` 的本质没有区别。然后我们来到标记 5，判断是否有 `template` 模板。用代码解释的话如下：

```javascript
new Vue({
  el: "#app",
  template: "<p>陈尼克</p>",
});
```

大致如上述代码，如果有 `template` 选项，会进入标记 6 进行模板编译。如果没有，会获取 `el` 的 outerHTML 作为模板进行编译。

走到这一步，`beforeMount` 钩子函数被触发，标记 8 内将模板转化为 AST 树，再将 AST 树转成 render 函数，最后转化为虚拟 DOM 挂载到真实 DOM 节点上。

标记 9 代表组件已经加载完了，在组件内部更新数据时候的生命周期，更新前和更新后各自触发的钩子函数。

标记 10 代表组件被卸载，包括监听器也会被卸载，你可以在这里做一些组件销毁后的事情。

## 		4.3.Vue 3.x 生命周期解读

上文我们对 Vue 2.x 的生命周期知识点进行了一个简单的回顾，也让大家的脑海里有一个初步的印象，和接下来的 Vue 3.x 生命周期能形成一个对比。

生命周期钩子函数，Vue 3.x 对应 Vue 2.x 的写法如下：

​			·~~`beforeCreate`~~ -> `setup`

​			·~~`created`~~ -> `setup`

​			·`beforeMount` -> `onBeforeMount`

​			·`mounted` -> `onMounted`

​			·`beforeUpdate` -> `onBeforeUpdate`

​			·`updated` -> `onUpdated`

​			·`beforeDestroy` -> `onBeforeUnmount`

​			·`destroyed` -> `onUnmounted`

​			·`errorCaptured` -> `onErrorCaptured`

Composition API 里没有 `beforeCreate` 和 `created` 对应的生命周期，统一改成 `setup` 函数。

我们来看看在 Vue 3.x 中生命周期运行顺序和使用情况，通过 Vite 新建文件，修改 `App.vue` 文件：

```html
<template>
  <div>
    <h1>生命周期{{ state.count }}</h1>
    <div v-if="state.show">
      <Test />
    </div>
  </div>
</template>

<script>
  import Test from "./components/Test.vue";
  import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
    onErrorCaptured,
    reactive,
  } from "vue";

  export default {
    components: {
      Test,
    },
    setup() {
      const state = reactive({
        count: 0,
        show: true,
      });
      setTimeout(() => {
        state.count = 2;
        state.show = false;
      }, 2000);

      onBeforeMount(() => {
        console.log("onBeforeMount");
      });

      onMounted(() => {
        console.log("onMounted");
      });

      onBeforeUpdate(() => {
        console.log("onBeforeUpdate");
      });

      onUpdated(() => {
        console.log("onUpdated");
      });

      onBeforeUnmount(() => {
        console.log("onBeforeUnmount");
      });

      onUnmounted(() => {
        console.log("onUnmounted");
      });

      onErrorCaptured(() => {
        console.log("onErrorCaptured");
      });

      return {
        state,
      };
    },
  };
</script>
```

<!--src/components/Test.vue-->

```vue
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
```

观察控制台的打印：

![image-20210411164339220](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411164339220.png)

首先是页面渲染前执行 **onBeforeMount**，紧接着是 **onMounted**。当组件有变量更新导致页面变化的时候，先执行 **onBeforeUpdate**，但是没有马上执行 **onUpdated**，而是先执行了子组件的销毁生命周期钩子 **onBeforeUnmount** 和 onUnmounted，这是因为子组件在父组件中渲染，在页面变化没有完全结束前，是不会执行父组件的 **onUpdated** 生命周期钩子函数。

我们请求数据还是写在 `onMounted` 钩子函数内，它支持 `async await` 写法，如下：

```javascript
onMounted(async () => {
  const data = await serviceApi(params);
});
```

从这可以看出，写过 Vue 2.x 的同学，只要对照着生命周期，就能很轻松的将 Vue 2.x 的项目升级至 Vue 3.x。

## 		4.4.提供/注入

`provide/inject` 字面翻译的话，其实是叫“提供/注入”，但是网上都说是“依赖/注入”，本实验就叫它“提供/注入”，翻译不纠结，重要的是知识点。

这是一个很重要的特性，可以说在很多业务场景下有了它的存在，你就能更加如鱼得水。我们假设一个业务场景，你有一个“祖先”组件，在组件中你引入了一个“父亲组件”，“父亲”组件内又引入了一个“儿子”组件，此时你想给“儿子”组件传递一个数据，但是你的数据源必须在“祖先组件”获取，看下面的示意图：

<img src="https://niit-soft.oss-cn-hangzhou.aliyuncs.com/uPic/71ef8a822260ed3750ad428960453d15-0.png" alt="1" style="zoom:120%;margin-left:0;" />

“祖先”想要传递数据给”儿子“的的话，正常情况下，需要先传递给“父亲”组件，然后“父亲”组件再将数据传给“儿子”组件。

现在我们有了 `provide/inject`，便可以在“祖先”组件声明 `provide`，然后在“儿子”组件通过 `inject` 拿到数据。下面我们用代码来诠释上面的分析。

## 		Vue 2.x 写法

清空上述 `App.vue` 的代码，将其作为“祖先组件”，代码如下：

```html
<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>
</template>

<script>
  import Father from "./components/Father.vue";

  export default {
    components: {
      Father,
    },
    provide: {
      name: "陈尼克",
    },
  };
</script>
```

在 `src/components` 文件夹新建两个文件 `Father.vue` 和 `Son.vue` 如下：

```html
<!--Father.vue-->
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
<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
</template>

<script>
  export default {
    name: "Son",
    inject: ["name"],
  };
</script>
```

运行效果如下：

![image-20210411165126400](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411165126400.png)

## 		Vue 3.x 写法

之前说过 Vue 3.x 作出最大的改动就是将 `options` 的书写形式改成了 `hooks` 的钩子函数形式。`privide/inject` 也不例外，我们使用它们需要通过 `vue` 去解构出来，下面我们修改上述代码如下：

```html
<!--App.vue-->
<template>
  <div>
    <h1>提供/注入</h1>
    <Father />
  </div>
</template>

<script>
  import { provide } from "vue";
  import Father from "./components/Father.vue";

  export default {
    components: {
      Father,
    },
    setup() {
      provide("name", "陈尼克"); // 单个声明形式
      provide("info", {
        work: "前端开发",
        age: "18",
      }); // 多个声明形式
    },
  };
</script>
<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
  <div>职业：{{ info.work }}</div>
  <div>年龄：{{ info.age }}</div>
</template>

<script>
  import { inject } from "vue";
  export default {
    name: "Son",
    setup() {
      const name = inject("name", "嘻嘻"); // 第二个参数为默认值，可选
      const info = inject("info");

      return {
        name,
        info,
      };
    },
  };
</script>
```

运行效果如下：

![image-20210411165316016](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411165316016.png)

当我们需要修改传入的数据时，Vue 不建议我们直接在接收数据的页面修改数据源，用上述的例子就是不建议在 `Son.vue` 组件内去修改数据源。我们可以在 `App.vue` 组件内通过 `provide` 传递一个修改数据的方法给 `Son.vue`，通过在 `Son.vue` 内调用该方法去改变值。我们将代码做如下修改：

```html
<!--App.vue-->
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

<!--Son.vue-->
<template>
  <div>我是儿子，{{ name }}</div>
  <div>职业：{{ info.work }}</div>
  <div>年龄：{{ info.age }}</div>
  <button @click="changeName">修改名字</button>
</template>

<script>
  import { inject } from "vue";
  export default {
    name: "Son",
    setup() {
      const name = inject("name", "嘻嘻"); // 第二个参数为默认值，可选
      const info = inject("info");
      const changeName = inject("changeName");

      return {
        name,
        info,
        changeName,
      };
    },
  };
</script>
```

![image-20210411165515496](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411165515496.png)

这里解释一下，在 `Son.vue` 组件中，你可以直接修改 `inject` 传进来的 `name` 值。但是你细想，数据源存在于 `App.vue` 中，你在 `Son.vue` 中私自修改了数据源传进来的值，那两边的值就会产生紊乱，上述业务逻辑属于简单的，当你在公司正式项目中这样做的时候，数据源就会变得杂乱无章，页面组件变得难以维护。

综上所述，**一定要控制好数据源，保持单一数据流**。

## 		4.5.总结

本节了解了一遍 Vue 3.x 的生命周期，以及对业务逻辑很重要的 `provide/inject`，细节方面还需同学们去文档里好好的研究。

## 		5、Vue 3.x 性能提升

当聊到 Vue 3.0 版本发布，有哪些亮点时，你的答案之一肯定有“它变得更快了，性能上快了 1.2 ～ 2 倍”。那么是什么让 Vue 变快了，Vue 做了哪些性能上的优化。

​		 知识点

​			静态标记

​			静态提升

​			事件监听缓存

​			服务端渲染

​			静态节点

## 		PatchFlag（静态标记）

Vue 2.x 中的虚拟 DOM 是全量对比的模式，而到了 Vue 3.0 开始，新增了静态标记（PatchFlag）。在页面更新之前，DOM 节点进行对比的时候，只会去对比带有静态标记的节点。并且 PatchFlag 枚举定义了十几种类型，用以更精确的定位需要对比节点的类型。下面我们通过图文实例分析这个对比的过程。假设我们有下面一段代码：

```html
<div>
  <p>老八食堂</p>
  <p>{{ message }}</p>
</div>
```

在 Vue 2.x 的全量对比模式下，如下图所示：

<img src="https://niit-soft.oss-cn-hangzhou.aliyuncs.com/uPic/d6a19032b1a6225147abc79a3029a628-0.png" alt="1" style="zoom:67%;margin-left:0;" />

通过上图，我们发现，Vue 2.x 的 Diff 算法将每个标签都比较了一次，最后发现带有 `{{ message }}` 变量的标签是需要被更新的标签，显然这还有优化的空间。

在 Vue 3.x 中，对 Diff 算法进行了优化，在创建虚拟 DOM 时，根据 DOM 内容是否会发生变化，而给予相对应类型的静态标记（PatchFlag），如下图所示：

![图片描述](https://niit-soft.oss-cn-hangzhou.aliyuncs.com/uPic/63729381cc0a61c433bf713fd7c5c388-0.png)

观察上图，不难发现视图的更新只对带有 flag 标记的标签进行了对比（Diff），所以只进行了 1 次比较，而相同情况下，Vue 2.x 则进行了 3 次比较。这便是 Vue 3.x 比 Vue 2.x 性能好的第一个原因。

我们通过把模板代码转译成虚拟 DOM，来验证我们上述的分析是否正确。我们可以打开模板转化[网站](https://vue-next-template-explorer.netlify.app/)，对上述代码进行转译：

![image-20210411170200798](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411170200798.png)

上图蓝色框内为转译后的虚拟 DOM 节点，第一个 P 标签为写死的静态文字，而第二个 P 标签则为绑定的变量，所以打上了 1 标签，代表的是 TEXT（文字），标记枚举类型如下：

```javascript
export const enum PatchFlags {

  TEXT = 1,// 动态的文本节点
  CLASS = 1 << 1,  // 2 动态的 class
  STYLE = 1 << 2,  // 4 动态的 style
  PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
  FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
  HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
  NEED_PATCH = 1 << 9,   // 512
  DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
  HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
  BAIL = -2 // 一个特殊的标志，指代差异算法
}
```

## 		hoistStatic（静态提升）

我们平时在开发过程中写函数的时候，定义一些写死的变量时，都会将变量提升出去定义，如下所示：

```javascript
const PAGE_SIZE = 10
function getData () {
    $.get('/data', {
      data: {
        page: PAGE_SIZE
    },
    ...
  })
}
```

诸如上述代码，如果将 `PAGE_SIZE = 10` 写在 `getData` 方法内，每次调用 `getData` 都会重新定义一次变量。

Vue 3.x 在这方面也做了同样的优化，继续用我们上一个例子写的代码，观察编译之后的虚拟 DOM 结构，如下所示。

没有做静态提升前：

![image-20210411170359828](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411170359828.png)

选择右上角 Option 下的 `hoistStatic`：

![image-20210411170424919](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411170424919.png)

静态提升后：

![image-20210411170457919](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411170457919.png)

细心的同学会发现，`老八食堂` 被提到了 `render` 函数外，每次渲染的时候只要取 `_hoisted_1` 变量便可。认真看文章的同学又会发现一个细节，`_hoisted_1` 被打上了 `PatchFlag`，静态标记值为 -1，特殊标志是负整数表示永远不会用作 Diff。也就是说被打上 -1 标记的，将不在参与 Diff 算法，这又提升了 Vue 的性能。

## 		cacheHandler（事件监听缓存）

默认情况下 `@click` 事件被认为是动态变量，所以每次更新视图的时候都会追踪它的变化。但是正常情况下，我们的 `@click` 事件在视图渲染前和渲染后，都是同一个事件，基本上不需要去追踪它的变化，所以 Vue 3.x 对此作出了相应的优化叫事件监听缓存，我们在上述代码中加一段：

```html
<div>
  <p @click="handleClick">屋里一giao</p>
</div>
```

编译后如下图所示（还未开启 cacheHandler）：

![image-20210411171059969](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411171059969.png)

在未开启事件监听缓存的情况下，我们看到这串代码编译后被静态标记为 8，之前讲解过被静态标记的标签就会被拉去做比较，而静态标记 8 对应的是“动态属性，不包括类名和样式”。 `@click` 被认为是动态属性，所以我们需要开启 Options 下的 `cacheHandler` 属性，如下图所示：

![image-20210411171138183](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411171138183.png)

开启 `cacheHandler` 之后，编译后的代码已经没有静态标记（PatchFlag），也就表明图中 P 标签不再被追踪比较变化，进而提升了 Vue 的性能。

## 		SSR 服务端渲染

当你在开发中使用 SSR 开发时，Vue 3.x 会将静态标签直接转化为文本，相比 React 先将 jsx 转化为虚拟 DOM，再将虚拟 DOM 转化为 HTML，Vue 3.x 已经赢了。

![image-20210411171325152](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411171325152.png)

## 		StaticNode（静态节点）

上述 SSR 服务端渲染，会将静态标签直接转化为文本。在客户端渲染的时候，只要标签嵌套得足够多，编译时也会将其转化为 HTML 字符串，如下图所示：

![image-20210411171415049](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411171415049.png)

需要开启 Options 下的 hoistStatic。

## 		总结

以上便是 Vue3.x 在编译时针对虚拟 DOM 的性能优化，这使得 Vue 3.x 在性能上是 Vue 2.x 的 1.2 ～ 2 倍。

## 		6、Vue 3.x 在业务逻辑层面的提升

写过 Vue 2.x 的同学都知道，Vue 2.x 组件使用的是 Option 形式，而这种形式带来的弊端则是随着业务的增长，同一个业务相关的变量、方法随处可见，导致后期维护时变成“火葬场”。Vue 3.x 为我们带来的全新 Compisiton API 和函数式开发的模式，一定程度上解决了上述 Vue 2.x 遇到的问题，接下来将为大家详细的描述遇到的问题，以及解决问题的方法。

​		知识点

​			回顾Option

​			Composition API合并逻辑

​			抽离业务逻辑

## 		温故而知新 Option

我们通过简单例子来回顾 Vue 2.x 时代我们是如何编写业务逻辑。下面我们在实验楼 Web 环境初始化一个 Vue 3.x 的项目（Vue 3.x 内可正常编写 Vue 2.x 的语法）。

在实验环境新建一个项目：

```bash
npm init vite-app vue3-vite
```

我们在 `App.vue` 添加如下代码：

```html
<template>
  <form @keyup.enter="addStudent">
    <p>姓名：</p>
    <input name="name" type="text" v-model="student.name" />
    <br />
    <p>年龄：</p>
    <input name="age" type="number" v-model="student.age" />
  </form>
  <p
    v-for="(item, index) in studentList"
    :key="index"
    @click="removeStudent(index)"
  >
    {{ item.name }} {{ item.age }}
  </p>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        studentList: [
          { name: "小红", age: 20 },
          { name: "小蓝", age: 22 },
        ],
        student: {
          name: "",
          age: "",
        },
        // 编辑学生变量存储-1
        // 筛选年龄后的数组变量-2
        // 筛选姓后的数组变量-3
      };
    },
    methods: {
      // 添加学生方法
      addStudent() {
        this.studentList.push(this.student);
        this.student = {
          name: "",
          age: "",
        };
      },
      // 删除学生方法
      removeStudent(_index) {
        this.studentList = this.studentList.filter(
          (item, index) => _index !== index
        );
      },
      // 编辑学生名称方法-1
      // 筛选年龄方法-2
      // 筛选出姓李的学生方法-3
    },
    computed: {
      // 删除学生后，计算总人数的变化-1
      // 删除学生后，计算男生人数的变化-2
    },
  };
</script>
```

我们假设声明了一个“实验楼课堂”，通过 `data` 初始化学生数据，`methods` 中有 `addStudent` 新增学生方法和 `removeStudent` 移除学生方法，以及后续一些假设的业务逻辑方法。

你会发现逻辑越来越多的时候，相关变量和方法分散在 `data`、`methods`、`computed` 等各个位置。过了一段时间，回头去修改该组件时，你可能需要在此阅读整页的业务逻辑，这会让你感到十分痛苦，效率大打折扣。

我们通过一张动图来直观的感受一下：

<img src="https://niit-soft.oss-cn-hangzhou.aliyuncs.com/uPic/a069527d7d4faf186297c16c173bae31-0.gif" alt="1" style="zoom:150%;margin-left:0;" />

## 		拥抱变化，使用 Composition API 改造

Vue 3.x 为我们提供了函数式的写法，这是一次历史性的变化，弥补了 Vue 2.x 留下的遗憾，我们可以将相关的业务逻辑集中管理，这使得代码看起来工整了许多，我们来改造上述的业务逻辑：

```html
<template>
  <form @keyup.enter="addStudent">
    <p>姓名：</p>
    <input name="name" type="text" v-model="student.name" />
    <br />
    <p>年龄：</p>
    <input name="age" type="number" v-model="student.age" />
  </form>
  <p
    v-for="(item, index) in studentList"
    :key="index"
    @click="removeStudent(index)"
  >
    {{ item.name }} {{ item.age }}
  </p>
</template>

<script>
  import { reactive, toRefs } from "vue";
  export default {
    name: "App",
    setup() {
      const state = reactive({
        studentList: [
          { name: "小红", age: 20 },
          { name: "小蓝", age: 22 },
        ],
        student: {
          name: "",
          age: "",
        },
      });
      // 添加学生方法
      const addStudent = () => {
        state.studentList.push(state.student);
        state.student = {
          name: "",
          age: "",
        };
      };

      // 删除学生方法
      const removeStudent = (_index) => {
        state.studentList = state.studentList.filter(
          (item, index) => _index !== index
        );
      };

      return {
        ...toRefs(state),
        addStudent,
        removeStudent,
      };
    },
  };
</script>
```

![image-20210411172439317](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411172439317.png)

![1](https://doc.shiyanlou.com/courses/3097/207437/a3296e06b1f5437ee71256996f07f6e9-0)

通过一张动图更好的理解 Composition API 的精髓：

<img src="https://doc.shiyanlou.com/courses/3097/207437/a3296e06b1f5437ee71256996f07f6e9-0" alt="1" style="zoom:150%;margin-left:0;" />

## 		抽离业务逻辑方法

函数式的优势在于，你可以将业务逻辑方法提取到一个 js 文件中，我们创建两个 js 文件，分别是 `add.js` 和 `remove.js`，代码如下：

```javascript
// add.js
import { reactive } from "vue";
// state 从 App.vue 传入
export default function useAdd(state) {
  // 添加学生方法
  const addStudent = () => {
    state.studentList.push(state.student);
    state.student = {
      name: "",
      age: "",
    };
  };

  return { state, addStudent };
}
// remove.js
// state 从 App.vue 传入
export default function useRemove(state) {
  // 添加学生方法
  const removeStudent = (_index) => {
    state.studentList = state.studentList.filter(
      (item, index) => _index !== index
    );
  };

  return { removeStudent };
}
```

经过这样改造之后，`App.vue` 也需要相应的变化：

```html
<template>
  <form @keyup.enter="addStudent">
    <p>姓名：</p>
    <input name="name" type="text" v-model="student.name" />
    <br />
    <p>年龄：</p>
    <input name="age" type="number" v-model="student.age" />
  </form>
  <p
    v-for="(item, index) in studentList"
    :key="index"
    @click="removeStudent(index)"
  >
    {{ item.name }} {{ item.age }}
  </p>
</template>

<script>
  import { reactive, toRefs } from "vue";
  import useAdd from "./add.js";
  import useRemove from "./remove.js";
  export default {
    name: "App",
    setup() {
      // state 统一在 App.vue 顶层组件管理
      const state = reactive({
        studentList: [
          { name: "小红", age: 20 },
          { name: "小蓝", age: 22 },
        ],
        student: {
          name: "",
          age: "",
        },
      });
      const { addStudent } = useAdd(state);
      const { removeStudent } = useRemove(state);
      return {
        ...toRefs(state),
        addStudent,
        removeStudent,
      };
    },
  };
</script>
```

通过 `useAdd(state)` 和 `useRemove(state)` 的方式，将 state 响应式变量传入方法。你可以新建一个文件夹，将某个复杂组件内的业务按功能模块拆分到 js 文件内，这样便于后期产品经理来提“拍脑袋”的需求时，你能应付自如。

当然这里也可以将 state 定义在 `useAdd` 和 `useRemove` 方法内部，然后通过 return 把变量返回到 `App.vue` 利用 ES6 的解构将变量解析出来，再 return 给模板。

但是我觉得将 state 写在抽离的方法内部，不利于数据观察，毕竟 template 模板在 `App.vue` 组件内，模板不应该与数据分离，这是我的个人理解。

我们通过动画来更深刻的理解抽离组件的意义：

<img src="https://niit-soft.oss-cn-hangzhou.aliyuncs.com/uPic/9519726614dde07538c8e64ec7cca35f-0.gif" alt="1" style="zoom:150%;margin-left:0;" />

## 		总结

函数式编程将成为后续前端开发的主流，我们应该很好地去理解和掌握它。Vue 3.x 的函数式升级和 React 非常类似，这更验证了所有的框架都会朝着同一个目标汇聚，学会 Vue 3.x 的函数式思想，便能一通百通。

## 		7、路由管理插件 Vue-Router4.x API

用 Vue 框架做单页面开发，路由是你不得不学习的知识点。本节会通过示例来分析 Vue-Router 3.x 和 4.x 在写法上的不同，并且会根据官方文档逐一分析真实开发环境中遇到的一些关于路由的小知识点。

​			知识点

​				路由的由来

​				路由跳转

​				路由传参与接收

​				开发环境中遇到的一些路由问题

## 		路由的作用

在开始讲解路由之前，我们先来了解一下为什么我们在开发单页面项目的时候，会用到路由插件。

回到 N 年前，传统多页面开发模式下，一个项目由多个 HTML 文件组成，每个页面各司其职，将项目部署到线上之后，我们要跳转页面的话都是通过直接切换页面路径，进而会刷新整个网页。

<img src="https://niit-soft.oss-cn-hangzhou.aliyuncs.com/uPic/image-20210409133459008.png" alt="image-20210409133459008" style="zoom:50%;margin-left:0;" />

如上图所示，每请求一个页面，都会去服务器请求一次 HTML 资源，服务器响应返回 HTML 文件，浏览器解析 HTML 资源渲染页面。

为了提高用户体验，以及让代码具备模块化能力。Vue、React 等框架应运而生，它们利用虚拟 DOM 原理，将传统页面的直出真实 DOM 的形式，转化为通过 JS 渲染的形式插入到入口页面（Vue、React 都会有一个 `App.xxx` 作为项目的入口页）。

<img src="https://niit-soft.oss-cn-hangzhou.aliyuncs.com/uPic/image-20210409133427042.png" alt="image-20210409133427042" style="zoom:60%;margin-left:0;" />

那么根据上述，单页面开发会遇到一个问题。当我们切换浏览器地址的时候，页面是如何做到可以根据浏览器地址的变化，而去展示相对应的视图呢？注意，从始至终，我们就只有一个入口页。

> 可以通过浏览器右键查看网页源代码，就能知道这个项目是不是单页面项目。

Vue-Router 就是为上述问题而存在的。它的作用就是监听浏览器地址的变化，去展示相对应的组件，在此之前会事先配置好一份 `路径 -> 组件` 的映射关系，每当浏览器地址变化时，Vue-Router 内部会执行监听回调函数，去获取 `location.pathname`，匹配相应的组件进行视图渲染。

> Vue-Router 常用有两种模式。Hash 模式是利用 [hashchange](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event) 监听浏览器地址栏的变化，而另一种 History 模式则是利用 [popstate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event) 去监听浏览器地址栏的变化。本篇文章不做深入分析，着重介绍 Vue-Router 的使用。

## 		初始化项目

首选我们需要创建一个项目，通过页面之间的跳转例子来讲解路由的使用。在实验一我们介绍过 3 中初始化项目的方式，其中 Vue CLI 初始化项目时，可以选择 Vue 3.x 并且可以选择带上路由插件的选项。在此我们不使用这种方式，我们从一个空的项目开始从头走到尾。

通过 Vite 初始化一个项目：

```bash
npm init vite-app vue3-demo
```

生成项目之后记得按照提示进入项目根目录，安装依赖

然后我们进入到项目根目录下去安装最新的 Vue-Router 4.x，这里有个小技巧使用如下命令行安装，便能下载最新的安装包：

```bash
npm i vue-router@next
```

安装完成后，去项目的 `package.json` 文件观察一下是否安装成功：

![image-20210411173401672](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411173401672.png)

通过运行 `npm run dev` 启动项目，浏览器如下所示表示成功：

![image-20210411173458070](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411173458070.png)

## 		Vue-Router 4.x 配置

首先我们在 `src` 目录下新建 `router` 文件夹，在文件夹内新建 `index.js` 文件。在文件内添加如下内容:

```javascript
// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"

// createRouter 创建路由实例
const router = createRouter({
    history: createWebHashHistory(), // hash 模式：createWebHashHistory，history 模式：createWebHistory
    routes: [
        {
            path: "/",
            component: Home,
        },
    ],
})

// 抛出路由实例, 在 main.js 中引用
export default router
```

Vue-Router 4.x 目前需要通过 `createRouter` 方法返回路由实例，配置是通过传参的形式导入。

如上述代码所示，`createRouter` 函数接收一个对象作为参数，属性 `history` 则代表路由的模式。模式分为两种，第一种是 Hash 模式，通过 `createWebHashHistory` 方法初始化；另一种是 History 模式，通过 `createWebHistory` 模式初始化。在此我们选择 Hash 作为路由模式。

routes 形式和 Vue-Router 3.x 类似，也是一个数组，数组内的每一项为一个对象，对象属性则为配置组件的 `路径 -> 组件` 映射关系。如上述 routes，`'/'` 根路径对应的组件是 Home，那么我们需要构建出 `Home.vue` 组件。

在 `src` 目录下新建视图文件夹**views**，专门用于放置页面组件：

```html
<!--src/views/Home.vue-->
<template> 我是 Home </template>

<script>
  export default {
    name: "Home",
  };
</script>
```

接着修改 `App.vue` 组件如下：

```html
<template>
  <!-- 和 vue-router 3.x 一样，展示路由的组件的地方 -->
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>
```

展示组件的地方和 Vue-Router 3.x 一样，没有变化。

最后我们在 `main.js` 文件内引入 `router/index.js` 抛出的路由实例。

```javascript
import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"
import "./index.css"
const app = createApp(App)
app.use(router)
app.mount("#app")
```

运行图如下：

![image-20210411173929646](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411173929646.png)

## 		路由跳转

在 `src/views` 文件夹下新建两个页面，`Page1.vue` 和 `Page2.vue`。

```html
<template>Page1</template>
<script>
export default {
  name: "Page1",
};
</script>

<template>Page2</template>
<script>
export default {
  name: "Page2",
};
</script>
```

修改路由文件src/router/index.js

```javascript
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
            path: "/page2",
            name: "Page2",
            component: () => import("../views/Page2.vue"),
        },
    ],
})

// 抛出路由实例, 在 main.js 中引用
export default router
```

然后我们修改 `Home.vue` 组件，让其支持跳转到这两个页面：

```html
<template>
  <p @click="goto('/page1')">page1</p>
  <p @click="goto('/page2')">page2</p>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const goto = (path) => {
      router.push(path);
      // 也可以用这种写法：router.push({ path })
    };
    return { goto };
  },
};
</script>
```

效果如下：

![image-20210411175004942](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411175004942.png)

## 		参数的传递和获取

假设我们需要传递一个 count 参数给 `Page1` 组件，并且在 `Page1` 组件接收到这个组件。首先我们先来传递：

```html
<!--Home.vue-->
<template>
  <p @click="goto('/page1', 2)">page1</p>
  <p @click="goto('/page2')">page2</p>
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
    return { goto };
  },
};
</script>
```

接收参数：

```html
<!--Page1.vue-->
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
```

点击 page1 进入 `Page1` 页面，浏览器打印情况如下：

![image-20210411175204853](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411175204853.png)

也可以在 `template` 模板内通过 `$route.query.count` 拿到传进来的变量。

下面我们通过 `Page2` 组件编写另一种方式传递参数。开发项目时，会通过在路径上直接携带参数的情况，如 `page2/9` 将参数 9 直接放在路径上，这样我们可以通过下面这种形式获取路由参数，首先我们改造 `Home.vue`：

```html
<!--Home.vue-->
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
```

修改Page.vue

```vue
<!--Page2.vue-->
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
```

最后我们在 `router/index.js` 文件内作如下修改：

```javascript
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
```

浏览器如下所示，表示获取成功：

![image-20210411175509531](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411175509531.png)

## 		路由变化监听函数

很多时候，我们需要在路由改变的时候，去做一些事情。比如修改某些全局变量，样式的切换等等，在 Vue-Router 3.x 中，我们可以通过在 Option 选项内我们可以通过在 watch 属性内添加 $route 去监听路由变化，如下：

```javascript
watch: {
  $route(to, from) {
    // do something
  }
}
```

到了 Vue-Router 4.x，需要去 `vue-router` 内获取 `onBeforeRouteUpdate` 方法去监听，代码如下：

```javascript
import { onBeforeRouteUpdate } from "vue-router";

export default {
  setup() {
    onBeforeRouteUpdate((to, from) => {
      // do something
    });
  },
};
```

## 		总结

上述使用的技巧，基本涵盖了大部分业务所需要的功能。还有一些不常用的方法请同学们自行前往 Vue-Router 4.x [官方文档](https://next.router.vuejs.org/) 查阅。遇到问题，最先要想到的是去查官方文档，尽量自己去解决问题，这样才能有提升。

## 		8、状态管理插件 Vuex4.x API

从业务的角度来说，凡是没有大量跨组件传值或者大量公用变量的项目，是用不上状态管理插件的，比如面向用户端的一些小项目、后台管理系统项目等。但是我们要把目光放远，Vuex 插件在整个 Vue 体系中也是有举足轻重的地位。从 Vue CLI 初始化项目选项上有 Vuex 选项便可看出。本节通过小实例讲解 Vuex 4.x 如何创建、引入、使用。

​			知识点：

- 创建 Vuex 配置文件

- 引入配置文件

- 使用方法介绍

  ## 创建 Vuex 配置文件

我们通过手动添加的方式为项目添加 Vuex 4.x，我们通过如下指令添加：

```bash
npm i vuex@4.0.0-beta.4
```

上一章我们介绍过可以通过 `@next` 的形式添加最新的版本，但是 Vuex 官方貌似没有做这个适配，所以我们直接指定版本添加。

在 `src` 根目录下新建store目录，目录下添加文件index.js，并添加如下代码：

```javascript
import { createStore } from "vuex"
import state from "./state"
import actions from "./actions"
import mutations from "./mutations"

const store = createStore({
    state, // 状态管理
    mutations, // 更改 state 数据，并返回最新的 state
    actions, // dispatch 执行的方法列表
    modules: {},
})

export default store
```

不同于 Vuex 3.x，Vuex 4.x 同样采用函数返回的形式创建 store 实例，但是参数没有变化，依旧是 `state`、`mutations`、`actions`、`modules`。

下面我们实现一个简单的购物车功能，通过在购物车页面点击添加按钮增加购物车的数量，然后在 `Home.vue` 页面显示购物车的数量，数据全权交由 Vuex 管理。

我们在 `components` 目录下创建一个 `Cart.vue` 组件，内容如下：

```html
<template>
  <button>-</button>
  <span>购物车</span>
  <button>+</button>
</template>

<script>
export default {
  name: "Cart",
};
</script>
```

将上述组件引入 `Home.vue`（这里我们先清空上一节的代码，避免混乱），如下所示：

```html
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
```

浏览器打开如下所示代表成功：

![image-20210411183949133](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411183949133.png)

接下来，我们希望**点击购物车加减按钮，实现购物车数量的增加和减少**。

## 		添加配置内容

我们需要将数据放在 Vuex 的 state 属性中，在 `src/store` 目录下新建 `state.js` 文件，添加如下内容：

```javascript
export default {
    add (ctx, count) {
        ctx.commit("add", {
            count,
        })
    },
    min (ctx, count) {
        ctx.commit("min", {
            count,
        })
    },
};
```

其次我们需要添加改变 count 变量的方法，同样在 `src/store` 目录下新建 `action.js` 文件，添加如下内容：

```javascript
export default {
    add (ctx, count) {
        ctx.commit("add", {
            count,
        })
    },
    min (ctx, count) {
        ctx.commit("min", {
            count,
        })
    },
};
```

`ctx.commit` 将会触发 `mutations.js` 内的方法改变 `state` 状态，所以我们在同级目录新建 `mutations.js`，添加如下内容：

```javascript
export default {
    add (state, payload) {
        state.count = state.count + payload.count
    },
    min (state, payload) {
        state.count = state.count - payload.count
    },
};
```

给 `state.count` 赋值会直接修改数据，所以我们需要通过 `tate.count + payload.count` 这样的形式修改数据。

## 		Cart 组件触发购物车的加减

我们回到 `Cart.vue` 组件，通过 Vuex 提供的方法去触发 `actions` 中的方法，如下所示：

```html
<template>
  <button @click="min">-</button>
  <span>购物车</span>
  <button @click="add">+</button>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "Cart",
  setup() {
    const store = useStore();
    const add = () => {
      store.dispatch("add", 1);
    };
    const min = () => {
      store.dispatch("min", 1);
    };

    return { add, min };
  },
};
</script>
```

通过 ES6 的解构，从 Vuex 中获取 `useStore` 方法，并在 setup 中执行它，返回的值便是 store 实例。通过 `store.dispatch` 方法触发 `actions` 内的方法，第一个参数为 `actions` 内对应的函数名，第二个参数为传进去的值。如下图所示：

![image-20210411184204731](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411184204731.png)

触发方法写完之后，我们需要去 `Home.vue` 页面展示它，代码如下：

```html
<!--Home.vue-->
<template>
  <Cart />
  <p>购物车数量：{{ state.count }}</p>
</template>

<script>
  import { ref } from "vue";
  import { useStore } from "vuex";
  import Cart from "../components/Cart.vue";
  export default {
    name: "Home",
    components: {
      Cart,
    },
    setup() {
      const store = useStore();
      const state = store.state;
      return {
        state,
      };
    },
  };
</script>
```

`state` 在实例 `store` 内，通过上述代码方式将 `state` 返回给 template 模板使用，这样能实现数据的双向绑定。

最后我们在 `main.js` 文件内，将 store 引入，如下所示：

```javascript
// main.js
import { createApp } from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./index.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
```

刷新浏览器，如下图所示：

![购物车1](E:\XMQ课上学习\录制gif\购物车1.gif)

这里有一个注意点，你若是将 `state` 中的 count 变量单独赋值给 `setup` 的 return，它将失去响应式能力，代码如下：

```html
<template>
  <Cart />
  <p>购物车数量：{{ count }}</p>
</template>

<script>
  import { ref } from "vue";
  import { useStore } from "vuex";
  import Cart from "../components/Cart.vue";
  export default {
    name: "Home",
    components: {
      Cart,
    },
    setup() {
      const store = useStore();
      const state = store.state;
      return {
        count: state.count,
      };
    },
  };
</script>
```

![购物车](E:\XMQ课上学习\录制gif\购物车.gif)

其实原因很简单，我们来打印 `store.state`，看看它是什么，如下所示：

![image-20210411185331643](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210411185331643.png)

可以看见，它是一个 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 包裹的对象，Vue 3.x 便是通过 Proxy 实现的响应式数据，所以**一旦脱离了 `store.state`，数据就失去了响应式能力。**

如果觉得在模版中每次都要加 state.xxx 很麻烦的话，可以通过 `toRefs` 去包裹 state 然后解构，如下所示：

```javascript
import { toRefs } from 'vue'
setup() {
  const store = useStore()
  const state = store.state
  return {
    ...toRefs(state)
  }
}
```

经过上述修改之后，便可直接在模板中使用 `{{ count }}`。

## 		Actions 实现异步请求

很多时候，我们数据都是从接口获取的，并且在各个地方都要使用，比如用户信息数据。那么我们可以在 `actions.js` 文件中实现异步加载数据，并初始化。

模拟请求用户数据，如下所示：

```javascript
export default {
  async getUserInfo(ctx, count) {
    const user = await getUserInfoAPI();
    ctx.commit("user", {
      user,
    });
  },
};
```

`getUserInfoAPI` 相当于服务端提供的 API 接口，我们通过 `async await` 的方式去获取异步数据，再赋值给 state。

Vuex 还有一个要注意的是，一旦页面刷新，state 数据都将会被重置。“刷新”指点击浏览器左上角刷新按钮，或者手动执行 `window.location.reload` 方法。

### 总结

全局状态管理，还有很多潜在的功能待大家去挖掘，大家可以去它的 [Github](https://github.com/vuejs/vuex) 仓库仔细查看。

