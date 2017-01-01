import React from 'react';

export default class Icon extends React.Component {
  render() {
    const props = Object.assign({}, this.props)
    const { svg } = props
    delete props.svg
    return (
      <i {...props} dangerouslySetInnerHTML={{__html: svg}}/>
    )
  }
}