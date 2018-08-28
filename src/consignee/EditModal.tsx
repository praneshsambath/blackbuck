import { Col, Form, Input, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import "./consignee.css";
const FormItem = Form.Item;
interface IProps {
  visible: boolean;
  EditModal: any;
  form: WrappedFormUtils;
  dataToDisplay: any;
}
class EditModal extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    console.log(this.props.dataToDisplay);
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Edit Modal"
        visible={this.props.visible}
        style={{ top: 30 }}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
      >
        <Form>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Consignee Code">
                {getFieldDecorator("code", {
                  initialValue: this.props.dataToDisplay[0].code,
                  rules: [
                    {
                      message: "Consignee Code is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Consignee Code" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Consignee Name">
                {getFieldDecorator("name", {
                  initialValue: this.props.dataToDisplay[0].name,
                  rules: [
                    {
                      message: "Consignee Name is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Consignee Name" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="State">
                {getFieldDecorator("state_name", {
                  initialValue: this.props.dataToDisplay[0].state_name,
                  rules: [
                    {
                      message: "State is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter State" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Sub Location">
                {getFieldDecorator("sublocation_name", {
                  initialValue: this.props.dataToDisplay[0].sublocation_name,
                  rules: [
                    {
                      message: "Sub Location is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Sub Location" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Latitude">
                {getFieldDecorator("latitude", {
                  initialValue: this.props.dataToDisplay[0].latitude,
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Enter Latitude" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Longitude">
                {getFieldDecorator("logitude", {
                  initialValue: this.props.dataToDisplay[0].longitude,
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Enter Longitude" />)}
              </FormItem>
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
        console.log(values);
      } else {
        alert("error on submit");
      }
    });
    this.props.EditModal(false);
  };
  private cancelButton = () => {
    this.props.EditModal(false);
  };
}
export default Form.create()(EditModal);
