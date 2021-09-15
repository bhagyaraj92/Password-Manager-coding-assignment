import './index.css'

const PasswordDetails = props => {
  const {passwordDetails, onDeleteList, showPassword} = props
  const {id, webSiteName, username, password, bgColor} = passwordDetails

  const webInitial = webSiteName.toUpperCase().slice(0, 1)

  const onClickDelete = () => {
    onDeleteList(id)
  }

  return (
    <li className="list-item">
      <div className="list-container">
        <div className={`initial ${bgColor}`}>
          <h1>{webInitial}</h1>
        </div>

        <div className="details">
          <p className="list">{webSiteName}</p>
          <p className="list">{username}</p>
          {showPassword ? (
            <p className="list">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </div>
      </div>

      <div className="delete-container">
        <button
          type="button"
          className="delete-button"
          onClick={onClickDelete}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordDetails
