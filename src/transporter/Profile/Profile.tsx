import { Button, Col, Row, Table } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import baseUrl from "../../common/baseUrl";
import httpClient from "../../Utils/httpClient";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import "./Profile.css";
import ViewModal from "./ViewModal";

interface IRecord {
  id: number;
  code: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  emails: string[];
  phone_numbers: string[];
}

class Profile extends React.Component {
  public state = {
    AddModalVisiblity: false,
    DeleteModalVisiblity: false,
    EditModalVisiblity: false,
    ViewModalVisiblity: false,
    data: [],
    isDelete: true,
    isEdit: true,
    sendDataToChild: {},
    sendDataToViewChild: {},
    transporterEditModal: false
  };
  constructor(props: { form: WrappedFormUtils }) {
    super(props);
    this.getTableData = this.getTableData.bind(this);
  }
  public getTableData() {
    httpClient
      .getInstance()
      .get(baseUrl + "/ims/transporter/v1")
      .then(res =>
        res.data.transporter.map((r: IRecord) => ({ key: r.id, ...r }))
      )
      .then((data: IRecord) => this.setState({ data }));
  }
  public componentDidMount() {
    this.getTableData();
  }
  public ViewingRow = (row: any) => {
    this.setState({
      sendDataToViewChild: row
    });
    this.ViewModal(true);
  };
  public render() {
    const columns = [
      {
        dataIndex: "name",
        key: "name",
        render: (text: any, row: any, index: any) => (
          <a href="javascript:;" onClick={this.ViewingRow.bind(this, row)}>
            {text}
          </a>
        ),
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        title: "Name"
      },
      {
        dataIndex: "code",
        sorter: (a: any, b: any) => a.id - b.id,
        title: "Code"
      },
      {
        dataIndex: "email",
        sorter: (a: any, b: any) =>
          a.primary_email_id.length - b.primary_email_id.length,
        title: "Primary Email ID"
      },
      {
        dataIndex: "phone",
        sorter: (a: any, b: any) =>
          a.primary_mobile_number - b.primary_mobile_number,
        title: "Primary Mobile Number"
      }
    ];
    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.isVisibleDelete(selectedRows);
        this.setState({
          sendDataToChild: selectedRows
        });
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
              icon="plus"
              onClick={this.AddModal.bind(this, true)}
            >
              Add Transporter
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
              onClick={this.EditModal.bind(this, true)}
              disabled={this.state.isEdit}
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              icon="edit"
            />
            <Button
              onClick={this.DeleteModal.bind(this, true)}
              ghost={true}
              type="primary"
              style={{ marginLeft: 12 }}
              disabled={this.state.isDelete}
              icon="delete"
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={this.state.data}
          rowSelection={rowSelection}
        />
        {this.state.DeleteModalVisiblity ? (
          <DeleteModal
            dataToDisplay={this.state.sendDataToChild}
            DeleteModal={this.DeleteModal}
            visible={this.state.DeleteModalVisiblity}
            getTableData={this.getTableData}
          />
        ) : null}
        {this.state.AddModalVisiblity ? (
          <AddModal
            AddModal={this.AddModal}
            visible={this.state.AddModalVisiblity}
            getTableData={this.getTableData}
          />
        ) : null}
        {this.state.ViewModalVisiblity ? (
          <ViewModal
            visible={this.state.ViewModalVisiblity}
            viewModal={this.ViewModal}
            dataToDisplay={this.state.sendDataToViewChild}
          />
        ) : null}
        {this.state.EditModalVisiblity ? (
          <EditModal
            dataToDisplay={this.state.sendDataToChild}
            editModal={this.EditModal}
            visible={this.state.EditModalVisiblity}
            getTableData={this.getTableData}
          />
        ) : null}
      </div>
    );
  }

  private EditModal = (isVisible: boolean) => {
    this.setState({
      EditModalVisiblity: isVisible
    });
  };
  private ViewModal = (isVisible: boolean) => {
    this.setState({
      ViewModalVisiblity: isVisible
    });
  };
  private isVisibleDelete = (selectedRows: any[]) => {
    if (selectedRows.length === 1) {
      this.setState({
        isDelete: false,
        isEdit: false
      });
    } else if (selectedRows.length >= 1) {
      this.setState({
        isDelete: false,
        isEdit: true
      });
    } else {
      this.setState({
        isDelete: true,
        isEdit: true
      });
    }
  };
  private DeleteModal = (isvisible: boolean) => {
    this.setState({
      DeleteModalVisiblity: isvisible
    });
  };
  private AddModal = (isvisible: boolean) => {
    this.setState({
      AddModalVisiblity: isvisible
    });
  };
}
export default Profile;
