import React from 'react'
import Immutable from "immutable";
import ENV_VARS from '../../../../../tools/ENV_VARS'

export default class ColorTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.keyCounter = 0;
  }

  _colorText(text) {
    const coloredSegments = this._splitText([], text);
    if (coloredSegments == null) {
      return <span/>;
    }

    return coloredSegments
      .map(phrase => {
        this.keyCounter++;
        return <span key={this.keyCounter} style={{color: phrase.color, whiteSpace: "pre"}}>{phrase.string}</span>}
      );
  }

  _splitText(segments, rest) {
    const openIndex = rest.indexOf('{');

    if (openIndex === -1) {
      segments.push({
        string: rest,
        color: "#4A4A4A"
      })
      return segments;
    } else {
      const before = rest.substr(0, openIndex);
      const after = rest.substr(openIndex);
      segments.push({
        string: before,
        color: "#4A4A4A"
      })

      const closeIndex = after.indexOf('}');
      if (closeIndex === -1) {
        segments.push({
          string: after,
          color: "#FF9100"
        })
        return segments;
      }
      const variable = after.substr(0, closeIndex + 1);
      const newRest = after.substr(closeIndex + 1);
      segments.push({
        string: variable,
        color: "#FF9100"
      })
      return this._splitText(segments, newRest);
    }
  }

  render() {
    const domContent = this._colorText(this.props.value);
    return (
        <div className='flex pc relative items-center mt2 h-100 w-100 justify-stretch'>
          <input
            className='br-pill cursor bf ba b--black bg-transparent pv2 ph3 ma1 outline-0 f5 flex-auto'
            style={{
              flex: '1',
              zIndex: 999,
            }}
            type='text'
            id="colorTextField"
            placeholder='Add new response'
            onChange={this.props._onChange}
            onKeyUp={this.props.onKeyUp}
            value={this.props.value}/>
            <div
              className='br-pill bf w-100 dib absolute b--black bg-transparent ml1 pv2 ph3 outline-0 f5 flex-auto'
              style={{
                flex: '1',
                overflow: "hidden",
                paddingRight: "2rem"
              }}>
              <div className='dib w-100 h-100'
                   style={{
                    overflow: "hidden"
                  }}>
                {domContent}
              </div>
            </div>
        </div>
    )
  }
}