import BreadcrumbExample from "../../../../components/navbars/BreadcrumbExample";
import MainNavigation from "../../../../components/navbars/MainNavigation";

export default async function CoursePage() {
  return (
    <>
      <MainNavigation />
      <section className="ihub-container ihub-mt-10">
        <div className="ihub-course-page">
          <BreadcrumbExample />
        </div>
      </section>
    </>
  );
}
