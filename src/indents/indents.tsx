import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Icon,
  Layout,
  List,
  Menu,
  Row,
  Table
} from "antd";
import * as React from "react";
import "./indents.css";

const { Header, Sider, Content } = Layout;
class Indents extends React.Component {
  public state = {
    collapsed: false,
    activeCard: false
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
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );

    const columns = [
      {
        title: "Indent ID",
        dataIndex: "indentId",
        sorter: (a: any, b: any) => a.indentId - b.indentId
      },
      {
        title: "Indent Date",
        dataIndex: "indentDate",
        sorter: (a: any, b: any) => a.indentDate - b.indentDate
      },
      {
        title: "Expiry Date",
        dataIndex: "expiryDate",
        sorter: (a: any, b: any) => a.expiryDate - b.expiryDate
      },
      {
        title: "From",
        dataIndex: "from",
        filters: [
          { text: "Tiruppur", value: "Tiruppur" },
          { text: "Coimbatore", value: "Coimbatore" },
          { text: "Pune", value: "Pune" }
        ],
        onFilter: (value: any, record: any) => record.from.indexOf(value) === 0
        // sorter: (a: any, b: any) => a.indentId.length - b.indentId.length},
      },
      {
        title: "To",
        dataIndex: "to",
        filters: [
          { text: "Bangalore", value: "Bangalore" },
          { text: "Mysore", value: "Mysore" }
        ],
        onFilter: (value: any, record: any) => record.to.indexOf(value) === 0
        // sorter: (a: any, b: any) => a.indentId.length - b.indentId.length},
      },
      {
        title: "Truck Type",
        dataIndex: "truckType",
        sorter: (a: any, b: any) => a.truckType - b.truckType
      },
      {
        title: "Transporter",
        dataIndex: "transporter",
        filters: [
          { text: "Zinka", value: "Zinka" },
          { text: "Mesley", value: "Mesley" },
          { text: "Arnav", value: "Arnav" }
        ],
        onFilter: (value: any, record: any) => record.transporter.indexOf(value) === 0
      }
    ];

    const data = [
      {
        key: "1",
        indentId: "10",
        indentDate: "22/08/2018",
        expiryDate: "23/08/2018",
        from: "Coimbatore",
        to: "Bangalore",
        truckType: "16",
        transporter: "Zinka"
      },
      {
        key: "2",
        indentId: "11",
        indentDate: "23/08/2018",
        expiryDate: "24/08/2018",
        from: "Tiruppur",
        to: "Bangalore",
        truckType: "58",
        transporter: "Mesley"
      },
      {
        key: "3",
        indentId: "12",
        indentDate: "25/08/2018",
        expiryDate: "26/08/2018",
        from: "Pune",
        to: "Mysore",
        truckType: "96",
        transporter: "Aranav"
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
      <Layout>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 4 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
              style={{fontSize:20}}
            />
           <span style={{fontSize:20}}> Indents </span>
          </Header>
          <div style={{ paddingTop: 20 }}>
            <Row type="flex" justify="end" align="middle">
              <Col>
                <Button type="primary" style={{ marginLeft: 12 }}>
                  <Icon type="plus" />
                  Create Indent
                </Button>
                <Button ghost={true} type="primary" icon="upload" style={{ marginLeft: 12 }} />
                <Dropdown  overlay={menu}>
                  <Button ghost={true} type="primary" icon="download" style={{ marginLeft: 12 }}>
                    <Icon type="down" />
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          </div>
          <div
            className="filterContent"
            style={{ padding: "15px 0px 15px 15px" }}
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
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            <Table
              rowSelection={rowSelection}
              dataSource={data}
              columns={columns}
              onChange={this.onChange}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Indents;
