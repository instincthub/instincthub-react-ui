import { useRouter } from "next/navigation";

interface HandleErrorProps {
  status: number;
  items: Record<string, any>;
  registerForm: HTMLFormElement | null;
  r_path: string | null;
}

/**
 * Processes API error responses and displays appropriate messages or redirects
 */
const HandleError: React.FC<HandleErrorProps> = ({
  status,
  items,
  registerForm,
  r_path,
}) => {
  const router = useRouter();

  // Helper function to print validation errors (needs to be defined)
  const printErr = (key: string, value: any, index: number): void => {
    // Implementation would go here - this was called in the original code
    // but not defined there
    console.log(`Error for ${key}: ${value} (index: ${index})`);
  };

  if (typeof document !== "undefined") {
    const serverTag = document.querySelector(".server_err");

    if (items) {
      if (status === 400) {
        if (items && (items.user || items.username)) {
          if (items.user && items.user[0] === "This field must be unique.") {
            if (serverTag) {
              serverTag.setAttribute("style", "display: block");
              serverTag.setAttribute(
                "style",
                "background-color: var(--DarkCyan)"
              );

              const currentPath = document.location.pathname;
              if (
                currentPath === "/register/details" ||
                currentPath === "/register/details/"
              ) {
                const buttonSpan = serverTag.querySelector("a button span");
                if (buttonSpan) {
                  buttonSpan.innerHTML = "Take Assessment";
                }

                const link = serverTag.querySelector("a");
                if (link) {
                  link.setAttribute("href", "/quiz/");
                }
              }

              const heading = serverTag.querySelector("h3");
              if (heading) {
                heading.textContent = "We already have your details!";
              }
            }
            router.push("#Socials");
          }
        } else {
          Object.entries(items).forEach((item, index) => {
            const [key, value] = item;
            printErr(key, value, index);
          });

          const errorElement = document.querySelector(".server_err");
          if (errorElement) {
            errorElement.setAttribute("style", "display: none");
          }
        }
      } else if (status === 200 || status === 201 || status === 202) {
        if (r_path !== null) {
          router.push(r_path);
        }
      } else if (status === 401) {
        if (serverTag) {
          serverTag.setAttribute("style", "display: block");

          const link = serverTag.querySelector("a");
          if (link) {
            link.innerHTML = "";
          }

          const heading = serverTag.querySelector("h3");
          if (heading && items.detail) {
            heading.textContent = items.detail;
          }
        }
        router.push("#Socials");
      }
    }
  }

  // Component doesn't render anything
  return null;
};

export default HandleError;
