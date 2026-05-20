import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignupScreen() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: 'yes',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/profile')
  }

  return (
    <div className="screen signup-screen">
      <div className="signup-header">
        <h1 className="signup-title">
          Create your<br />PopX account
        </h1>
        <span className="signup-step-badge">1</span>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-group">
            <label className="form-label" htmlFor="signup-fullname">
              Full Name<span className="required">*</span>
            </label>
            <input
              className="form-input"
              id="signup-fullname"
              type="text"
              placeholder="Marry Doe"
              value={form.fullName}
              onChange={handleChange('fullName')}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-phone">
              Phone number<span className="required">*</span>
            </label>
            <input
              className="form-input"
              id="signup-phone"
              type="tel"
              placeholder="Marry Doe"
              value={form.phone}
              onChange={handleChange('phone')}
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">
              Email address<span className="required">*</span>
            </label>
            <input
              className="form-input"
              id="signup-email"
              type="email"
              placeholder="Marry Doe"
              value={form.email}
              onChange={handleChange('email')}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">
              Password <span className="required">*</span>
            </label>
            <input
              className="form-input"
              id="signup-password"
              type="password"
              placeholder="Marry Doe"
              value={form.password}
              onChange={handleChange('password')}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-company">
              Company name
            </label>
            <input
              className="form-input"
              id="signup-company"
              type="text"
              placeholder="Marry Doe"
              value={form.company}
              onChange={handleChange('company')}
              autoComplete="organization"
            />
          </div>

          <div className="form-group">
            <p className="radio-group-label">
              Are you an Agency?<span className="required">*</span>
            </p>
            <div className="radio-options">
              <label className="radio-option" htmlFor="agency-yes">
                <input
                  type="radio"
                  id="agency-yes"
                  name="agency"
                  value="yes"
                  checked={form.isAgency === 'yes'}
                  onChange={handleChange('isAgency')}
                />
                Yes
              </label>
              <label className="radio-option" htmlFor="agency-no">
                <input
                  type="radio"
                  id="agency-no"
                  name="agency"
                  value="no"
                  checked={form.isAgency === 'no'}
                  onChange={handleChange('isAgency')}
                />
                No
              </label>
            </div>
          </div>
        </div>

        <div className="signup-btn-wrapper">
          <button
            type="submit"
            className="btn btn-primary"
            id="btn-create-account-submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  )
}
