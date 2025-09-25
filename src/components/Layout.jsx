import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import LogoImage from './LogoImage'
import '../styles/design-tokens.css'

// Mock navigation items based on real Medinah structure
const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', section: 'main' },
  { name: 'Soldiers', path: '/soldier', icon: 'person', section: 'main' },
  { name: 'Medical', path: '/medical', icon: 'local_hospital', section: 'main' },
  { name: 'Workloads', path: '/workloads', icon: 'fitness_center', section: 'main' },
  { name: 'Questionnaires', path: '/questionnaires', icon: 'assignment', section: 'main' },
  { name: 'Analysis', path: '/analysis', icon: 'analytics', section: 'analysis' },
  { name: 'Planning', path: '/planning', icon: 'event', section: 'planning' },
  { name: 'Settings', path: '/settings', icon: 'settings', section: 'settings' }
]

// Mock current user data
const currentUser = {
  name: 'Dr. Sarah Mitchell',
  email: 'sarah.mitchell@example.com',
  role: 'Sports Medicine Director',
  avatar: '👩‍⚕️'
}

// Mock squad data
const availableSquads = [
  { id: 1, name: 'Battalion 1', short: 'B1' },
  { id: 2, name: 'Battalion 2', short: 'B2' },
  { id: 3, name: 'Battalion 3', short: 'B3' },
  { id: 4, name: 'Company 1', short: 'C1' },
  { id: 5, name: 'Company 1.2', short: 'C1.2' },
  { id: 6, name: 'Company 1.3', short: 'C1.3' },
  { id: 7, name: 'Company 2.1', short: 'C2.1' },
  { id: 8, name: 'Company 2.2', short: 'C2.2' },
  { id: 9, name: 'Company 2.3', short: 'C2.3' },
  { id: 10, name: 'Company 3.1', short: 'C3.1' },
  { id: 11, name: 'Company 3.2', short: 'C3.2' },
  { id: 12, name: 'Company 3.3', short: 'C3.3' }
]

function MedinahLayout({ children }) {
  const location = useLocation()
  const [currentSquad, setCurrentSquad] = useState(availableSquads[0])
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)

  const getPageTitle = () => {
    const currentPath = location.pathname
    const currentItem = navigationItems.find(item => item.path === currentPath)
    return currentItem ? currentItem.name : 'Dashboard'
  }

  return (
    <div className="app-layout">
      {/* Loading Screen */}
      <div className="loading-screen" style={{display: 'none'}}>
        <h1>Fetching Data</h1>
      </div>

      {/* Main Container */}
      <div className="main" id="root">
        {/* Side Navigation */}
        <nav className={`main-nav ${isNavCollapsed ? 'collapsed' : ''}`}>
          <div className="nav-header">
            <div className="nav-logo">
              <LogoImage 
                type="organization" 
                logoId="organization-logo" 
                alt="Medinah Logo" 
                height={32}
                width={120}
              />
            </div>
            <button 
              className="nav-toggle"
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>

          <div className="nav-content">
            {/* Navigation Items */}
            <ul className="nav-items">
              {navigationItems.map(item => (
                <li key={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
                  <Link to={item.path} className="nav-link">
                    <span className="nav-icon material-icons-outlined">{item.icon}</span>
                    <span className="nav-text">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="main__inner">
          {/* App Header */}
          <header className="app-header">
            <div className="app-header__left">
              <h1 className="page-title">{getPageTitle()}</h1>
            </div>
            
            <div className="app-header__right">
              <div className="header-actions">
                {/* Squad Selector */}
                <div className="header-squad-selector">
                  <label>Squad:</label>
                  <select 
                    value={currentSquad.id} 
                    onChange={(e) => setCurrentSquad(availableSquads.find(s => s.id === parseInt(e.target.value)))}
                  >
                    {availableSquads.map(squad => (
                      <option key={squad.id} value={squad.id}>{squad.name}</option>
                    ))}
                  </select>
                </div>
                
                <button className="header-btn notifications">
                  <span className="notification-badge">3</span>
                  <span className="material-icons-outlined">notifications</span>
                </button>
                
                <div className="user-menu">
                  <div className="user-avatar">
                    <span className="avatar-icon">{currentUser.avatar}</span>
                    <div className="user-info">
                      <span className="user-name">{currentUser.name}</span>
                      <span className="user-role">{currentUser.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default MedinahLayout