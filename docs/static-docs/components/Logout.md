# Logout

**Category:** Forms | **Type:** component

Logout functionality component with cookie clearing and redirect capabilities

## 🏷️ Tags

`forms`, `authentication`, `security`, `session`

```tsx
"use client";
import React, { useState } from "react";
import {
  Logout,
  Dialog,
  DeleteConfirmationModal,
  InputText,
  SubmitButton,
} from "@instincthub/react-ui";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various logout functionality patterns
 */
const LogoutExamples = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Custom logout handler with confirmation
  const handleLogoutWithConfirmation = async () => {
    setLoading(true);
    try {
      // Custom logout logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Clear all cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      }
      
      setIsLogoutModalOpen(false);
      openToast("Successfully logged out", 200);
      router.push("/accounts/login");
    } catch (error) {
      openToast("Error during logout", 500);
    } finally {
      setLoading(false);
    }
  };

  // Security logout with session invalidation
  const handleSecurityLogout = async () => {
    setLoading(true);
    try {
      // Invalidate session on server
      await signOut({ redirect: false });
      
      // Clear local storage and session storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear all cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      }
      
      setIsSecurityModalOpen(false);
      openToast("Security logout completed", 200);
      router.push("/accounts/login?reason=security");
    } catch (error) {
      openToast("Security logout failed", 500);
    } finally {
      setLoading(false);
    }
  };

  // Automatic logout for session expiry
  const handleSessionExpiry = async () => {
    try {
      await signOut({ redirect: false });
      setSessionExpired(false);
      openToast("Session expired. Please login again.", 400);
      router.push("/accounts/login?reason=expired");
    } catch (error) {
      openToast("Error handling session expiry", 500);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Logout Examples</h1>

      <div
        className="ihub-d-flex ihub-py-5"
        style={{ gap: "20px", flexWrap: "wrap" }}
      >
        {/* Basic Logout Button */}
        <div className="ihub-example-section">
          <h3>1. Basic Logout</h3>
          <p>Simple logout button with default behavior</p>
          <Logout />
        </div>

        {/* Confirmation Logout */}
        <div className="ihub-example-section">
          <h3>2. Logout with Confirmation</h3>
          <p>Logout with confirmation dialog</p>
          <button
            className="ihub-outlined-btn"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            Logout with Confirmation
          </button>
        </div>

        {/* User Menu Dropdown */}
        <div className="ihub-example-section">
          <h3>3. User Menu with Logout</h3>
          <p>Typical user menu pattern with logout option</p>
          <div className="ihub-user-menu-wrapper">
            <button
              className="ihub-user-avatar-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="ihub-avatar">
                <span>JD</span>
              </div>
              John Doe
            </button>
            
            {isUserMenuOpen && (
              <div className="ihub-dropdown-menu">
                <a href="/profile" className="ihub-dropdown-item">
                  <span>👤</span> View Profile
                </a>
                <a href="/settings" className="ihub-dropdown-item">
                  <span>⚙️</span> Settings
                </a>
                <a href="/billing" className="ihub-dropdown-item">
                  <span>💳</span> Billing
                </a>
                <hr className="ihub-dropdown-divider" />
                <button
                  className="ihub-dropdown-item ihub-logout-item"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsLogoutModalOpen(true);
                  }}
                >
                  <span>🚪</span> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security Logout */}
        <div className="ihub-example-section">
          <h3>4. Security Logout</h3>
          <p>Enhanced logout with complete session clearing</p>
          <button
            className="ihub-danger-btn"
            onClick={() => setIsSecurityModalOpen(true)}
          >
            Security Logout
          </button>
        </div>

        {/* Session Expiry Simulation */}
        <div className="ihub-example-section">
          <h3>5. Session Expiry</h3>
          <p>Automatic logout when session expires</p>
          <button
            className="ihub-warning-btn"
            onClick={() => setSessionExpired(true)}
          >
            Simulate Session Expiry
          </button>
        </div>

        {/* Multiple Devices Logout */}
        <div className="ihub-example-section">
          <h3>6. Logout All Devices</h3>
          <p>Logout from all devices and sessions</p>
          <button
            className="ihub-important-btn"
            onClick={() => {
              openToast("Logging out from all devices...", 200);
              // Implement logout from all devices logic
            }}
          >
            Logout All Devices
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Logout"
        footer={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsLogoutModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="ihub-danger-btn"
              onClick={handleLogoutWithConfirmation}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Yes, Logout"}
            </button>
          </div>
        }
      >
        <div className="ihub-logout-confirmation">
          <p>Are you sure you want to logout?</p>
          <ul className="ihub-logout-effects">
            <li>You will be redirected to the login page</li>
            <li>All session data will be cleared</li>
            <li>Any unsaved changes will be lost</li>
          </ul>
        </div>
      </Dialog>

      {/* Security Logout Modal */}
      <Dialog
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
        title="Security Logout"
        footer={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsSecurityModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="ihub-danger-btn"
              onClick={handleSecurityLogout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Security Logout"}
            </button>
          </div>
        }
      >
        <div className="ihub-security-logout">
          <div className="ihub-warning-box">
            <h4>⚠️ Enhanced Security Logout</h4>
            <p>This will perform a complete security logout including:</p>
            <ul>
              <li>Invalidate current session on server</li>
              <li>Clear all browser cookies</li>
              <li>Clear local and session storage</li>
              <li>Revoke authentication tokens</li>
            </ul>
            <p className="ihub-text-danger">
              Use this if you suspect your account has been compromised.
            </p>
          </div>
        </div>
      </Dialog>

      {/* Session Expiry Modal */}
      <Dialog
        isOpen={sessionExpired}
        onClose={() => {}}
        title="Session Expired"
        footer={
          <div className="ihub-buttons">
            <button
              className="ihub-primary-btn"
              onClick={handleSessionExpiry}
            >
              Login Again
            </button>
          </div>
        }
      >
        <div className="ihub-session-expired">
          <div className="ihub-icon-large">🕐</div>
          <p>Your session has expired for security reasons.</p>
          <p>Please log in again to continue using the application.</p>
          <div className="ihub-session-info">
            <small>Session expired at: {new Date().toLocaleString()}</small>
          </div>
        </div>
      </Dialog>

      {/* Custom CSS for styling */}
      <style jsx>{`
        .ihub-example-section {
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 20px;
          min-width: 300px;
        }
        
        .ihub-user-menu-wrapper {
          position: relative;
        }
        
        .ihub-user-avatar-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
          cursor: pointer;
        }
        
        .ihub-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #6366f1;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .ihub-dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          z-index: 1000;
        }
        
        .ihub-dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          text-decoration: none;
          color: #333;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }
        
        .ihub-dropdown-item:hover {
          background: #f5f5f5;
        }
        
        .ihub-logout-item {
          color: #dc2626;
        }
        
        .ihub-logout-item:hover {
          background: #fef2f2;
        }
        
        .ihub-dropdown-divider {
          border: none;
          border-top: 1px solid #e5e5e5;
          margin: 4px 0;
        }
        
        .ihub-logout-effects {
          margin: 16px 0;
          padding-left: 20px;
        }
        
        .ihub-warning-box {
          background: #fef3cd;
          border: 1px solid #fdd835;
          border-radius: 8px;
          padding: 16px;
        }
        
        .ihub-warning-box h4 {
          margin: 0 0 12px 0;
          color: #b45309;
        }
        
        .ihub-warning-box ul {
          margin: 12px 0;
          padding-left: 20px;
        }
        
        .ihub-text-danger {
          color: #dc2626;
          font-weight: 500;
        }
        
        .ihub-session-expired {
          text-align: center;
        }
        
        .ihub-icon-large {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .ihub-session-info {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e5e5;
        }
      `}</style>
    </div>
  );
};

export default LogoutExamples;
```

## 📋 Key Features

### Core Functionality
- **Cookie Clearing**: Automatically clears all browser cookies
- **Session Termination**: Ends user session securely
- **Redirect Handling**: Navigates to login page after logout
- **Error Handling**: Gracefully handles logout errors

### Security Features
- **Complete Session Cleanup**: Clears cookies, localStorage, sessionStorage
- **Server-side Session Invalidation**: Works with NextAuth and custom auth
- **Security Logout**: Enhanced logout for compromised accounts
- **Multiple Device Logout**: Option to logout from all devices

### User Experience
- **Confirmation Dialogs**: Prevents accidental logouts
- **Loading States**: Shows progress during logout process
- **User Menu Integration**: Seamlessly integrates with navigation
- **Session Expiry Handling**: Automatic logout for expired sessions

## 🎯 Use Cases

### 1. Navigation Bar Logout
```tsx
import { Logout } from '@instincthub/react-ui';

const NavigationBar = () => (
  <nav className="ihub-navbar">
    <div className="ihub-nav-brand">MyApp</div>
    <div className="ihub-nav-actions">
      <Logout />
    </div>
  </nav>
);
```

### 2. User Profile Menu
```tsx
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="ihub-user-menu">
      <button onClick={() => setIsOpen(!isOpen)}>
        <UserAvatar />
      </button>
      {isOpen && (
        <div className="ihub-menu-dropdown">
          <Link href="/profile">Profile</Link>
          <Link href="/settings">Settings</Link>
          <Logout />
        </div>
      )}
    </div>
  );
};
```

### 3. Security Dashboard
```tsx
const SecurityDashboard = () => (
  <div className="ihub-security-panel">
    <h3>Active Sessions</h3>
    <div className="ihub-session-list">
      {/* Session list */}
    </div>
    <button
      className="ihub-danger-btn"
      onClick={handleLogoutAllDevices}
    >
      Logout All Devices
    </button>
  </div>
);
```

### 4. Session Timeout Handler
```tsx
const SessionHandler = () => {
  useEffect(() => {
    const checkSession = () => {
      // Check if session is expired
      if (isSessionExpired()) {
        // Automatically logout
        handleAutoLogout();
      }
    };
    
    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);
  
  return null;
};
```

## 🔧 Advanced Configuration

### Custom Logout Handler
```tsx
const CustomLogout = () => {
  const handleCustomLogout = async () => {
    try {
      // Custom pre-logout logic
      await saveUserPreferences();
      
      // Call logout API
      await fetch('/api/logout', { method: 'POST' });
      
      // Clear application state
      clearAppState();
      
      // Navigate with custom parameters
      router.push('/login?reason=manual');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <button onClick={handleCustomLogout}>
      Custom Logout
    </button>
  );
};
```

### Integration with State Management
```tsx
const ReduxLogout = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    // Clear Redux state
    dispatch(clearUserData());
    dispatch(resetAppState());
    
    // Use default logout component
    return <Logout />;
  };
  
  return handleLogout();
};
```

## 🔗 Related Components

- [Dialog](./Dialog.md) - Modal dialogs for confirmations
- [DeleteConfirmationModal](./DeleteConfirmationModal.md) - Confirmation modal pattern
- [SessionHandleProvider](./SessionHandleProvider.md) - Session management provider
- [LoginForm](./LoginForm.md) - User authentication component
- [PasswordField](./PasswordField.md) - Secure password input field

