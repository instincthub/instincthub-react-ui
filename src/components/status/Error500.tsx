import ErrorState from "./ErrorState";

interface Error500Props {
  msg?: string;
}

/**
 * 
 * @component
 * @example
 * ```tsx
 *
 * <Error500 msg="Something went wrong." />
 * ```
 * Props interface for the Error500Props interface
 * @property {string} msg - Optional error message
 */
const Error500: React.FC<Error500Props> = ({ msg }) => {
  return (
    <ErrorState
      // img={SVGs.Error500}
      text={
        msg ||
        "Something went wrong. Don't worry, it's not you. it's from our end. We are sorry for the inconvenience."
      }
      title="Ooops..."
    />
  );
};

export default Error500;
