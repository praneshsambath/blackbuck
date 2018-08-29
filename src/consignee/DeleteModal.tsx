import { Modal } from "antd";
import * as React from "react";
import baseUrl from "../common/baseUrl";
import httpClient from "../Utils/httpClient";
interface IProps {
  visible: boolean;
  DeleteModal: any;
  dataToDelete: any;
}
class DeleteModal extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return (
      <Modal
        title="View Edit Transporter"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
      >
        <b>Are You Sure You want to delete Consignee?</b>
        <br />
        <span>
          Deleting the selected Consignee will remove all the details related to
          the Consignee
        </span>
      </Modal>
    );
  }
  private submitButton = () => {
    this.props.dataToDelete[0].is_active = true;
    console.log(this.props.dataToDelete);
    httpClient
      .getInstance()
      .put(
        baseUrl + "/ims/depository/v1/" + this.props.dataToDelete[0].id,
        this.props.dataToDelete[0]
      )
      .then((res: any) => console.log(res));
    this.props.DeleteModal(false);
  };
  private cancelButton = () => {
    this.props.DeleteModal(false);
  };
}
export default DeleteModal;
