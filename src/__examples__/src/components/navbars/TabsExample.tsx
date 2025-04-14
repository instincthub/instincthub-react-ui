"use client";
import { Breadcrumb, Tabs, VerticalTabs } from "../../../../index";
import { VerticalTabItemType } from "../../../../types";
import Link from "next/link";

export default function TabsExample() {
  // Example tabs
  const tabs = [
    {
      id: "tab1",
      label: "Tab 1",
      content: <div>Tab 1 content</div>,
    },
    {
      id: "tab2",
      label: "Tab 2",
      content: <div>Tab 2 content</div>,
    },
  ];
  return (
    <div className="ihub-container">
      {/* Tabs usage */}

      <section className="ihub-mt-10">
        <h2 className="ihub-text-2xl ihub-font-bold">Tabs</h2>
        <Tabs
          items={tabs}
          defaultActiveTab="tab1"
          onChange={(tabItem) => console.log(tabItem)}
        />
      </section>
      <section className="ihub-mt-10">
        <h2 className="ihub-text-2xl ihub-font-bold">Vertical Tabs</h2>
        <VerticalTabs
          items={
            [
              { id: 1, label: "Tab 1", content: <div>Content 1</div> },
              { id: 2, label: "Tab 2", content: <div>Content 2</div> },
              { id: 3, label: "Tab 3", content: <div>Content 3</div> },
            ] as VerticalTabItemType[]
          }
          defaultActiveTab={1}
          onChange={(tabItem) => {
            console.log(tabItem);
          }}
        />
      </section>

      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/tabs"
      >
        <button>View codebase</button>
      </Link>
    </div>
  );
}
