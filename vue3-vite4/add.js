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