"use client";
import React, { useEffect, useState } from "react";
import { reqOptions, API_HOST_URL, fetchAPI } from "../lib";
import { SessionUserType } from "../../types";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useParams } from "next/navigation";

// Define TypeScript interfaces
interface ChannelThumbnail {
  thumbnail?: string;
  name?: string;
  username?: string | null | undefined;
  [key: string]: any; // For any additional properties
}

interface Channel {
  channel: ChannelThumbnail;
}

interface ChannelList {
  results?: Channel[];
}

interface Selected {
  username?: string;
  result?: any[];
}

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

interface Session {
  user?: User;
}

interface ChannelListAvatarProps {
  className?: string;
  apiPath?: string;
}

/**
 * ChannelListAvatar component is a React component that displays a list of channels for the current user.
 * It fetches the list of channels from the server and displays them as a list of avatars.
 * The component uses the useSession hook from Next.js to get the user's session data.
 * It also uses the useRouter hook to get the current URL path and the useParams hook to get the channel parameter from the URL.
 * The component uses the fetchAPI function from the @instincthub/react-ui library to fetch the channel list from the server.
 *
 * @component
 * @example
 * ```tsx
 *
 * <ChannelListAvatar
 *   className="ihub-channel-list-avatar"
 *   apiPath="channels/instructor-channel/list/"
 * />
 * ```
 * Props interface for the ChannelListAvatarProps interface
 * @property {string} className - Optional className for the component
 * @interface {string} urlPath - API endpoint for the data
 */

export default function ChannelListAvatar({
  className = "",
  apiPath = "channels/instructor-channel/list/",
}: ChannelListAvatarProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ channel: string }>();
  const channel = params.channel || "";
  const { data: session, update: sessionUpdate } = useSession();

  // Type guard to check if user.name is an object with the expected structure
  const isSessionUserType = (user: any): user is SessionUserType => {
    return user?.name && typeof user.name === "object" && "token" in user.name;
  };

  const sessionUser = isSessionUserType(session?.user) ? session.user : null;
  const user = sessionUser;

  const token = user?.name?.token;
  const channels = user?.name?.channels;
  const activeChannel = channels?.active?.channel;
  const currentUsername = activeChannel?.username;
  const [channelList, setChannelList] = useState<ChannelList>({});
  const [selected, setSelected] = useState<Selected>({ result: [] });

  useEffect(() => {
    if (token) {
      const urlPath = `${API_HOST_URL}${apiPath}`;
      const requestOptions = reqOptions("GET", null, token);
      fetchAPI(setChannelList, urlPath, requestOptions, true);
    }
  }, [token]);

  useEffect(() => {
    // Get current and previous channel usernames
    const nextUsername = selected?.username;

    if (currentUsername && nextUsername && currentUsername === nextUsername) {
      // Reload page when there is a channel switch.
      const origin = window.location.origin;
      const url = window.location.href;
      const fullPath = url.replace(origin, "").replace(channel, nextUsername);

      // Replace url
      router.replace(fullPath);
    }
  }, [currentUsername, selected, channel, router, pathname]);

  useEffect(() => {
    // Whenever the channel handle changes, refresh
    if (selected?.username === channel) {
      window.location.reload();
      setSelected({});
    }
  }, [channel, selected]);

  /**
   * Handles changing URL when a different channel is selected
   * @param item Channel object from list
   */
  const handleChangeUrl = (item: ChannelThumbnail): void => {
    const upPath = pathname.replace(channel, `${item.username}`);

    // Replace url
    router.push(upPath);
  };

  return (
    <div className={`${className} commentator ihub-channel-list-avatar`}>
      <div className="item nameTruce">
        {activeChannel?.thumbnail ? (
          <img
            src={activeChannel.thumbnail.split("?")[0]}
            alt={activeChannel.name || "Channel thumbnail"}
          />
        ) : (
          <p className="char_avatar">{activeChannel?.name?.charAt(0) || "?"}</p>
        )}

        <div className="name">
          <h3>{activeChannel?.name}</h3>
          <p>@{activeChannel?.username}</p>
        </div>
      </div>

      {channelList?.results?.map(
        (option, index) =>
          option.channel.username !== currentUsername && (
            <ul
              className="item ff_layer"
              key={index}
              onClick={() => handleChangeUrl(option.channel)}
            >
              {option.channel?.thumbnail ? (
                <img
                  src={option.channel.thumbnail.split("?")[0]}
                  alt={option.channel.name || "Channel thumbnail"}
                />
              ) : (
                <p className="char_avatar">
                  {option.channel.name?.charAt(0) || "?"}
                </p>
              )}

              <div className="name">
                <h3>{option.channel.name}</h3>
                <p>@{option.channel.username}</p>
              </div>
            </ul>
          )
      )}
    </div>
  );
}
