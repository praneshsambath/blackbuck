import { Col, Form, Input, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import WrappedDynamicFieldSet from "../common/DynamicInputField";

const FormItem = Form.Item;

interface IProps {
  AddModal: any;
  visible: boolean;
  form: WrappedFormUtils;
}

interface IState {
  dynamicInputField: string[];
  mobileInputField: string[];
}

class AddModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      dynamicInputField: [],
      mobileInputField: []
    };
  }
  public render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Add Transporter"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="ADD"
        okType="primary"
        // ghost={true}
      >
        <Form>
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
                })(<Input placeholder="Transporter ID" />)}
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
                })(<Input placeholder="Transporter Name" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <WrappedDynamicFieldSet
                dashedField="Email"
                onDynamciFieldChange={this.EmailDynamicField}
                // initValue={this.state.dynamicInputField}
              />
            </Col>
            <Col span={12}>
              <WrappedDynamicFieldSet
                onDynamciFieldChange={this.primaryMobileField}
                dashedField="Mobile"
                // initValue={this.state.mobileInputField}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
  private submitButton = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        values.primaryEmail = this.state.dynamicInputField;
        values.primaryMobile = this.state.mobileInputField;
        console.log(values)
      }
    });
    this.props.AddModal(false);
  };
  private cancelButton = () => {
    this.props.AddModal(false);
  };
  private EmailDynamicField = (value: any) => {
    console.log(value)
    this.setState({
      dynamicInputField: value
    });
  };
  private primaryMobileField = (value: any) => {
    console.log(value)
    this.setState({
      mobileInputField: value
    });
  };
}

export default Form.create()(AddModal);
