import MainNavigation from "../../../../components/navbars/MainNavigation";
import TabsExample from "../../../../components/navbars/TabsExample";

export default async function TabsPage() {
  return (
    <>
      <MainNavigation />
      <section className="ihub-container ihub-mt-7">
        <div className="ihub-course-page">
          <TabsExample />
        </div>
      </section>
    </>
  );
}
