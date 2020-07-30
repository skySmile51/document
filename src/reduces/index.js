/* 
自定义的reducer函数，判断action忠type的类型状态对应的进行一些业务逻辑处理之后返回一个新的state状态
*/
const reducer = (state = { count: 0 },action)=>{
    switch (action.type){
      case 'add':
        return { count: state.count + 1 };
      case 'del':
        return { count: state.count - 1};
      default:
        return state
    }
  };
  export default reducer;