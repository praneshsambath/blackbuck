import { Col, Form, Input, Modal, Row, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import baseUrl from "../common/baseUrl";
import httpClient from "../Utils/httpClient";
import "./consignor.css";

const FormItem = Form.Item;
const Option = Select.Option;

interface IProps {
  visible: boolean;
  EditModal: any;
  form: WrappedFormUtils;
  dataToDisplay: any;
}

export interface IRecord {
  id: number;
  name: string;
}

interface IState {
  data: [];
  onSearch: [];
}

class EditModal extends React.Component<IProps, IState> {
    public globalVarStates:any =[] 
  constructor(props: IProps) {
    super(props);
    this.state = { data: [], onSearch: [] };
  }

  public componentDidMount() {
    // this.googlePlaces();
    this.searchStates();
  }
  public searchStates() {
    httpClient
      .getInstance()
      .get(baseUrl + "/ims/location/v1/state/search?q=")
      .then(res => {
        const search = res.data.map((w: IRecord) => ({
          id: w.id,
          name: w.name
        }));

        this.setState({ onSearch: search });
      });
  }
  public render() {
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
              <FormItem label="Consignor Code">
                {getFieldDecorator("code", {
                  initialValue: this.props.dataToDisplay[0].code,
                  rules: [
                    {
                      message: "Consignor Code is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Consignor Code" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Consignor Name">
                {getFieldDecorator("name", {
                  initialValue: this.props.dataToDisplay[0].name,
                  rules: [
                    {
                      message: "Consignor Name is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Consignor Name" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="State">
                {getFieldDecorator("state_id", {
                  initialValue: this.props.dataToDisplay[0].state_name,
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <Select
                    showSearch={true}
                    style={{ width: 200 }}
                    placeholder="Select a State"
                    optionFilterProp="children"
                    // onSelect={this.onTypeSearch}
                  >
                    {this.state.onSearch.map((statesName: any) => {
                      return (
                        <Option key={statesName.id} value={statesName.id}>
                          {statesName.name}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            {/* <Col span={12}>
              <FormItem label="Location">
                {getFieldDecorator("location_name", {
                  initialValue: this.props.dataToDisplay[0].state_name,
                  rules: [
                    {
                      message: "Location is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Location" />)}
              </FormItem>
            </Col> */}
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
                {getFieldDecorator("longitude", {
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
        httpClient
          .getInstance()
          .put(
            baseUrl + "/ims/depository/v1/" + this.props.dataToDisplay[0].id,
           values
          )
          .then(res => console.log(res));
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
