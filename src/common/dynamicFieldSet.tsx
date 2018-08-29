import { Button, Col, Form, Icon, Input, Row } from "antd";
import * as React from "react";

interface IProps {
  items: any;
  onAddItem: any;
  onRemoveItem: any;
  fieldName: string;
  onValueChange: any;
  placeholderText: string;
}
class DynamicFieldSet extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { items } = this.props;
    return (
      <div>
        <div style={{ paddingBottom: 10 }}>
          <label>{this.props.fieldName}</label>
        </div>
        <div>
          {items.map((item: any, index: any) => {
            const onRemoveCb = () => this.onRemove(index);
            const onChangeCb = this.onChange(index);
            return (
              <Form.Item key={index}>
                <Row gutter={8}>
                  <Col span={16}>
                    <Input
                      onChange={onChangeCb}
                      placeholder={this.props.placeholderText}
                      defaultValue={item ? item : item.value}
                    />
                  </Col>
                  <Col span={8}>
                    <Button type="dashed" icon="delete" onClick={onRemoveCb} />
                  </Col>
                </Row>
              </Form.Item>
            );
          })}
          <Button type="dashed" onClick={this.onAdd}>
            <Icon type="plus" />
            Add Item
          </Button>
        </div>
      </div>
    );
  }
  private onAdd = () => {
    const { onAddItem } = this.props;
    onAddItem();
  };

  private onRemove(index: any) {
    const { onRemoveItem } = this.props;
    onRemoveItem(index);
  }

  private onChange = (index: any) => {
    return (event: any) => {
      this.props.onValueChange(index, event.target.value);
    };
  };
}
export default DynamicFieldSet;
