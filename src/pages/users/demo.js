import React from "react"
class Demo extends React.Component {
    render() {
         return (
            <div>
                <p style={{color:'red'}}>
                    点击次数{this.props.value}{this.props.state}
                </p>
                <button onClick={this.props.onIncreaseClick}>加一</button>
                <button onClick={this.props.delClick}>减一</button>
           </div>
         )
    }
}

export default Demo