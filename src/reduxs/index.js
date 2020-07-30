// redux 的总结
import { createStore } from 'redux'

const store = createStore() //生成一个存储容器的store仓库 store是一个对象
/* 
Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同
state 是store仓库存储的数据  通过store.getState生成快照state
*/
const state = store.getState()

/* 
action 是一个对象。其中的type属性是必须的，表示 action 的名称。
action 对象一般有三个参数 type payload、meta和error type为action的名称  payload为有效负载的任何值   meta:不属于有效负载的任何值  error为错误
action是修改state的唯一方法
*/ 
const action = {
    type: "ADD_TODO",
    payload: "learn Redux"
} 

/* 
store.dispatch()是 view 发出 Action 的唯一方法
*/
store.dispatch({
    type: 'ADD_TODO',
    payload: 'Learn Redux'
})


/* 
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer
Reducer是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
state是一个事项定义好的默认参数状态
*/
const def = 0
const reducer = (state = def,action) => {
    newState = state
    return newState
}


/* 
demo实例
 */
const explem = 0;
const reducerDemo = function (state=explem ,action) {
    switch(action.type) {
        case "ADD" : 
        return state + action.payload
        default : 
        return state
    }
}
const demo1 = reducerDemo(1,{
    type: "ADD",
    payload: 2
})
console.log(demo1)


/* 
实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。
为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
import { createStore } from 'redux';
const store = createStore(reducer)
createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，
不得改写参数
不能调用系统 I/O 的API
不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
*/



/* 
createLogger 是别人已封装好的输出打印的中间件插件模块
applyMiddleware方法是用来注册中间件的 注册中间件的方式是在store仓库创建时一并注册  可以接受多个参数，注意中间件的注册是有次序要求的
logger就一定要放在最后，否则输出结果会不正确。
reducer 是一个纯函数用来返回一个新的state数据状态 
creatStore方法有三个参数 第一个参数时reducer 第二个参数为初始化的数据状态 第三个参数时中间件添加扩展功能

*/
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
    reducer,
    initial_state,
    applyMiddleware(thunk, promise, logger)
);


/* 
react-redux的使用总结
TodoList是 UI 组件，VisibleTodoList就是由 React-Redux 通过connect方法自动生成的容器组件。
但是，因为没有定义业务逻辑，上面这个容器组件毫无意义，只是 UI 组件的一个单纯的包装层。
*/
import { connect } from 'react-redux'
const VisibleTodoList = connect()(TodoList);


/* 
connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。
connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。
前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
*/
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

/* 
mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个todos属性，代表 UI 组件的同名参数，
后面的getVisibleTodos也是一个函数，可以从state算出 todos 的值。
mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
*/
const mapStateToProps = (state) => {
    return {
      todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filtter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filtter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
}


/* 
使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
*/
// 容器组件的代码
//    <FilterLink filter="SHOW_ALL">
//      All
//    </FilterLink>

const mapStateToProps = (state, ownProps) => {
    return {
      active: ownProps.filter === state.visibilityFilter
    }
}

/* 
mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。
也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。
mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
*/
const mapDispatchToProps = (
    dispatch,
    ownProps
  ) => {
    return {
      onClick: () => {
        dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: ownProps.filter
        });
      }
    };
  }


/* 
如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，
返回的 Action 会由 Redux 自动发出。举例来说，上面的mapDispatchToProps写成对象就是下面这样
*/

const mapDispatchToProps = {
    onClick: (filter) => {
        type: 'SET_VISIBILITY_FILTER'
        filter: filter
    }
}

/* 
connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。
一种解决方法是将state对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将state传下去就很麻烦
React-Redux 提供Provider组件，可以让容器组件拿到state
Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。
它的原理是React组件的context属性
*/
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
let store = createStore(todoApp);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)