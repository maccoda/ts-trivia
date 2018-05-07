import * as React from 'react';

export interface ResponseLabelProps {
  text: string;
}

export default class ResponseLabel extends React.Component<
  ResponseLabelProps,
  any
> {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md">
            <h4>{this.props.text}</h4>
          </div>
        </div>
      </div>
    );
  }
}
