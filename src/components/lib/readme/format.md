# formatTime

Utility function that formats seconds into a human-readable time string.

## Parameters
- `time: number` - Time in seconds

## Returns
- `string` - Formatted time string (MM:SS or HH:MM format)

## Usage
```typescript
import { formatTime } from './formatTime';

// Format video duration
const videoDuration = 125; // 2 minutes and 5 seconds
console.log(formatTime(videoDuration)); // "2:05"

// Format longer video
const longVideo = 3725; // 1 hour, 2 minutes, 5 seconds
console.log(formatTime(longVideo)); // "1:02"

// Handle invalid input
console.log(formatTime(NaN)); // "00:00"
```

## Notes
- Returns "00:00" for invalid inputs
- For videos less than 1 hour, returns format "M:SS" (minutes:seconds)
- For videos 1 hour or longer, returns format "H:MM" (hours:minutes)
- Seconds are padded with leading zeros
- Minutes are only padded with leading zeros when hours are present