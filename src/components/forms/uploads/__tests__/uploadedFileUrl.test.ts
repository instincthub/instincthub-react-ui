import { describe, expect, it } from "vitest";
import { cdnBaseUrl, uploadedFileUrl } from "../uploadedFileUrl";

// Leadboard production layout, where a video upload reported a 403 URL.
const FILE_URL = "https://leadboard.nyc3.cdn.digitaloceanspaces.com/prod_env/social-files/";
const FILES_LOCATION = "prod_env/social-files/creators";
const VIDEO_LOCATION = "creator-videos";
const KEY = "leadboard-2026-10-13t092009-214z-lb-9x16-web-drag-.mp4";

describe("cdnBaseUrl", () => {
  it("strips the part of FILE_URL that the files location repeats", () => {
    expect(cdnBaseUrl(FILE_URL, FILES_LOCATION)).toBe(
      "https://leadboard.nyc3.cdn.digitaloceanspaces.com/"
    );
  });

  it("keeps a path-style bucket prefix", () => {
    expect(
      cdnBaseUrl(
        "https://nyc3.digitaloceanspaces.com/leadboard/dev_env/social-files",
        "dev_env/social-files/creators"
      )
    ).toBe("https://nyc3.digitaloceanspaces.com/leadboard/");
  });

  it("uses FILE_URL as is when it shares nothing with the location", () => {
    expect(cdnBaseUrl("https://cdn.example.com/assets/", "uploads")).toBe(
      "https://cdn.example.com/assets/"
    );
  });
});

describe("uploadedFileUrl", () => {
  it("points a video at the video location it was written to", () => {
    expect(uploadedFileUrl(`${VIDEO_LOCATION}/${KEY}`, FILE_URL, FILES_LOCATION)).toBe(
      `https://leadboard.nyc3.cdn.digitaloceanspaces.com/creator-videos/${KEY}`
    );
  });

  it("matches the old FILE_URL + creators/ URL for the files location", () => {
    expect(uploadedFileUrl(`${FILES_LOCATION}/${KEY}`, FILE_URL, FILES_LOCATION)).toBe(
      `${FILE_URL}creators/${KEY}`
    );
  });

  it("collapses duplicate slashes in the key", () => {
    expect(
      uploadedFileUrl(`/${VIDEO_LOCATION}//${KEY}`, FILE_URL, FILES_LOCATION)
    ).toBe(`https://leadboard.nyc3.cdn.digitaloceanspaces.com/creator-videos/${KEY}`);
  });
});
