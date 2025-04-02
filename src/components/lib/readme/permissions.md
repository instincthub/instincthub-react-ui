# Header Permission Utilities

A TypeScript utility library for validating API request headers in Next.js applications.

## Installation

### Dependencies

```bash
npm install next
```

Environment setup:
```
NEXT_PUBLIC_X_INSTINCTHUB_NEXT_HEADER=your_custom_header_value
```

## Functions

### headerUsernamePermission

Validates if the request has valid username and custom header.

```typescript
async function headerUsernamePermission(
  session: Session | null, 
  req: NextApiRequest
): Promise<boolean>
```

**Parameters:**
- `session`: User session object with username information
- `req`: Next.js API request object

**Returns:** Promise resolving to `true` if both username and header are valid

**Example:**
```typescript
import { headerUsernamePermission } from './header-permission-utils';

export default async function handler(req, res) {
  const session = getUserSession(); // Your session retrieval method
  const hasPermission = await headerUsernamePermission(session, req);
  
  if (!hasPermission) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  // Process the authorized request
  res.status(200).json({ data: 'Success' });
}
```

### headerKeyPermission

Validates if the request has a valid custom header.

```typescript
async function headerKeyPermission(req: NextApiRequest): Promise<boolean>
```

**Parameters:**
- `req`: Next.js API request object

**Returns:** Promise resolving to `true` if the custom header is valid

**Example:**
```typescript
import { headerKeyPermission } from './header-permission-utils';

export default async function handler(req, res) {
  const hasPermission = await headerKeyPermission(req);
  
  if (!hasPermission) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  
  // Process the authorized request
  res.status(200).json({ data: 'Success' });
}
```