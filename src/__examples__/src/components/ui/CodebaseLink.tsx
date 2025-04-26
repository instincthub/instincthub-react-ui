import Link from "next/link";

export default function CodebaseLink({
  url,
  label,
}: {
  url: string;
  label?: string;
}) {
  return (
    <div className="ihub-mt-3 ihub-mr-2">
      <Link rel="noreferrer noopener" target="_blank" href={url}>
        <button className="ihub-outlined-btn">
          {label || "View codebase"}
        </button>
      </Link>
    </div>
  );
}
