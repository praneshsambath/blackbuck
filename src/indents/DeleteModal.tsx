import { Modal } from "antd";
import * as React from "react";

interface IProps {
  DeleteModal: any;
  visible: boolean;
}
class DeleteModal extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return (
      <Modal
        title="Deactivate Transporter"
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
  private DeleteTransporter = () => {
    this.props.DeleteModal(false);
  };
  private cancelDeleteTransporterModal = () => {
    this.props.DeleteModal(false);
  };
}
export default DeleteModal;
