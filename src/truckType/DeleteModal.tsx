import { Modal } from "antd";
import * as React from "react";
import baseUrl from "../common/baseUrl";
import httpClient from "../Utils/httpClient";
interface IProps {
  visible: boolean;
  DeleteModal: any;
  dataToDelete: any;
  getTableData:any;
}
class DeleteModal extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return (
      <Modal
        title="Delete Truck Type"
        visible={this.props.visible}
        onOk={this.submitButton}
        onCancel={this.cancelButton}
        okText="Ok"
        okType="primary"
      >
        <b>Are You Sure You want to delete Truck Type?</b>
        <br />
        <span>
          Deleting the selected Truck Type will remove all the details related
          to the Truck Type
        </span>
      </Modal>
    );
  }
  private submitButton = () => {
    // this.props.dataToDelete[0].is_active = true;
    console.log(this.props.dataToDelete[0]);
    httpClient
      .getInstance()
      .put(
        baseUrl + "/ims/trucktype/v1/master/" + this.props.dataToDelete[0].id,
        this.props.dataToDelete[0]
      )
      .then((res:any) =>{
        if(res.data.message)
            {
              this.props.getTableData();
            }
      });
    this.props.DeleteModal(false);
  };
  private cancelButton = () => {
    this.props.DeleteModal(false);
  };
}
export default DeleteModal;
