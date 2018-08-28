/* global google */
declare const google: any;
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import baseUrl from "../common/baseUrl";
import httpClient from "../Utils/httpClient";
const FormItem = Form.Item;
const Option = Select.Option;
export interface IRecord {
  id: number;
  name: string;
}
interface IProps {
  visible: boolean;
  AddModal: any;
  form: WrappedFormUtils;
}
interface IState {
  data: any;
  fetching: boolean;
  onSearch: [];
}
class AddModal extends React.Component<IProps, IState> {
  public statesName: any = [];
  constructor(props: IProps) {
    super(props);
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.onTypeSearch = this.onTypeSearch.bind(this);
    this.state = { data: [], fetching: false, onSearch: [] };
    // this.statesName=[]
  }
  public componentDidMount() {
    this.googlePlaces();
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

        this.setState({ onSearch: search, fetching: false });
      });
  }
  public googlePlaces() {
    const googleAutocomplete = document.getElementById("location_name");
    console.log(googleAutocomplete);
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
        title="Add Consignor"
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
              <FormItem label="Consignor Code">
                {getFieldDecorator("code", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Consignor Code is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Consignor Code" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Consignor Name">
                {getFieldDecorator("name", {
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
                {/* {getFieldDecorator("state_name", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(
                  <AutoComplete
                    dataSource={data}
                    style={{ width: 200 }}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="input here"
                  /> */}
                {/* <Select
                  style={{ width: "100%" }}
                  mode="single"
                  placeholder="Select sources"
                  notFoundContent={
                    this.state.fetching ? <Spin size="small" /> : null
                  }
                  filterOption={false}
                  onSearch={this.onTypeSearch}
                  onChange={this.handleCustomerChange}
                >
                  {this.state.onSearch.map((statesName: any) => {
                    return (
                      <Option key={statesName.id} value={statesName.id}>
                        {statesName.name}
                      </Option>
                    );
                  })}
                </Select> */}
                <Select
                  showSearch={true}
                  style={{ width: 200 }}
                  placeholder="Select a State"
                  optionFilterProp="children"
                  // onChange={this.onTypeSearch}
                  onSelect = {this.onTypeSearch}
                  // onFocus={this.handleFocus}
                  // onBlur={this.handleBlur}
                >
                  {this.state.onSearch.map((statesName: any) => {
                    return (
                      <Option key={statesName.id} value={statesName.id}>
                        {statesName.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </Col>
            {/* <Col span={12}>
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
            </Col> */}
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
                })(<Input disabled={true} placeholder="Enter Latitude" />)}
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

  private handleCustomerChange = (value: any) => {
    console.log(value);
  };
  // private onSelect = (value: any) => {
  //   console.log("onSelect", value);
  // };
  private handlePlaceChange = (e: any) => {
    console.log(e.target.value);
  };
  private submitButton = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        httpClient
          .getInstance()
          .put(baseUrl + "/ims/depository/v1", values)
          .then(res => console.log(res));
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
