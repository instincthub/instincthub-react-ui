import Link from "next/link";
import styles from "@/styles/scss/unsplash.login.module.scss";
import { unsplashDefaultObject } from "../../assets/json/unsplashDefaultObject";
import { IN_DEV_MODE } from "../lib/helpFunction";
import Image from "next/image";
import { useDispatch, useSelector } from "@/lib/redux";
import {
  selectUnsplashObject,
  unsplashObject,
} from "@/lib/redux/slices/authSlice";
import { useEffect } from "react";

const UnsplashRandomImage = async (props) => {
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
          let res_obj = unsplashDefaultObject;
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
  }, []);

  return (
    <div className={styles.unsplash}>
      <Image
        width={668.797}
        height={442.532}
        src={unsplashData.urls?.regular}
        alt={props.category}
        className={props.className}
      />
      <p className={styles.credit_link}>
        <Link
          href={unsplashData.user?.links?.html || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Photo by {unsplashData.user?.name}
        </Link>
      </p>
    </div>
  );
};

export default UnsplashRandomImage;
