import { Button, Col, Row, Table } from "antd";
import * as React from "react";
import baseUrl from "./../common/baseUrl";
import httpClient from "./../Utils/httpClient";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import ViewModal from "./ViewModal";
export interface IRecord {
  id: number;
  name: string;
  state: string;
  city: string;
  subLocation: string;
  latitudeLongitude: string;
}
class Consignor extends React.Component {
  public state = {
    EditData: {},
    EditModalVisiblity: false,
    ViewModalVisiblity: false,
    addModalVisiblity: false,
    consignorDeleteModal: false,
    data: [],
    isDelete: true,
    isEdit: true,
    sendDataToViewChild: {}
  };
  constructor(props: any) {
    super(props);
  }
  public componentDidMount() {
    httpClient
      .getInstance()
      .get(baseUrl + "/ims/depository/v1?depositoryType=CONSIGNOR")
      .then(
        res => res.data.map((r: IRecord) => ({ key: r.id, ...r }))
        // console.log({ key: r.id, r })
      )
      .then((data: IRecord) => this.setState({ data }));
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
        render: (text: any, row: any, index: any) => (
          <a onClick={this.ViewingRow.bind(this, row)} href="javascript:;">
            {text}
          </a>
        ),
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        title: "Name"
      },
      {
        dataIndex: "code",
        sorter: (a: any, b: any) => a.id - b.id,
        title: "Code"
      },
      {
        dataIndex: "state_name",
        sorter: (a: any, b: any) => a.state_name.length - b.state_name.length,
        title: "State"
      },
      {
        dataIndex: "location_name",
        sorter: (a: any, b: any) =>
          a.location_name.length - b.location_name.length,
        title: "Location"
      },
      {
        dataIndex: "sublocation_name",
        sorter: (a: any, b: any) =>
          a.sublocation_name.length - b.sublocation_name.length,
        title: "Sub Location"
      },
      {
        dataIndex: "latitude",
        title: "Latitude"
      },
      {
        dataIndex: "longitude",
        title: "Longitude"
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
              Add Consignor
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
              onClick={this.deleteConsignorModal.bind(this, true)}
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
        {this.state.consignorDeleteModal ? (
          <DeleteModal
            DeleteModal={this.deleteConsignorModal}
            visible={this.state.consignorDeleteModal}
            dataToDelete={this.state.EditData}
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
  private deleteConsignorModal = (isVisible: boolean) => {
    this.setState({
      consignorDeleteModal: isVisible
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
export default Consignor;
