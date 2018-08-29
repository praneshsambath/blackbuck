import { Modal } from "antd";
import * as React from "react";
import baseUrl from "../../common/baseUrl";
import httpClient from "../../Utils/httpClient";

interface IProps {
  DeleteModal: any;
  visible: boolean;
  getTableData: any;
  dataToDisplay: any;
}
class DeleteModal extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return (
      <Modal
        title="Delete Transporter"
        visible={this.props.visible}
        onOk={this.DeleteTransporter}
        onCancel={this.cancelDeleteTransporterModal}
        okText="Delete"
        okType="primary"
      >
        <b>Are You Sure You want to delete transporters?</b>
        <br />
        <span>
          Deleting the selected transporters will remove all the details related
          to the transporters
        </span>
      </Modal>
    );
  }
  private DeleteTransporter = (e: any) => {
    e.preventDefault();

    this.props.dataToDisplay.is_active = true;
    httpClient
      .getInstance()
      .post(
        baseUrl + " ​/ims/transporter/v1/" + this.props.dataToDisplay[0].id,
        this.props.dataToDisplay
      )
      .then(res => {
        if (res) {
          this.props.getTableData();
          this.props.DeleteModal(false);
        }
      });
  };
  private cancelDeleteTransporterModal = () => {
    this.props.DeleteModal(false);
  };
}
export default DeleteModal;
