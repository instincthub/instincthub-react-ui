import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { unsplashDefaultObject } from "../lib/json/unsplashDefaultObject";
import { IN_DEV_MODE } from "../lib/helpFunction";

/**
 * Represents an Unsplash user
 */
export interface UnsplashUser {
  name: string;
  links?: {
    html?: string;
  };
  profile_image?: {
    small?: string;
  };
  location?: string;
}

/**
 * Represents image URLs from Unsplash
 */
export interface UnsplashUrls {
  regular: string;
  raw?: string;
  full?: string;
  small?: string;
  thumb?: string;
}

/**
 * Represents the Unsplash image data structure
 */
export interface UnsplashObject {
  id?: string;
  urls?: UnsplashUrls;
  user?: UnsplashUser;
  alt_description?: string;
  description?: string;
  color?: string;
  created_at?: string;
  likes?: number;
}

/**
 * Redux action type for unsplash object
 */
export interface UnsplashAction {
  add: (payload: UnsplashObject) => { type: string; payload: UnsplashObject };
}

/**
 * Props for the UnsplashRandomImage component
 */
export interface UnsplashRandomImageProps {
  /** Search category for Unsplash images */
  category: string;
  /** Optional className for styling */
  className?: string;
  /** Redux dispatch hook */
  useDispatch: () => any;
  /** Redux selector hook */
  useSelector: <T>(selector: (state: any) => T) => T;
  /** Redux selector function for unsplash object */
  selectUnsplashObject: (state: any) => UnsplashObject;
  /** Redux slice for unsplash object */
  unsplashObject: {
    actions: UnsplashAction;
  };
  /** Optional height (default: 100vh) */
  height?: string;
  /** Optional width (default: 100%) */
  width?: string;
  /** Optional border radius (default: 8px) */
  borderRadius?: string;
  /** Optional overlay intensity (0-1, default: 0.2) */
  overlayIntensity?: number;
  /** Function to handle image click */
  onImageClick?: () => void;
}

/**
 * Component that fetches and displays a random image from Unsplash based on a category
 * with enhanced UI and functionality
 */
const UnsplashRandomImage: React.FC<UnsplashRandomImageProps> = (props) => {
  const {
    useDispatch,
    useSelector,
    selectUnsplashObject,
    unsplashObject,
    height = "100vh",
    width = "100%",
    borderRadius = "8px",
    overlayIntensity = 0.2,
    onImageClick,
  } = props;

  const dispatch = useDispatch();
  const unsplashData = useSelector(selectUnsplashObject);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Format the creation date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Refresh image - can be called on button click
  const refreshImage = async (): Promise<void> => {
    if (isFetching) return;

    setIsFetching(true);
    setError(null);

    if (!IN_DEV_MODE) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${props.category}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const req = await response.json();
        let res_obj: UnsplashObject = unsplashDefaultObject;

        if (req?.id) {
          res_obj = req;
        }

        dispatch(unsplashObject.actions.add(res_obj));
      } catch (error) {
        console.error("Error fetching random image:", error);
        setError("Failed to load image. Please try again.");
        // Still dispatch default object as fallback
        dispatch(unsplashObject.actions.add(unsplashDefaultObject));
      }
    } else {
      dispatch(unsplashObject.actions.add(unsplashDefaultObject));
    }

    setIsFetching(false);
  };

  useEffect(() => {
    refreshImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]);

  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className="ihub-unsplash-container"
      style={{
        width: width,
        borderRadius: borderRadius,
        height: height,
        background: unsplashData?.color || "#f5f5f5",
      }}
    >
      {isLoading && (
        <div className="ihub-unsplash-loader">
          <div className="ihub-unsplash-spinner"></div>
        </div>
      )}

      {error && (
        <div className="ihub-unsplash-error">
          <p>{error}</p>
          <button onClick={refreshImage} disabled={isFetching}>
            Try Again
          </button>
        </div>
      )}

      <div
        className={`ihub-unsplash-image-container ${
          isLoading ? "ihub-unsplash-loading" : ""
        }`}
        onClick={onImageClick}
      >
        <Image
          src={unsplashData?.urls?.regular || ""}
          alt={
            unsplashData?.alt_description || props.category || "Unsplash image"
          }
          className="ihub-unsplash-image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onLoad={handleImageLoad}
          style={{ objectFit: "cover", borderRadius: borderRadius }}
        />

        <div
          className="ihub-unsplash-overlay"
          style={{ opacity: overlayIntensity }}
        ></div>

        <div className="ihub-unsplash-info">
          {unsplashData?.description && (
            <p className="ihub-unsplash-description">
              {unsplashData.description}
            </p>
          )}

          <div className="ihub-unsplash-metadata">
            {unsplashData?.user?.profile_image?.small && (
              <Image
                src={unsplashData.user.profile_image.small}
                alt={unsplashData.user?.name || "Photographer"}
                width={24}
                height={24}
                className="ihub-unsplash-avatar"
              />
            )}

            <div className="ihub-unsplash-user-info">
              <Link
                href={unsplashData?.user?.links?.html || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="ihub-unsplash-username"
              >
                {unsplashData?.user?.name || "Unknown"}
              </Link>

              {unsplashData?.user?.location && (
                <span className="ihub-unsplash-location">
                  {unsplashData.user.location}
                </span>
              )}
            </div>

            <div className="ihub-unsplash-stats">
              {unsplashData?.created_at && (
                <span className="ihub-unsplash-date">
                  {formatDate(unsplashData.created_at)}
                </span>
              )}

              {unsplashData?.likes !== undefined && (
                <span className="ihub-unsplash-likes">
                  <span className="ihub-unsplash-heart">♥</span>{" "}
                  {unsplashData.likes}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-unsplash-actions">
        <button
          className="ihub-unsplash-refresh"
          onClick={refreshImage}
          disabled={isFetching}
          aria-label="Load a new image"
          title="Load a new image"
        >
          {isFetching ? "Loading..." : "Refresh Image"}
        </button>
      </div>
    </div>
  );
};

export default UnsplashRandomImage;
