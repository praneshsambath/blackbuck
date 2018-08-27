import { Table, Tag } from "antd";
import * as React from "react";
import ViewDisributionRuleModal from "./ViewDisributionRuleModal";

class DistributionRule extends React.Component {
  public state = {
    ViewAndEditModalVisiblity: false
  };

  constructor(props: any) {
    super(props);
  }

  public render() {
    const columns = [
      {
        dataIndex: "name",
        key: "name",
        render: (text: any) => (
          <a
            onClick={this.ViewAndEditModal.bind(this, true)}
            href="javascript:;"
          >
            {text}
          </a>
        ),
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        title: "Name"
      },
      {
        dataIndex: "id",
        sorter: (a: any, b: any) => a.id - b.id,
        title: "ID"
      },
      {
        dataIndex: "source",
        sorter: (a: any, b: any) => a.source - b.source,
        title: "Source"
      },
      {
        dataIndex: "destination",
        sorter: (a: any, b: any) => a.destination.length - b.destination.length,
        title: "Destination"
      },
      {
        dataIndex: "truckType",
        render: (truckTypePref: any) => (
          <span>
            <Tag>{truckTypePref}</Tag>
          </span>
        ),
        title: "Truck Type"
      },
      {
        dataIndex: "sob",
        sorter: (a: any, b: any) => a.sob - b.sob,
        title: "SOB (%)"
      }
    ];
    const data = [
      {
        destination: "Trichy",
        id: "101",
        key: "1",
        name: "pranesh",
        sob: "50",
        source: "500",
        truckType: "T2-16 MT"
      },
      {
        destination: "karur",
        id: "102",
        key: "2",
        name: "Sampath Kumar",
        sob: "60",
        source: "100",
        truckType: "T2-12 MT"
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
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
        />
        {this.state.ViewAndEditModalVisiblity ? (
          <ViewDisributionRuleModal
            visible={this.state.ViewAndEditModalVisiblity}
            AddModal={this.ViewAndEditModal}
          />
        ) : null}
      </div>
    );
  }
  private ViewAndEditModal = (isvisible: boolean, text: any) => {
    this.setState({
      ViewAndEditModalVisiblity: isvisible
    });
    console.log(text);
  };
}
export default DistributionRule;
