import React from "react";

interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  repo_path: string;
}

const ComponentLists = () => {
  const components: ComponentInfo[] = [
    // Forms
    {
      name: "ActionDropdown",
      description: "Dropdown component for actions",
      category: "Forms",
      repo_path: "src/components/forms/ActionDropdown.tsx",
    },
    {
      name: "AnimatedBox",
      description: "Animated container component",
      category: "Forms",
      repo_path: "src/components/forms/AnimatedBox.tsx",
    },
    {
      name: "PasswordField",
      description: "Secure password input field",
      category: "Forms",
      repo_path: "src/components/forms/PasswordField.tsx",
    },
    {
      name: "DateInput",
      description: "Date selection input field",
      category: "Forms",
      repo_path: "src/components/forms/DateInput.tsx",
    },
    {
      name: "DateTimeInput",
      description: "Date and time selection input field",
      category: "Forms",
      repo_path: "src/components/forms/DateTimeInput.tsx",
    },
    {
      name: "DropFile",
      description: "File drag and drop component",
      category: "Forms",
      repo_path: "src/components/forms/DropFile.tsx",
    },
    {
      name: "EmailList",
      description: "Email list display component",
      category: "Forms",
      repo_path: "src/components/forms/EmailList.tsx",
    },
    {
      name: "FilterArray",
      description: "Array filtering component",
      category: "Forms",
      repo_path: "src/components/forms/FilterArray.tsx",
    },
    {
      name: "FilterBy",
      description: "Filtering component with criteria",
      category: "Forms",
      repo_path: "src/components/forms/FilterBy.tsx",
    },
    {
      name: "FilterObjects",
      description: "Object filtering component",
      category: "Forms",
      repo_path: "src/components/forms/FilterObjects.tsx",
    },
    {
      name: "FormError",
      description: "Form error display component",
      category: "Forms",
      repo_path: "src/components/forms/FormError.tsx",
    },
    {
      name: "HandleError",
      description: "Error handling component",
      category: "Forms",
      repo_path: "src/components/forms/HandleError.tsx",
    },
    {
      name: "Logout",
      description: "Logout functionality component",
      category: "Forms",
      repo_path: "src/components/forms/Logout.tsx",
    },
    {
      name: "MessageDisplay",
      description: "Message display component",
      category: "Forms",
      repo_path: "src/components/forms/MessageDisplay.tsx",
    },
    {
      name: "MultipleEmail",
      description: "Multiple email input component",
      category: "Forms",
      repo_path: "src/components/forms/MultipleEmail.tsx",
    },
    {
      name: "PageLoading",
      description: "Page loading indicator component",
      category: "Forms",
      repo_path: "src/components/forms/PageLoading.tsx",
    },
    {
      name: "PhoneNumberInput",
      description: "Phone number input with formatting",
      category: "Forms",
      repo_path: "src/components/forms/PhoneNumberInput.tsx",
    },
    {
      name: "RadioField",
      description: "Radio button input field",
      category: "Forms",
      repo_path: "src/components/forms/RadioField.tsx",
    },
    {
      name: "RadioSimple",
      description: "Simplified radio button component",
      category: "Forms",
      repo_path: "src/components/forms/RadioSimple.tsx",
    },
    {
      name: "ReactTimeAgo",
      description: "Time ago display component",
      category: "Forms",
      repo_path: "src/components/forms/ReactTimeAgo.tsx",
    },
    {
      name: "ReadTermsAndCondition",
      description: "Terms and conditions acceptance component",
      category: "Forms",
      repo_path: "src/components/forms/ReadTermsAndCondition.tsx",
    },
    {
      name: "SearchField",
      description: "Search input field component",
      category: "Forms",
      repo_path: "src/components/forms/SearchField.tsx",
    },
    {
      name: "SearchFieldDB",
      description: "Database search field component",
      category: "Forms",
      repo_path: "src/components/forms/SearchFieldDB.tsx",
    },
    {
      name: "StepProgressBar",
      description: "Step progress indicator component",
      category: "Forms",
      repo_path: "src/components/forms/StepProgressBar.tsx",
    },
    {
      name: "SubmitButton",
      description: "Form submission button component",
      category: "Forms",
      repo_path: "src/components/forms/SubmitButton.tsx",
    },
    {
      name: "Tables",
      description: "Table display component",
      category: "Forms",
      repo_path: "src/components/forms/Tables.tsx",
    },
    {
      name: "TextArea",
      description: "Multi-line text input component",
      category: "Forms",
      repo_path: "src/components/forms/TextArea.tsx",
    },
    {
      name: "TextField",
      description: "Text input field component",
      category: "Forms",
      repo_path: "src/components/forms/TextField.tsx",
    },
    {
      name: "Tooltip",
      description: "Tooltip display component",
      category: "Forms",
      repo_path: "src/components/forms/Tooltip.tsx",
    },
    {
      name: "UnsplashRandomImage",
      description: "Random image from Unsplash component",
      category: "Forms",
      repo_path: "src/components/forms/UnsplashRandomImage.tsx",
    },
    {
      name: "DownloadAsExcel",
      description: "Excel download functionality component",
      category: "Forms",
      repo_path: "src/components/forms/DownloadAsExcel.tsx",
    },
    {
      name: "THeadSortBtn",
      description: "Table header sort button component",
      category: "Forms",
      repo_path: "src/components/forms/THeadSortBtn.tsx",
    },
    {
      name: "THeadSortList",
      description: "Table header sort list component",
      category: "Forms",
      repo_path: "src/components/forms/THeadSortList.tsx",
    },
    {
      name: "TBodyNoData",
      description: "Table body empty state component",
      category: "Forms",
      repo_path: "src/components/forms/TBodyNoData.tsx",
    },
    {
      name: "FileUploader",
      description: "File upload component",
      category: "Forms",
      repo_path: "src/components/forms/uploads/FileUploader.tsx",
    },
    {
      name: "IhubFileUploader",
      description: "InstinctHub file upload component",
      category: "Forms",
      repo_path: "src/components/forms/uploads/IhubFileUploader.tsx",
    },
    {
      name: "ActionCallbackDropdown",
      description: "Action callback dropdown component",
      category: "Forms",
      repo_path: "src/components/forms/ActionCallbackDropdown.tsx",
    },
    {
      name: "InputNumber",
      description: "InputNumber component for numerical input",
      category: "Form",
      repo_path: "src/components/forms/InputNumber.tsx",
    },
    {
      name: "InputText",
      description: "InputText component for text input",
      category: "Form",
      repo_path: "src/components/forms/InputText.tsx",
    },
    {
      name: "InputTextarea",
      description: "InputTextarea component for text input",
      category: "Form",
      repo_path: "src/components/forms/InputTextarea.tsx",
    },
    {
      name: "SearchObjectsFromDB",
      description:
        "SearchObjectsFromDB component for searching objects from database",
      category: "Form",
      repo_path: "src/components/forms/SearchObjectsFromDB.tsx",
    },
    {
      name: "ToggleButton",
      description: "ToggleButton component for changing state.",
      category: "Form",
      repo_path: "src/components/forms/ToggleButton.tsx",
    },
    {
      name: "DateInputPicker",
      description: "DateInputPicker component for picking date and time.",
      category: "Form",
      repo_path: "src/components/forms/DateInputPicker.tsx",
    },
    {
      name: "ChipsInput",
      description:
        "ChipsInput is used to enter multiple values on an input field.",
      category: "Form",
      repo_path: "src/components/forms/ChipsInput.tsx",
    },
    {
      name: "RadioButton",
      description:
        "RadioButton is used to enter single value on an input field.",
      category: "Form",
      repo_path: "src/components/forms/radio-btn/RadioButton.tsx",
    },
    {
      name: "RadioGroup",
      description:
        "RadioGroup is used to select each from group value on an input field.",
      category: "Form",
      repo_path: "src/components/forms/radio-btn/RadioGroup.tsx",
    },
    {
      name: "InputAmount",
      description: "InputAmount is used to enter amount on an input field.",
      category: "Form",
      repo_path: "src/components/forms/InputAmount.tsx",
    },
    {
      name: "CheckBoxes",
      description: "CheckBoxes is used to enter multiple values on an input field.",
      category: "Form",
      repo_path: "src/components/forms/CheckBoxes.tsx",
    },
    {
      name: "CheckBoxesField",
      description: "CheckBoxesField is used to enter multiple values on an input field.",
      category: "Form",
      repo_path: "src/components/forms/CheckboxesField.tsx",
    },

    // Auth
    {
      name: "IsUsernameEmailTaken",
      description: "Username/email availability checker",
      category: "Auth",
      repo_path: "src/components/auth/IsUsernameEmailTaken.tsx",
    },
    {
      name: "ClientDetector",
      description: "Client device detection component",
      category: "Auth",
      repo_path: "src/components/auth/ClientDetector.tsx",
    },
    {
      name: "PasswordsMatch",
      description: "Password matching validation component",
      category: "Auth",
      repo_path: "src/components/auth/PasswordsMatch.tsx",
    },
    {
      name: "FromInstinctHub",
      description: "From InstinctHub component",
      category: "Auth",
      repo_path: "src/components/auth/FromInstinctHub.tsx",
    },
    {
      name: "LoginForm",
      description: "Login form component",
      category: "Auth",
      repo_path: "src/components/auth/LoginForm.tsx",
    },
    

    // Navbar
    {
      name: "ChannelListAvatar",
      description: "Channel list avatar component",
      category: "Navbar",
      repo_path: "src/components/navbar/ChannelListAvatar.tsx",
    },
    {
      name: "MenuDropdown",
      description: "Menu dropdown component",
      category: "Navbar",
      repo_path: "src/components/navbar/MenuDropdown.tsx",
    },
    {
      name: "Breadcrumb",
      description: "Breadcrumb component",
      category: "Navbar",
      repo_path: "src/components/navbar/Breadcrumb.tsx",
    },
    {
      name: "ResponsiveNavbar",
      description: "Responsive navbar component",
      category: "Navbar",
      repo_path: "src/components/navbar/ResponsiveNavbar.tsx",
    },
    {
      name: "SideNavbar",
      description: "Side navbar component",
      category: "Navbar",
      repo_path: "src/components/navbar/SideNavbar.tsx",
    },

    // UI
    {
      name: "CustomTextEditor",
      description: "Custom text editor component",
      category: "UI",
      repo_path: "src/components/ui/editor/CustomTextEditor.tsx",
    },
    {
      name: "ContentViewer",
      description: "Content viewer component",
      category: "UI",
      repo_path: "src/components/ui/viewer/ContentViewer.tsx",
    },
    {
      name: "ContentViewOrEdit",
      description: "Content view or edit component",
      category: "UI",
      repo_path: "src/components/ui/viewer/ContentViewOrEdit.tsx",
    },
    {
      name: "CodeDisplay",
      description: "Code display component",
      category: "UI",
      repo_path: "src/components/ui/viewer/CodeDisplay.tsx",
    },
    {
      name: "IHubTable",
      description: "InstinctHub table component",
      category: "UI",
      repo_path: "src/components/ui/tables/IHubTable.tsx",
    },
    {
      name: "IHubTableServer",
      description: "InstinctHub server table component",
      category: "UI",
      repo_path: "src/components/ui/tables/IHubTableServer.tsx",
    },
    {
      name: "OrDivider",
      description: "Or divider component",
      category: "UI",
      repo_path: "src/components/ui/OrDivider.tsx",
    },
    {
      name: "Card",
      description: "Card component",
      category: "UI",
      repo_path: "src/components/ui/cards/Card.tsx",
    },
    {
      name: "CardList",
      description: "Card list component",
      category: "UI",
      repo_path: "src/components/ui/cards/CardList.tsx",
    },
    {
      name: "CardGrid",
      description: "Card grid component",
      category: "UI",
      repo_path: "src/components/ui/cards/CardGrid.tsx",
    },
    {
      name: "HorizontalCard",
      description: "Horizontal card component",
      category: "UI",
      repo_path: "src/components/ui/cards/HorizontalCard.tsx",
    },
    {
      name: "FeatureCard",
      description: "Feature card component",
      category: "UI",
      repo_path: "src/components/ui/cards/FeatureCard.tsx",
    },
    {
      name: "MediaCard",
      description: "Media card component",
      category: "UI",
      repo_path: "src/components/ui/cards/MediaCard.tsx",
    },
    {
      name: "PricingCard",
      description: "Pricing card component",
      category: "UI",
      repo_path: "src/components/ui/cards/PricingCard.tsx",
    },
    {
      name: "ProfileCard",
      description: "Profile card component",
      category: "UI",
      repo_path: "src/components/ui/cards/ProfileCard.tsx",
    },
    {
      name: "RandomGradientImage",
      description: "Random gradient image component",
      category: "UI",
      repo_path: "src/components/ui/images/RandomGradientImage.tsx",
    },
    {
      name: "Dialog",
      description: "A reusable dialog component",
      category: "UI",
      repo_path: "src/components/ui/dialogs/Dialog.tsx",
    },
    {
      name: "Badge",
      description: "A reusable Badge component",
      category: "UI",
      repo_path: "src/components/ui/Badge.tsx",
    },
    {
      name: "Action",
      description: "A reusable Action component",
      category: "UI",
      repo_path: "src/components/ui/Action.tsx",
    },
    {
      name: "Dropdown",
      description: "A reusable Dropdown component",
      category: "UI",
      repo_path: "src/components/ui/Dropdown.tsx",
    },
    {
      name: "ColorPicker",
      description: "A reusable ColorPicker component",
      category: "UI",
      repo_path: "src/components/ui/ColorPicker.tsx",
    },
    {
      name: "Pagination",
      description: "A reusable Pagination component",
      category: "UI",
      repo_path: "src/components/ui/pagination/Pagination.tsx",
    },
    {
      name: "PaginationDemo",
      description: "A demo for the Pagination component",
      category: "UI",
      repo_path: "src/components/ui/pagination/PaginationDemo.tsx",
    },
    {
      name: "CreateButton",
      description: "A reusable CreateButton component",
      category: "UI",
      repo_path: "src/components/ui/create-button/CreateButton.tsx",
    },
    {
      name: "CreateButtonExample",
      description: "An example of the CreateButton component",
      category: "UI",
      repo_path: "src/components/ui/create-button/CreateButtonExample.tsx",
    },

    // Theme
    {
      name: "ChangeStyleVariable",
      description: "Style variable changer component",
      category: "Theme",
      repo_path: "src/components/theme/ChangeStyleVariable.tsx",
    },
    {
      name: "DarkModeProvider",
      description: "Dark mode provider component",
      category: "Theme",
      repo_path: "src/components/theme/DarkModeProvider.tsx",
    },
    {
      name: "LoadingAnimate",
      description: "Loading animation component",
      category: "Theme",
      repo_path: "src/components/theme/LoadingAnimate.tsx",
    },
    {
      name: "SessionProviders",
      description: "Session providers component",
      category: "Theme",
      repo_path: "src/components/theme/SessionProviders.tsx",
    },
    {
      name: "SessionExpiresLogout",
      description: "Session expiration logout component",
      category: "Theme",
      repo_path: "src/components/theme/signout/SessionExpiresLogout.tsx",
    },
    {
      name: "SignOutSession",
      description: "Sign out session component",
      category: "Theme",
      repo_path: "src/components/theme/signout/SignOutSession.tsx",
    },

    // Status
    {
      name: "TimeTracker",
      description: "Time tracking component",
      category: "Status",
      repo_path: "src/components/status/ReactTimeTracker.tsx",
    },
    {
      name: "SessionHandleProvider",
      description: "Session handling provider component",
      category: "Status",
      repo_path: "src/components/status/SessionHandleProvider.tsx",
    },
    {
      name: "Error500",
      description: "500 error display component",
      category: "Status",
      repo_path: "src/components/status/Error500.tsx",
    },
    {
      name: "ErrorState",
      description: "Error state display component",
      category: "Status",
      repo_path: "src/components/status/ErrorState.tsx",
    },
    {
      name: "ReactTimeTracker",
      description: "React time tracking component",
      category: "Status",
      repo_path: "src/components/status/ReactTimeTracker.tsx",
    },
    {
      name: "DeleteConfirmationModal",
      description: "Delete confirmation modal component",
      category: "Status",
      repo_path: "src/components/status/DeleteConfirmationModal.tsx",
    },
    {
      name: "CopyToClipboard",
      description: "Copy to clipboard functionality component",
      category: "Status",
      repo_path: "src/components/status/CopyToClipBoard.tsx",
    },
    {
      name: "MultiPurposeModal",
      description: "Multi-purpose modal component",
      category: "Status",
      repo_path: "src/components/status/MultiPurposeModal.tsx",
    },
    {
      name: "ModalExamples",
      description: "Modal examples component",
      category: "Status",
      repo_path: "src/components/status/ModalExamples.tsx",
    },
    {
      name: "NotFound",
      description: "Not found component",
      category: "Status",
      repo_path: "src/components/status/NotFound.tsx",
    },
    {
      name: "Unauthorized",
      description: "Unauthorized component",
      category: "Status",
      repo_path: "src/components/status/Unauthorized.tsx",
    },

    // Tabs
    {
      name: "Tabs",
      description: "Tab navigation component",
      category: "Tabs",
      repo_path: "src/components/tabs/Tabs.tsx",
    },
    {
      name: "VeriticalTabs",
      description: "Vertical tab navigation component",
      category: "Tabs",
      repo_path: "src/components/tabs/VerticalTabs.tsx",
    },
    {
      name: "TabContent",
      description: "Tab content display component",
      category: "Tabs",
      repo_path: "src/components/tabs/TabContent.tsx",
    },
  ];

  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, ComponentInfo[]>);

  const baseRepoUrl =
    "https://github.com/instincthub/instincthub-react-ui/blob/main/";

  return (
    <div className="ihub-component-lists">
      <h1 className="ihub-component-lists-title">
        InstinctHub React UI Components
      </h1>
      <p className="ihub-component-lists-description">
        A comprehensive list of all available components in the InstinctHub
        React UI library.
      </p>

      {Object.entries(groupedComponents).map(
        ([category, categoryComponents]) => (
          <div key={category} className="ihub-component-category">
            <h2 className="ihub-component-category-title">{category}</h2>
            <div className="ihub-component-grid">
              {categoryComponents.map((component) => (
                <div key={component.name} className="ihub-component-card">
                  <h3 className="ihub-component-name">{component.name}</h3>
                  <p className="ihub-component-description">
                    {component.description}
                  </p>
                  <a
                    href={`${baseRepoUrl}${component.repo_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ihub-component-link"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        `${baseRepoUrl}${component.repo_path}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    View in Repository
                  </a>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ComponentLists;
