import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isFormValid = email.trim() !== '' && password.trim() !== ''

  const handleLogin = (e) => {
    e.preventDefault()
    if (isFormValid) {
      navigate('/profile')
    }
  }

  return (
    <div className="screen login-screen">
      <h1 className="login-title">Signin to your<br />PopX account</h1>
      <p className="login-subtitle">
        Lorem ipsum dolor sit amet,<br />
        consectetur adipiscing elit,
      </p>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-fields">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
              Email Address
            </label>
            <input
              className="form-input"
              id="login-email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input
              className="form-input"
              id="login-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="login-btn-wrapper">
          <button
            type="submit"
            className={`btn btn-login ${isFormValid ? 'active' : ''}`}
            id="btn-submit-login"
            disabled={!isFormValid}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
