"use client";
import { Check, Copy } from "lucide-react";
import React, { useState, useMemo } from "react";

interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  repo_path: string;
  example_path: string;
  visual_demo_url?: string;
}

const ComponentLists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const components: ComponentInfo[] = [
    // Forms
    {
      name: "FormComponent",
      description: "Reusable form component for user input",
      category: "Forms",
      repo_path: "src/components/forms",
      example_path: "docs/static-docs/examples/FormComponent.md",
      visual_demo_url: "https://ui.instincthub.com/components/auth/signup-form",
    },
    {
      name: "ActionDropdown",
      description: "Dropdown component for actions",
      category: "Forms",
      repo_path: "src/components/forms/ActionDropdown.tsx",
      example_path: "docs/static-docs/components/ActionDropdown.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/action-dropdown",
    },
    {
      name: "AnimatedBox",
      description: "Animated container component",
      category: "Forms",
      repo_path: "src/components/forms/AnimatedBox.tsx",
      example_path: "docs/static-docs/components/AnimatedBox.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/animated-box",
    },
    {
      name: "PasswordField",
      description: "Secure password input field",
      category: "Forms",
      repo_path: "src/components/forms/PasswordField.tsx",
      example_path: "docs/static-docs/components/PasswordField.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/password-field",
    },
    {
      name: "DateInput",
      description: "Date selection input field",
      category: "Forms",
      repo_path: "src/components/forms/DateInput.tsx",
      example_path: "docs/static-docs/components/DateInput.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/date-input",
    },
    {
      name: "DateTimeInput",
      description: "Date and time selection input field",
      category: "Forms",
      repo_path: "src/components/forms/DateTimeInput.tsx",
      example_path: "docs/static-docs/components/DateTimeInput.md",
    },
    {
      name: "DateTimePicker",
      description: "Modern date and time picker with calendar popup",
      category: "Forms",
      repo_path: "src/components/forms/DateTimePicker.tsx",
      example_path: "docs/static-docs/components/DateTimePicker.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/time-picker",
    },
    {
      name: "DropFile",
      description: "File drag and drop component",
      category: "Forms",
      repo_path: "src/components/forms/DropFile.tsx",
      example_path: "docs/static-docs/components/DropFile.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/drop-file",
    },
    {
      name: "EmailList",
      description: "Email list display component",
      category: "Forms",
      repo_path: "src/components/forms/EmailList.tsx",
      example_path: "docs/static-docs/components/EmailList.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/email-list",
    },
    {
      name: "FilterArray",
      description: "Array filtering component",
      category: "Forms",
      repo_path: "src/components/forms/FilterArray.tsx",
      example_path: "docs/static-docs/components/FilterArray.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/filter-array",
    },
    {
      name: "FilterBy",
      description: "Filtering component with criteria",
      category: "Forms",
      repo_path: "src/components/forms/FilterBy.tsx",
      example_path: "docs/static-docs/components/FilterBy.md",
    },
    {
      name: "FilterObjects",
      description: "Object filtering component",
      category: "Forms",
      repo_path: "src/components/forms/FilterObjects.tsx",
      example_path: "docs/static-docs/components/FilterObjects.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/filter-objects",
    },
    {
      name: "FormError",
      description: "Form error display component",
      category: "Forms",
      repo_path: "src/components/forms/FormError.tsx",
      example_path: "docs/static-docs/components/FormError.md",
    },
    {
      name: "HandleError",
      description: "Error handling component",
      category: "Forms",
      repo_path: "src/components/forms/HandleError.tsx",
      example_path: "docs/static-docs/components/HandleError.md",
    },
    {
      name: "Logout",
      description: "Logout functionality component",
      category: "Forms",
      repo_path: "src/components/forms/Logout.tsx",
      example_path: "docs/static-docs/components/Logout.md",
    },
    {
      name: "MessageDisplay",
      description: "Message display component",
      category: "Forms",
      repo_path: "src/components/forms/MessageDisplay.tsx",
      example_path: "docs/static-docs/components/MessageDisplay.md",
    },
    {
      name: "MultipleEmail",
      description: "Multiple email input component",
      category: "Forms",
      repo_path: "src/components/forms/MultipleEmail.tsx",
      example_path: "docs/static-docs/components/MultipleEmail.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/multiple-email",
    },
    {
      name: "PageLoading",
      description: "Page loading indicator component",
      category: "Forms",
      repo_path: "src/components/forms/PageLoading.tsx",
      example_path: "docs/static-docs/components/PageLoading.md",
    },
    {
      name: "PhoneNumberInput",
      description: "Phone number input with formatting",
      category: "Forms",
      repo_path: "src/components/forms/PhoneNumberInput.tsx",
      example_path: "docs/static-docs/components/PhoneNumberInput.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/phone-number-input",
    },
    {
      name: "RadioField",
      description: "Radio button input field",
      category: "Forms",
      repo_path: "src/components/forms/RadioField.tsx",
      example_path: "docs/static-docs/components/RadioField.md",
    },
    {
      name: "RadioSimple",
      description: "Simplified radio button component",
      category: "Forms",
      repo_path: "src/components/forms/RadioSimple.tsx",
      example_path: "docs/static-docs/components/RadioSimple.md",
    },
    {
      name: "ReactTimeAgo",
      description: "Time ago display component",
      category: "Forms",
      repo_path: "src/components/forms/ReactTimeAgo.tsx",
      example_path: "docs/static-docs/components/ReactTimeAgo.md",
    },
    {
      name: "ReadTermsAndCondition",
      description: "Terms and conditions acceptance component",
      category: "Forms",
      repo_path: "src/components/forms/ReadTermsAndCondition.tsx",
      example_path: "docs/static-docs/components/ReadTermsAndCondition.md",
    },
    {
      name: "SearchField",
      description: "Search input field component",
      category: "Forms",
      repo_path: "src/components/forms/SearchField.tsx",
      example_path: "docs/static-docs/components/SearchField.md",
    },
    {
      name: "SearchFieldDB",
      description: "Database search field component",
      category: "Forms",
      repo_path: "src/components/forms/SearchFieldDB.tsx",
      example_path: "docs/static-docs/components/SearchFieldDB.md",
    },
    {
      name: "StepProgressBar",
      description: "Step progress indicator component",
      category: "Forms",
      repo_path: "src/components/forms/StepProgressBar.tsx",
      example_path: "docs/static-docs/components/StepProgressBar.md",
    },
    {
      name: "SubmitButton",
      description: "Form submission button component",
      category: "Forms",
      repo_path: "src/components/forms/SubmitButton.tsx",
      example_path: "docs/static-docs/components/SubmitButton.md",
    },
    {
      name: "Tables",
      description: "Table display component",
      category: "Forms",
      repo_path: "src/components/forms/Tables.tsx",
      example_path: "docs/static-docs/components/Tables.md",
    },
    {
      name: "TextArea",
      description: "Multi-line text input component",
      category: "Forms",
      repo_path: "src/components/forms/TextArea.tsx",
      example_path: "docs/static-docs/components/TextArea.md",
    },
    {
      name: "TextField",
      description: "Text input field component",
      category: "Forms",
      repo_path: "src/components/forms/TextField.tsx",
      example_path: "docs/static-docs/components/TextField.md",
    },
    {
      name: "Tooltip",
      description: "Tooltip display component",
      category: "Forms",
      repo_path: "src/components/forms/Tooltip.tsx",
      example_path: "docs/static-docs/components/Tooltip.md",
    },
    {
      name: "UnsplashRandomImage",
      description: "Random image from Unsplash component",
      category: "Forms",
      repo_path: "src/components/forms/UnsplashRandomImage.tsx",
      example_path: "docs/static-docs/components/UnsplashRandomImage.md",
    },
    {
      name: "DownloadAsExcel",
      description: "Excel download functionality component",
      category: "Forms",
      repo_path: "src/components/forms/DownloadAsExcel.tsx",
      example_path: "docs/static-docs/components/DownloadAsExcel.md",
    },
    {
      name: "THeadSortBtn",
      description: "Table header sort button component",
      category: "Forms",
      repo_path: "src/components/forms/THeadSortBtn.tsx",
      example_path: "docs/static-docs/components/THeadSortBtn.md",
    },
    {
      name: "THeadSortList",
      description: "Table header sort list component",
      category: "Forms",
      repo_path: "src/components/forms/THeadSortList.tsx",
      example_path: "docs/static-docs/components/THeadSortList.md",
    },
    {
      name: "TBodyNoData",
      description: "Table body empty state component",
      category: "Forms",
      repo_path: "src/components/forms/TBodyNoData.tsx",
      example_path: "docs/static-docs/components/TBodyNoData.md",
    },
    {
      name: "FileUploader",
      description: "File upload component",
      category: "Forms",
      repo_path: "src/components/forms/uploads/FileUploader.tsx",
      example_path: "docs/static-docs/components/FileUploader.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/file-uploader",
    },
    {
      name: "IhubFileUploader",
      description: "InstinctHub file upload component",
      category: "Forms",
      repo_path: "src/components/forms/uploads/IhubFileUploader.tsx",
      example_path: "docs/static-docs/components/IhubFileUploader.md",
    },
    {
      name: "ActionCallbackDropdown",
      description: "Action callback dropdown component",
      category: "Forms",
      repo_path: "src/components/forms/ActionCallbackDropdown.tsx",
      example_path: "docs/static-docs/components/ActionCallbackDropdown.md",
    },
    {
      name: "InputNumber",
      description: "InputNumber component for numerical input",
      category: "Form",
      repo_path: "src/components/forms/InputNumber.tsx",
      example_path: "docs/static-docs/components/InputNumber.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/input-number",
    },
    {
      name: "InputText",
      description: "InputText component for text input",
      category: "Form",
      repo_path: "src/components/forms/InputText.tsx",
      example_path: "docs/static-docs/components/InputText.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/input-text",
    },
    {
      name: "InputTextarea",
      description: "InputTextarea component for text input",
      category: "Form",
      repo_path: "src/components/forms/InputTextarea.tsx",
      example_path: "docs/static-docs/components/InputTextarea.md",
      visual_demo_url: "https://ui.instincthub.com/components/forms/input-textarea",
    },
    {
      name: "SearchObjectsFromDB",
      description:
        "SearchObjectsFromDB component for searching objects from database",
      category: "Form",
      repo_path: "src/components/forms/SearchObjectsFromDB.tsx",
      example_path: "docs/static-docs/components/SearchObjectsFromDB.md",
    },
    {
      name: "ToggleButton",
      description: "ToggleButton component for changing state.",
      category: "Form",
      repo_path: "src/components/forms/ToggleButton.tsx",
      example_path: "docs/static-docs/components/ToggleButton.md",
    },
    {
      name: "DateInputPicker",
      description: "DateInputPicker component for picking date and time.",
      category: "Form",
      repo_path: "src/components/forms/DateInputPicker.tsx",
      example_path: "docs/static-docs/components/DateInputPicker.md",
    },
    {
      name: "TimePicker",
      description:
        "TimePicker component for selecting time with 12/24-hour format support.",
      category: "Form",
      repo_path: "src/components/forms/TimePicker.tsx",
      example_path: "docs/static-docs/components/TimePicker.md",
    },
    {
      name: "ChipsInput",
      description:
        "ChipsInput is used to enter multiple values on an input field.",
      category: "Form",
      repo_path: "src/components/forms/ChipsInput.tsx",
      example_path: "docs/static-docs/components/ChipsInput.md",
    },
    {
      name: "RadioButton",
      description:
        "RadioButton is used to enter single value on an input field.",
      category: "Form",
      repo_path: "src/components/forms/radio-btn/RadioButton.tsx",
      example_path: "docs/static-docs/components/RadioButton.md",
    },
    {
      name: "RadioGroup",
      description:
        "RadioGroup is used to select each from group value on an input field.",
      category: "Form",
      repo_path: "src/components/forms/radio-btn/RadioGroup.tsx",
      example_path: "docs/static-docs/components/RadioGroup.md",
    },
    {
      name: "InputAmount",
      description: "InputAmount is used to enter amount on an input field.",
      category: "Form",
      repo_path: "src/components/forms/InputAmount.tsx",
      example_path: "docs/static-docs/components/InputAmount.md",
    },
    {
      name: "CheckBoxes",
      description:
        "CheckBoxes is used to enter multiple values on an input field.",
      category: "Form",
      repo_path: "src/components/forms/CheckBoxes.tsx",
      example_path: "docs/static-docs/components/CheckBoxes.md",
    },
    {
      name: "CheckBoxesField",
      description:
        "CheckBoxesField is used to enter multiple values on an input field.",
      category: "Form",
      repo_path: "src/components/forms/CheckboxesField.tsx",
      example_path: "docs/static-docs/components/CheckBoxesField.md",
    },
    {
      name: "CountryInput",
      description: "Searchable country selector input field",
      category: "Form",
      repo_path: "src/components/forms/CountryInput.tsx",
      example_path: "docs/static-docs/components/CountryInput.md",
    },
    {
      name: "CountryStateInput",
      description:
        "Searchable state/province selector based on selected country",
      category: "Form",
      repo_path: "src/components/forms/CountryStateInput.tsx",
      example_path: "docs/static-docs/components/CountryStateInput.md",
    },
    {
      name: "InputSearchDropdown",
      description: "Generic searchable dropdown component for organizations",
      category: "Form",
      repo_path: "src/components/forms/InputSearchDropdown.tsx",
      example_path: "docs/static-docs/components/InputSearchDropdown.md",
    },
    {
      name: "RangeRadio",
      description:
        "Range radio button component for selecting values within a range",
      category: "Form",
      repo_path: "src/components/forms/RangeRadio.tsx",
      example_path: "docs/static-docs/components/RangeRadio.md",
    },

    // Auth
    {
      name: "IsUsernameEmailTaken",
      description: "Username/email availability checker",
      category: "Auth",
      repo_path: "src/components/auth/IsUsernameEmailTaken.tsx",
      example_path: "docs/static-docs/components/IsUsernameEmailTaken.md",
      visual_demo_url: "https://ui.instincthub.com/components/auth/username-email-checker",
    },
    {
      name: "ClientDetector",
      description: "Client device detection component",
      category: "Auth",
      repo_path: "src/components/auth/ClientDetector.tsx",
      example_path: "docs/static-docs/components/ClientDetector.md",
      visual_demo_url: "https://ui.instincthub.com/components/auth/client-detector",
    },
    {
      name: "PasswordsMatch",
      description: "Password matching validation component",
      category: "Auth",
      repo_path: "src/components/auth/PasswordsMatch.tsx",
      example_path: "docs/static-docs/components/PasswordsMatch.md",
    },
    {
      name: "FromInstinctHub",
      description: "From InstinctHub component",
      category: "Auth",
      repo_path: "src/components/auth/FromInstinctHub.tsx",
      example_path: "docs/static-docs/components/FromInstinctHub.md",
    },
    {
      name: "LoginForm",
      description: "Login form component",
      category: "Auth",
      repo_path: "src/components/auth/LoginForm.tsx",
      example_path: "docs/static-docs/components/LoginForm.md",
    },
    {
      name: "SignUpForm",
      description: "Sign up form component",
      category: "Auth",
      repo_path: "src/__examples__/src/components/forms/SignUpFormExample.tsx",
      example_path: "docs/static-docs/components/SignUpForm.md",
      visual_demo_url: "https://ui.instincthub.com/components/auth/signup-form",
    },
    {
      name: "ReactClientProviders",
      description:
        "Comprehensive wrapper providing all essential React providers",
      category: "Auth",
      repo_path: "src/components/auth/ReactClientProviders.tsx",
      example_path: "docs/static-docs/components/ReactClientProviders.md",
    },
    {
      name: "ClientOnly",
      description:
        "Wrapper component that only renders children on client side",
      category: "Auth",
      repo_path: "src/components/auth/ClientOnly.tsx",
      example_path: "docs/static-docs/components/ClientOnly.md",
    },
    {
      name: "useClientSide",
      description: "Hook for safely handling client-side initialization",
      category: "Auth",
      repo_path: "src/components/auth/useClientSide.ts",
      example_path: "docs/static-docs/components/useClientSide.md",
    },
    {
      name: "useFormattedDate",
      description:
        "Hook for consistent date formatting between server and client",
      category: "Auth",
      repo_path: "src/components/auth/useFormattedDate.ts",
      example_path: "docs/static-docs/components/useFormattedDate.md",
    },
    {
      name: "useStableRandom",
      description: "Hook for generating stable random values",
      category: "Auth",
      repo_path: "src/components/auth/useStableRandom.ts",
      example_path: "docs/static-docs/components/useStableRandom.md",
    },
    {
      name: "useExternalData",
      description:
        "Hook for safely handling external data to prevent hydration mismatches",
      category: "Auth",
      repo_path: "src/components/auth/useExternalData.ts",
      example_path: "docs/static-docs/components/useExternalData.md",
    },

    // Navbar
    {
      name: "ChannelListAvatar",
      description: "Channel list avatar component",
      category: "Navbar",
      repo_path: "src/components/navbar/ChannelListAvatar.tsx",
      example_path: "docs/static-docs/components/ChannelListAvatar.md",
    },
    {
      name: "MenuDropdown",
      description: "Menu dropdown component",
      category: "Navbar",
      repo_path: "src/components/navbar/MenuDropdown.tsx",
      example_path: "docs/static-docs/components/MenuDropdown.md",
    },
    {
      name: "Breadcrumb",
      description: "Breadcrumb component",
      category: "Navbar",
      repo_path: "src/components/navbar/Breadcrumb.tsx",
      example_path: "docs/static-docs/components/Breadcrumb.md",
    },
    {
      name: "ResponsiveNavbar",
      description: "Responsive navbar component",
      category: "Navbar",
      repo_path: "src/components/navbar/ResponsiveNavbar.tsx",
      example_path: "docs/static-docs/components/ResponsiveNavbar.md",
    },
    {
      name: "SideNavbar",
      description: "Side navbar component",
      category: "Navbar",
      repo_path: "src/components/navbar/SideNavbar.tsx",
      example_path: "docs/static-docs/components/SideNavbar.md",
      visual_demo_url: "https://ui.instincthub.com/components/navbars/sidenav",
    },
    {
      name: "SideNavbarContext",
      description: "Context provider for side navigation state management",
      category: "Navbar",
      repo_path: "src/components/navbar/SideNavbarContext.tsx",
      example_path: "docs/static-docs/components/SideNavbarContext.md",
    },

    // UI
    {
      name: "CustomTextEditor",
      description: "Custom text editor component",
      category: "UI",
      repo_path: "src/components/ui/editor/CustomTextEditor.tsx",
      example_path: "docs/static-docs/components/CustomTextEditor.md",
    },
    {
      name: "ContentViewer",
      description: "Content viewer component",
      category: "UI",
      repo_path: "src/components/ui/viewer/ContentViewer.tsx",
      example_path: "docs/static-docs/components/ContentViewer.md",
      visual_demo_url: "https://ui.instincthub.com/components/ui/content-viewer",
    },
    {
      name: "ContentViewOrEdit",
      description: "Content view or edit component",
      category: "UI",
      repo_path: "src/components/ui/viewer/ContentViewOrEdit.tsx",
      example_path: "docs/static-docs/components/ContentViewOrEdit.md",
      visual_demo_url: "https://ui.instincthub.com/components/ui/content-view-or-edit",
    },
    {
      name: "CodeDisplay",
      description: "Code display component",
      category: "UI",
      repo_path: "src/components/ui/viewer/CodeDisplay.tsx",
      example_path: "docs/static-docs/components/CodeDisplay.md",
    },
    {
      name: "IHubTable",
      description: "InstinctHub table component",
      category: "UI",
      repo_path: "src/components/ui/tables/IHubTable.tsx",
      example_path: "docs/static-docs/components/IHubTable.md",
    },
    {
      name: "IHubTableServer",
      description: "InstinctHub server table component",
      category: "UI",
      repo_path: "src/components/ui/tables/IHubTableServer.tsx",
      example_path: "docs/static-docs/components/IHubTableServer.md",
    },
    {
      name: "OrDivider",
      description: "Or divider component",
      category: "UI",
      repo_path: "src/components/ui/OrDivider.tsx",
      example_path: "docs/static-docs/components/OrDivider.md",
      visual_demo_url: "https://ui.instincthub.com/components/ui/or-divider",
    },
    {
      name: "Card",
      description: "Card component",
      category: "UI",
      repo_path: "src/components/ui/cards/Card.tsx",
      example_path: "docs/static-docs/components/Card.md",
    },
    {
      name: "CardList",
      description: "Card list component",
      category: "UI",
      repo_path: "src/components/ui/cards/CardList.tsx",
      example_path: "docs/static-docs/components/CardList.md",
      visual_demo_url: "https://ui.instincthub.com/components/ui/card-list",
    },
    {
      name: "CardGrid",
      description: "Card grid component",
      category: "UI",
      repo_path: "src/components/ui/cards/CardGrid.tsx",
      example_path: "docs/static-docs/components/CardGrid.md",
      visual_demo_url: "https://ui.instincthub.com/components/ui/card-grid",
    },
    {
      name: "HorizontalCard",
      description: "Horizontal card component",
      category: "UI",
      repo_path: "src/components/ui/cards/HorizontalCard.tsx",
      example_path: "docs/static-docs/components/HorizontalCard.md",
    },
    {
      name: "FeatureCard",
      description: "Feature card component",
      category: "UI",
      repo_path: "src/components/ui/cards/FeatureCard.tsx",
      example_path: "docs/static-docs/components/FeatureCard.md",
    },
    {
      name: "MediaCard",
      description: "Media card component",
      category: "UI",
      repo_path: "src/components/ui/cards/MediaCard.tsx",
      example_path: "docs/static-docs/components/MediaCard.md",
    },
    {
      name: "PricingCard",
      description: "Pricing card component",
      category: "UI",
      repo_path: "src/components/ui/cards/PricingCard.tsx",
      example_path: "docs/static-docs/components/PricingCard.md",
    },
    {
      name: "ProfileCard",
      description: "Profile card component",
      category: "UI",
      repo_path: "src/components/ui/cards/ProfileCard.tsx",
      example_path: "docs/static-docs/components/ProfileCard.md",
    },
    {
      name: "RandomGradientImage",
      description: "Random gradient image component",
      category: "UI",
      repo_path: "src/components/ui/images/RandomGradientImage.tsx",
      example_path: "docs/static-docs/components/RandomGradientImage.md",
      visual_demo_url: "https://ui.instincthub.com/components/ui/random-gradient-image",
    },
    {
      name: "Dialog",
      description: "A reusable dialog component",
      category: "UI",
      repo_path: "src/components/ui/dialogs/Dialog.tsx",
      example_path: "docs/static-docs/components/Dialog.md",
    },
    {
      name: "Badge",
      description: "A reusable Badge component",
      category: "UI",
      repo_path: "src/components/ui/Badge.tsx",
      example_path: "docs/static-docs/components/Badge.md",
    },
    {
      name: "Action",
      description: "A reusable Action component",
      category: "UI",
      repo_path: "src/components/ui/Action.tsx",
      example_path: "docs/static-docs/components/Action.md",
    },
    {
      name: "Dropdown",
      description: "A reusable Dropdown component",
      category: "UI",
      repo_path: "src/components/ui/Dropdown.tsx",
      example_path: "docs/static-docs/components/Dropdown.md",
    },
    {
      name: "ColorPicker",
      description: "A reusable ColorPicker component",
      category: "UI",
      repo_path: "src/components/ui/ColorPicker.tsx",
      example_path: "docs/static-docs/components/ColorPicker.md",
    },
    {
      name: "Pagination",
      description: "A reusable Pagination component",
      category: "UI",
      repo_path: "src/components/ui/pagination/Pagination.tsx",
      example_path: "docs/static-docs/components/Pagination.md",
      visual_demo_url: "https://ui.instincthub.com/components/ui/pagination",
    },
    {
      name: "PaginationDemo",
      description: "A demo for the Pagination component",
      category: "UI",
      repo_path: "src/components/ui/pagination/PaginationDemo.tsx",
      example_path: "docs/static-docs/components/PaginationDemo.md",
    },
    {
      name: "CreateButton",
      description: "A reusable CreateButton component",
      category: "UI",
      repo_path: "src/components/ui/create-button/CreateButton.tsx",
      example_path: "docs/static-docs/components/CreateButton.md",
    },
    {
      name: "CreateButtonExample",
      description: "An example of the CreateButton component",
      category: "UI",
      repo_path: "src/components/ui/create-button/CreateButtonExample.tsx",
      example_path: "docs/static-docs/components/CreateButtonExample.md",
    },
    {
      name: "MenuBar",
      description: "Toolbar component for the TipTap rich text editor",
      category: "UI",
      repo_path: "src/components/ui/editor/MenuBar.tsx",
      example_path: "docs/static-docs/components/MenuBar.md",
    },
    {
      name: "InstinctHubChart",
      description: "Versatile chart component supporting multiple chart types",
      category: "UI",
      repo_path: "src/components/ui/charts/InstinctHubChart.tsx",
      example_path: "docs/static-docs/components/InstinctHubChart.md",
    },
    {
      name: "InstinctHubChartDashboard",
      description: "Dashboard component showcasing multiple charts",
      category: "UI",
      repo_path: "src/components/ui/charts/InstinctHubChartDashboard.tsx",
      example_path: "docs/static-docs/components/InstinctHubChartDashboard.md",
    },
    {
      name: "ChartConfigurator",
      description: "Interactive chart configuration interface",
      category: "UI",
      repo_path: "src/components/ui/charts/ChartConfigurator.tsx",
      example_path: "docs/static-docs/components/ChartConfigurator.md",
    },

    // Theme
    {
      name: "ChangeStyleVariable",
      description: "Style variable changer component",
      category: "Theme",
      repo_path: "src/components/theme/ChangeStyleVariable.tsx",
      example_path: "docs/static-docs/components/ChangeStyleVariable.md",
    },
    {
      name: "DarkModeProvider",
      description: "Dark mode provider component",
      category: "Theme",
      repo_path: "src/components/theme/DarkModeProvider.tsx",
      example_path: "docs/static-docs/components/DarkModeProvider.md",
    },
    {
      name: "LoadingAnimate",
      description: "Loading animation component",
      category: "Theme",
      repo_path: "src/components/theme/LoadingAnimate.tsx",
      example_path: "docs/static-docs/components/LoadingAnimate.md",
    },
    {
      name: "SessionProviders",
      description: "Session providers component",
      category: "Theme",
      repo_path: "src/components/theme/SessionProviders.tsx",
      example_path: "docs/static-docs/components/SessionProviders.md",
    },
    {
      name: "SessionExpiresLogout",
      description: "Session expiration logout component",
      category: "Theme",
      repo_path: "src/components/theme/signout/SessionExpiresLogout.tsx",
      example_path: "docs/static-docs/components/SessionExpiresLogout.md",
    },
    {
      name: "SignOutSession",
      description: "Sign out session component",
      category: "Theme",
      repo_path: "src/components/theme/signout/SignOutSession.tsx",
      example_path: "docs/static-docs/components/SignOutSession.md",
    },

    // Status
    {
      name: "TimeTracker",
      description: "Time tracking component",
      category: "Status",
      repo_path: "src/components/status/ReactTimeTracker.tsx",
      example_path: "docs/static-docs/components/TimeTracker.md",
    },
    {
      name: "SessionHandleProvider",
      description: "Session handling provider component",
      category: "Status",
      repo_path: "src/components/status/SessionHandleProvider.tsx",
      example_path: "docs/static-docs/components/SessionHandleProvider.md",
    },
    {
      name: "Error500",
      description: "500 error display component",
      category: "Status",
      repo_path: "src/components/status/Error500.tsx",
      example_path: "docs/static-docs/components/Error500.md",
    },
    {
      name: "ErrorState",
      description: "Error state display component",
      category: "Status",
      repo_path: "src/components/status/ErrorState.tsx",
      example_path: "docs/static-docs/components/ErrorState.md",
    },
    {
      name: "ReactTimeTracker",
      description: "React time tracking component",
      category: "Status",
      repo_path: "src/components/status/ReactTimeTracker.tsx",
      example_path: "docs/static-docs/components/ReactTimeTracker.md",
    },
    {
      name: "DeleteConfirmationModal",
      description: "Delete confirmation modal component",
      category: "Status",
      repo_path: "src/components/status/DeleteConfirmationModal.tsx",
      example_path: "docs/static-docs/components/DeleteConfirmationModal.md",
    },
    {
      name: "CopyToClipboard",
      description: "Copy to clipboard functionality component",
      category: "Status",
      repo_path: "src/components/status/CopyToClipBoard.tsx",
      example_path: "docs/static-docs/components/CopyToClipboard.md",
    },
    {
      name: "MultiPurposeModal",
      description: "Multi-purpose modal component",
      category: "Status",
      repo_path: "src/components/status/MultiPurposeModal.tsx",
      example_path: "docs/static-docs/components/MultiPurposeModal.md",
    },
    {
      name: "ModalExamples",
      description: "Modal examples component",
      category: "Status",
      repo_path: "src/components/status/ModalExamples.tsx",
      example_path: "docs/static-docs/components/ModalExamples.md",
    },
    {
      name: "NotFound",
      description: "Not found component",
      category: "Status",
      repo_path: "src/components/status/NotFound.tsx",
      example_path: "docs/static-docs/components/NotFound.md",
    },
    {
      name: "Unauthorized",
      description: "Unauthorized component",
      category: "Status",
      repo_path: "src/components/status/Unauthorized.tsx",
      example_path: "docs/static-docs/components/Unauthorized.md",
    },

    // Tabs
    {
      name: "Tabs",
      description: "Tab navigation component",
      category: "Tabs",
      repo_path: "src/components/tabs/Tabs.tsx",
      example_path: "docs/static-docs/components/Tabs.md",
    },
    {
      name: "VerticalTabs",
      description: "Vertical tab navigation component",
      category: "Tabs",
      repo_path: "src/components/tabs/VerticalTabs.tsx",
      example_path: "docs/static-docs/components/VerticalTabs.md",
    },
    {
      name: "TabContent",
      description: "Tab content display component",
      category: "Tabs",
      repo_path: "src/components/tabs/TabContent.tsx",
      example_path: "docs/static-docs/components/TabContent.md",
    },

    // Cursors
    {
      name: "Cursor",
      description:
        "Custom cursor component with trailing effects and animations",
      category: "Cursors",
      repo_path: "src/components/cursors/Cursor.tsx",
      example_path: "docs/static-docs/components/Cursor.md",
    },
    {
      name: "MagneticButton",
      description: "Button component with magnetic cursor attraction effect",
      category: "Cursors",
      repo_path: "src/components/cursors/MagneticButton.tsx",
      example_path: "docs/static-docs/components/MagneticButton.md",
    },
    {
      name: "CursorContext",
      description:
        "Context provider for cursor state management across the application",
      category: "Cursors",
      repo_path: "src/components/cursors/CursorContext.tsx",
      example_path: "docs/static-docs/components/CursorContext.md",
    },
    {
      name: "useCursorInteraction",
      description: "Hook for adding interactive cursor effects to elements",
      category: "Cursors",
      repo_path: "src/components/cursors/useCursorInteraction.tsx",
      example_path: "docs/static-docs/components/useCursorInteraction.md",
    },
    {
      name: "CursorControlDemo",
      description: "Comprehensive demo component for the cursor system",
      category: "Cursors",
      repo_path: "src/components/cursors/CursorControlDemo.tsx",
      example_path: "docs/static-docs/components/CursorControlDemo.md",
    },

    // Library
    {
      name: "Paystack",
      description: "Paystack payment integration component",
      category: "Library",
      repo_path: "src/components/lib/readme/paystack.md",
      example_path: "docs/static-docs/components/Paystack.md",
    },
  ];

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(components.map(component => component.category)));
    return uniqueCategories.sort();
  }, [components]);

  // Filter components based on search term and category
  const filteredComponents = useMemo(() => {
    let filtered = components;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(component => component.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (component) =>
          component.name.toLowerCase().includes(searchLower) ||
          component.description.toLowerCase().includes(searchLower) ||
          component.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [components, searchTerm, selectedCategory]);

  // Group filtered components by category
  const groupedComponents = useMemo(() => {
    return filteredComponents.reduce((acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = [];
      }
      acc[component.category].push(component);
      return acc;
    }, {} as Record<string, ComponentInfo[]>);
  }, [filteredComponents]);

  const baseRepoUrl =
    "https://github.com/instincthub/instincthub-react-ui/blob/main/";

  const copyToClipboard = async (url: string, linkType: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(`${linkType}-${url}`);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="ihub-component-lists">
      <h1 className="ihub-component-lists-title">
        InstinctHub React UI Components
      </h1>
      <p className="ihub-component-lists-description">
        A comprehensive list of all available components in the InstinctHub
        React UI library.
      </p>

      {/* Search and Filter Section */}
      <div className="ihub-search-container">
        <div className="ihub-flex ihub-gap-3 ihub-mb-3">
          <input
            type="text"
            placeholder="Search components by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ihub-search-input"
            style={{ flex: 1 }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ihub-category-filter"
            style={{ 
              padding: "10px 15px",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              backgroundColor: "white",
              fontSize: "14px",
              minWidth: "160px"
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {(searchTerm || selectedCategory) && (
          <div className="ihub-search-results-info">
            Found {filteredComponents.length} component
            {filteredComponents.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory && ` in category "${selectedCategory}"`}
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                style={{
                  marginLeft: "10px",
                  padding: "4px 8px",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

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
                  <div className="ihub-component-links">
                    <div className="ihub-link-group ihub-flex">
                      <a
                        href={`${baseRepoUrl}${component.repo_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ihub-component-link"
                      >
                        Repository
                      </a>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${baseRepoUrl}${component.repo_path}`,
                            "repo"
                          )
                        }
                        className="ihub-copy-btn"
                        title={`Copy ${component.name} repository link`}
                      >
                        {copiedLink ===
                        `repo-${baseRepoUrl}${component.repo_path}` ? (
                          <Check />
                        ) : (
                          <Copy />
                        )}
                      </button>
                    </div>
                    <div className="ihub-link-group ihub-flex ihub-mt-2">
                      <a
                        href={`${baseRepoUrl}${component.example_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ihub-component-link"
                      >
                        Example
                      </a>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${baseRepoUrl}${component.example_path}`,
                            "example"
                          )
                        }
                        className="ihub-copy-btn"
                        title={`Copy ${component.name} example link`}
                      >
                        {copiedLink ===
                        `example-${baseRepoUrl}${component.example_path}` ? (
                          <Check />
                        ) : (
                          <Copy />
                        )}
                      </button>
                    </div>
                    {component.visual_demo_url && (
                      <div className="ihub-link-group ihub-flex ihub-mt-2">
                        <a
                          href={component.visual_demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ihub-component-link ihub-demo-link"
                        >
                          Live Demo
                        </a>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              component.visual_demo_url!,
                              "demo"
                            )
                          }
                          className="ihub-copy-btn"
                          title={`Copy ${component.name} live demo link`}
                        >
                          {copiedLink ===
                          `demo-${component.visual_demo_url}` ? (
                            <Check />
                          ) : (
                            <Copy />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {Object.keys(groupedComponents).length === 0 && (searchTerm || selectedCategory) && (
        <div className="ihub-no-results">
          <p>No components found{searchTerm && ` matching "${searchTerm}"`}{selectedCategory && ` in category "${selectedCategory}"`}</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
            className="ihub-clear-search-btn"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ComponentLists;
