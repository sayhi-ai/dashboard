import React from 'react'
import Immutable from 'immutable'

const escapeSymbol = '\\';

export default class Response extends React.Component {
  constructor() {
    super()

    this._styleMap = {
      variable: {
        color: '#FFCC80'
      },
      escape: {
        color: 'rgba(180, 180, 180, 1)'
      },
      text: {
        color: 'rgba(74, 74, 74, 1)'
      }
    }
  }

  _styleResponse(text, spans) {
    let matchArr, start;
    const regex = /({\w+})+/g
    if ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      if (!this._isEscaped(text, start - 1, 0)) {
        console.log("d")
        const prefix = text.substr(0, start)
        const variable = text.substr(start, matchArr[0].length);
        const remainder = text.substr(start + matchArr[0].length);

        const prefixSpan = <span>{prefix}</span>
        const variableSpan = <span style={this._styleMap.variable}>{variable}</span>
        spans = spans.push(prefixSpan, variableSpan)
        return this._styleResponse(remainder, spans)
      }
    } else {
      const suffixSpan = <span>{text}</span>
      spans = spans.push(suffixSpan)
    }

    return spans
  }

  _isEscaped(text, index, count) {
    if (index < 0 || text[index] !== escapeSymbol) {
      return count % 2 !== 0;
    }

    return this._isEscaped(text, index - 1, count + 1);
  }

  render() {
    const htmlResponse = this._styleResponse(this.props.response, Immutable.List())

    return (
      <div className='flex justify-between items-center hide-child'>
        <div
          className='br4 white pointer pv2 ph3 ma1 f5'
          style={{
            backgroundColor: '#19A5E4',
            wordBreak: 'break-all'
          }}
        >
          {htmlResponse}
        </div>
        <div className='flex'>
          <div className='child pointer ttu f6 red' onClick={this.props.onDelete}>
            delete
          </div>
        </div>
      </div>
    )
  }
}