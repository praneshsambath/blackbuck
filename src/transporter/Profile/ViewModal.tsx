import { Col, Form, Modal, Row } from "antd";
import * as React from "react";

interface IProps {
  viewModal: any;
  visible: boolean;
  dataToDisplay: any;
}
interface IState {
  isEdit: boolean;
}
class ViewModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isEdit: true
    };
  }
  public render() {
    console.log(this.props.dataToDisplay);
    return (
      <Modal
        title="View Transporter"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
        okButtonProps={{ disabled: !this.state.isEdit }}
        cancelButtonProps={{ disabled: !this.state.isEdit }}
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
              <div>
                <h4 className="label">Transporter Code</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.code}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <h4 className="label">Transporter Name</h4>
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
                <h4 className="label">Primary Email ID</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.email}
                </span>
              </div>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <div>
                <h4 className="label">Primary Mobile Number</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.phone}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <h4 className="label">Primary Mobile Number</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.phone}
                </span>
              </div>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <div>
                <h4 className="label">Secondary Email ID</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.seconday_communications.emails.map(
                    (email: any, index: number) => {
                      return (
                        <div key={index}>
                          <div>{email}</div>
                        </div>
                      );
                    }
                  )}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <h4 className="label">Primary Mobile Number</h4>
              </div>
              <div>
                <span className="viewData">
                  {this.props.dataToDisplay.seconday_communications.phone_numbers.map(
                    (mobileNo: any, index: number) => {
                      return (
                        <div key={index}>
                          <div>{mobileNo}</div>
                        </div>
                      );
                    }
                  )}
                </span>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
  private submitButton = (e: any) => {
    this.props.viewModal(false);
  };
  private cancelButton = () => {
    this.props.viewModal(false);
  };
}
export default ViewModal;
