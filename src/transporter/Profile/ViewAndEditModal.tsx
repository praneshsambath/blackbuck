import { Button, Col, Form, Input, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import DynamicFieldSetWrapper from "../../common/dynamicFieldSetWrapper";
const FormItem = Form.Item;

interface IProps {
  viewAndEdit: any;
  visible: boolean;
  form: WrappedFormUtils;
}
interface IState {
  items: [];
  isEdit: boolean;
  secondaryMobile: [];
  secondaryEmail: [];
}
class ViewAndEditModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // this.onValueChangeSecondaryEmail = this.onValueChangeSecondaryEmail.bind(this);
    // this.onChangeValueSecondaryMobile = this.onChangeValueSecondaryMobile.bind(this);
    this.state = {
      isEdit: true,
      items: [],
      secondaryEmail: [],
      secondaryMobile: []
    };
  }
  public render() {
    const { items } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="View Edit Transporter"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
        okButtonProps={{ disabled: !this.state.isEdit }}
        cancelButtonProps={{ disabled: !this.state.isEdit }}
      >
        <Form>
          <Row type="flex" justify="space-between" align="middle" style={{paddingBottom:12}}>
            <Col />
            <Col>
            {!this.state.isEdit ? (
              <Button ghost={true} type="primary" size="small"  icon="close" onClick={this.EditVisiblity}>
                Cancel
              </Button>)
            :null}
              {this.state.isEdit ? (
                <Button type="primary" size="small" style={{ marginLeft: 8 }} icon="edit" onClick={this.EditVisiblity}>
                  Edit
                </Button>
              ) : (
                <Button type="primary" size="small"  style={{ marginLeft: 8 }} icon="save" onClick={this.EditVisiblity}>
                  Save
                </Button>
              )}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Transporter ID">
                {getFieldDecorator("id", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Transporter ID is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Transporter ID" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Transporter Name">
                {getFieldDecorator("name", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Transporter Name is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <Input
                    disabled={this.state.isEdit}
                    placeholder="Transporter Name"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Primary Email ID">
                {getFieldDecorator("email", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Email ID is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <Input
                    disabled={this.state.isEdit}
                    placeholder="Enter Primary Email"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Primary Mobile Number">
                {getFieldDecorator("number", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Mobile Number is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <Input
                    disabled={this.state.isEdit}
                    placeholder="Enter Primary Mobile Number"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <DynamicFieldSetWrapper
                items={items}
                onValueChangeSet={this.onValueChangeSecondaryEmail}
                fieldName="Secondary Email ID"
                placeholderText="Enter Email"
                isVisible={this.state.isEdit}
              />
            </Col>
            <Col span={12}>
              <DynamicFieldSetWrapper
                items={items}
                onValueChangeSet={this.onChangeValueSecondaryMobile}
                fieldName="Secondary Mobile Number"
                placeholderText="Enter Mobile"
                isVisible={this.state.isEdit}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
  private EditVisiblity = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };
  private submitButton = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        // console.log(values);
        values.secondaryEmail = this.state.secondaryEmail;
        values.secondaryMobile = this.state.secondaryMobile;
        console.log(values);
        this.props.viewAndEdit(false);
      } else {
        alert("error on submit");
      }
    });
  };
  private cancelButton = () => {
    this.props.viewAndEdit(false);
  };
  private onValueChangeSecondaryEmail = (value: []) => {
    this.setState({
      secondaryEmail: value
    });
  };
  private onChangeValueSecondaryMobile = (value: []) => {
    this.setState({
      secondaryMobile: value
    });
  };
}
export default Form.create()(ViewAndEditModal);
