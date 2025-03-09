"use client";
import Link from "next/link";

// Define interface for dropdown items
interface DropdownItem {
  label: string;
  url: string;
  icon: string;
}

// Define props interface
interface ActionCallbackDropdownProps {
  items: DropdownItem[];
  session?: {
    user?: {
      name: {
        uuid: string;
      };
    };
  };
}

export default function ActionDropdown(props: ActionCallbackDropdownProps) {
  return (
    <div className="react-action">
      <div className="ctrl_dropdown">
        <button className="outlined-btn">...</button>
        <ul className="main_list">
          {props.items.map((option, index) => (
            <li key={index}>
              <Link href={option.url}>
                <span className="material-symbols-outlined">{option.icon}</span>
                {option.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// CSS should be placed in a separate CSS file, for example:
// styles/ActionCallbackDropdown.css
/*
.react-action {
  position: relative;
}
.react-action .main_list {
  padding: 10px;
  display: none;
  top: 0px;
  position: absolute;
  right: 0;
  background: var(--White);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
  min-width: 200px;
  max-width: 500px;
}
.react-action .main_list li {
  border-radius: 10px;
  padding: 7px 10px;
  cursor: pointer;
  margin: 0;
  transition: 0.1s ease-in;
}
.react-action .main_list li span {
  position: relative;
  top: 5px;
  margin-right: 10px;
}
.react-action .main_list li:hover {
  background: var(--DarkCyan);
  color: var(--White);
}
.react-action:hover .main_list {
  display: block;
}

@media (max-width: 600px) {
  .react-action {
    height: 100px;
  }
  .react-action .ctrl_dropdown {
    right: 15px;
    top: 0px;
    position: absolute;
  }
}
*/
