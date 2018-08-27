import { Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";

const FormItem = Form.Item;
// const { RangePicker } = DatePicker;

interface IProps {
  visible: boolean;
  AddIndentModal: any;
  form: WrappedFormUtils;
}
class AddIndentModal extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Add Indents"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
      >
        <Form>
          <Row gutter={24}>
            <FormItem label="Indent ID">
              {getFieldDecorator("id", {
                // initialValue: "NAme",
                rules: [
                  {
                    message: "Indent ID is required",
                    required: true
                  }
                ],
                validateTrigger: ["onChange", "onBlur"]
              })(<Input placeholder="Indent ID" />)}
            </FormItem>
            <FormItem label="Consignor">
              {getFieldDecorator("consignor", {
                // initialValue: "NAme",
                rules: [
                  {
                    message: "Field is required",
                    required: true
                  }
                ],
                validateTrigger: ["onChange", "onBlur"]
              })(<Input placeholder="Name-ID-State-City-Sub Location" />)}
            </FormItem>
            <FormItem label="Consignee">
              {getFieldDecorator("consignee", {
                // initialValue: "NAme",
                rules: [
                  {
                    message: "Field is required",
                    required: true
                  }
                ],
                validateTrigger: ["onChange", "onBlur"]
              })(<Input placeholder="Name-ID-State-City-Sub Location" />)}
            </FormItem>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Product">
                {getFieldDecorator("product", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Name-ID-State-City-Sub Location" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Number of units">
                {getFieldDecorator("unitNo", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Name-ID-State-City-Sub Location" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Indent Date">
                <DatePicker onChange={console.log} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Number of units">
                <DatePicker onChange={console.log} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Transporter">
                {getFieldDecorator("transporter", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Transporter is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Transporter" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Truck Type">
                {getFieldDecorator("truckType", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Truck Type" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
  private submitButton = () => {
    this.props.AddIndentModal(false);
  };
  private cancelButton = () => {
    this.props.AddIndentModal(false);
  };
}
export default Form.create()(AddIndentModal);
