import * as React from "react";

import DynamicFieldSet from "./dynamicFieldSet";

interface IProps {
  items: any;
  onValueChangeSet: any;
  fieldName: string;
  placeholderText: string;
}
interface IState {
  items: any;
}
class DynamicFieldSetWrapper extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      items: props.items || []
    };
  }

  public render() {
    const { items } = this.state;
    return (
      <DynamicFieldSet
        items={items}
        onAddItem={this.onAddItem}
        onRemoveItem={this.onRemoveItem}
        onValueChange={this.onValueChange}
        fieldName={this.props.fieldName}
        placeholderText={this.props.placeholderText}
        // defaultValueToDisplay={this.props.defaultValueToDisplay}
      />
    );
  }

  private onAddItem = () => {
    const { items } = this.state;
    const { onValueChangeSet } = this.props;
    const newItems = items.concat({ value: "" });
    onValueChangeSet(newItems);

    this.setState({
      items: newItems
    });
  };

  private onRemoveItem = (index: number) => {
    const { items } = this.state;
    const { onValueChangeSet } = this.props;
    const newItems = [...items.slice(0, index), ...items.slice(index + 1)];
    onValueChangeSet(newItems);

    this.setState({
      items: newItems
    });
  };

  private onValueChange = (index: any, value: any) => {
    const { items } = this.state;
    const { onValueChangeSet } = this.props;
    const newItems = [
      ...items.slice(0, index),
      Object.assign({}, items[index], { value }),
      ...items.slice(index + 1)
    ];
    onValueChangeSet(newItems);
console.log(newItems)
    this.setState({
      items: newItems
    });
  };
}

export default DynamicFieldSetWrapper;
