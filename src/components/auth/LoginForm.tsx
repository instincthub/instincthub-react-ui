"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  openConfirmModal,
  openToast,
  handleResendOTP,
  reqOptions,
  setCookie,
  getData,
  getCookie,
} from "../../components/lib";
import { SessionUserType, LoginFormPropsType } from "../../types";
import PasswordField from "../forms/PasswordField";
import InputText from "../forms/InputText";
import OrDivider from "../ui/OrDivider";
import FromInstinctHub from "./FromInstinctHub";
import SubmitButton from "../forms/SubmitButton";

// Define response type from API
interface LoginResponse {
  status: number;
  message?: string;
  detail?: string;
  [key: string]: any;
}

// Password strength checker
const checkPasswordStrength = (password: string) => {
  const strength = {
    score: 0,
    feedback: [] as string[],
  };

  if (password.length >= 8) strength.score += 1;
  else strength.feedback.push("At least 8 characters");

  if (/[A-Z]/.test(password)) strength.score += 1;
  else strength.feedback.push("Include uppercase letter");

  if (/[a-z]/.test(password)) strength.score += 1;
  else strength.feedback.push("Include lowercase letter");

  if (/\d/.test(password)) strength.score += 1;
  else strength.feedback.push("Include number");

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength.score += 1;
  else strength.feedback.push("Include special character");

  return strength;
};

// Input sanitizer
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
};

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Form data persistence
const FORM_STORAGE_KEY = "loginForm_preservedData";

const saveFormData = (data: { username: string; rememberMe: boolean }) => {
  try {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save form data:", error);
  }
};

const loadFormData = (): { username: string; rememberMe: boolean } | null => {
  try {
    const saved = localStorage.getItem(FORM_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn("Failed to load form data:", error);
    return null;
  }
};

const clearFormData = () => {
  try {
    localStorage.removeItem(FORM_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear form data:", error);
  }
};

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="ihub-loading-skeleton">
    <div className="ihub-skeleton-line ihub-skeleton-title"></div>
    <div className="ihub-skeleton-line ihub-skeleton-input"></div>
    <div className="ihub-skeleton-line ihub-skeleton-input"></div>
    <div className="ihub-skeleton-line ihub-skeleton-button"></div>
  </div>
);

/**
 * Enhanced LoginForm component with comprehensive security, UX, and accessibility features
 */
const LoginForm = ({
  params,
  searchParams,
  endpointPath,
  verificationPath,
  redirectPath,
  hideResetPassword = false,
  hideSignup = false,
  type,
  channelUsername = "skills",
  // Loading & State Control Props
  isLoading: externalLoading = false,
  onSubmitStart,
  onSubmitComplete,
  loadingText = "Loading...",
  preserveFormData = false,
  // Custom Redirect Handlers
  onSuccessRedirect,
  onFailureRedirect,
  customValidationHandler,
  autoRedirectOnSession = true,
  // Form Customization Props
  title = "Login Form",
  subtitle,
  showTitle = true,
  className,
  formClassName,
  // Validation & Error Handling
  enableClientValidation = false,
  customValidationRules,
  onError,
  // Session Management Props
  sessionCheckInterval = 30000,
  clearCallbackAfterUse = true,
  // UI Customization Props
  submitButtonText = "Login",
  submitButtonVariant = "primary" as const,
  showRememberMe = false,
  rememberMeText = "Remember me",
  // OAuth & Social Login Props
  enableOAuth = false,
  oauthProviders = [],
  oauthConfig = {},
  // Security Props
  enableCaptcha = false,
  captchaProvider = "recaptcha",
  enableRateLimiting = false,
  maxAttempts = 5,
  lockoutDuration = 300000,
  // Analytics & Tracking Props
  trackingEnabled = false,
  onLoginAttempt,
  onLoginSuccess,
  onLoginFailure,
  // Accessibility Props
  ariaLabel,
  ariaDescribedBy,
  focusOnMount = false,
  // Additional Missing Props
  autoComplete = true,
  validateOnBlur = false,
  debounceValidation = 300,
  showPasswordStrength = false,
  enableFormReset = false,
  autoSave = false,
  autoSaveInterval = 5000,
  offlineSupport = false,
  retryAttempts = 3,
  retryDelay = 1000,
  sessionTimeoutWarning = false,
  sessionTimeoutDuration = 1800000, // 30 minutes
  csrfToken,
  sanitizeInputs = true,
  highContrastMode = false,
  showLoadingSkeleton = false,
  preventMultipleSubmissions = true,
}: LoginFormPropsType) => {
  const router = useRouter();
  const { error, callbackUrl } = searchParams;

  // Core state
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<number>(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [internalLoading, setInternalLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  // Enhanced state
  const [isOffline, setIsOffline] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [] as string[],
  });
  const [submissionInProgress, setSubmissionInProgress] = useState(false);
  const [sessionWarningShown, setSessionWarningShown] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [formId] = useState(() => Math.random().toString(36).substr(2, 9));

  // Refs for cleanup and management
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sessionCheckRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);
  const formRef = useRef<HTMLFormElement>(null);
  const retryCountRef = useRef(0);

  const { data: session } = useSession();
  const user = session?.user;


  // Debounced values for validation
  const debouncedUsername = useDebounce(username, debounceValidation);
  const debouncedPassword = useDebounce(password, debounceValidation);

  // Determine loading state
  const isFormLoading =
    externalLoading || internalLoading || submissionInProgress;

  // Cleanup function
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    [timeoutRef, sessionCheckRef, autoSaveRef, sessionTimeoutRef].forEach(
      (ref) => {
        if (ref.current) {
          clearTimeout(ref.current);
        }
      }
    );
  }, []);

  // Load preserved form data
  useEffect(() => {
    if (preserveFormData) {
      const savedData = loadFormData();
      if (savedData) {
        setUsername(savedData.username);
        setRememberMe(savedData.rememberMe);
      }
    }
  }, [preserveFormData]);

  // Auto-save form data
  useEffect(() => {
    if (autoSave && formTouched) {
      autoSaveRef.current = setTimeout(() => {
        if (preserveFormData) {
          saveFormData({ username, rememberMe });
        }
      }, autoSaveInterval);

      return () => {
        if (autoSaveRef.current) {
          clearTimeout(autoSaveRef.current);
        }
      };
    }
  }, [
    autoSave,
    autoSaveInterval,
    username,
    rememberMe,
    formTouched,
    preserveFormData,
  ]);

  // Offline detection
  useEffect(() => {
    if (offlineSupport) {
      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      setIsOffline(!navigator.onLine);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, [offlineSupport]);

  // Memoized session user extraction
  const sessionUser = useMemo(() => {
    const isSessionUserType = (user: any): user is SessionUserType => {
      const hasToken =
        user?.name && typeof user.name === "object" && "token" in user.name;
      return hasToken;
    };
    const result = isSessionUserType(user) ? user : null;
    return result;
  }, [user]);

  const { handle, token, uuid, email, verifyEmail } = useMemo(() => {
    // Try multiple extraction paths for flexibility
    const handle = sessionUser?.name?.channels?.active?.channel?.username;

    // Try different token paths
    const token =
      sessionUser?.name?.token ||
      (session as any)?.accessToken ||
      (sessionUser as any)?.accessToken ||
      sessionUser?.name?.access_token;

    // Try different UUID paths
    const uuid =
      sessionUser?.name?.uuid ||
      sessionUser?.name?.user_uuid ||
      sessionUser?.name?.id;

    const email = sessionUser?.name?.email || sessionUser?.email;
    const verifyEmail =
      sessionUser?.name?.verified || sessionUser?.name?.email_verified;


    return { handle, token, uuid, email, verifyEmail };
  }, [sessionUser, session]);

  // Session timeout warning
  useEffect(() => {
    if (sessionTimeoutWarning && token && !sessionWarningShown) {
      sessionTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          const remainingTime = 5 * 60 * 1000; // 5 minutes warning
          openConfirmModal(
            `Your session will expire in 5 minutes. Do you want to extend it?`
          ).then((extend: boolean) => {
            if (extend) {
              // Trigger session refresh - will be defined later
            }
            setSessionWarningShown(true);
          });
        }
      }, sessionTimeoutDuration - 5 * 60 * 1000);

      return () => {
        if (sessionTimeoutRef.current) {
          clearTimeout(sessionTimeoutRef.current);
        }
      };
    }
  }, [
    sessionTimeoutWarning,
    sessionTimeoutDuration,
    token,
    sessionWarningShown,
  ]);

  // Password strength validation
  useEffect(() => {
    if (showPasswordStrength && password) {
      setPasswordStrength(checkPasswordStrength(password));
    }
  }, [password, showPasswordStrength]);

  // Client-side validation
  const validateForm = useCallback(() => {
    if (!enableClientValidation) return true;

    const errors: { username?: string; password?: string } = {};
    const cleanUsername = sanitizeInputs ? sanitizeInput(username) : username;
    const cleanPassword = sanitizeInputs ? sanitizeInput(password) : password;

    // Username validation
    if (customValidationRules?.username) {
      const usernameError = customValidationRules.username(cleanUsername);
      if (usernameError) errors.username = usernameError;
    } else if (!cleanUsername.trim()) {
      errors.username = "Username is required";
    } else if (cleanUsername.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    // Password validation
    if (customValidationRules?.password) {
      const passwordError = customValidationRules.password(cleanPassword);
      if (passwordError) errors.password = passwordError;
    } else if (!cleanPassword.trim()) {
      errors.password = "Password is required";
    } else if (cleanPassword.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);

    // Announce errors to screen readers
    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors).join(". ");
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.style.position = "absolute";
      announcement.style.left = "-10000px";
      announcement.textContent = `Form validation errors: ${errorMessage}`;
      document.body.appendChild(announcement);
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    }

    return Object.keys(errors).length === 0;
  }, [
    enableClientValidation,
    customValidationRules,
    username,
    password,
    sanitizeInputs,
  ]);

  // Debounced validation
  useEffect(() => {
    if (validateOnBlur && formTouched && enableClientValidation) {
      validateForm();
    }
  }, [
    debouncedUsername,
    debouncedPassword,
    validateOnBlur,
    formTouched,
    enableClientValidation,
    validateForm,
  ]);

  // Rate limiting check
  const checkRateLimit = useCallback(() => {
    if (!enableRateLimiting) return true;

    if (attemptCount >= maxAttempts) {
      setIsLocked(true);
      timeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setIsLocked(false);
          setAttemptCount(0);
        }
      }, lockoutDuration);
      return false;
    }
    return true;
  }, [enableRateLimiting, attemptCount, maxAttempts, lockoutDuration]);

  // Retry logic
  const retryRequest = useCallback(
    async (requestFn: () => Promise<any>): Promise<any> => {
      for (let i = 0; i <= retryAttempts; i++) {
        try {
          return await requestFn();
        } catch (error: any) {
          if (i === retryAttempts || error.name === "AbortError") {
            throw error;
          }

          // Wait before retry
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelay * Math.pow(2, i))
          );
        }
      }
    },
    [retryAttempts, retryDelay]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Prevent multiple submissions
      if (preventMultipleSubmissions && submissionInProgress) {
        return;
      }

      setFormTouched(true);

      // Validate form if enabled
      if (!validateForm()) {
        onError?.("Validation failed", "validation");
        return;
      }

      // Check if offline
      if (offlineSupport && isOffline) {
        setMessage(
          "You are offline. Please check your connection and try again."
        );
        onError?.("Offline", "network");
        return;
      }

      // Check rate limiting
      if (!checkRateLimit()) {
        const errorMsg = `Too many attempts. Please wait ${Math.ceil(
          lockoutDuration / 60000
        )} minutes.`;
        setMessage(errorMsg);
        onError?.(errorMsg, "auth");
        return;
      }

      // Check CAPTCHA if enabled
      if (enableCaptcha && !captchaToken) {
        setMessage("Please complete the CAPTCHA verification.");
        onError?.("CAPTCHA required", "validation");
        return;
      }

      // Abort any existing requests
      cleanup();
      abortControllerRef.current = new AbortController();

      setStatus(0);
      setMessage("");
      setInternalLoading(true);
      setSubmissionInProgress(true);
      setValidationErrors({});
      retryCountRef.current = 0;

      // Call external handlers
      onSubmitStart?.();
      if (trackingEnabled) {
        onLoginAttempt?.(username);
      }

      // Track attempt
      if (enableRateLimiting) {
        setAttemptCount((prev) => prev + 1);
      }

      const cleanUsername = sanitizeInputs ? sanitizeInput(username) : username;
      const cleanPassword = sanitizeInputs ? sanitizeInput(password) : password;

      const obj: any = {
        username: cleanUsername,
        password: cleanPassword,
        provider: "credentials",
        channel: channelUsername,
        formId,
      };

      if (showRememberMe) {
        obj.rememberMe = rememberMe;
      }

      if (csrfToken) {
        obj._token = csrfToken;
      }

      if (enableCaptcha && captchaToken) {
        obj.captchaToken = captchaToken;
      }

      const options = reqOptions("POST", JSON.stringify(obj), null, "json");
      options.signal = abortControllerRef.current?.signal;

      // Add security headers
      options.headers = {
        ...options.headers,
        "X-Requested-With": "XMLHttpRequest",
        "X-Form-ID": formId,
      };

      if (csrfToken) {
        options.headers["X-CSRF-Token"] = csrfToken;
      }

      const makeRequest = async () => {
        const req = await fetch(endpointPath || "/api/auth/login", options);
        return { req, res: await req.json() };
      };

      try {
        const { req, res } = await retryRequest(makeRequest);

        if (req.status === 200 || req.ok) {
          const context: {
            username: string;
            password: string;
            callbackUrl?: string;
            redirect?: boolean;
          } = {
            username: JSON.stringify(res),
            password: "instincthub",
            redirect: false,
          };

          if (callbackUrl) {
            context.callbackUrl = callbackUrl;
          }

          // Call success handlers
          onSubmitComplete?.(true);
          if (trackingEnabled) {
            onLoginSuccess?.(res as any);
          }

          // Reset attempt count on success
          if (enableRateLimiting) {
            setAttemptCount(0);
          }

          // Clear form data if not preserving
          if (!preserveFormData) {
            clearFormData();
          }

          await signIn("credentials", context);
          setStatus(1);
        } else {
          const errorMsg = res.message || res.detail || "An error occurred";
          setMessage(errorMsg);
          setStatus(res.status);
          onError?.(errorMsg, "auth");
          onSubmitComplete?.(false);
          if (trackingEnabled) {
            onLoginFailure?.(errorMsg, username);
          }
        }
      } catch (e: any) {
        // Handle abort
        if (e.name === "AbortError") {
          return;
        }

        const errorMsg = "Couldn't login. Please try again.";
        openToast(errorMsg, 400);
        setStatus(3);
        onError?.(errorMsg, "network");
        onSubmitComplete?.(false);
        if (trackingEnabled) {
          onLoginFailure?.(errorMsg, username);
        }
      } finally {
        if (mountedRef.current) {
          setInternalLoading(false);
          setSubmissionInProgress(false);
        }
      }
    },
    [
      username,
      password,
      channelUsername,
      callbackUrl,
      endpointPath,
      validateForm,
      checkRateLimit,
      cleanup,
      onSubmitStart,
      onLoginAttempt,
      onSubmitComplete,
      onLoginSuccess,
      onError,
      onLoginFailure,
      enableRateLimiting,
      showRememberMe,
      rememberMe,
      sanitizeInputs,
      csrfToken,
      enableCaptcha,
      captchaToken,
      formId,
      preventMultipleSubmissions,
      submissionInProgress,
      offlineSupport,
      isOffline,
      retryRequest,
      preserveFormData,
      trackingEnabled,
    ]
  );

  // Form reset functionality
  const resetForm = useCallback(() => {
    if (enableFormReset) {
      setUsername("");
      setPassword("");
      setRememberMe(false);
      setMessage("");
      setValidationErrors({});
      setPasswordStrength({ score: 0, feedback: [] });
      setFormTouched(false);
      if (preserveFormData) {
        clearFormData();
      }

      // Focus first input after reset
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector(
          'input[name="username"]'
        ) as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
    }
  }, [enableFormReset, preserveFormData]);

  // Unified redirect handler
  const handleRedirect = useCallback(
    (user: SessionUserType, callbackUrl?: string) => {
      if (onSuccessRedirect) {
        onSuccessRedirect(user, callbackUrl);
        return;
      }


      const cookiesCallbackUrl = getCookie("callbackUrl");

      // Priority order for redirects
      if (callbackUrl) {
        if (clearCallbackAfterUse) {
          setCookie("callbackUrl", "", -1);
        }
        router.push(callbackUrl);
      } else if (cookiesCallbackUrl) {
        if (clearCallbackAfterUse) {
          setCookie("callbackUrl", "", -1);
        }
        router.push(cookiesCallbackUrl);
      } else if (redirectPath) {
        router.push(redirectPath);
      } else if (type === "skills") {
        router.push("/library");
      } else if (type === "lms") {
        if (!handle) {
          const msg =
            "You do not have an active channel for this account. Would you like to create one?";
          openConfirmModal(msg).then((res: boolean) => {
            if (res) {
              router.push("/auth/create-channel");
            } else {
              signOut();
            }
          });
        } else {
          const msg = `You are currently logged in with ${handle} channel. Would you like to proceed to the dashboard?`;
          openConfirmModal(msg).then((res: boolean) => {
            if (res) {
              router.push(`/${handle}`);
            }
          });
        }
      } else {
        router.push("/");
      }
    },
    [
      onSuccessRedirect,
      callbackUrl,
      clearCallbackAfterUse,
      redirectPath,
      type,
      handle,
      router,
    ]
  );

  const handleValidate = useCallback(async () => {
    if (!token || !sessionUser) {
      return;
    }

    // Use custom validation handler if provided
    if (customValidationHandler) {
      try {
        const isValid = await customValidationHandler(sessionUser);
        if (!isValid) {
          onFailureRedirect?.("Custom validation failed");
          return;
        }
      } catch (error) {
        console.error("Custom validation error:", error);
        onFailureRedirect?.("Validation error occurred");
        return;
      }
    }

    // Abort any existing requests
    cleanup();
    abortControllerRef.current = new AbortController();

    try {
      const funcParams = {
        path: `auth/skills/validate-user-token/?access_token=${token}&user_uuid=${uuid}`,
        token: token,
      };
      const res = await getData(funcParams);

      if (res?.detail === "Unauthorized" || res?.detail === "Not found.") {
        openToast("Couldn't login. Please try again.", 400);
        onFailureRedirect?.("Token validation failed");
        return;
      } else if (verifyEmail === false) {
        const msg =
          "You need to verify your email address, click okay to request for a one time password (OTP).";
        const verifyPath = `${
          verificationPath || "/auth/verify-email"
        }?email=${email}`;

        openConfirmModal(msg).then((res: boolean) => {
          if (res && email) {
            handleResendOTP(email);
            router.push(verifyPath);
          } else {
            signOut();
          }
        });
      } else {
        handleRedirect(sessionUser, callbackUrl);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }

      console.error("Validation error:", error);
      openToast("Validation failed. Please try again.", 400);
      onFailureRedirect?.("Network error during validation");
    }
  }, [
    token,
    uuid,
    sessionUser,
    customValidationHandler,
    onFailureRedirect,
    cleanup,
    verificationPath,
    email,
    verifyEmail,
    handleRedirect,
    callbackUrl,
    router,
  ]);

  // Handle input changes with touch tracking
  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormTouched(true);
      const value = e.target.value;
      setUsername(value);

      // Clear validation error when user starts typing
      if (validationErrors.username) {
        setValidationErrors((prev) => ({ ...prev, username: undefined }));
      }
    },
    [validationErrors.username]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormTouched(true);
      const value = e.target.value;
      setPassword(value);

      // Clear validation error when user starts typing
      if (validationErrors.password) {
        setValidationErrors((prev) => ({ ...prev, password: undefined }));
      }
    },
    [validationErrors.password]
  );

  // Handle input blur for validation
  const handleBlur = useCallback(
    (field: "username" | "password") => {
      if (validateOnBlur && enableClientValidation) {
        setTimeout(() => validateForm(), 100);
      }
    },
    [validateOnBlur, enableClientValidation, validateForm]
  );

  // OAuth handler with configuration
  const handleOAuthSignIn = useCallback(
    (provider: string) => {
      const config = oauthConfig[provider] || {};
      const options = {
        callbackUrl,
        ...config,
      };

      if (trackingEnabled) {
        onLoginAttempt?.(`oauth_${provider}`);
      }

      signIn(provider, options);
    },
    [oauthConfig, callbackUrl, trackingEnabled, onLoginAttempt]
  );

  // Set callback URL in cookies
  useEffect(() => {
    if (callbackUrl) {
      setCookie("callbackUrl", callbackUrl, 30);
    }
  }, [callbackUrl]);

  // Simple session-based redirect (without API validation)
  useEffect(() => {

    if (autoRedirectOnSession && !isFormLoading && session) {

      // If we have a session, redirect immediately
      if (sessionUser && token) {
        // Use validation if needed
        if (customValidationHandler) {
          handleValidate();
        } else if (uuid) {
          handleValidate();
        } else {
          handleRedirect(sessionUser, callbackUrl);
        }
      } else if (session?.user) {
        // Fallback: if we have any session but can't extract our custom data,
        // try basic redirect anyway
        const fallbackUser = { name: session.user } as SessionUserType;
        handleRedirect(fallbackUser, callbackUrl);
      }
    }
  }, [
    session,
    sessionUser,
    token,
    uuid,
    autoRedirectOnSession,
    isFormLoading,
    customValidationHandler,
    handleValidate,
    handleRedirect,
    callbackUrl,
  ]);

  // Periodic session check
  useEffect(() => {
    if (sessionCheckInterval > 0 && token) {
      const startPeriodicCheck = () => {
        sessionCheckRef.current = setTimeout(() => {
          if (mountedRef.current && token) {
            handleValidate();
            startPeriodicCheck();
          }
        }, sessionCheckInterval);
      };

      startPeriodicCheck();

      return () => {
        if (sessionCheckRef.current) {
          clearTimeout(sessionCheckRef.current);
        }
      };
    }
  }, [sessionCheckInterval, token, handleValidate]);

  // Focus management
  useEffect(() => {
    if (focusOnMount) {
      const usernameInput = document.querySelector(
        'input[name="username"]'
      ) as HTMLInputElement;
      if (usernameInput) {
        usernameInput.focus();
      }
    }
  }, [focusOnMount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  // High contrast mode
  useEffect(() => {
    if (highContrastMode) {
      document.body.classList.add("ihub-high-contrast");
    } else {
      document.body.classList.remove("ihub-high-contrast");
    }

    return () => {
      document.body.classList.remove("ihub-high-contrast");
    };
  }, [highContrastMode]);

  // Render loading skeleton
  if (showLoadingSkeleton && isFormLoading) {
    return (
      <div className={`ihub-max-w-500 ihub-mx-auto ${className || ""}`}>
        <LoadingSkeleton />
      </div>
    );
  }

  // Render loading state
  if (isFormLoading && showLoadingSkeleton) {
    return (
      <div className={`ihub-max-w-500 ihub-mx-auto ${className || ""}`}>
        <div className="ihub-loading-state">
          <p>{loadingText}</p>
        </div>
      </div>
    );
  }

  // Render locked state
  if (isLocked) {
    return (
      <div className={`ihub-max-w-500 ihub-mx-auto ${className || ""}`}>
        <div className="ihub-error-state">
          <p>
            Too many login attempts. Please wait{" "}
            {Math.ceil(lockoutDuration / 60000)} minutes before trying again.
          </p>
          {enableFormReset && (
            <button
              onClick={resetForm}
              className="ihub-reset-btn ihub-mt-3"
              type="button"
            >
              Reset Form
            </button>
          )}
        </div>
      </div>
    );
  }

  // Render offline state
  if (offlineSupport && isOffline) {
    return (
      <div className={`ihub-max-w-500 ihub-mx-auto ${className || ""}`}>
        <div className="ihub-offline-state">
          <p>
            You are currently offline. Please check your internet connection and
            try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="ihub-retry-btn ihub-mt-3"
            type="button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${className || ""} ${
        highContrastMode ? "ihub-high-contrast" : ""
      }`}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`ihub-max-w-500 ihub-mx-auto ${formClassName || ""}`}
        aria-label={ariaLabel || "Login form"}
        aria-describedby={ariaDescribedBy}
        noValidate={enableClientValidation}
      >
        {showTitle && (
          <>
            <h1 className="ihub-fs-32">{title}</h1>
            {subtitle && <p className="ihub-subtitle">{subtitle}</p>}
          </>
        )}

        {error && (
          <div className="err" role="alert" aria-live="polite">
            Sign in failed. Check the details you provided are correct.
          </div>
        )}

        <InputText
          name="username"
          type="text"
          label="Email or Username"
          required={true}
          textTransform="lowercase"
          value={username}
          onChange={handleUsernameChange}
        />
        {validationErrors.username && (
          <p className="err" id="username-error" role="alert">
            {validationErrors.username}
          </p>
        )}

        <PasswordField
          name="password"
          label="Password"
          required={true}
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {validationErrors.password && (
          <p className="err" id="password-error" role="alert">
            {validationErrors.password}
          </p>
        )}

        {showPasswordStrength && password && (
          <div
            className="ihub-password-strength ihub-mt-2"
            id="password-strength"
          >
            <div className="ihub-strength-meter">
              <div
                className={`ihub-strength-bar ihub-strength-${passwordStrength.score}`}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              ></div>
            </div>
            <p className="ihub-strength-text">
              Password strength:{" "}
              {
                ["Very Weak", "Weak", "Fair", "Good", "Strong"][
                  passwordStrength.score
                ]
              }
            </p>
            {passwordStrength.feedback.length > 0 && (
              <ul className="ihub-strength-feedback">
                {passwordStrength.feedback.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {showRememberMe && (
          <div className="ihub-remember-me ihub-mt-3">
            <label className="ihub-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                  setFormTouched(true);
                }}
                aria-describedby="remember-me-help"
              />
              {rememberMeText}
            </label>
            <small id="remember-me-help" className="ihub-help-text">
              Keep me signed in on this device
            </small>
          </div>
        )}

        {enableCaptcha && (
          <div className="ihub-captcha ihub-mt-3">
            {/* Placeholder for CAPTCHA widget */}
            <div className="ihub-captcha-placeholder">
              <p>CAPTCHA verification would be loaded here</p>
              <button
                type="button"
                onClick={() => setCaptchaToken("mock-captcha-token")}
                className="ihub-verify-btn"
              >
                Verify (Mock)
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className="err" role="alert" aria-live="polite">
            {message}
          </div>
        )}

        <div className="action ihub-mt-4 ihub-mb-5">
          <SubmitButton
            label={submitButtonText}
            type="submit"
            status={status}
            disabled={
              isFormLoading ||
              isLocked ||
              (preventMultipleSubmissions && submissionInProgress)
            }
            variant={submitButtonVariant}
          />

          {enableFormReset && (
            <button
              type="button"
              onClick={resetForm}
              className="ihub-reset-btn ihub-ml-3"
              disabled={isFormLoading}
            >
              Reset
            </button>
          )}

          {(!hideResetPassword || !hideSignup || enableOAuth) && (
            <OrDivider labels="or sign with" />
          )}

          {enableOAuth && oauthProviders.length > 0 && (
            <div
              className="ihub-oauth-buttons ihub-mt-3"
              role="group"
              aria-label="Social login options"
            >
              {oauthProviders.map((provider) => (
                <button
                  key={provider}
                  type="button"
                  className={`ihub-oauth-btn ihub-oauth-${provider}`}
                  onClick={() => handleOAuthSignIn(provider)}
                  disabled={isFormLoading}
                  aria-label={`Continue with ${provider}`}
                >
                  Continue with{" "}
                  {provider.charAt(0).toUpperCase() + provider.slice(1)}
                </button>
              ))}
            </div>
          )}

          {!hideResetPassword && (
            <p className="ihub-text-center ihub-fs-14">
              Can't remember password?{" "}
              <a href="/auth/reset-password">Reset Password</a>
            </p>
          )}
          {!hideSignup && (
            <p className="ihub-text-center ihub-fs-14">
              New user? <a href="/auth/signup">Create an account.</a>
            </p>
          )}
        </div>

        <FromInstinctHub showText={true} />

        {/* Development info */}
        {process.env.NODE_ENV === "development" && (
          <details className="ihub-dev-info ihub-mt-4">
            <summary>Development Info</summary>
            <pre className="ihub-dev-details">
              {JSON.stringify(
                {
                  formTouched,
                  isOffline: offlineSupport ? isOffline : "disabled",
                  passwordStrength: showPasswordStrength
                    ? passwordStrength
                    : "disabled",
                  attemptCount: enableRateLimiting ? attemptCount : "disabled",
                  validationErrors,
                  formId,
                },
                null,
                2
              )}
            </pre>
          </details>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
