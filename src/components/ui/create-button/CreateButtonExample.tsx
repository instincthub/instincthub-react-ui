import CreateButton from "./CreateButton";

// Example usage component
const CreateButtonExample: React.FC = () => {
  const handleFallbackClick = (): void => {
    alert("Fallback function called!");
  };

  return (
    <div className="ihub-create-button-demo">
      <h2>Create Button Component Examples</h2>
      
      <div className="ihub-button-grid">
        {/* With search parameter */}
        <div className="ihub-button-example">
          <h3>With Search Parameter</h3>
          <CreateButton
            label="Create Course"
            searchParam={{ key: "create", value: "course" }}
            variant="important"
            animated={true}
          />
        </div>

        {/* With fallback function */}
        <div className="ihub-button-example">
          <h3>With Fallback Function</h3>
          <CreateButton
            label="Create Project"
            onClick={handleFallbackClick}
            variant="primary"
            animated={true}
          />
        </div>

        {/* Different variants */}
        <div className="ihub-button-example">
          <h3>Different Variants</h3>
          <div className="ihub-button-row">
            <CreateButton
              label="Important"
              variant="important"
              onClick={handleFallbackClick}
            />
            <CreateButton
              label="Outlined"
              variant="outlined"
              onClick={handleFallbackClick}
            />
            <CreateButton
              label="Primary"
              variant="primary"
              onClick={handleFallbackClick}
            />
          </div>
        </div>

        {/* With loading state */}
        <div className="ihub-button-example">
          <h3>Loading State</h3>
          <CreateButton
            label="Create"
            loading={true}
            variant="important"
          />
        </div>

        {/* With icon */}
        <div className="ihub-button-example">
          <h3>With Icon</h3>
          <CreateButton
            label="Add New"
            icon={<span>+</span>}
            onClick={handleFallbackClick}
            variant="important"
          />
        </div>

        {/* Different sizes */}
        <div className="ihub-button-example">
          <h3>Different Sizes</h3>
          <div className="ihub-button-row">
            <CreateButton
              label="Small"
              size="small"
              onClick={handleFallbackClick}
            />
            <CreateButton
              label="Medium"
              size="medium"
              onClick={handleFallbackClick}
            />
            <CreateButton
              label="Large"
              size="large"
              onClick={handleFallbackClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateButtonExample;