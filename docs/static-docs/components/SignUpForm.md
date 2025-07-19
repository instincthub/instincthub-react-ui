# SignUpForm

A comprehensive sign-up form component with real-time validation, username/email availability checking, password matching, and integrated error handling. This component provides a complete user registration experience with session management and redirect capabilities.

## Features

- **Real-time Validation**: Live username and email availability checking
- **Password Matching**: Built-in password confirmation validation
- **Form Error Handling**: Comprehensive error display and management
- **Session Integration**: NextAuth.js integration with automatic login
- **Redirect Management**: Automatic redirection after successful signup
- **Provider Support**: OAuth provider integration ready
- **Responsive Design**: Mobile-friendly form layout
- **TypeScript Support**: Full type safety and interfaces

## Props

### SignUpFormExample Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `callbackUrl` | `string` | - | URL to redirect to after successful signup |

### Form Fields

- **Username**: Unique username with real-time availability check
- **Email**: Email address with availability validation
- **First Name**: User's first name (required)
- **Last Name**: User's last name (required)
- **Phone**: Mobile phone number (required)
- **Date of Birth**: Birth date selection (required)
- **Password**: Secure password with confirmation matching

## Basic Usage

```tsx
"use client";

import React from 'react';
import { SignUpFormExample } from 'instincthub-react-ui';

export default function SignUpPage() {
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Create Account</h1>
      <SignUpFormExample callbackUrl="/dashboard" />
    </div>
  );
}
```

## Advanced Usage

### Multi-Step Sign Up Process

```tsx
"use client";

import React, { useState } from 'react';
import { SignUpFormExample } from 'instincthub-react-ui';

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { id: 1, title: 'Account Information', description: 'Create your account' },
  { id: 2, title: 'Email Verification', description: 'Verify your email address' },
  { id: 3, title: 'Welcome', description: 'Setup complete' }
];

export default function MultiStepSignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<any>(null);

  const handleSignupSuccess = (data: any) => {
    setSignupData(data);
    setCurrentStep(2);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Create Your Account</h2>
            <p>Fill in your details to get started with InstinctHub</p>
            <SignUpFormExample 
              callbackUrl="/verify-email"
              onSuccess={handleSignupSuccess}
            />
          </div>
        );

      case 2:
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Check Your Email</h2>
            <p>We've sent a verification link to:</p>
            <strong>{signupData?.email}</strong>
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => setCurrentStep(3)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                I've Verified My Email
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Welcome to InstinctHub!</h2>
            <p>Your account has been created successfully.</p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Go to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Progress Indicator */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          {steps.map(step => (
            <div
              key={step.id}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px',
                backgroundColor: step.id <= currentStep ? '#007bff' : '#e9ecef',
                color: step.id <= currentStep ? 'white' : '#6c757d',
                borderRadius: '4px',
                margin: '0 5px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {step.id}. {step.title}
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', color: '#6c757d' }}>
          {steps.find(s => s.id === currentStep)?.description}
        </div>
      </div>

      {renderStep()}
    </div>
  );
}
```

### Custom Validation Rules

```tsx
"use client";

import React, { useState } from 'react';
import { 
  TextField, 
  PasswordsMatch, 
  IsUsernameEmailTaken,
  DateInput,
  SubmitButton,
  FormError 
} from 'instincthub-react-ui';

interface CustomSignUpFormProps {
  onSubmit?: (data: any) => void;
  requireAgeVerification?: boolean;
  minAge?: number;
}

export default function CustomSignUpForm({ 
  onSubmit,
  requireAgeVerification = true,
  minAge = 18
}: CustomSignUpFormProps) {
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const validateAge = (birthDate: string): boolean => {
    if (!requireAgeVerification) return true;
    
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1 >= minAge;
    }
    
    return age >= minAge;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Custom validation
    const errors: any = {};

    // Age validation
    if (requireAgeVerification && data.date_of_birth) {
      if (!validateAge(data.date_of_birth as string)) {
        errors.date_of_birth = `You must be at least ${minAge} years old to sign up.`;
      }
    }

    // Phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (data.mobile && !phoneRegex.test(data.mobile as string)) {
      errors.mobile = 'Please enter a valid phone number.';
    }

    // Username availability
    if (!usernameValid) {
      errors.username = 'Username is not available or invalid.';
    }

    // Email availability
    if (!emailValid) {
      errors.email = 'Email is not available or invalid.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default submission logic
        console.log('Form submitted:', data);
      }
    } catch (error) {
      setFormErrors({ general: 'An error occurred during signup. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Username */}
        <IsUsernameEmailTaken
          name="username"
          type="text"
          label="Username *"
          required
          setIsValid={setUsernameValid}
          placeholder="Choose a unique username"
        />
        {formErrors.username && (
          <div style={{ color: '#dc3545', fontSize: '14px' }}>
            {formErrors.username}
          </div>
        )}

        {/* Email */}
        <IsUsernameEmailTaken
          name="email"
          type="email"
          label="Email Address *"
          required
          setIsValid={setEmailValid}
          placeholder="your@email.com"
        />
        {formErrors.email && (
          <div style={{ color: '#dc3545', fontSize: '14px' }}>
            {formErrors.email}
          </div>
        )}

        {/* Name Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <TextField
            name="first_name"
            type="text"
            label="First Name *"
            required
            placeholder="John"
          />
          <TextField
            name="last_name"
            type="text"
            label="Last Name *"
            required
            placeholder="Doe"
          />
        </div>

        {/* Phone */}
        <TextField
          name="mobile"
          type="tel"
          label="Phone Number *"
          required
          placeholder="+1 (555) 123-4567"
        />
        {formErrors.mobile && (
          <div style={{ color: '#dc3545', fontSize: '14px' }}>
            {formErrors.mobile}
          </div>
        )}

        {/* Date of Birth */}
        <DateInput
          label={`Date of Birth * ${requireAgeVerification ? `(Must be ${minAge}+)` : ''}`}
          name="date_of_birth"
          required
          controls={false}
        />
        {formErrors.date_of_birth && (
          <div style={{ color: '#dc3545', fontSize: '14px' }}>
            {formErrors.date_of_birth}
          </div>
        )}

        {/* Password Fields */}
        <PasswordsMatch />

        {/* Terms and Conditions */}
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <input
            type="checkbox"
            name="accept_terms"
            required
            style={{ marginTop: '3px' }}
          />
          <span style={{ fontSize: '14px', color: '#6c757d' }}>
            I agree to the{' '}
            <a href="/terms" target="_blank" style={{ color: '#007bff' }}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" target="_blank" style={{ color: '#007bff' }}>
              Privacy Policy
            </a>
          </span>
        </label>

        {/* Submit Button */}
        <SubmitButton
          label={isSubmitting ? 'Creating Account...' : 'Create Account'}
          disabled={!usernameValid || !emailValid || isSubmitting}
          status={isSubmitting ? 1 : 0}
        />

        {/* General Errors */}
        {formErrors.general && (
          <FormError errors={{ general: formErrors.general }} />
        )}

        {/* Login Link */}
        <p style={{ textAlign: 'center', color: '#6c757d' }}>
          Already have an account?{' '}
          <a href="/auth/login" style={{ color: '#007bff', fontWeight: 'bold' }}>
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
```

### Organization/Team Sign Up

```tsx
"use client";

import React, { useState } from 'react';
import { 
  TextField, 
  PasswordsMatch, 
  IsUsernameEmailTaken,
  SubmitButton,
  FormError,
  Dropdown
} from 'instincthub-react-ui';

interface TeamSignUpProps {
  planType?: 'basic' | 'pro' | 'enterprise';
  onSubmit?: (data: any) => void;
}

const organizationSizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' }
];

const industries = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' }
];

export default function TeamSignUpForm({ planType = 'pro', onSubmit }: TeamSignUpProps) {
  const [formData, setFormData] = useState({
    plan_type: planType,
    organization_size: '',
    industry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const form = new FormData(e.target as HTMLFormElement);
      const data = {
        ...Object.fromEntries(form.entries()),
        ...formData
      };

      if (onSubmit) {
        await onSubmit(data);
      }
    } catch (error) {
      setErrors({ general: 'Failed to create team account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Create Team Account</h1>
        <p style={{ color: '#6c757d' }}>
          Set up your organization on InstinctHub {planType.toUpperCase()} plan
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Admin User Information */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginTop: 0 }}>Admin Account Details</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <TextField
              name="first_name"
              type="text"
              label="First Name *"
              required
            />
            <TextField
              name="last_name"
              type="text"
              label="Last Name *"
              required
            />
          </div>

          <IsUsernameEmailTaken
            name="email"
            type="email"
            label="Admin Email *"
            required
          />

          <TextField
            name="job_title"
            type="text"
            label="Job Title"
            placeholder="e.g., CEO, CTO, Team Lead"
          />

          <PasswordsMatch />
        </div>

        {/* Organization Information */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Organization Details</h3>
          
          <TextField
            name="organization_name"
            type="text"
            label="Organization Name *"
            required
            placeholder="Your Company Name"
          />

          <TextField
            name="organization_website"
            type="url"
            label="Website"
            placeholder="https://yourcompany.com"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Organization Size *
              </label>
              <select
                name="organization_size"
                required
                value={formData.organization_size}
                onChange={(e) => handleInputChange('organization_size', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
              >
                <option value="">Select size</option>
                {organizationSizes.map(size => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Industry *
              </label>
              <select
                name="industry"
                required
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
              >
                <option value="">Select industry</option>
                {industries.map(industry => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Plan Summary */}
        <div style={{
          backgroundColor: '#e7f3ff',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h4 style={{ marginTop: 0 }}>Plan Summary</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{planType.toUpperCase()} Plan</strong>
              <div style={{ fontSize: '14px', color: '#6c757d' }}>
                Advanced features for growing teams
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              ${planType === 'basic' ? '29' : planType === 'pro' ? '99' : '299'}/month
            </div>
          </div>
        </div>

        {/* Submit */}
        <SubmitButton
          label={isSubmitting ? 'Creating Team Account...' : 'Create Team Account'}
          disabled={isSubmitting}
          status={isSubmitting ? 1 : 0}
        />

        {errors.general && (
          <FormError errors={errors} />
        )}

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#6c757d', marginTop: '20px' }}>
          By creating an account, you agree to our Terms of Service and Privacy Policy.
          Your team will have access to advanced collaboration features.
        </p>
      </form>
    </div>
  );
}
```

## Form Integration Patterns

### Integration with React Hook Form

```tsx
"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, PasswordsMatch, DateInput } from 'instincthub-react-ui';

const schema = yup.object({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  mobile: yup.string().required('Phone number is required'),
  date_of_birth: yup.date().required('Date of birth is required')
});

export default function HookFormSignUp() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    console.log('Form data:', data);
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Username *"
            error={errors.username?.message}
          />
        )}
      />
      
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label="Email *"
            error={errors.email?.message}
          />
        )}
      />
      
      {/* Other fields... */}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

## Testing Examples

```tsx
// __tests__/SignUpForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignUpFormExample } from 'instincthub-react-ui';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('../../components/lib', () => ({
  reqOptions: jest.fn(),
  API_HOST_URL: 'http://localhost:3000/',
  openToast: jest.fn(),
  objectIsEmpty: jest.fn()
}));

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('SignUpFormExample', () => {
  const mockPush = jest.fn();
  const mockUpdate = jest.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush } as any);
    mockUseSession.mockReturnValue({
      data: null,
      update: mockUpdate
    } as any);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields', () => {
    render(<SignUpFormExample />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
  });

  test('submit button is disabled initially', () => {
    render(<SignUpFormExample />);
    
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    expect(submitButton).toBeDisabled();
  });

  test('handles successful form submission', async () => {
    const mockResponse = {
      id: 123,
      email: 'test@example.com'
    };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    });

    render(<SignUpFormExample />);
    
    // Fill form fields
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'testuser' } });
    
    // Submit form
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({ info: mockResponse });
      expect(mockPush).toHaveBeenCalledWith('/auth/verify-email?email=test@example.com');
    });
  });

  test('handles form submission errors', async () => {
    const mockError = {
      status: 400,
      message: 'Email already exists'
    };
    
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockError)
    });

    render(<SignUpFormExample />);
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test('handles network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<SignUpFormExample />);
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/network or server error/i)).toBeInTheDocument();
    });
  });

  test('validates username and email availability', async () => {
    render(<SignUpFormExample />);
    
    const usernameField = screen.getByLabelText(/username/i);
    const emailField = screen.getByLabelText(/email/i);
    
    fireEvent.change(usernameField, { target: { value: 'existinguser' } });
    fireEvent.change(emailField, { target: { value: 'existing@example.com' } });
    
    // Should trigger validation
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
```

## Related Components

- [LoginForm](./LoginForm.md) - User login form component
- [PasswordsMatch](./PasswordsMatch.md) - Password confirmation validation
- [IsUsernameEmailTaken](./IsUsernameEmailTaken.md) - Username/email availability checker
- [TextField](./TextField.md) - Text input field component
- [DateInput](./DateInput.md) - Date selection component
- [SubmitButton](./SubmitButton.md) - Form submission button
- [FormError](./FormError.md) - Error display component

## Notes

- Requires NextAuth.js for session management
- Integrates with InstinctHub API endpoints
- Real-time validation requires network connectivity
- Form data is automatically validated before submission
- Supports OAuth provider integration
- Mobile-responsive design included
- Full TypeScript support with proper type definitions

