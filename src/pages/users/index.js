import React from "react";
import { Form, Input, Button, Checkbox } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Demo = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    props.history.push('/login')
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
      <div style={{height:"100vh",backgroundColor:"#f7f7f7"}}>
          <div style={{width:"500px",margin:"0px auto",paddingTop:"200px"}}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
          
        <Form.Item {...tailLayout}>
          <Checkbox style={{marginRight:"100px"}}>记住密码</Checkbox>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
      </div>
  );
};

export default Demo;
