import { Col, Form, Input, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import baseUrl from "../../common/baseUrl";
import DynamicFieldSetWrapper from "../../common/dynamicFieldSetWrapper";
import httpClient from "../../Utils/httpClient";

const FormItem = Form.Item;

interface IProps {
  AddModal: any;
  visible: boolean;
  form: WrappedFormUtils;
  getTableData: any;
}

interface IState {
  items: any;
  secondaryEmail: [];
  secondaryMobile: [];
}

class AddModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      items: [],
      secondaryEmail: [],
      secondaryMobile: []
    };
    this.onValueChangeSecondaryEmail = this.onValueChangeSecondaryEmail.bind(
      this
    );
    this.onChangeValueSecondaryMobile = this.onChangeValueSecondaryMobile.bind(
      this
    );
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { items } = this.state;
    return (
      <Modal
        title="Add Transporter"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="ADD"
        okType="primary"
      >
        <Form>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Transporter Code">
                {getFieldDecorator("code", {
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
                })(<Input placeholder="Enter Primary Email" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Primary Mobile Number">
                {getFieldDecorator("phone", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Mobile Number is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Primary Mobile Number" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <DynamicFieldSetWrapper
                items={items}
                onValueChangeSet={this.onValueChangeSecondaryEmail}
                fieldName="Secondary Email ID"
                placeholderText="Enter Email"
              />
            </Col>
            <Col span={12}>
              <DynamicFieldSetWrapper
                items={items}
                onValueChangeSet={this.onChangeValueSecondaryMobile}
                fieldName="Secondary Mobile Number"
                placeholderText="Enter Mobile"
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
        values.seconday_communications = {
          emails: this.state.secondaryEmail,
          phone_numbers: this.state.secondaryMobile
        };
        httpClient
          .getInstance()
          .post(baseUrl + "/ims/transporter/v1", values)
          .then(res => {
            if (res) {
              this.props.getTableData();
            }
          });
        this.props.AddModal(false);
      } else {
        alert("error on submit");
      }
    });
  };
  private cancelButton = () => {
    this.props.AddModal(false);
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

export default Form.create()(AddModal);
