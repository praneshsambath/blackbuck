import { Modal } from 'antd';
import * as React from 'react';
interface IProps{
    visible:boolean,
    viewEditModal:any,
}
class ViewEditModal extends React.Component<IProps>
{
    constructor(props:IProps)
    {
        super(props)
    }
    public render()
    {
        return(
            <Modal
            title="View Edit Transporter"
            visible={this.props.visible}
            onOk={this.submitButton}
            onCancel={this.cancelButton}
            okText="Ok"
            okType="primary"
          >
<p>HAI</p>
          </Modal>
        );
    }
    private submitButton=()=>{
      this.props.viewEditModal(false);
    }
    private cancelButton=()=>{
        this.props.viewEditModal(false);
    }
}
export default ViewEditModal;