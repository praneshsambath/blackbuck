import { Col, Form, Input, Modal, Row } from "antd";
// import {  Form, Modal } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
// import DynamicFieldSetWrapper from "../../common/dynamicFieldSetWrapper";

const FormItem = Form.Item;

interface IProps {
  AddModal: any;
  visible: any;
  form: WrappedFormUtils;
}

interface IState {
  items: any;
  secondaryEmail: [];
  secondaryMobile: [];
}

class ViewDisributionRuleModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      items: [],
      secondaryEmail: [],
      secondaryMobile: []
    };
    // this.onValueChangeSecondaryEmail = this.onValueChangeSecondaryEmail.bind(
    //   this
    // );
    // this.onChangeValueSecondaryMobile = this.onChangeValueSecondaryMobile.bind(
    //   this
    // );
  }
  public AddModal(visible: boolean) {
    this.props.AddModal(visible);
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    // const { items } = this.state;
    return (
      <Modal
        title="Distribution Rule"
        visible={this.props.visible}
        // onOk={this.submitButton}
        onCancel={this.AddModal.bind(this, false)}
        okText="ADD"
        okType="primary"
      >
        <Form>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Transporter ID">
                {getFieldDecorator("id", {
                  initialValue: "TR2",
                  rules: [
                    {
                      message: "Transporter ID is required",
                      required: false
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Transporter ID" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Transporter Name">
                {getFieldDecorator("name", {
                  initialValue: "Merley",
                  rules: [
                    {
                      message: "Transporter Name is required",
                      required: false
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Transporter Name" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Source">
                {getFieldDecorator("email", {
                  initialValue: "NAme",
                  rules: [
                    {
                      message: "Source is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Source" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Destination">
                {getFieldDecorator("destination", {
                  initialValue: "Coimbatore",
                  rules: [
                    {
                      message: "Destination is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input  placeholder="Enter Destination" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Truck Type">
                {getFieldDecorator("truckType", {
                  initialValue: "TH-TS-12",
                  rules: [
                    {
                      message: "Truck Type is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Truck Type" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="SOB">
                {getFieldDecorator("sob", {
                  initialValue: "75%",
                  rules: [
                    {
                      message: "SOB is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter SOB" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
  //   private submitButton = (e: any) => {
  //     e.preventDefault();
  //     this.props.form.validateFieldsAndScroll((err: any, values: any) => {
  //       if (!err) {
  //         // console.log(values);
  //         values.secondaryEmail = this.state.secondaryEmail;
  //         values.secondaryMobile = this.state.secondaryMobile;
  //         console.log(values);
  //         this.props.AddModal(false);
  //       } else {
  //         alert("error on submit");
  //       }
  //     });
  //   };
  //   private onValueChangeSecondaryEmail = (value: []) => {
  //     this.setState({
  //       secondaryEmail: value
  //     });
  //   };
  //   private onChangeValueSecondaryMobile = (value: []) => {
  //     this.setState({
  //       secondaryMobile: value
  //     });
  //   };
}

export default Form.create()(ViewDisributionRuleModal);
