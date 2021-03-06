import { Col, Form, Modal, Row } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import "./consignor.css";
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
    return (
      <Modal
        title="View Modal"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
      >
        <Form>
          <Row gutter={24}>
            <Col span={12}>
              <div>
                <h4 className="label">Consignor Code</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.code}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <h4 className="label">Consignor Name</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.name}
                </span>
              </div>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <div>
                <h4 className="label">State</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.state_name}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <h4 className="label">Location</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.location_name}
                </span>
              </div>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <div>
                <h4 className="label">Sub Location</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.sublocation_name}
                </span>
              </div>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <div>
                <h4 className="label">Latitude</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.latitude}
                </span>
              </div>
              ]
            </Col>
            <Col span={12}>
              <div>
                <h4 className="label">Longitude</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.longitude}
                </span>
              </div>
            </Col>
          </Row>
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
