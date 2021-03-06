import { Col, Form, Input, Modal, Row, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import baseUrl from "../common/baseUrl";
import httpClient from "../Utils/httpClient";
import "./consignee.css";
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
  fetching: boolean;
  onSearch: [];
}
class EditModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
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
    console.log(this.props.dataToDisplay);
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Edit Consignee"
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
                })(<Select
                  showSearch={true}
                  style={{ width: 200 }}
                  placeholder="Select a State"
                  optionFilterProp="children"
                  onSelect={this.onTypeSearch}
                >
                  {this.state.onSearch.map((statesName: any) => {
                    return (
                      <Option key={statesName.id} value={statesName.id}>
                        {statesName.name}
                      </Option>
                    );
                  })}
                </Select>)}
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

  private onTypeSearch = (value: string) => {
    this.setState({ onSearch: [], fetching: true });
  };
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
        console.log('res')
      }
    });
    this.props.EditModal(false);
  };
  private cancelButton = () => {
    this.props.EditModal(false);
  };
}
export default Form.create()(EditModal);
