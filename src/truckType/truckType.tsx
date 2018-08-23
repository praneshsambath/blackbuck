import { Button, Col, Row, Table } from "antd";
import * as React from "react";
// import './transporter.css';
// import { Link } from "react-router-dom";

class TruckType extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const columns = [
      // {
      //   dataIndex: "name",
      //   sorter: (a: any, b: any) => a.name.length - b.name.length,
      //   title: "Name"
      // },
      {
        dataIndex: "id",
        sorter: (a: any, b: any) => a.id - b.id,
        title: "ID"
      },
      {
        dataIndex: "capacity",
        sorter: (a: any, b: any) => a.capacity - b.capacity,
        title: "Carrying Capacity (MT)"
      },
      {
        dataIndex: "bodyType",
        sorter: (a: any, b: any) => a.bodyType.length - b.bodyType.length,
        title: "Body Type"
      },
      {
        dataIndex: "bodyLength",
        sorter: (a: any, b: any) => a.bodyLength - b.bodyLength,
        title: "Body Length (Feet)"
      }
    ];
    const data = [
      {
        bodyLength: "500",
        bodyType: "Half-body",
        capacity: "2",
        id: "1001"
      },
      {
        bodyLength: "600",
        bodyType: "Full-body",
        capacity: "6",
        id: "1002"
      },
      {
        bodyLength: "700",
        bodyType: "Full-body",
        capacity: "7",
        id: "1003"
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
              Add Truck Type
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
      </div>
    );
  }
}
export default TruckType;
