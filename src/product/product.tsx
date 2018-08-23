import { Button, Col, Row, Table, Tag } from "antd";
import * as React from "react";
// import { Link } from "react-router-dom";

class Product extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const columns = [
      {
        dataIndex: "name",
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        title: "SKU Name"
      },
      {
        dataIndex: "id",
        sorter: (a: any, b: any) => a.id - b.id,
        title: "SKU ID"
      },
      {
        dataIndex: "truckTypePref",
        render:(truckTypePref:any)=>(<span>{truckTypePref.map((truckType:any)=><Tag  key={truckType}>{truckType}</Tag>)}</span>),
        sorter: (a: any, b: any) => a.truckTypePref.length - b.truckTypePref.length,
        title: "Truck Type Preference"
      }
    ];
    const data = [
      {
        id: "101",
        key: "1",
        name: "pranesh",
        truckTypePref: ["T2-16 MT", "T5-25 MT"]
      },
      {
        id: "102",
        key: "2",
        name: "Sampath Kumar",
        truckTypePref: ["T2-32 MT", "T5-54 MT"]
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
              Add Product
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
export default Product;
