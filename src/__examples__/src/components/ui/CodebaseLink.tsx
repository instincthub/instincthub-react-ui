import Link from "next/link";

export default function CodebaseLink({ url }: { url: string }) {
  return (
    <div>
      <Link rel="noreferrer noopener" target="_blank" href={url}>
        <button className="ihub-outlined-btn">View codebase</button>
      </Link>
    </div>
  );
}
