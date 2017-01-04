import React from 'react'
import Immutable from 'immutable'

const ESCAPE_REGEX = /\\./g
const escapeSymbol = '\\'

export default class Response extends React.Component {
  constructor() {
    super()

    this._spanKey = 0
    this._styleMap = {
      variable: {
        color: '#FFCC80'
      }
    }
  }

  _styleResponse(text, spans) {
    let matchArr, start
    const varRegex = /({\w+})+/g

    if ((matchArr = varRegex.exec(text)) !== null) {
      start = matchArr.index;
      let prefix = this._removeEscapeCharacters(text.substr(0, start))
      const variable = this._removeEscapeCharacters(text.substr(start, matchArr[0].length))
      const remainder = text.substr(start + matchArr[0].length);

      let prefixSpan = <span key={this._generateKey()}>{prefix}</span>
      let variableSpan
      if (this._isEscaped(text, start - 1, 0)) {
        prefix = prefix.substr(0, prefix.length -1)
        prefixSpan = <span key={this._generateKey()}>{prefix}</span>
        variableSpan = <span key={this._generateKey()}>{variable}</span>
      } else {
        variableSpan = <span key={this._generateKey()} style={this._styleMap.variable}>{variable}</span>
      }
      spans = spans.push(prefixSpan, variableSpan)
      return this._styleResponse(remainder, spans)
    } else {
      text = this._removeEscapeCharacters(text)
      const suffixSpan = <span key={this._generateKey()}>{text}</span>
      spans = spans.push(suffixSpan)
    }

    return spans
  }

  _generateKey() {
    this._spanKey++
    return "response" + this._spanKey
  }

  _removeEscapeCharacters(text) {
    let matchArr = ESCAPE_REGEX.exec(text);
    while(matchArr !== null) {
      const start = matchArr.index;
      text = text.slice(0, start) + text.slice(start + 1);

      matchArr = ESCAPE_REGEX.exec(text);
    }

    return text
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