import { Col, Form, Input, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import baseUrl from "../../common/baseUrl";
import DynamicFieldSetWrapper from "../../common/dynamicFieldSetWrapper";
import httpClient from "../../Utils/httpClient";
const FormItem = Form.Item;

interface IProps {
  editModal: any;
  visible: boolean;
  form: WrappedFormUtils;
  dataToDisplay: any;
  getTableData:any;
}
interface IState {
  items: [];
  isEdit: boolean;
  secondaryMobile: [];
  secondaryEmail: [];
}
class ViewModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isEdit: true,
      items: [],
      secondaryEmail: [],
      secondaryMobile: []
    };
  }
  public render() {
    console.log(this.props.dataToDisplay[0].id)
    // const { items } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="View Edit Transporter"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
      >
        <Form>
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ paddingBottom: 12 }}
          >
            <Col />
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Transporter Code">
                {getFieldDecorator("code", {
                  initialValue: this.props.dataToDisplay[0].code,
                  rules: [
                    {
                      message: "Transporter Code is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Transporter Code" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Transporter Name">
                {getFieldDecorator("name", {
                  initialValue: this.props.dataToDisplay[0].name,
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
                  initialValue: this.props.dataToDisplay[0].email,
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
                  initialValue: this.props.dataToDisplay[0].phone,
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
                items={this.props.dataToDisplay[0].seconday_communications.emails}
                onValueChangeSet={this.onValueChangeSecondaryEmail}
                fieldName="Secondary Email ID"
                placeholderText="Enter Email"
              />
            </Col>
            <Col span={12}>
              <DynamicFieldSetWrapper
                items={this.props.dataToDisplay[0].seconday_communications.phone_numbers}
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
        .post(baseUrl + " ​/ims/transporter/v1/"+this.props.dataToDisplay[0].id, values)
        .then(res => {
          if (res) {
            this.props.getTableData();
            this.props.editModal(false);
          }
        });
       
    } else {
      alert("error on submit");
    }
  });
  };
  private cancelButton = () => {
    this.props.editModal(false);
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
export default Form.create()(ViewModal);
