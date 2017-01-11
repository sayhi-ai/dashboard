import React from 'react'
import Icon from '../../../app/Icon'
import * as BotServices from "../../../../services/sayhi/botService"
import RaisedButton from "material-ui/RaisedButton"
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Immutable from 'immutable'

export default class BotSettings extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: this.props.bot.name,
      nameError: "",
      description: this.props.bot.description,
      descriptionError: "",
      tag: "",
      tagError: "",
      chipData: this._mapTagsToChips(this.props.bot.tags)
    }

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
  }

  _mapTagsToChips(tags) {
    let index = -1
    return Immutable.List(tags
      .filter(tag => tag !== '{}')
      .map(tag => {
      index++
      return {key: index, label: tag}
    }))
  }

  _setName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  _setDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  _setTag = (e) => {
    this.setState({
      tag: e.target.value,
    })
  }

  _handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      this._mutateBot(event)
    }
  }

  _tagKeyPress = (event) => {
    if (event.key == 'Enter') {
      this._addTag()
    }
  }

  _mutateBot = (e) => {
    e.preventDefault()

    const name = this.state.name
    const description = this.state.description
    let tags = this.state.chipData.toArray()
    if (name === '') {
      const error = "Name is empty."
      return this.setState({
        nameError: error
      })
    } else {
      this.setState({
        nameError: ''
      })
    }

    if (name.length > 100) {
      const error = "Name is too long."
      return this.setState({
        nameError: error
      })
    } else {
      this.setState({
        nameError: ''
      })
    }

    if (description === '') {
      const error = "Description is empty."
      return this.setState({
        descriptionError: error
      })
    } else {
      this.setState({
        descriptionError: ''
      })
    }

    if (description.length > 200) {
      const error = "Description is too long."
      return this.setState({
        descriptionError: error
      })
    } else {
      this.setState({
        descriptionError: ''
      })
    }

    if (tags.length < 2) {
      const error = "Please add at least two tags."
      return this.setState({
        tagError: error
      })
    } else {
      this.setState({
        tagError: ''
      })
    }

    tags = tags.map(tag => tag.label)
    BotServices.addBot(name, description, tags)

    this.props.onSubmit()
  }

  _addTag = () => {
    const tag = this.state.tag
    if (tag === "") {
      this.setState({
        tagError: "Cannot add empty tag."
      })
      return
    }  else if (this.state.chipData.map(chip => chip.label).contains(tag)) {
      return this.setState({
        tagError: "Tag already exists."
      })
    } else {
      this.setState({
        tagError: ""
      })
    }

    const key = this.state.chipData.size
    this.setState({
      tag: "",
      chipData: this.state.chipData.push({key: key, label: tag})
    })
  }

  _handleRequestDelete = (key) => {
    let chipData = this.state.chipData
    const chipToDelete = chipData.map((chip) => chip.key).indexOf(key)
    chipData = chipData.splice(chipToDelete, 1)
    this.setState({chipData: chipData})
  };

  _renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this._handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    const chips = this.state.chipData.map(this._renderChip, this)

    return (
      <div className="db pa3 pb0">
        <div className="dib br1" style={{border: "1px solid #19A5E4"}}>
          <Icon
            className="dib"
            style={{width: 120, height: 120}}
            svg={require('../../../../resources/img/bot.svg')}
            onClick={this._handleOpen}/>
        </div>
        <div className="dib v-top pa2 pl3">
          <div className="db">
            <TextField type="text"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.name}
                       onChange={this._setName}
                       className="form-control"
                       id="name"
                       errorText={this.state.nameError}
                       onKeyPress={this._handleKeyPress}
                       hintText="Name"/>
          </div>
          <div className="db">
            <TextField type="text"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.description}
                       onChange={this._setDescription}
                       className="form-control"
                       id="description"
                       errorText={this.state.descriptionError}
                       onKeyPress={this._handleKeyPress}
                       hintText="Description (optional)"/>
          </div>
        </div>
        <div className="db pa3 pb0">
          <div className="db">
            <TextField type="text"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.tag}
                       onChange={this._setTag}
                       className="form-control"
                       id="tag"
                       errorText={this.state.tagError}
                       onKeyPress={this._tagKeyPress}
                       hintText="Add tag"/>
          </div>
          <div className="db">
            <div style={this.styles.wrapper}>
              {chips}
            </div>
          </div>
        </div>
        <div className="db pa3 right">
          <RaisedButton
            className="mr2"
            label="Cancel"
            primary={false}
            onTouchTap={this.props.onCancel}
          />
          <RaisedButton
            label="Add"
            primary={true}
            onTouchTap={this._mutateBot}
          />
        </div>
      </div>
    )
  }
}