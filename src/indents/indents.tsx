import { Avatar, Button, Card, Col, List, Modal, Row, Table } from "antd";
import * as React from "react";
import "./indents.css";

class Indents extends React.Component {
  public state = {
    activeCard: false,
    collapsed: false,
    indentDeleteModal:false,
  };

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  public handleMenuClick(e: any) {
    console.log(e);
  }
  public onChange(pagination: any, filters: any, sorter: any) {
    console.log("params", pagination, filters, sorter);
  }
  public onActiveFilter = (e: any) => {
    console.log(document.getElementById("allIndents"));
    this.setState({
      activeCard: !this.state.activeCard
    });
  };
  public render() {
    const columns = [
      {
        dataIndex: "indentId",
        sorter: (a: any, b: any) => a.indentId - b.indentId,
        title: "Indent ID"
      },
      {
        dataIndex: "indentDate",
        sorter: (a: any, b: any) => a.indentDate.length - b.indentDate.length,
        title: "Indent Date"
      },
      {
        dataIndex: "expiryDate",
        sorter: (a: any, b: any) => a.expiryDate - b.expiryDate,
        title: "Expiry Date"
      },
      {
        dataIndex: "from",
        filters: [
          { text: "Tiruppur", value: "Tiruppur" },
          { text: "Coimbatore", value: "Coimbatore" },
          { text: "Pune", value: "Pune" }
        ],
        onFilter: (value: any, record: any) => record.from.indexOf(value) === 0,
        // sorter: (a: any, b: any) => a.indentId.length - b.indentId.length},
        title: "From"
      },
      {
        dataIndex: "to",
        filters: [
          { text: "Bangalore", value: "Bangalore" },
          { text: "Mysore", value: "Mysore" }
        ],
        onFilter: (value: any, record: any) => record.to.indexOf(value) === 0,
        // sorter: (a: any, b: any) => a.indentId.length - b.indentId.length},
        title: "To"
      },
      {
        dataIndex: "truckType",
        sorter: (a: any, b: any) => a.truckType - b.truckType,
        title: "Truck Type"
      },
      {
        dataIndex: "transporter",
        filters: [
          { text: "Zinka", value: "Zinka" },
          { text: "Mesley", value: "Mesley" },
          { text: "Arnav", value: "Arnav" }
        ],
        onFilter: (value: any, record: any) =>
          record.transporter.indexOf(value) === 0,

        title: "Transporter"
      }
    ];

    const data = [
      {
        expiryDate: "23/08/2018",
        from: "Coimbatore",
        indentDate: "22/08/2018",
        indentId: "101",
        key: "1",
        to: "Bangalore",
        transporter: "Zinka",
        truckType: "16"
      },
      {
        expiryDate: "24/08/2018",
        from: "Coimbatore",
        indentDate: "23/08/2018",
        indentId: "102",
        key: "2",
        to: "Bangalore",
        transporter: "Zinka",
        truckType: "16"
      },
      {
        expiryDate: "25/08/2018",
        from: "Coimbatore",
        indentDate: "24/08/2018",
        indentId: "103",
        key: "3",
        to: "Chennai",
        transporter: "Ching Yang",
        truckType: "98"
      },
      {
        expiryDate: "26/08/2018",
        from: "Chennai",
        indentDate: "25/08/2018",
        indentId: "104",
        key: "4",
        to: "Bangalore",
        transporter: "Merley",
        truckType: "25"
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
              Add Indents
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
            onClick={this.DeleteTransporterModal}
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="delete"
            />
          </Col>
        </Row>
        <div
          className="filterContent"
          style={{ padding: "15px 0px 15px 0px" }}
        >
          <Row onClick={this.onActiveFilter} gutter={16}>
            <Col span={4}>
              <Card id="allIndents" bordered={false}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar className="listAvatar" icon="profile" />}
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">All Indents</span>
                    }
                  />
                </List.Item>
              </Card>
              {this.state.activeCard ? (
                <hr style={{ position: "absolute", top: 40 }} />
              ) : null}
              {/* <hr  /> */}
            </Col>
            <Col span={4}>
              <Card bordered={false}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar className="listAvatar" icon="profile" />}
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">Defaulted</span>
                    }
                  />
                  <span className="listPercent">20%</span>
                </List.Item>
              </Card>
            </Col>
            <Col span={4}>
              <Card bordered={false}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar className="listAvatar" icon="profile" />}
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">Defaulted</span>
                    }
                  />
                  <span className="listPercent">20%</span>
                </List.Item>
              </Card>
            </Col>
            <Col span={4}>
              <Card bordered={false}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar className="listAvatar" icon="profile" />}
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">Defaulted</span>
                    }
                  />
                  <span className="listPercent">20%</span>
                </List.Item>
              </Card>
            </Col>
            <Col span={4}>
              <Card bordered={false}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar className="listAvatar" icon="profile" />}
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">Defaulted</span>
                    }
                  />
                  <span className="listPercent">20%</span>
                </List.Item>
              </Card>
            </Col>
          </Row>
        </div>

        <Table
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          onChange={this.onChange}
        />
        <Modal
          title="Delete Indents"
    
          visible={this.state.indentDeleteModal}
          onOk={this.DeleteIndents}
          onCancel={this.cancelDeleteIndentsModal}
          okText ="Delete"
          okType="primary"
        >
         <b>Are You Sure You want to delete Indents?</b>
         <br/>
         <span>Deleting the selected Indents will remove all the  details related to the Indents</span>
        </Modal>
      </div>
    );
  }
  private DeleteTransporterModal= () => {
    this.setState({
      indentDeleteModal: true
    });
  }
  private DeleteIndents=()=>
  {
    console.log("delete")
    this.setState({
      indentDeleteModal: false
    });
  }
  private cancelDeleteIndentsModal=()=>
  {
    console.log("cancel")
    this.setState({
      indentDeleteModal: false
    });
  }
}

export default Indents;
