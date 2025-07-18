# Post Data to backend example

```tsx
"use client";

import { useEffect, useState } from "react";
import { SVGs } from "../assets/svg/SVGs";
import TextField from "./forms/TextField";
import TextArea from "./forms/TextArea";
import Image from "next/image";
import { openToast, reqOptions } from "@instincthub/react-ui/lib";
import { SubmitButton } from "@instincthub/react-ui";
import { printInputError } from "@/assets/js/help_func";
import * as Sentry from "@sentry/nextjs";
import { getIPAddress } from "@/lib/leadboard/getIPAddress";

const ContactForm = () => {
  const [error, setError] = useState();
  const [status, setStatus] = useState(1);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus(0);

    try {
      const ipData = await getIPAddress();
      const formdata = new FormData(e.target);
      formdata.append("ip_data", JSON.stringify(ipData));

      const options = reqOptions("POST", formdata);

      const url = `${process.env.NEXT_PUBLIC_LEAD_API_HOST}contacts/instincthub/contactus/`;
      const req = await fetch(url, options);
      const res = await req.json();

      if (req.ok) {
        openToast("Thank you for reaching out; we will be in touch.");
        e.target.reset();
      } else {
        setError(res);
        openToast(
          res?.message || "Oops! Something went wrong. Please try again.",
          400
        );
      }
    } catch (err) {
      setError(err);
      openToast(ErrorMsg, 400);
      Sentry.captureException(
        `${JSON.stringify(err)} Form Data: ${JSON.stringify(formData)}`
      );
    } finally {
      setStatus(1);
    }
  };

  useEffect(() => {
    // Remove overlay if success and display error message if error
    if (error) {
      console.log(error);
      printInputError(error);
    }
  }, [error]);

  return (
    <section className="container" id="ContactForm">
      <div className="contact_form">
        <div className="contact_us">
          <div>
            <form onSubmit={handleFormSubmit}>
              <TextField
                types="text"
                names="first_name"
                labels="First Name"
                requireds={true}
              />
              <TextField
                types="text"
                names="last_name"
                labels="Last Name"
                requireds={true}
              />
              <TextField
                types="text"
                names="email"
                labels="Email Address"
                requireds={true}
              />
              <TextArea
                names="message"
                rows="10"
                labels="How can we help?"
                requireds={true}
              />
              <SubmitButton label="Send" status={status} />
            </form>
          </div>
        </div>
        <div className="address">
          <h2>Contact info</h2>
          <ul>
            <li className="phone">
              <a href="tel:+2348162880409" target="_blank" rel="noopener">
                (+234) 816 288 0409
              </a>
              &nbsp; | &nbsp;
              <a href="tel:+2349164140911" target="_blank" rel="noopener">
                (+234) 916 414 0911
              </a>
            </li>
            <li className="email">
              <a href="mailto:info@instincthub.com">
                info at instincthub dot com
              </a>
            </li>
          </ul>

          <ul className="socials_round">
            <li>
              <a
                href="https://wa.me/message/5IA2QYCI53SUM1"
                target="_blank"
                rel="noopener"
              >
                <Image
                  unoptimized
                  width={40}
                  height={40}
                  src={SVGs?.w_whatsapp.src}
                  alt="WhatsApp"
                />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/instincthub"
                target="_blank"
                rel="noopener"
              >
                <Image
                  unoptimized
                  width={40}
                  height={40}
                  src={SVGs.w_facebook.src}
                  alt="Facebook"
                />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/instincthub/"
                target="_blank"
                rel="noopener"
              >
                <Image
                  unoptimized
                  width={40}
                  height={40}
                  src={SVGs.w_twitter.src}
                  alt="Twitter"
                />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/instincthub"
                target="_blank"
                rel="noopener"
              >
                <Image
                  unoptimized
                  width={40}
                  height={40}
                  src={SVGs.w_linkedin.src}
                  alt="LinkedIn"
                />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/instincthub_"
                target="_blank"
                rel="noopener"
              >
                <Image
                  unoptimized
                  width={40}
                  height={40}
                  src={SVGs.w_ig.src}
                  alt="Instagram"
                />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/instincthub"
                target="_blank"
                rel="noopener"
              >
                <Image
                  unoptimized
                  width={40}
                  height={40}
                  src={SVGs.w_youtube.src}
                  alt="YouTube"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

const ErrorMsg = `
      Network error. Please check your connection and try again. Or chat with us
      via
      ${(
        <a
          href="https://wa.me/message/5IA2QYCI53SUM1"
          target="_blank"
          rel="noopener"
        >
          WhatsApp{" "}
        </a>
      )}`;
```
