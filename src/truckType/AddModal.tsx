/* global google */
// declare const google: any;
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import baseUrl from "../common/baseUrl";
import httpClient from "../Utils/httpClient";
const FormItem = Form.Item;
const Option = Select.Option;
export interface IRecord {
  id: number;
  bodyType: string;
}
interface IProps {
  visible: boolean;
  AddModal: any;
  getTableData:any;  
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
  }
  public componentDidMount() {
    // this.setState({ onSearch : [{id: 1, }];  });
    
    // const googleAutocomplete = document.getElementById("location_name");
    // console.log(googleAutocomplete)
    // const autocomplete = new google.maps.places.Autocomplete(
    //   googleAutocomplete
    // );
    // console.log(googleAutocomplete);
    // autocomplete.addListener("place_changed", this.handlePlaceChange);
    // autocomplete.setComponentRestrictions({ country: ["in"] });
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

        this.setState({ onSearch: search, fetching: false });
      });
  }
  // public googlePlaces() {
  //   const googleAutocomplete = document.getElementById("location_name");
  //   console.log(googleAutocomplete);
  //   const autocomplete = new google.maps.places.Autocomplete(
  //     googleAutocomplete
  //   );
  //   console.log(googleAutocomplete);
  //   autocomplete.addListener("place_changed", this.handlePlaceChange);
  //   autocomplete.setComponentRestrictions({ country: ["in"] });
  // }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Add Truck Type"
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
              <FormItem label="Truck Type ID">
                {getFieldDecorator("truck_type", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Truck Type ID is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Truck Type ID" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Carrying Capacity">
                {getFieldDecorator("tonnage", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
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
                  // initialValue: "NAme",
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
                  placeholder="Select Body Type"
                  optionFilterProp="children"
                  // onChange={this.onTypeSearch}
                  onSelect = {this.onTypeSearch}
                  // onFocus={this.handleFocus}
                  // onBlur={this.handleBlur}
                >
                  {this.state.onSearch.map((statesName: any) => {
                    return (
                      <Option key={statesName.id} value={statesName.name}>
                        {statesName.name}
                      </Option>
                    );
                  })}
                </Select>)}
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
              <FormItem label="Body Length">
                {getFieldDecorator("length", {
                  // initialValue: "NAme",
                  rules: [
                    {
                      message: "Field is required",
                      required: true
                    }
                  ],
                  validateTrigger: ["onChange", "onBlur"]
                })(<Input placeholder="Enter Body Length in Feet" />)}
              </FormItem>
            </Col>
          </Row>
         
        </Form>
      </Modal>
    );
  }
  private onTypeSearch = (value: string) => {
    // this.setState({ onSearch: [], fetching: true });
    console.log(value)
  };

  private handleCustomerChange = (value: any) => {
    console.log(value);
  };
  
  // private handlePlaceChange = (e: any) => {
  //   console.log(e.target.value);
  // };
  private submitButton = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log(values)
        httpClient
          .getInstance()
          .post(baseUrl + "/ims/trucktype/v1/master", values)
          .then(res =>{
            if(res.data.message === "Master truck type added successfully")
            {
              this.props.getTableData();
            }
          });
        this.props.AddModal(false);
      } else {
        console.log("error on submit");
      }
    });
    this.props.AddModal(false);
  };
  private cancelButton = () => {
    this.props.AddModal(false);
  };
}
export default Form.create()(AddModal);
