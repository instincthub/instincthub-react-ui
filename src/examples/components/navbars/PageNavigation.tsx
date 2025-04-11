import Link from "next/link";

function PageNavigation() {
  const indexList = [
    {
      title: "Exmples",
      href: "/examples",
    },
    {
      title: "iHub File Uploader",
      href: "/components/forms/uploads/ihub-file-uploader",
    },
    {
      title: "Code Display",
      href: "/code-display",
    },
  ];
  return (
    <section>
      <nav className="page-navigation ihub-content-viewer">
        <ol className="ihub-list-secondary">
          {indexList.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}

export default PageNavigation;
