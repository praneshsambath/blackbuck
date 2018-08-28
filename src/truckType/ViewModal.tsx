import { Col, Form, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import "./truckType.css";
// const FormItem = Form.Item;
interface IProps {
  visible: boolean;
  ViewModal: any;
  form: WrappedFormUtils;
  dataToDisplay: any;
}
class ViewModal extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    console.log(this.props.dataToDisplay);
    // const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="View Truck Type"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
      >
        <Form>
          <Row gutter={24}>
            <Col span={12}>
              {/* <FormItem label="Consignee ID"> */}
              {/* {getFieldDecorator("ConsigneeID", {
                  // initialValue: "",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Consignee ID" />)}*/}
              <div>
                <h4 className="label">Truk Type ID</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.id}
                </span>
              </div>
              {/* </FormItem> */}
            </Col>
            <Col span={12}>
              {/* <FormItem label="Consignee Name"> */}
              {/*  {getFieldDecorator("name", {
                  initialValue: this.props.dataToDisplay.name,
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Consignee Name" />)} */}
              <div>
                <h4 className="label">Carrying Capacity</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.tonnage}
                </span>
              </div>
              {/* </FormItem> */}
            </Col>
          </Row>
          <br/>
          <Row gutter={24}>
            <Col span={12}>
              {/* <FormItem label="State"> */}
              {/*  {getFieldDecorator("state", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter State" />)}*/}
              <div>
                <h4 className="label">Bpdy Type</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.bodyType}
                </span>
              </div>
              {/* </FormItem> */}
            </Col>
            <Col span={12}>
              {/* <FormItem label="City"> */}
              {/* {getFieldDecorator("city", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter City" />)}*/}
              <div>
                <h4 className="label">Body Length</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.length}
                </span>
              </div>
              {/* </FormItem> */}
            </Col>
          </Row>
          <br />        
          
        </Form>
      </Modal>
    );
  }
  private submitButton = () => {
    this.props.ViewModal(false);
  };
  private cancelButton = () => {
    this.props.ViewModal(false);
  };
}
export default Form.create()(ViewModal);
