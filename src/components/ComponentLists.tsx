import React from 'react';

interface ComponentInfo {
  name: string;
  description: string;
  category: string;
}

const ComponentLists= () => {
  const components: ComponentInfo[] = [
    // Forms
    { name: 'ActionDropdown', description: 'Dropdown component for actions', category: 'Forms' },
    { name: 'AnimatedBox', description: 'Animated container component', category: 'Forms' },
    { name: 'PasswordField', description: 'Secure password input field', category: 'Forms' },
    { name: 'DateInput', description: 'Date selection input field', category: 'Forms' },
    { name: 'DateTimeInput', description: 'Date and time selection input field', category: 'Forms' },
    { name: 'DropFile', description: 'File drag and drop component', category: 'Forms' },
    { name: 'EmailList', description: 'Email list display component', category: 'Forms' },
    { name: 'FilterArray', description: 'Array filtering component', category: 'Forms' },
    { name: 'FilterBy', description: 'Filtering component with criteria', category: 'Forms' },
    { name: 'FilterObjects', description: 'Object filtering component', category: 'Forms' },
    { name: 'FormError', description: 'Form error display component', category: 'Forms' },
    { name: 'HandleError', description: 'Error handling component', category: 'Forms' },
    { name: 'Logout', description: 'Logout functionality component', category: 'Forms' },
    { name: 'MessageDisplay', description: 'Message display component', category: 'Forms' },
    { name: 'MultipleEmail', description: 'Multiple email input component', category: 'Forms' },
    { name: 'PageLoading', description: 'Page loading indicator component', category: 'Forms' },
    { name: 'PhoneNumberInput', description: 'Phone number input with formatting', category: 'Forms' },
    { name: 'RadioField', description: 'Radio button input field', category: 'Forms' },
    { name: 'RadioSimple', description: 'Simplified radio button component', category: 'Forms' },
    { name: 'ReactTimeAgo', description: 'Time ago display component', category: 'Forms' },
    { name: 'ReadTermsAndCondition', description: 'Terms and conditions acceptance component', category: 'Forms' },
    { name: 'SearchField', description: 'Search input field component', category: 'Forms' },
    { name: 'SearchFieldDB', description: 'Database search field component', category: 'Forms' },
    { name: 'StepProgressBar', description: 'Step progress indicator component', category: 'Forms' },
    { name: 'SubmitButton', description: 'Form submission button component', category: 'Forms' },
    { name: 'Tables', description: 'Table display component', category: 'Forms' },
    { name: 'TextArea', description: 'Multi-line text input component', category: 'Forms' },
    { name: 'TextField', description: 'Text input field component', category: 'Forms' },
    { name: 'Tooltip', description: 'Tooltip display component', category: 'Forms' },
    { name: 'UnsplashRandomImage', description: 'Random image from Unsplash component', category: 'Forms' },
    { name: 'DownloadAsExcel', description: 'Excel download functionality component', category: 'Forms' },
    { name: 'THeadSortBtn', description: 'Table header sort button component', category: 'Forms' },
    { name: 'THeadSortList', description: 'Table header sort list component', category: 'Forms' },
    { name: 'TBodyNoData', description: 'Table body empty state component', category: 'Forms' },
    { name: 'FileUploader', description: 'File upload component', category: 'Forms' },
    { name: 'IhubFileUploader', description: 'InstinctHub file upload component', category: 'Forms' },

    // Auth
    { name: 'IsUsernameEmailTaken', description: 'Username/email availability checker', category: 'Auth' },
    { name: 'ClientDetector', description: 'Client device detection component', category: 'Auth' },
    { name: 'PasswordsMatch', description: 'Password matching validation component', category: 'Auth' },

    // Navbar
    { name: 'ChannelListAvatar', description: 'Channel list avatar component', category: 'Navbar' },
    { name: 'MenuDropdown', description: 'Menu dropdown component', category: 'Navbar' },

    // UI
    { name: 'CustomTextEditor', description: 'Custom text editor component', category: 'UI' },
    { name: 'ContentViewer', description: 'Content viewer component', category: 'UI' },
    { name: 'ContentViewOrEdit', description: 'Content view or edit component', category: 'UI' },
    { name: 'CodeDisplay', description: 'Code display component', category: 'UI' },

    // Theme
    { name: 'ChangeStyleVariable', description: 'Style variable changer component', category: 'Theme' },
    { name: 'DarkModeProvider', description: 'Dark mode provider component', category: 'Theme' },
    { name: 'LoadingAnimate', description: 'Loading animation component', category: 'Theme' },
    { name: 'SessionProviders', description: 'Session providers component', category: 'Theme' },
    { name: 'SessionExpiresLogout', description: 'Session expiration logout component', category: 'Theme' },
    { name: 'SignOutSession', description: 'Sign out session component', category: 'Theme' },

    // Status
    { name: 'TimeTracker', description: 'Time tracking component', category: 'Status' },
    { name: 'SessionHandleProvider', description: 'Session handling provider component', category: 'Status' },
    { name: 'Error500', description: '500 error display component', category: 'Status' },
    { name: 'ErrorState', description: 'Error state display component', category: 'Status' },
    { name: 'ReactTimeTracker', description: 'React time tracking component', category: 'Status' },
    { name: 'DeleteConfirmationModal', description: 'Delete confirmation modal component', category: 'Status' },
    { name: 'CopyToClipboard', description: 'Copy to clipboard functionality component', category: 'Status' },
    { name: 'MultiPurposeModal', description: 'Multi-purpose modal component', category: 'Status' },
    { name: 'ModalExamples', description: 'Modal examples component', category: 'Status' },

    // Tabs
    { name: 'Tabs', description: 'Tab navigation component', category: 'Tabs' },
    { name: 'VeriticalTabs', description: 'Vertical tab navigation component', category: 'Tabs' },
    { name: 'TabContent', description: 'Tab content display component', category: 'Tabs' },
  ];

  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, ComponentInfo[]>);

  const repoUrl = 'https://github.com/instincthub/instincthub-react-ui.git';

  return (
    <div className="ihub-component-lists">
      <h1 className="ihub-component-lists-title">InstinctHub React UI Components</h1>
      <p className="ihub-component-lists-description">
        A comprehensive list of all available components in the InstinctHub React UI library.
      </p>
      
      {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
        <div key={category} className="ihub-component-category">
          <h2 className="ihub-component-category-title">{category}</h2>
          <div className="ihub-component-grid">
            {categoryComponents.map((component) => (
              <div key={component.name} className="ihub-component-card">
                <h3 className="ihub-component-name">{component.name}</h3>
                <p className="ihub-component-description">{component.description}</p>
                <a 
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ihub-component-link"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(repoUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  View in Repository
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentLists; 