import { Modal } from "antd";
import * as React from "react";
interface IProps {
  visible: boolean;
  DeleteModal: any;
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
        <b>Are You Sure You want to delete Consignor?</b>
        <br />
        <span>
          Deleting the selected Consignor will remove all the details related
          to the Consignor
        </span>
      </Modal>
    );
  }
  private submitButton = () => {
    this.props.DeleteModal(false);
  };
  private cancelButton = () => {
    this.props.DeleteModal(false);
  };
}
export default DeleteModal;
