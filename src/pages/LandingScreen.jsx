import { useNavigate } from 'react-router-dom'

const dots = [
  { number: 1, top: '38%', left: '40%' },
  { number: 2, top: '45%', left: '42%' },
  { number: 3, top: '48%', left: '55%' },
  { number: 4, top: '52%', left: '63%' },
  { number: 5, top: '56%', left: '70%' },
  { number: 6, top: '25%', left: '25%' },
  { number: 7, top: '28%', left: '38%' },
  { number: 8, top: '12%', left: '80%' },
  { number: 9, top: '85%', left: '52%' },
  { number: 10, top: '85%', left: '30%' },
  { number: 11, top: '72%', left: '60%' },
  { number: 12, top: '8%', left: '10%' },
  { number: 13, top: '65%', left: '22%' },
  { number: 14, top: '72%', left: '14%' },
]

export default function LandingScreen() {
  const navigate = useNavigate()

  return (
    <div className="screen landing-screen">
      <div className="landing-dots-area">
        {dots.map((dot) => (
          <div
            key={dot.number}
            className="landing-dot"
            style={{ top: dot.top, left: dot.left }}
          >
            {dot.number}
          </div>
        ))}
      </div>

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
