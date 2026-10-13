/**
 * Public URL of an object the uploaders wrote to S3 / Spaces.
 *
 * The uploaders write to `${keyLocation}/${key}` where keyLocation is either
 * NEXT_PUBLIC_AWS_LOCATION (videos) or NEXT_PUBLIC_AWS_LOCATION_FILES. They
 * used to report `${FILE_URL}creators/${key}`, which is only right for the
 * files location, so every video upload returned a URL that 403s.
 *
 * NEXT_PUBLIC_FILE_URL is the CDN origin plus the start of the files
 * location (e.g. `https://cdn.example.com/prod_env/social-files/` for
 * `prod_env/social-files/creators`). The CDN base is FILE_URL with that
 * shared tail removed, and the URL is that base plus the key actually written.
 */

const segments = (path: string): string[] => path.split("/").filter(Boolean);

/** Largest k where the last k items of `tail` equal the first k of `head`. */
const overlap = (tail: string[], head: string[]): number => {
  for (let k = Math.min(tail.length, head.length); k > 0; k--) {
    const end = tail.slice(tail.length - k);
    if (end.every((part, i) => part === head[i])) return k;
  }
  return 0;
};

/** CDN base (ending in "/") that object keys are appended to. */
export const cdnBaseUrl = (fileUrl: string, filesLocation = ""): string => {
  if (!fileUrl) return "";
  let url: URL;
  try {
    url = new URL(fileUrl);
  } catch {
    return fileUrl.endsWith("/") ? fileUrl : `${fileUrl}/`;
  }
  const pathParts = segments(url.pathname);
  const shared = overlap(pathParts, segments(filesLocation));
  const baseParts = pathParts.slice(0, pathParts.length - shared);
  const basePath = baseParts.length ? `/${baseParts.join("/")}/` : "/";
  return `${url.origin}${basePath}`;
};

/** Public URL for `fullKey`, the exact key passed to S3 as `Key`. */
export const uploadedFileUrl = (
  fullKey: string,
  fileUrl: string,
  filesLocation = ""
): string => {
  const key = segments(fullKey).join("/");
  return `${cdnBaseUrl(fileUrl, filesLocation)}${key}`;
};
