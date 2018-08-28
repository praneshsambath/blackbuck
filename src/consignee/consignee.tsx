import { Button, Col, Modal, Row, Table } from "antd";
import * as React from "react";
// import './transporter.css';
// import { Link } from "react-router-dom";

class Consignee extends React.Component {
  public state = {
    deleteConsigneeModal: false
  };
  constructor(props: any) {
    super(props);
  }

  public render() {
    const columns = [
      {
        dataIndex: "name",
        key: "name",
        render: (text: any) => <a href="javascript:;">{text}</a>,
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
            <Button type="primary" icon="plus">
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
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="edit"
            />
            <Button
              onClick={this.deleteConsigneeModal}
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
        <Modal
          title="Delete Consignee"
          visible={this.state.deleteConsigneeModal}
          onOk={this.DeleteConsignee}
          onCancel={this.cancelDeleteConsigneeModal}
          okText="Delete"
          okType="primary"
        >
          <b>Are You Sure You want to delete Consignee?</b>
          <br />
          <span>
            Deleting the selected Consignee will remove all the details related
            to the Consignee
          </span>
        </Modal>
      </div>
    );
  }
  private deleteConsigneeModal = () => {
    this.setState({
      deleteConsigneeModal: true
    });
  };
  private DeleteConsignee = () => {
    console.log("delete");
    this.setState({
      deleteConsigneeModal: false
    });
  };
  private cancelDeleteConsigneeModal = () => {
    console.log("cancel");
    this.setState({
      deleteConsigneeModal: false
    });
  };
}
export default Consignee;