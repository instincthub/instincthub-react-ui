// import Forms from "@/components/Forms";
"use client";
import AnimatedBoxExample from "../../components/forms/AnimatedBoxExample";
import SubmitBtnExample from "../../components/forms/SubmitBtnExample";
import TextFieldExample from "../../components/forms/TextFieldExample";
import TestComponent from "../../components/TestComponent";
import TestPage from "../../components/TestPage";
import ContentFormTextEditor from "../../components/ui/ContentFormTextEditor";
import ContentViewOrEditSample from "../../components/ui/ContentViewOrEditSample";
import ListStylesDemo from "../../components/ui/ListStylesDemo";
import ListStylesDemoTwo from "../../components/ui/ListStylesDemoTwo";

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
