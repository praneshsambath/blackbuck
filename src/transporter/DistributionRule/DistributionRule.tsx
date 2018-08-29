import { Table, Tag } from "antd";
import * as React from "react";
import ViewDisributionRuleModal from "./ViewDisributionRuleModal";

// interface IRecord {
//   source_sublocation_name: string;
//   source_location_name: string;
//   source_state_name: string;
//   destination_sublocation_name: string;
//   destination_location_name: string;
//   destination_state_name: string;
//   business_share: number;
//   transporter_name: string;
//   truck_type: "T2";
//   start_date: any;
//   end_date: any;
// }

class DistributionRule extends React.Component {
  public state = {
    ViewAndEditModalVisiblity: false
  };

  constructor(props: any) {
    super(props);
  }
  public componentDidMount() {
    this.getTableData();
  }
  public getTableData() {
    // httpClient
    //   .getInstance()
    //   .get(baseUrl + " /ims/distribution/v1")
    //   .then(res =>
    //     res.data.distribution.map((r: IRecord) => ({ key: r.id, ...r }))
    //   )
    //   .then((data: IRecord) => this.setState({ data }));
    console.log("asd")
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
    // const rowSelection = {
    //   onChange: (selectedRowKeys: any, selectedRows: any) => {
    //     console.log(
    //       `selectedRowKeys: ${selectedRowKeys}`,
    //       "selectedRows: ",
    //       selectedRows
    //     );
    //   }
    // };
    return (
      <div>
        <Table
          columns={columns}
          // dataSource={data}
          // rowSelection={rowSelection}
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
