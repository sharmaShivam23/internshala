export default function ProfileScreen() {
  return (
    <div className="screen profile-screen">
      <div className="profile-header">
        <h1 className="profile-header-title">Account Settings</h1>

        <div className="profile-info">
          <div className="profile-avatar-wrapper">
            <img
              className="profile-avatar"
              src="/profile-avatar.png"
              alt="Marry Doe"
            />
            <div className="profile-avatar-badge">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5C11.4477 5 11 5.44772 11 6V11H6C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H13V6C13 5.44772 12.5523 5 12 5Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div>
            <p className="profile-name">Marry Doe</p>
            <p className="profile-email">Marry@Gmail.Com</p>
          </div>
        </div>

        <p className="profile-description">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing
          Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut
          Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>
      </div>

      <hr className="profile-divider" />

      <div className="profile-body" />

      <hr className="profile-divider profile-footer-divider" />
    </div>
  )
}
