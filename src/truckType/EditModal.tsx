import { Col, Form, Input, Modal, Row, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import baseUrl from "../common/baseUrl";
import httpClient from "../Utils/httpClient";
import "./truckType.css";
const FormItem = Form.Item;
const Option = Select.Option;
interface IProps {
  visible: boolean;
  EditModal: any;
  getTableData:any;
  form: WrappedFormUtils;
  dataToDisplay: any;
}
export interface IRecord {
  id: number;
  bodyType: string;
}

interface IState {
  data: [];
  fetching: boolean;
  onSearch: [];
}
class EditModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { data: [], fetching: false, onSearch: [] };
  }

  public componentDidMount() {
    // this.googlePlaces();
    this.searchStates();
  }
  public searchStates() {
    httpClient
      .getInstance()
      .get(baseUrl + "/ims/trucktype/v1/master")
      .then(res => {
        const search = res.data.map((w: IRecord) => ({
          id: w.id,
          name: w.bodyType
        }));

        this.setState({ onSearch: search });
      });
  }
  public render() {
    console.log(this.props.dataToDisplay);
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Edit Truck Type"
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
              <FormItem label="Truck Type">
                {getFieldDecorator("truck_type", {
                  initialValue: this.props.dataToDisplay[0].truckType,
                  rules: [
                    {
                      message: "Truck Type ID is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input disabled={true} placeholder="Truck Type" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Carrying Capacity">
                {getFieldDecorator("tonnage", {
                  initialValue: this.props.dataToDisplay[0].tonnage,
                  rules: [
                    {
                      message: "Carrying Capacity is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Carrying Capacity" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Body Type">
                {getFieldDecorator("body_type", {
                  initialValue: this.props.dataToDisplay[0].bodyType,
                  rules: [
                    {
                      message: "Body Type is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Select
                  showSearch={true}
                  style={{ width: 200 }}
                  placeholder="Select Body Type"
                  optionFilterProp="children"
                  onSelect={this.onTypeSearch}
                >
                  {this.state.onSearch.map((statesName: any) => {
                    return (
                      <Option key={statesName.id} value={statesName.bodyType}>
                        {statesName.name}
                      </Option>
                    );
                  })}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Body Length">
                {getFieldDecorator("length", {
                  initialValue: this.props.dataToDisplay[0].length,
                  rules: [
                    {
                      message: "Body Length is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Body Length" />)}
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
            baseUrl + "/ims/trucktype/v1/master/" + this.props.dataToDisplay[0].id,
            values
          )
          .then(res => {
            console.log(res.data)
            if(res.data.message === "Master Truck Type updated successfuly")
            {
              this.props.getTableData();
            }
          });
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
