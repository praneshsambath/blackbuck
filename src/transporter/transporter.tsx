import { Button, Col, Row, Table } from "antd";
import * as React from "react";
import "./transporter.css";
// import { Link } from "react-router-dom";

class Transporter extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const columns = [
      {
        dataIndex: "name",
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        title: "Name"
        //   sorter: (a: any, b: any) => a.name - b.name
      },
      {
        dataIndex: "id",
        sorter: (a: any, b: any) => a.id - b.id,
        title: "ID"
      },
      {
        dataIndex: "primary_email_id",
        sorter: (a: any, b: any) => a.primary_email_id.length - b.primary_email_id.length,
        title: "Primary Email ID"
      },
      {
        dataIndex: "primary_mobile_number",
        sorter: (a: any, b: any) =>
        a.primary_mobile_number - b.primary_mobile_number,
        title: "Primary Mobile Number",
      
      }
    ];
    const data = [
      {  id: "101",
        key: "1",
        name: "pranesh",
        primary_email_id: "abcd@eynos.com",
        primary_mobile_number: "963258741"
      },
      {
        id: "102",
        key: "2",
        name: "sampathKumar",
        primary_email_id: "praneshsambath@eynos.com",
        primary_mobile_number: "9876543210"
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
              Add Transporter
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
export default Transporter;
