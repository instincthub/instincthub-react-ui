"use client";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { InputText, SubmitButton } from "../../../../index";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

type Variant = "important" | "primary" | "outlined" | "danger" | "default" | "icon";

const VARIANTS: { key: Variant; label: string }[] = [
  { key: "important", label: "important" },
  { key: "primary", label: "primary" },
  { key: "outlined", label: "outlined" },
  { key: "danger", label: "danger" },
  { key: "default", label: "default" },
  { key: "icon", label: "icon" },
];

const STATES: { label: string; status: number; disabled?: boolean }[] = [
  { label: "Ready", status: 1 },
  { label: "Loading", status: 0 },
  { label: "Success", status: 2 },
  { label: "Error", status: 3 },
  { label: "Disabled", status: 1, disabled: true },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Every variant in every status, on one surface. */
const StateMatrix = ({ idPrefix }: { idPrefix: string }) => (
  <div className="sb-demo__matrix" role="table" aria-label="Button states">
    <span />
    {STATES.map((s) => (
      <span key={s.label} className="sb-demo__matrix-head">
        {s.label}
      </span>
    ))}
    {VARIANTS.map((v) => (
      <React.Fragment key={v.key}>
        <span className="sb-demo__matrix-row">{v.label}</span>
        {STATES.map((s) => (
          <div className="sb-demo__cell" key={`${v.key}-${s.label}`}>
            <SubmitButton
              id={`${idPrefix}-${v.key}-${s.label.toLowerCase()}`}
              type="button"
              variant={v.key}
              status={s.status}
              disabled={s.disabled}
              autoResetTimeout={0}
              label={
                v.key === "icon" ? (
                  <CalendarMonthOutlinedIcon />
                ) : (
                  "Save"
                )
              }
              ariaLabel={v.key === "icon" ? "Pick a date" : undefined}
            />
          </div>
        ))}
      </React.Fragment>
    ))}
  </div>
);

const SubmitButtonExample: React.FC = () => {
  const [pageTheme, setPageTheme] = useState<"LightMode" | "DarkMode">("LightMode");
  const [saveStatus, setSaveStatus] = useState<number>(1);
  const [deleteStatus, setDeleteStatus] = useState<number>(1);
  const [log, setLog] = useState<string>("");
  const [formStatus, setFormStatus] = useState<number>(1);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("DarkMode");
    setPageTheme(isDark ? "DarkMode" : "LightMode");
  }, []);

  const togglePageTheme = useCallback(() => {
    const next = pageTheme === "LightMode" ? "DarkMode" : "LightMode";
    document.documentElement.classList.remove("LightMode", "DarkMode");
    document.documentElement.classList.add(next);
    localStorage.setItem("theme", next);
    setPageTheme(next);
  }, [pageTheme]);

  const runSave = useCallback(async () => {
    setLog("Saving...");
    setSaveStatus(0);
    await wait(1500);
    setSaveStatus(2);
    setLog("Saved. The check stays until the next click or your own reset.");
    await wait(1800);
    setSaveStatus(1);
    setLog("");
  }, []);

  const runDelete = useCallback(async () => {
    setLog("Deleting...");
    setDeleteStatus(0);
    await wait(1500);
    setDeleteStatus(3);
    setLog("Could not delete: the account still owns two courses.");
    await wait(2200);
    setDeleteStatus(1);
    setLog("");
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormStatus(0);
      await wait(1500);
      setFormStatus(feedback.trim() ? 2 : 3);
      await wait(1800);
      setFormStatus(1);
    },
    [feedback]
  );

  return (
    <section className="sb-demo">
      <h1>SubmitButton</h1>
      <p className="sb-demo__intro">
        One button for every form action. The trailing slot shows a chevron on
        hover, a spinner while loading, a check on success and an error mark on
        failure. Icons inherit the text colour, so they stay visible on both
        themes.
      </p>

      <h2>Light and dark, side by side</h2>
      <p className="sb-demo__hint">
        Each surface forces its own theme, so you can compare both without
        switching the page. The dark surface uses the same class an embedded
        dark card would.
      </p>
      <div className="sb-demo__surfaces">
        <div className="sb-demo__surface sb-demo__surface--light ihub-light-mode">
          <h3>Light surface</h3>
          <StateMatrix idPrefix="light" />
        </div>
        <div className="sb-demo__surface sb-demo__surface--dark ihub-dark-mode">
          <h3>Dark surface</h3>
          <StateMatrix idPrefix="dark" />
        </div>
      </div>

      <h2>Lifecycle</h2>
      <p className="sb-demo__hint">
        Click to run a request. Save succeeds, delete fails, and each resets
        itself afterwards. Hover to see the chevron.
      </p>
      <div className="sb-demo__row">
        <SubmitButton
          id="sb-demo-save"
          type="button"
          label="Save changes"
          status={saveStatus}
          onClick={runSave}
        />
        <SubmitButton
          id="sb-demo-delete"
          type="button"
          variant="danger"
          label="Delete account"
          status={deleteStatus}
          onClick={runDelete}
        />
        <SubmitButton
          id="sb-demo-theme"
          type="button"
          variant="outlined"
          label={pageTheme === "LightMode" ? "Preview page in dark mode" : "Preview page in light mode"}
          onClick={togglePageTheme}
        />
      </div>
      <p className="sb-demo__log" aria-live="polite">
        {log}
      </p>

      <h2>In a form</h2>
      <p className="sb-demo__hint">
        Submit with text to see success, submit empty to see the error state.
      </p>
      <form className="sb-demo__form" onSubmit={handleSubmit}>
        <InputText
          label="Your feedback"
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <SubmitButton id="sb-demo-form" label="Send feedback" status={formStatus} />
      </form>
    </section>
  );
};

export default SubmitButtonExample;
