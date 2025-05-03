import MainNavigation from "../../../../components/navbars/MainNavigation";
import CodebaseLink from "../../../../components/ui/CodebaseLink";
import ColorPickerExample from "../../../../components/ui/ColorPickerExample";

export default function Page() {
  return (
    <>
      <MainNavigation />
      <main className="ihub-mt-10">
        <ColorPickerExample />

        <CodebaseLink
          label="View Code Example"
          url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/ColorPickerExample.tsx"
        />
        <CodebaseLink
          label="View Readme"
          url="https://github.com/instincthub/instincthub-react-ui/blob/main/src/components/ui/readme/ColorPicker.md"
        />
      </main>
    </>
  );
}
