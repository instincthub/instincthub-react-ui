"use client";
import React from "react";
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
    <div className="ihub-react-action">
      <div className="ctrl-dropdown">
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
