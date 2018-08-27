import { Avatar, Button, Card, Col, List, Row, Table } from "antd";
import * as React from "react";
import AddIndentModal from "./AddIndent";
import DeleteModal from "./DeleteModal";
import "./indents.css";
import ViewEditModal from "./ViewEditModal";
// import {Link} from'react-router-dom';
class Indents extends React.Component {
  public state = {
    activeCard: false,
    addModalVisiblity: false,
    filteredInfo: null,
    indentDeleteModal: false,
    isDelete: true,
    sortedInfo: {
      columnKey: Object.create(null),
      order: Object.create(null)
    },
    viewEditModalVisiblity: false
  };
  constructor(props: any) {
    super(props);
    localStorage.setItem(
      "sessionKey",
      "b1c2893b5186e60d7451177ddd38789a27fcbe8c"
    );
  }
  public handleMenuClick(e: any) {
    console.log(e);
  }
  public onChange = (pagination: any, filters: any, sorter: any) => {
    console.log("params", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };
  public sortDefaulted = () => {
    this.setState({
      activeCard: true,
      sortedInfo: {
        columnKey: "indentId",
        order: "descend"
      }
    });
  };
  public render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || Object.create(null);
    filteredInfo = filteredInfo || Object.create(null);
    const columns = [
      {
        dataIndex: "indentId",
        key: "indentId",
        render: (text: any) => (
          <a href="javascript:;" onClick={this.ViewEditModal.bind(this, true)}>
            {text}
          </a>
        ),
        sortOrder: sortedInfo!.columnKey === "indentId" && sortedInfo.order,
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
      },
      {
        dataIndex: "status",
        filters: [
          { text: "confirmed", value: "confirmed" },
          { text: "Pending", value: "Pending" },
          { text: "Reported", value: "Reported" },
          { text: "Defaulted", value: "Defaulted" }
        ],
        onFilter: (value: any, record: any) =>
          record.status.indexOf(value) === 0,
        render: (text: any) =>
          text === "confirmed" ? (
            <span style={{ color: "#5FB2FF" }}>{text}</span>
          ) : text === "Pending" ? (
            <span style={{ color: "#F2C994" }}>{text}</span>
          ) : text === "Reported" ? (
            <span style={{ color: "#A3DBB9" }}>{text}</span>
          ) : text === "Defaulted" ? (
            <span style={{ color: "#DC7F97" }}>{text}</span>
          ) : null,
        title: "Status"
      }
    ];

    const data = [
      {
        expiryDate: "23/08/2018",
        from: "Coimbatore",
        indentDate: "22/08/2018",
        indentId: "101",
        key: "1",
        status: "confirmed",
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
        status: "Pending",
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
        status: "Defaulted",
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
        status: "Reported",
        to: "Bangalore",
        transporter: "Merley",
        truckType: "25"
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.isVisibleDelete(selectedRows);
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
              onClick={this.addModal.bind(this, true)}
              icon="plus"
            >
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
              disabled={this.state.isDelete}
              onClick={this.DeleteTransporterModal.bind(this, true)}
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="delete"
            />
          </Col>
        </Row>
        <div className="filterContent" style={{ padding: "15px 0px 15px 0px" }}>
          <Row gutter={16}>
            <Col span={4}>
              <Card bordered={false}>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        className="listAvatar"
                        icon="profile"
                        style={{
                          backgroundColor: "#f0f2f5",
                          color: "#878788",
                          fontSize: "24px"
                        }}
                      />
                    }
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">All Indents</span>
                    }
                  />
                </List.Item>
              </Card>
            </Col>
            <Col span={4}>
              <Card
                bordered={false}
                onClick={this.sortDefaulted}
                className={this.state.activeCard ? "active" : "inactive"}
              >
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        className="listAvatar"
                        style={{
                          backgroundColor: "#F0F2F5",
                          color: "#85B5E5",
                          fontSize: "24px"
                        }}
                        icon="profile"
                      />
                    }
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">Confirmed</span>
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
                    avatar={
                      <Avatar
                        className="listAvatar"
                        style={{
                          backgroundColor: "#EAF6F0",
                          color: "#7ECD9D",
                          fontSize: "24px"
                        }}
                        icon="check"
                      />
                    }
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">Reported</span>
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
                    avatar={
                      <Avatar
                        className="listAvatar"
                        style={{
                          backgroundColor: "#FFE9CB",
                          color: "#ECB062",
                          fontSize: "24px"
                        }}
                        icon="warning"
                      />
                    }
                    title={<span className="listTitle">756</span>}
                    description={
                      <span className="listDescription">Pending</span>
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
                    avatar={
                      <Avatar
                        className="listAvatar"
                        style={{
                          backgroundColor: "#F8EBEA",
                          color: "#CC486A",
                          fontSize: "24px"
                        }}
                        icon="close"
                      />
                    }
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
        {this.state.indentDeleteModal ? (
          <DeleteModal
            DeleteModal={this.DeleteTransporterModal}
            visible={this.state.indentDeleteModal}
          />
        ) : null}
        {this.state.viewEditModalVisiblity ? (
          <ViewEditModal
            visible={this.state.viewEditModalVisiblity}
            viewEditModal={this.ViewEditModal}
          />
        ) : null}
        {this.state.addModalVisiblity ? (
          <AddIndentModal
            AddIndentModal={this.addModal}
            visible={this.state.addModalVisiblity}
          />
        ) : null}
      </div>
    );
  }
  private addModal = (isVisible: boolean) => {
    this.setState({
      addModalVisiblity: isVisible
    });
  };
  private ViewEditModal = (isVisible: boolean) => {
    this.setState({
      viewEditModalVisiblity: isVisible
    });
  };
  private isVisibleDelete = (selectedRows: []) => {
    if (selectedRows.length > 0) {
      this.setState({
        isDelete: false
      });
    } else {
      this.setState({
        isDelete: true
      });
    }
  };
  private DeleteTransporterModal = (isVisible: boolean) => {
    this.setState({
      indentDeleteModal: isVisible
    });
  };
}

export default Indents;
