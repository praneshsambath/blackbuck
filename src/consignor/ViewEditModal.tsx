import { Col, Form, Input, Modal, Row } from 'antd';
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from 'react';
const FormItem = Form.Item;
interface IProps{
    visible:boolean,
    viewEditModal:any,
    form: WrappedFormUtils;

}
class ViewEditModal extends React.Component<IProps>
{
    constructor(props:IProps)
    {
        super(props)
    }
    public render()
    {
        const { getFieldDecorator } = this.props.form;
        return(
            <Modal
            title="View Edit Transporter"
            visible={this.props.visible}
            style={{ top: 20 }}
            onOk={this.submitButton}
            onCancel={this.cancelButton}
            okText="Ok"
            okType="primary"
          >
 <Form>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Consignor ID">
                {getFieldDecorator("consignorID", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Consignor ID" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Consignor Name">
                {getFieldDecorator("consignorName", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Consignor Name" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="State">
                {getFieldDecorator("state", {
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
              <FormItem label="City">
                {getFieldDecorator("city", {
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
                {getFieldDecorator("subLocation", {
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
                {getFieldDecorator("logitude", {
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
    private submitButton=()=>{
      this.props.viewEditModal(false);
    }
    private cancelButton=()=>{
        this.props.viewEditModal(false);
    }
}
export default Form.create()(ViewEditModal);