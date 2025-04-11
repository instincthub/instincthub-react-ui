# StepProgressBar Component

A customizable step progress indicator component for multi-step forms or processes.

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `step` | number | Yes | - | Current active step |
| `counts` | number[] | Yes | - | Array of step numbers to display |
| `widths` | string | No | "400px" | Maximum width of the progress bar |

## Usage

```tsx
import StepProgressBar from "../components/StepProgressBar";

// Basic usage
<StepProgressBar step={1} counts={[1,2,3,4]} />

// Custom width
<StepProgressBar step={2} counts={[1,2,3,4,5,6,7]} widths="1000px" />

// For a completed process
<StepProgressBar step={5} counts={[1,2,3,4,5]} />
```

## CSS Requirements

Add the CSS from the provided file to your `input-fields.css` or global stylesheet.

## Examples

### Registration Process
```tsx
const [currentStep, setCurrentStep] = useState(1);
const steps = [1, 2, 3, 4];

return (
  <div className="registration-form">
    <StepProgressBar step={currentStep} counts={steps} />
    
    {currentStep === 1 && <PersonalInfoForm onNext={() => setCurrentStep(2)} />}
    {currentStep === 2 && <AccountDetailsForm onNext={() => setCurrentStep(3)} />}
    {currentStep === 3 && <PreferencesForm onNext={() => setCurrentStep(4)} />}
    {currentStep === 4 && <ConfirmationScreen />}
  </div>
);
```

### Checkout Flow
```tsx
const checkoutSteps = [1, 2, 3];
const stepLabels = ["Cart", "Shipping", "Payment"];

return (
  <>
    <div className="checkout-header">
      <StepProgressBar step={currentStep} counts={checkoutSteps} />
      <div className="step-labels">
        {stepLabels.map((label, index) => (
          <div key={index} className="step-label">{label}</div>
        ))}
      </div>
    </div>
    {/* Checkout forms */}
  </>
);
```