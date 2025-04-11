import IhubFileUploaderDocs from "@/examples/components/forms/uploads/IhubFileUploaderDocs";
import FileUploaderExample from "@/examples/components/forms/uploads/IhubFileUploaderSample";
import Link from "next/link";

export default async function FileUploaderExamplePage() {
  return (
    <section>
      <FileUploaderExample />
      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/forms/uploads/IhubFileUploaderSample.tsx"
      >
        <button className="ihub-btn ihub-btn-secondary">View codebase</button>
      </Link>

      <IhubFileUploaderDocs />
      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/forms/uploads/IhubFileUploaderDocs.tsx"
      >
        <button className="ihub-btn ihub-btn-secondary">View codebase</button>
      </Link>
    </section>
  );
}
