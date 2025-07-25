# Modal Functions Documentation

This directory contains detailed documentation for individual modal functions from the InstinctHub React UI library.

## 📁 Available Modal Function Documentation

### Confirmation Modals
- **[openConfirmModal](./openConfirmModal.md)** - Promise-based confirmation dialogs with warning levels

### Notification Modals  
- **[openToast](./openToast.md)** - Auto-dismissing toast notifications with status-based styling

### Input Modals
- **[getUserEmailInputModal](./getUserEmailInputModal.md)** - Email collection modal with built-in validation

## 🔙 Back to Main Documentation

[← Back to Modal Management Overview](../modals-modals.md)

## 🚀 Quick Start

Each modal function documentation includes:
- ✅ Interactive examples with live demos
- 🔧 Complete function signatures and parameters  
- 💡 Real-world use cases and integration patterns
- ⚠️ Important features and best practices
- 🔗 Related functions and cross-references

## 📋 Modal Function Categories

### 🤔 User Confirmations
**[openConfirmModal](./openConfirmModal.md)** - Get explicit user confirmation before proceeding with actions
- Delete confirmations
- Form submissions  
- Critical operations
- Multi-step workflows

### 📢 User Notifications
**[openToast](./openToast.md)** - Provide immediate feedback to user actions
- Success messages
- Error notifications
- Progress updates
- Status changes

### 📧 Data Collection
**[getUserEmailInputModal](./getUserEmailInputModal.md)** - Collect and validate user email addresses
- Course enrollment
- Newsletter signup
- Lead generation
- Content gating

## 🎯 Common Usage Patterns

### Sequential Modal Flow
```tsx
// Chain multiple modals together
const processWorkflow = async () => {
  const confirmed = await openConfirmModal("Start process?");
  if (!confirmed) return;
  
  const email = await getUserEmailInputModal("Registration");
  if (!email) return;
  
  openToast("Process completed successfully!");
};
```

### Error Handling with Modals
```tsx
const handleWithFeedback = async () => {
  try {
    const confirmed = await openConfirmModal("Delete item?", true);
    if (confirmed) {
      await deleteItem();
      openToast("Item deleted successfully!");
    }
  } catch (error) {
    openToast("Failed to delete item.", 500);
  }
};
```

### Conditional Data Collection
```tsx
const getOrCollectEmail = async (user) => {
  let email = user.email;
  
  if (!email) {
    email = await getUserEmailInputModal("Complete Profile");
    if (email) {
      await updateUserProfile({ email });
    }
  }
  
  return email;
};
```

## 🔧 Technical Features

All modal functions share these technical characteristics:

- **Promise-based API**: Clean async/await integration
- **Automatic DOM Management**: Creates and cleans up DOM elements
- **Event Handling**: Proper keyboard and click event handling
- **Focus Management**: Accessibility-friendly focus handling
- **Memory Safety**: Prevents memory leaks with proper cleanup
- **Single Instance**: Only one modal of each type can be open at once

## 🎨 Styling & Theming

Modal functions use CSS classes for styling:
- Customize appearance through CSS overrides
- Status-based styling for different message types
- Responsive design for mobile and desktop
- High contrast support for accessibility

## 🤝 Contributing

To add documentation for new modal functions:
1. Create a new `.md` file in this directory
2. Follow the existing documentation template
3. Include interactive examples with working code
4. Add the new function to this README
5. Update the main [modals-modals.md](../modals-modals.md) file