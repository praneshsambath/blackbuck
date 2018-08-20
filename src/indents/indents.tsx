import { Avatar,Button, Card,Col, Dropdown, Icon, Layout,List, Menu, Row,Table  } from "antd";
import * as React from "react";
import './indents.css'
const { Header, Sider, Content } = Layout;
class Indents extends React.Component {
    
  public state = {
    collapsed: false
  };

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  public handleMenuClick() {
    // tslint:disable-next-line:no-console
    console.log("hai");
  }
  public onChange(pagination:any, filters:any, sorter:any) {
       // tslint:disable-next-line:no-console
    console.log('params', pagination, filters, sorter);
  }
  public render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );
    const columns = [{
        dataIndex: 'name',
        title: 'Name',
       
        // render: text: => <a href="javascript:;">{text}</a>,
      }, {
        dataIndex: 'age',
        title: 'Age',
      
      }, {
        dataIndex: 'address',
        title: 'Address',
        
      }];
      
      const data = [{
        address: 'New York No. 1 Lake Park',
        age: 32,
        key: '1',
        name: 'John Brown',
      
        
      }, {
        address: 'New York No. 1 Lake Park',
        age: 32,
        key: '2',
        name: 'John Brown',
      
      }, {
        address: 'New York No. 1 Lake Park',
        age: 32,
        key: '3',
        name: 'John Brown',
      
      }, {
        address: 'New York No. 1 Lake Park',
        age: 32,
        key: '4',
        name: 'John Brown',
      
      }];
      
      const rowSelection = {
        onChange: (selectedRowKeys:any, selectedRows:any) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: record => ({
        //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
      
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible={true}
          //   collapsed={this.state.collapsed}
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
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            Indents
          </Header>
          <br />
          <Row type="flex" justify="end" align="middle">
            <Col>
              <Button type="primary" style={{ marginLeft: 12 }}>
                <Icon type="plus" />
                Create Indent
              </Button>
              <Button icon="upload" style={{ marginLeft: 12 }} />
              <Dropdown overlay={menu}>
                <Button icon="download" style={{ marginLeft: 12 }}>
                  <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <div style={{padding:30}}>
          <Row gutter={30}>
      <Col span={6}>
        <Card className="filterContent" bordered={false} style={{width:200,height:100}}>
        <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="profile" />}
              title={<a>756</a>}
              description="All Indents"
            />
          </List.Item>
        </Card>
      </Col>
      <Col span={6}>
        <Card  bordered={false} style={{width:200,height:100}}>
        <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="profile" />}
              title={<a>756</a>}
              description="Defaulted"
            />
            <div>12%</div>
          </List.Item>
        </Card>
      </Col>
      <Col span={6}>
        <Card  bordered={false} style={{width:200,height:100}}>
        <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="profile" />}
              title={<a>756</a>}
              description="Pending"
            />
            <div>20%</div>
          </List.Item>
        </Card>
      </Col>
      <Col span={6}>
        <Card  bordered={false} style={{width:200,height:100}}>
        <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon="profile" />}
              title={<a>756</a>}
              description="Reported"
            />
            <div>40%</div>
          </List.Item>
        </Card>
      </Col>
    </Row>
    </div>
          <Content
            style={{ margin: "24px 16px", padding: 24, background: "#fff",minHeight: 280 }}
          >
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} onChange={this.onChange} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Indents;
