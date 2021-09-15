import {Component} from 'react'

import {v4} from 'uuid'

import PasswordDetails from '../PasswordDetails'

import './index.css'

const colorManager = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
]

class PasswordManager extends Component {
  state = {
    webSiteName: '',
    username: '',
    password: '',
    detailsList: [],
    searchInput: '',

    showPassword: false,
  }

  onChangeWebsiteName = event => {
    this.setState({webSiteName: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitForm = event => {
    const {webSiteName, username, password} = this.state
    event.preventDefault()

    const randomColor =
      colorManager[Math.ceil(Math.random() * colorManager.length - 1)]

    const newDetails = {
      id: v4(),
      webSiteName,
      username,
      password,
      bgColor: randomColor,
    }

    this.setState(prevState => ({
      detailsList: [...prevState.detailsList, newDetails],
      webSiteName: '',
      username: '',
      password: '',
    }))
  }

  onDeleteList = id => {
    const {detailsList} = this.state

    const updatedList = detailsList.filter(each => each.id !== id)
    this.setState({detailsList: updatedList})
  }

  onSearchWebName = () => {
    const {detailsList, searchInput} = this.state

    const searchingList = detailsList.filter(each =>
      each.webSiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchingList
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png  "
        alt="no passwords"
        className="failure-img"
      />
      <p className="no-password">No Passwords</p>
    </div>
  )

  render() {
    const {
      webSiteName,
      username,
      password,
      searchInput,

      showPassword,
    } = this.state

    const searching = this.onSearchWebName()

    const count = searching.length

    let finalView = ''

    if (count > 0) {
      finalView = (
        <ul className="ul-list">
          {searching.map(each => (
            <PasswordDetails
              key={each.id}
              passwordDetails={each}
              onDeleteList={this.onDeleteList}
              showPassword={showPassword}
            />
          ))}
        </ul>
      )
    } else {
      finalView = this.renderFailureView()
    }

    return (
      <div className="password-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="responsive-container">
          <img
            src=" https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="image-password-manager"
          />
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="add-Password-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
                <hr className="line" />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter website"
                  onChange={this.onChangeWebsiteName}
                  value={webSiteName}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website"
                />
                <hr className="line" />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website"
                />
                <hr className="line" />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="large-image"
            />
          </div>
        </div>

        <div className="unOrder-list">
          <div className="upper">
            <div className="count-container">
              <h1 className="password">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <hr className="hr-line" />
              <input
                type="search"
                className="search-box"
                placeholder="search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="end-line" />
          <div className="checkbox">
            <input id="check" type="checkbox" onClick={this.onChangeCheckBox} />
            <label htmlFor="check" className="show">
              Show Passwords
            </label>
          </div>
          {finalView}
        </div>
      </div>
    )
  }
}

export default PasswordManager
