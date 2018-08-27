import { Button, Card, Col, Form, Icon, Input, message, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import httpClient from "../Utils/httpClient";
import "./Login.css";
const FormItem = Form.Item;

interface IProps {
  form: WrappedFormUtils;
  history?: any;
}

class Login extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      password: "",
      userName: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Col span={9} offset={7}>
          <Card style={{ top: "100px" }}>
            <Row justify="space-between" align="middle">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem style={{ textAlign: "center" }}>
                  <Icon
                    type="user"
                    style={{ fontSize: 56, color: "#001529" }}
                  />
                </FormItem>
                <FormItem>
                  {getFieldDecorator("username", {
                    rules: [{ required: true, message: "Username is required" }]
                  })(
                    <Input
                      placeholder="Username"
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "Password is required" }]
                  })(
                    <Input
                      placeholder="Password"
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                    />
                  )}
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </FormItem>
              </Form>
            </Row>
          </Card>
        </Col>
      </div>
    );
  }

  private handleSubmit = (e: any) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, loginData) => {
      if (!err) {
        httpClient
          .getInstance()
          .post("/gateway/api/v1/sessions/login/", loginData)
          .then(res => {
            console.log(res);
            // localStorage.setItem('sessionKey', res.data.sessionKey);
            // history.push('/dtsadmin/customers');
          })
          .catch(error => {
            message.error(error.response.data.error);
          });
      }
    });
  };
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
