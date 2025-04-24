import React from "react";
import { Badge } from "../../../../index";

const BadgeExamples: React.FC = () => {
  return (
    <div className="ihub-badge-examples">
      <h3>Badge Variants</h3>
      <div className="ihub-badge-demo-row">
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
      </div>

      <h3>Badge Sizes</h3>
      <div className="ihub-badge-demo-row">
        <Badge size="small" variant="primary">
          Small
        </Badge>
        <Badge size="medium" variant="primary">
          Medium
        </Badge>
        <Badge size="large" variant="primary">
          Large
        </Badge>
      </div>

      <h3>Badge Shapes</h3>
      <div className="ihub-badge-demo-row">
        <Badge shape="rounded" variant="primary">
          Rounded
        </Badge>
        <Badge shape="pill" variant="primary">
          Pill
        </Badge>
        <Badge shape="square" variant="primary">
          Square
        </Badge>
      </div>

      <h3>Outlined Badges</h3>
      <div className="ihub-badge-demo-row">
        <Badge variant="primary" outlined>
          Primary
        </Badge>
        <Badge variant="success" outlined>
          Success
        </Badge>
        <Badge variant="danger" outlined>
          Danger
        </Badge>
      </div>

      <h3>Count Badges</h3>
      <div className="ihub-badge-demo-row">
        <Badge variant="primary" count={5} />
        <Badge variant="danger" count={99} />
        <Badge variant="warning" count={100} maxCount={99} />
      </div>

      <h3>Dot Badges</h3>
      <div className="ihub-badge-demo-row">
        <Badge variant="primary" dot />
        <Badge variant="success" dot />
        <Badge variant="danger" dot />
      </div>

      <h3>Badge with Icons</h3>
      <div className="ihub-badge-demo-row">
        <div className="ihub-badge-with-icon">
          <span className="material-symbols-outlined">notifications</span>
          <Badge variant="danger" count={5} standalone={false} />
        </div>

        <div className="ihub-badge-with-icon">
          <span className="material-symbols-outlined">mail</span>
          <Badge variant="primary" count={12} standalone={false} />
        </div>

        <div className="ihub-badge-with-icon">
          <span className="material-symbols-outlined">chat</span>
          <Badge variant="success" dot standalone={false} />
        </div>
      </div>
    </div>
  );
};

export default BadgeExamples;
