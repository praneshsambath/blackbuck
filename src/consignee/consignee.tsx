import { Button, Col, Row, Table } from "antd";
import * as React from "react";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";
// import './transporter.css';
// import { Link } from "react-router-dom";
export interface IRecord {
  id: number;
  name: string;
  state: string;
  city: string;
  subLocation: string;
  latitudeLongitude: string;
}
class Consignee extends React.Component {
  public state = {  
    ConsigneeDeleteModal: false, 
    EditData: {},        
    EditModalVisiblity: false,
    ViewModalVisiblity: false,
    addModalVisiblity: false,    
    data: [],
    // deleteConsigneeModal: false,
    isDelete: true,
    isEdit: true,
    sendDataToViewChild: {},
    
  };
  constructor(props: any) {
    super(props);
  }
  public ViewingRow(row: any) {
    this.setState({
      sendDataToViewChild: row
    });
    this.ViewModal(true);
  }
  public render() {
    const columns = [
      {
        dataIndex: "name",
        key: "name",
        render: (text: any,row: any) => <a onClick={this.ViewingRow.bind(this, row)} href="javascript:;">{text}</a>,
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        title: "Name"
      },
      {
        dataIndex: "id",
        sorter: (a: any, b: any) => a.id - b.id,
        title: "ID"
      },
      {
        dataIndex: "state",
        sorter: (a: any, b: any) => a.state.length - b.state.length,
        title: "State"
      },
      {
        dataIndex: "city",
        sorter: (a: any, b: any) => a.city.length - b.city.length,
        title: "City"
      },
      {
        dataIndex: "subLocation",
        sorter: (a: any, b: any) => a.subLocation.length - b.subLocation.length,
        title: "Sub Location"
      },
      {
        dataIndex: "latitudeLongitude",
        title: "Lat / Long"
      }
    ];
    const data = [
      {
        city: "Bangalore",
        id: "101",
        key: "1",
        latitudeLongitude: (
          <span>
            {85.9586}
            <span style={{ fontWeight: "bolder" }}>&nbsp;/&nbsp;</span>
            {96.4587}
          </span>
        ),
        name: "Merry",
        state: "Andhra Pradesh",
        subLocation: "BTM"
      },
      {
        city: "Mysore",
        id: "102",
        key: "2",
        latitudeLongitude: (
          <span>
            {13.9716}
            <span style={{ fontWeight: "bolder" }}>&nbsp;/&nbsp;</span>
            {67.5946}
          </span>
        ),
        name: "Pretty",
        state: "Karnataka",
        subLocation: "JaiNagar"
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.isEditDeleteVisiblity(selectedRows);
        this.setState({
          EditData: selectedRows
        });
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      }
    };
    return (
      <div>
        <Row type="flex" justify="space-between" align="middle">
          <Col />
          <Col>
            <Button
              type="primary"
              onClick={this.AddModal.bind(this, true)}
              icon="plus"
            >
              Add Consignee
            </Button>
            <Button
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="download"
            />
            <Button
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="upload"
            />
            <Button
              onClick={this.EditModal.bind(this, true)}
              ghost={true}
              disabled={this.state.isEdit}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="edit"
            />
            <Button
              onClick={this.deleteConsigneeModal.bind(this, true)}
              disabled={this.state.isDelete}
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="delete"
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
        />
        {this.state.ConsigneeDeleteModal ? (
          <DeleteModal
            DeleteModal={this.deleteConsigneeModal}
            visible={this.state.ConsigneeDeleteModal}
          />
        ) : null}
        {this.state.ViewModalVisiblity ? (
          <ViewModal
            visible={this.state.ViewModalVisiblity}
            ViewModal={this.ViewModal}
            dataToDisplay={this.state.sendDataToViewChild}
          />
        ) : null}
        {this.state.addModalVisiblity ? (
          <AddModal
            AddModal={this.AddModal}
            visible={this.state.addModalVisiblity}
          />
        ) : null}
        {this.state.EditModalVisiblity ? (
          <EditModal
            dataToDisplay={this.state.EditData}
            EditModal={this.EditModal}
            visible={this.state.EditModalVisiblity}
          />
        ) : null}
      </div>
    );
  }
  
  private isEditDeleteVisiblity = (selectedRows: any[]) => {
    if (selectedRows.length === 1) {
      this.setState({
        isDelete: false,
        isEdit: false
      });
    } else if (selectedRows.length >= 1) {
      this.setState({
        isDelete: false,
        isEdit: true
      });
    } else {
      this.setState({
        isDelete: true,
        isEdit: true
      });
    }
  };
  private deleteConsigneeModal = (isVisible: boolean) => {
    this.setState({
      ConsigneeDeleteModal: isVisible
    });
  };
  private ViewModal = (isVisible: boolean) => {
    this.setState({
      ViewModalVisiblity: isVisible
    });
  };
  private EditModal = (isVisible: boolean) => {
    this.setState({
      EditModalVisiblity: isVisible
    });
  };
  private AddModal = (isVisible: boolean) => {
    this.setState({
      addModalVisiblity: isVisible
    });
  };
}
export default Consignee;
