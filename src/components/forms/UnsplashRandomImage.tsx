import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/scss/unsplash.login.module.scss";
import { unsplashDefaultObject } from "../../assets/json/unsplashDefaultObject";
import { IN_DEV_MODE } from "../lib/helpFunction";
import { useDispatch, useSelector } from "@/lib/redux";
import {
  selectUnsplashObject,
  unsplashObject,
} from "@/lib/redux/slices/authSlice";

interface UnsplashUser {
  name: string;
  links?: {
    html?: string;
  };
}

interface UnsplashUrls {
  regular: string;
  raw?: string;
  full?: string;
  small?: string;
  thumb?: string;
}

interface UnsplashObject {
  id?: string;
  urls?: UnsplashUrls;
  user?: UnsplashUser;
}

interface UnsplashRandomImageProps {
  category: string;
  className?: string;
}

const UnsplashRandomImage: React.FC<UnsplashRandomImageProps> = (props) => {
  const dispatch = useDispatch();
  const unsplashData = useSelector(selectUnsplashObject);

  useEffect(() => {
    const getUnsplashObject = async () => {
      if (!IN_DEV_MODE) {
        try {
          const response = await fetch(
            `https://api.unsplash.com/photos/random?query=${props.category}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
          );
          const req = await response.json();
          let res_obj: UnsplashObject = unsplashDefaultObject;
          if (req?.id) {
            res_obj = req;
          }
          dispatch(unsplashObject.actions.add(res_obj));
        } catch (error) {
          console.error("Error fetching random image:", error);
        }
      } else {
        dispatch(unsplashObject.actions.add(unsplashDefaultObject));
      }
    };
    getUnsplashObject();
  }, [dispatch, props.category]);

  return (
    <div className={styles.unsplash}>
      <Image
        width={668.797}
        height={442.532}
        src={unsplashData.urls?.regular || ""}
        alt={props.category}
        className={props.className}
      />
      <p className={styles.credit_link}>
        <Link
          href={unsplashData.user?.links?.html || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Photo by {unsplashData.user?.name || "Unknown"}
        </Link>
      </p>
    </div>
  );
};

export default UnsplashRandomImage;