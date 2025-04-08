# ChannelListAvatar Component Documentation

## Overview

The `ChannelListAvatar` component is a React TypeScript component that displays a list of channel avatars with their names and usernames. It allows users to switch between different channels by clicking on a channel in the list. The component fetches a list of channels from an API and displays the active channel at the top, followed by other available channels.

## Installation

To use this component, you need to have the following dependencies installed:

```bash
npm install next next-auth @instincthub/react-ui
```

## File Structure

- `ChannelListAvatar.tsx` - The main component file
- `channel-list-avatar.css` - The CSS styles for the component

## Interfaces

### ChannelThumbnail

```typescript
interface ChannelThumbnail {
  thumbnail?: string;
  name?: string;
  username?: string;
}
```

Represents the basic information of a channel.

### Channel

```typescript
interface Channel {
  channel: ChannelThumbnail;
}
```

Represents a channel object in the API response.

### ChannelList

```typescript
interface ChannelList {
  results?: Channel[];
}
```

Represents the structure of the API response containing a list of channels.

### Selected

```typescript
interface Selected {
  username?: string;
  result?: any[];
}
```

Represents the selected channel state.

### User

```typescript
interface User {
  name?: {
    token?: string;
    channels?: {
      active?: {
        channel?: ChannelThumbnail;
      };
    };
  };
}
```

Represents the user information from the session.

### Session

```typescript
interface Session {
  user?: User;
}
```

Represents the session object from NextAuth.

### ChannelListAvatarProps

```typescript
interface ChannelListAvatarProps {
  className?: string;
}
```

Represents the props for the `ChannelListAvatar` component.

## Component

### ChannelListAvatar

```typescript
export default function ChannelListAvatar({
  className = "",
}: ChannelListAvatarProps): JSX.Element;
```

The main component that displays the list of channel avatars.

#### Props

| Name      | Type   | Default | Description                                      |
| --------- | ------ | ------- | ------------------------------------------------ |
| className | string | ""      | Additional CSS classes to apply to the component |

#### State Variables

| Name        | Type        | Default        | Description                       |
| ----------- | ----------- | -------------- | --------------------------------- |
| channelList | ChannelList | {}             | The list of channels from the API |
| selected    | Selected    | { result: [] } | The currently selected channel    |

#### Hooks Used

- `useRouter` - For navigating between pages
- `usePathname` - For getting the current pathname
- `useParams` - For getting URL query parameters
- `useSession` - For accessing the user session
- `useDispatch` - For dispatching Redux actions
- `useState` - For managing component state
- `useEffect` - For handling side effects

#### Functions

##### handleChangeUrl

```typescript
const handleChangeUrl = (item: ChannelThumbnail): void
```

Handles changing the URL when a different channel is selected.

**Parameters:**

- `item`: The channel object to switch to

**Returns:** void

## Usage Example

```typescript
import ChannelListAvatar from "@/components/ChannelListAvatar";
import "@/styles/channel-list-avatar.css";

export default function ChannelPage() {
  return (
    <div className="page-container">
      <h1>My Channels</h1>
      <div className="channel-container">
        <ChannelListAvatar className="custom-avatar-list" />
      </div>
    </div>
  );
}
```

## Component Behavior

1. When the component mounts, it fetches the list of channels from the API using the user's token.
2. It displays the active channel at the top of the list.
3. It displays other available channels below the active channel.
4. When a user clicks on a channel in the list, it updates the URL to reflect the selected channel.
5. If the selected channel is the same as the current channel, it refreshes the page.

## CSS Styles

The component includes the following CSS classes:

- `.ihub-channel-list-avatar` - The main container
- `.item` - For each channel item in the list
- `.nameTruce` - For the active channel
- `.char_avatar` - For the character avatar when no thumbnail is available
- `.name` - For the name and username container
- `.ff_layer` - For the non-active channel items

## Notes

- The component relies on the NextAuth session for authentication.
- It uses the `@instincthub/react-ui` library for API requests.
- It assumes a URL structure with a `channel` query parameter.
- It supports both image thumbnails and character avatars (first letter of the channel name).
