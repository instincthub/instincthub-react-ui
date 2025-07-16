# ClientOnly

**Category:** Auth | **Type:** component

Wrapper component that only renders children on client side

## 📁 File Location

`src/components/auth/ClientOnly.tsx`

## 🏷️ Tags

`auth`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { ClientOnly } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { ClientOnly } from '@instincthub/react-ui';

function MyComponent() {
  return (
    <ClientOnly
    />
  );
}
```

## 🔗 Related Components

- [IsUsernameEmailTaken](./IsUsernameEmailTaken.md) - Username/email availability checker
- [ClientDetector](./ClientDetector.md) - Client device detection component
- [PasswordsMatch](./PasswordsMatch.md) - Password matching validation component
- [FromInstinctHub](./FromInstinctHub.md) - From InstinctHub component
- [LoginForm](./LoginForm.md) - Login form component

