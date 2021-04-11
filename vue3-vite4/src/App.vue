// <template>
//   <form @keyup.enter="addStudent">
//     <p>姓名：</p>
//     <input name="name" type="text" v-model="student.name" />
//     <br />
//     <p>年龄：</p>
//     <input name="age" type="number" v-model="student.age" />
//   </form>
//   <p
//     v-for="(item, index) in studentList"
//     :key="index"
//     @click="removeStudent(index)"
//   >
//     {{ item.name }} {{ item.age }}
//   </p>
// </template>

// <script>
//   import { reactive, toRefs } from "vue";
//   import useAdd from "./add.js";
//   import useRemove from "./remove.js";
//   export default {
//     name: "App",
//     setup() {
//       // state 统一在 App.vue 顶层组件管理
//       const state = reactive({
//         studentList: [
//           { name: "小红", age: 20 },
//           { name: "小蓝", age: 22 },
//         ],
//         student: {
//           name: "",
//           age: "",
//         },
//       });
//       const { addStudent } = useAdd(state);
//       const { removeStudent } = useRemove(state);
//       return {
//         ...toRefs(state),
//         addStudent,
//         removeStudent,
//       };
//     },
//   };
// </script>