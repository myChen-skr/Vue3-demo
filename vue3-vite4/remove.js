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