import React from "react";

interface FormErrorProps {
  errors?: Record<string, string[]> | undefined;
  status?: number;
}

const FormError: React.FC<FormErrorProps> = ({ errors, status }) => {
  try {
    if (status === 500) {
      return (
        <div className="ihub-form-error">
          <h4>Error {status}: </h4>
          <div>
            <p>- The server couldn't process your request.</p>
          </div>
        </div>
      );
    } else if (status === 404) {
      return (
        <div className="ihub-form-error">
          <h4>Error {status}: </h4>
          <div>
            <p>- Details not found.</p>
          </div>
        </div>
      );
    } else if (errors) {
      return (
        <div className="ihub-form-error err">
          <h4>Error {status}: </h4>
          {Object.keys(errors).length > 0 && (
            <div>
              {Object.keys(errors)?.map((field, index) => (
                <div key={index}>
                  {errors[field]?.map((error, index) => (
                    <p key={index}>
                      <strong>{field}:</strong> {error}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default FormError;
