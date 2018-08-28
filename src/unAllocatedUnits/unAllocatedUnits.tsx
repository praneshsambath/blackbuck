import { Table } from "antd";
import * as React from "react";
import baseUrl from "./../common/baseUrl";
import httpClient from "./../Utils/httpClient";
// import { Link } from "react-router-dom";
export interface IRecord {
  id: number;
  name: string;
  state: string;
  city: string;
  subLocation: string;
  latitudeLongitude: string;
}
class UnAllocatedUnits extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public getTableData() {
    httpClient
      .getInstance()
      .get(baseUrl + "/ims/trucktype/v1/master")
      .then(
        res => res.data.map((r: IRecord) => ({ key: r.id, ...r }))
      )
      .then((data: IRecord) => this.setState({ data }));
  }
  public componentDidMount() {
    this.getTableData();
  }

  public render() {
    const columns = [
      {
        dataIndex: "name",
        key: "name",
        render: (text: any) => <a href="javascript:;">{text}</a>,
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        title: "SKU Name"
      },
      {
        dataIndex: "id",
        sorter: (a: any, b: any) => a.id - b.id,
        title: "SKU ID"
      },
      {
        dataIndex: "unallocatedunits",
        sorter: (a: any, b: any) =>
          a.unallocatedunits.length - b.unallocatedunits.length,
        title: "Unallocated Units (MT)"
      }
    ];
    const data = [
      {
        id: "101",
        key: "1",
        name: "pranesh",
        unallocatedunits: "500"
      },
      {
        id: "102",
        key: "2",
        name: "Sampath Kumar",
        unallocatedunits: "100"
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
      </div>
    );
  }
}
export default UnAllocatedUnits;
