import React from "react"
import { createStore } from "redux"
import { Provider, connect } from "react-redux"
import reducer from "../../reduces/index"
import Demo from "./demo"
let store = createStore(reducer)//创建redux的store仓库及注册reducer方法
let Num = connect(mapStateToProps,mapDispatchToProps)(Demo)//使用connect方法通过ui组件生成容器组件

const increaseAction  = { type: "add"}//自定义的action数据的类型状态
const newType = {type: "del"}//自定义的action数据的类型状态
//mapStateToProps是connect的第一个参数
//根据名称我们知道是把之前reducer纯函数中的state(状态)和展示组件的props(属性)进行映射
//将redux忠的store仓库数据映射到容器的props属性对象忠
function mapStateToProps(state) {
    return {
      value: state.count
    }
}

// mapDispatchToProps是connect的第二个参数
//根据名称我们可以知道是把reducer纯函数中之前store中的dispatch方法和展示组件的props(属性)进行映射
// mapDispatchToProps忠的dispatch参数是一个action方法，根据action中定义的type类型通过dispatch方法自动调用reducer纯函数中对应type类型状态进行业务逻辑处理，处理之后
// 返回一个新的state数据状态，将数据state方法映射到容器组件中props属性对象中并且更新组件重新渲染
function mapDispatchToProps(dispatch) {
    return {
      onIncreaseClick: () => dispatch(increaseAction),
      delClick: () =>  dispatch (newType)
    }
}
//这里的组件Provider是一个react-redux中特殊的组件
//注意: 1. Provider中有且只有一个子组件(这里就是App容器组件,不一定是容器组件,根据自己的业务需求自己操作)
//      2. 使用Provider组件的好处是,只需要给Provider组件设置属性,那么其子组件和其子组件中的子组件都可以直接使用其对应的属性
//      3. 避免了组件嵌套之后一个一个传递的复杂操作
class Login extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <Num></Num>
            </Provider>
        )
    }
}

export default Login