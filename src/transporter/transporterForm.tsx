import { Col, Form, Input } from "antd";
import { WrappedFormUtils } from 'antd/lib/form/Form';
import * as React from "react";

const FormItem = Form.Item;

interface IProps {
    form: WrappedFormUtils;
  }
class TransporterForm extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render()
  {
    const { getFieldDecorator } = this.props.form;
      return(
          <Form>
              <Col span={12} style={{ display: 'block' }}>
            <FormItem label="Registered Name">
              {getFieldDecorator('name', {
                initialValue: "hai",
                rules: [
                  {
                    message: 'Name is required',
                    required: true
                  }
                ],
                validateTrigger: ['onChange', 'onBlur']
              })(<Input />)}
            </FormItem>
          </Col>
          </Form>
      );
  }
}

export default TransporterForm;
