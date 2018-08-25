import { Button, Form, Icon, Input } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import * as React from "react";
import "./dynamicInputField.css";
const FormItem = Form.Item;

interface IProps {
  form: WrappedFormUtils;
  dashedField: string;
  onDynamciFieldChange: any;
  // initValue:any;
}

class DynamicFieldSet extends React.Component<IProps> {
private uuid = 0;

  constructor(props: IProps) {
    super(props);
  }

  public remove = (k: any) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key: any) => key !== k)
    });
  };

  public add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(this.uuid);
    this.uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  public render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
        xs: { span: 24 }
      },
      wrapperCol: {
        sm: { span: 20 },
        xs: { span: 24 }
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        sm: { span: 20, offset: 4 },
        xs: { span: 24, offset: 0 }
      }
    };
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k: any, index: any) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? "Passengers" : ""}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            // initialValue:this.props.initValue[index],
            rules: [
              {
                message: "Please input passenger's name or delete this field.",
                required: true,
                whitespace: true
              }
            ],
            validateTrigger: ["onChange", "onBlur"]
          })(
            <Input
              placeholder="passenger name"
              style={{ width: "60%", marginRight: 8 }}
            />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              //   disable={keys.length = 1}
              onClick={this.remove.bind(this, k)}
            />
          ) : null}
        </FormItem>
      );
    });
    return (
      <div>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button
            type="dashed"
            onClick={this.add}
            style={{ width: "100%", textAlign: "center" }}
          >
            <Icon type="plus" /> Add {this.props.dashedField}
          </Button>
        </FormItem>
      </div>
    );
  }
}
export default Form.create({
  onValuesChange(props: any, values: any, allValues: []) {
    if (allValues) {
      props.onDynamciFieldChange(allValues);
    }
  }
})(DynamicFieldSet);
