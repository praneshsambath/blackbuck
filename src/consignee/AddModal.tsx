/* global google */
declare const google: any;
import { Col, Form, Input, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
const FormItem = Form.Item;
interface IProps {
  visible: boolean;
  AddModal: any;
  form: WrappedFormUtils;
}
class AddModal extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public componentDidMount() {
    const googleAutocomplete = document.getElementById("location_name");
    console.log(googleAutocomplete)
    const autocomplete = new google.maps.places.Autocomplete(
      googleAutocomplete
    );
    console.log(googleAutocomplete);
    autocomplete.addListener("place_changed", this.handlePlaceChange);
    autocomplete.setComponentRestrictions({ country: ["in"] });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Add Consignee"
        style={{ top: 20 }}
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="ADD"
        okType="primary"
      >
        <Form>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Consignee Code">
                {getFieldDecorator("code", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Consignee Code is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Consignee Code" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Consignee Name">
                {getFieldDecorator("name", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
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
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter State" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Location">
                {getFieldDecorator("location_name", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter City" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Sub Location">
                {getFieldDecorator("sublocation_name", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Sub Location" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Latitude">
                {getFieldDecorator("latitude", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Latitude" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Longitude">
                {getFieldDecorator("longitude", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Longitude" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
  private handlePlaceChange = (e: any) => {
    console.log(e.target.value);
  };
  private submitButton = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log(values);
        this.props.AddModal(false);
      } else {
        alert("error on submit");
      }
    });
    this.props.AddModal(false);
  };
  private cancelButton = () => {
    this.props.AddModal(false);
  };
}
export default Form.create()(AddModal);
