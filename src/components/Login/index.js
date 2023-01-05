// Write your JS code here
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const onSubmitSuccess = jwtToken => {
    const {history} = props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  const onClickLoginBtn = async () => {
    const apiUrl = 'https://apis.ccbp.in/login'
    const username = 'rahul'
    const password = 'rahul@2021'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    }
  }

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Please Login</h1>
      <button type="button" onClick={onClickLoginBtn} className="login-btn">
        Login with Sample Creds
      </button>
    </div>
  )
}

export default Login
