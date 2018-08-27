import { Tabs } from "antd";
import * as React from "react";
import DistributionRule from "./DistributionRule/DistributionRule";
import Profile from "./Profile/Profile";
const TabPane = Tabs.TabPane;
class Transporter extends React.Component {
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Profile" key="1">
          <Profile />
        </TabPane>
        <TabPane tab="Distribution Rule" key="2">
          <DistributionRule />
        </TabPane>
      </Tabs>
    );
  }
  private callback(key: any) {
    console.log(key);
  }
}
export default Transporter;
