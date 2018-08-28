import { Button, Col, Row, Table } from "antd";
import * as React from "react";
import baseUrl from "./../common/baseUrl";
import httpClient from "./../Utils/httpClient";
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

class TruckType extends React.Component {
  public state = {

    EditData: {},
    EditModalVisiblity: false,
    ViewModalVisiblity: false,
    addModalVisiblity: false,
    data: [],
    // deletetrucktypeModal: false,
    isDelete: true,
    isEdit: true,
    sendDataToViewChild: {},
    trucktypeDeleteModal: false,

  };
  constructor(props: any) {
    super(props);
    this.getTableData = this.getTableData.bind(this)
  }
  public getTableData() {
    httpClient
      .getInstance()
      .get(baseUrl + "/ims/trucktype/v1/master")
      .then(
        res => res.data.map((r: IRecord) => ({ key: r.id, ...r }))
      )
      .then((data: IRecord) => this.setState({ data }));
  }
  public componentDidMount() {
    this.getTableData();
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
        dataIndex: "truckType",
        key: "id",
        render: (text: any, row: any) => <a onClick={this.ViewingRow.bind(this, row)} href="javascript:;">{text}</a>,
        sorter: (a: any, b: any) => a.id - b.id,
        title: "Truck Type"
      },
      {
        dataIndex: "tonnage",
        sorter: (a: any, b: any) => a.capacity - b.capacity,
        title: "Carrying Capacity (MT)"
      },
      {
        dataIndex: "bodyType",
        sorter: (a: any, b: any) => a.bodyType.length - b.bodyType.length,
        title: "Body Type"
      },
      {
        dataIndex: "length",
        sorter: (a: any, b: any) => a.bodyLength - b.bodyLength,
        title: "Body Length (Feet)"
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
              Add trucktype
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
              onClick={this.deletetrucktypeModal.bind(this, true)}
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
          dataSource={this.state.data}
          rowSelection={rowSelection}
        />
        {this.state.trucktypeDeleteModal ? (
          <DeleteModal
            DeleteModal={this.deletetrucktypeModal}
            visible={this.state.trucktypeDeleteModal}
            dataToDelete={this.state.EditData}
            getTableData={this.getTableData}
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
            getTableData={this.getTableData}
          />
        ) : null}
        {this.state.EditModalVisiblity ? (
          <EditModal
            dataToDisplay={this.state.EditData}
            EditModal={this.EditModal}
            visible={this.state.EditModalVisiblity}
            getTableData={this.getTableData}
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
  private deletetrucktypeModal = (isVisible: boolean) => {
    this.setState({
      trucktypeDeleteModal: isVisible
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
export default TruckType;
