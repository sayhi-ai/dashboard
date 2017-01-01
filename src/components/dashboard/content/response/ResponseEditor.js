import React from 'react';
import * as Draft from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import logo from "../../../../resources/img/logo.png";
import * as DraftConvert from 'draft-convert';
import 'draft-js-emoji-plugin/lib/plugin.css';

const VAR_REGEX = /({\w+})+/g;
const ESCAPE_REGEX = /\\./g;
const variableColor = 'rgba(255, 145, 0, 1)';
const escapeColor = 'rgba(180, 180, 180, 1)';
const fontColor = 'rgba(74, 74, 74, 1)';
const escapeSymbol = '\\';

export default class ResponseEditor extends React.Component {
  constructor(props) {
    super(props);

    this._plugins = [createEmojiPlugin()];
    this._styleMap = {
      variable: {
        color: variableColor
      },
      escape: {
        color: escapeColor
      },
      text: {
        color: fontColor
      }
    };
    this._decorators = [{
      strategy: this._variableStrategy.bind(this),
      component: this._variableSpan.bind(this)
    },{
      strategy: this._escapeStrategy.bind(this),
      component: this._escapeSpan.bind(this)
    }];

    this._focus = () => this.refs.editor.focus();
    this._onChange = (editorState) => this.setState({editorState});

    this.state = {
      editorState: Draft.EditorState.createEmpty(),
    };
  }

  _variableStrategy(contentBlock, callback) {
    this._findWithRegex(VAR_REGEX, contentBlock, callback);
  }

  _escapeStrategy(contentBlock, callback) {
    this._findWithRegex(ESCAPE_REGEX, contentBlock, callback);
  }

  _findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      if (start === 0 || text[start - 1] !== escapeSymbol) {
        callback(start, start + matchArr[0].length);
      }
    }
  }

  _variableSpan(props) {
    return <span style={this._styleMap.variable}>{props.children}</span>;
  };

  _escapeSpan(props) {
    return <span style={this._styleMap.escape}>{props.children}</span>;
  };

  _handleKeyCommand(command) {
    let handled;

    if (command === 'enter') {
      this._handleSubmit();
    }

    // Handle "rich utils" (bold, underline, italics, etc.)
    const newState = Draft.RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this._onChange(newState);
      handled = true;
    }

    if (handled) {
      return 'handled';
    } else {
      return 'not-handled';
    }
  }

  _handleKeyBind(e) {
    switch (e.keyCode){
      case 13:
        return 'enter';
      default:
        // no-op
    }

    return Draft.getDefaultKeyBinding(e);
  }

  _handleSubmit() {
    const contentState = this.state.editorState.getCurrentContent();
    let text = contentState.getPlainText();
    const html = DraftConvert.convertToHTML(contentState);

    // Get variables
    let vars = [];
    let match = VAR_REGEX.exec(text);
    vars.push(match);
    while(match !== null) {
      match = VAR_REGEX.exec(text);
      vars.push(match);
    }
    vars = vars
      .filter(variable => variable  !== null)
      .map(variable => variable[0])
      .map(variable => variable.substr(1))
      .map(variable => variable.slice(0, -1))

    vars = Array.from(new Set(vars));

    // Remove escape chars
    match = ESCAPE_REGEX.exec(text);
    while(match !== null) {
      const start = match.index;
      text = text.slice(0, start) + text.slice(start + 1);

      match = ESCAPE_REGEX.exec(text);
    }

    this.props.onEnter({
      text: text,
      html: html,
      vars: vars
    });

    const editorState = this._replaceAllText(this.state.editorState, '');
    this._onChange(editorState);
  }

  _replaceAllText(editorState, text) {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const isBackward = selectionState.getIsBackward();

    const firstBlock = contentState.getFirstBlock();
    const lastBlock = contentState.getLastBlock();

    const leftmostBlock = !isBackward ? firstBlock : lastBlock;
    const rightmostBlock = !isBackward ? lastBlock : firstBlock;

    const rightmostBlockLength = rightmostBlock.getLength();

    const anchorKey = leftmostBlock.getKey();
    const anchorOffset = !isBackward ? 0 : rightmostBlockLength;

    const focusKey = rightmostBlock.getKey();
    const focusOffset = !isBackward ? rightmostBlockLength : 0;

    const newSelectionState = selectionState.merge({
      anchorKey,
      anchorOffset,
      focusKey,
      focusOffset,
      hasFocus: true,
    });

    return Draft.EditorState.push(
      Draft.EditorState.moveFocusToEnd(editorState),
      Draft.Modifier.replaceText(contentState, newSelectionState, text)
    );
  }

  render() {
    const { EmojiSuggestions }  = this._plugins[0];
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className='flex pa2 items-center mt2 h-100 w-100 br3 justify-stretch' style={{background: '#f0f0f0'}}>
        <div className='bf btc w-10 pv2 ph3 ma1 f5 flex-auto' onClick={this._focus}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this._handleKeyCommand.bind(this)}
            customStyleMap={this._styleMap}
            keyBindingFn={this._handleKeyBind.bind(this)}
            spellCheck={true}
            stripPastedStyles={true}
            onChange={this._onChange}
            decorators={this._decorators}
            plugins={this._plugins}
            ref="editor"/>
        </div>
        <EmojiSuggestions/>
        <div className='flex br-100 justify-center items-center pointer dim ml2 mr2'
             style={{
               width: 46,
               height: 46
             }}
             onClick={this._handleSubmit.bind(this)}>
          <img className="response-logo" src={logo}/>
        </div>
      </div>
    )
  }
}
