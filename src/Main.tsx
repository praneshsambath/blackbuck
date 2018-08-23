import { Icon, Layout, Menu } from "antd";
import * as React from "react";
import * as reactRouter from "react-router-dom";
import { Link, withRouter } from "react-router-dom";
import { TitleConsignee, TitleConsignor, TitleDashboard, TitleIndents, TitleProduct, TitleTransporter, TitleTruckType, TitleUnAllocatedUnits } from "./common/pageTile";
import Consignee from "./consignee/consignee";
import Consignor from "./consignor/consignor";
import Dashboard from "./dashboard/dashboard";
import Indents from "./indents/indents";
import "./Main.css";
import Product from "./product/product";
import Transporter from "./transporter/transporter";
import TruckType from "./truckType/truckType";
import UnAllocatedUnits from "./unAllocatedUnits/unAllocatedUnits";

const { Header, Sider, Content } = Layout;
const { Route } = reactRouter;

interface IProps {
  history?: any;
  location: any;
}

interface IState {
  collapsed: boolean;
}

class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  public render() {
    const { location } = this.props;
    // console.log(location.pathname)
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
          width={200}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
          >
            <Menu.Item key="/dashboard">
              <Link to="/dashboard">
                <Icon type="appstore" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/indents">
              <Link to="/indents">
                <Icon type="profile" />
                <span>Intends</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/unAllocatedUnits">
              <Link to="/unAllocatedUnits">
                <Icon type="profile" />
                <span>Un Allocated Units</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/consignor">
              <Link to="/consignor">
                <Icon type="contacts" />
                <span>Consignor</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/consignee">
              <Link to="/consignee">
                <Icon type="contacts" />
                <span>Consignee</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/truckType">
              <Link to="truckType">
                <Icon type="car" />
                <span>Truck Type</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/transporter">
              <Link to="/transporter">
                <Icon type="user" />
                <span>Transporter</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to="/product">
                <Icon type="trophy" />
                <span>Product</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: 0,
              position: "fixed",
              width: "100%",
              zIndex: 1
            }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <Route
              path="/transporter"
              exact={true}
              component={TitleTransporter}
            />
            <Route exact={true} path="/consignor" component={TitleConsignor} />
            <Route exact={true} path="/consignee" component={TitleConsignee} />
            <Route exact={true} path="/indents" component={TitleIndents} />
            <Route exact={true} path="/dashboard" component={TitleDashboard} />
            <Route exact={true} path="/truckType" component={TitleTruckType} />
            <Route exact={true} path="/product" component={TitleProduct} />
            <Route exact={true} path="/unAllocatedUnits" component={TitleUnAllocatedUnits} />
          </Header>
          <Content
            style={{
              margin: "88px 24px 24px 24px",
              minHeight: 280
              // overflow: "scroll"
            }}
          >
            <div>
              <Route path="/transporter" exact={true} component={Transporter} />
              <Route path="/consignor" exact={true} component={Consignor} />
              <Route path="/consignee" exact={true} component={Consignee} />
              <Route path="/indents" exact={true} component={Indents} />
              <Route path="/dashboard" exact={true} component={Dashboard} />
              <Route path="/truckType" exact={true} component={TruckType} />
              <Route path="/product" exact={true} component={Product} />
              <Route exact={true} path="/unAllocatedUnits" component={UnAllocatedUnits} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Main);
