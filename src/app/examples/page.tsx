// import Forms from "@/components/Forms";
"use client";
import AnimatedBoxExample from "@/examples/components/forms/AnimatedBoxExample";
import SubmitBtnExample from "@/examples/components/forms/SubmitBtnExample";
import TextFieldExample from "@/examples/components/forms/TextFieldExample";
import TestComponent from "@/examples/components/TestComponent";
import TestPage from "@/examples/components/TestPage";
import ContentFormTextEditor from "@/examples/components/ui/ContentFormTextEditor";
import ContentViewOrEditSample from "@/examples/components/ui/ContentViewOrEditSample";
import ListStylesDemo from "@/examples/components/ui/ListStylesDemo";
import ListStylesDemoTwo from "@/examples/components/ui/ListStylesDemoTwo";

export default function Home() {
  return (
    <section className="ihub-container ihub-mt-10">
      <h1 className="ihub-pt-10">Testing instincthub-ui Locally </h1>
      <AnimatedBoxExample />
      <TextFieldExample />
      <SubmitBtnExample />
      <TestComponent />
      <TestPage />
      <ContentFormTextEditor />
      <ContentViewOrEditSample />
      <ListStylesDemo />
      <ListStylesDemoTwo />
    </section>
  );
}
