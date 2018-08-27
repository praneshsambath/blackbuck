import { Button, Col, Row, Table } from "antd";
import * as React from "react";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import ViewEditModal from "./ViewEditModal";

class Consignor extends React.Component {
  public state = {
    addModalVisiblity: false,
    consignorDeleteModal: false,
    viewEditModalVisiblity: false
  };
  constructor(props: any) {
    super(props);
  }

  public render() {
    const columns = [
      {
        dataIndex: "name",
        key: "name",
        render: (text: any) => (
          <a onClick={this.ViewEditModal.bind(this, true)} href="javascript:;">
            {text}
          </a>
        ),
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
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="edit"
            />
            <Button
              onClick={this.deleteConsignorModal.bind(this, true)}
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
        {this.state.consignorDeleteModal ? (
          <DeleteModal
            DeleteModal={this.deleteConsignorModal}
            visible={this.state.consignorDeleteModal}
          />
        ) : null}
        {this.state.viewEditModalVisiblity ? (
          <ViewEditModal
            visible={this.state.viewEditModalVisiblity}
            viewEditModal={this.ViewEditModal}
          />
        ) : null}
        {this.state.addModalVisiblity ? (
          <AddModal
            AddModal={this.AddModal}
            visible={this.state.addModalVisiblity}
          />
        ) : null}
      </div>
    );
  }
  private deleteConsignorModal = (isVisible: boolean) => {
    this.setState({
      consignorDeleteModal: isVisible
    });
  };
  private ViewEditModal = (isVisible: boolean) => {
    this.setState({
      viewEditModalVisiblity: isVisible
    });
  };
  private AddModal = (isVisible: boolean) => {
    this.setState({
      addModalVisiblity: isVisible
    });
  };
}
export default Consignor;
