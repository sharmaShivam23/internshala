import { useNavigate } from 'react-router-dom'

export default function LandingScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen landing-screen">
      <div className="landing-dots-area" />

      <div className="landing-content">
        <h1 className="landing-title">Welcome to PopX</h1>
        <p className="landing-subtitle">
          Lorem ipsum dolor sit amet,{'\n'}
          consectetur adipiscing elit,
        </p>

        <button
          className="btn btn-primary"
          id="btn-create-account"
          onClick={() => navigate('/signup')}
        >
          Create Account
        </button>
        <button
          className="btn btn-secondary"
          id="btn-login"
          onClick={() => navigate('/login')}
        >
          Already Registered? Login
        </button>
      </div>
    </div>
  )
}
