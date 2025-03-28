"use client";
import React, { useState } from "react";
import CustomTextEditor from "../editor/CustomTextEditor";
import ContentViewer from "./ContentViewer";

interface ContentViewOrEditProps {
  setContent: (html: string) => void;
  content: string;
  title: string;
  showToolbar: boolean;
  placeholder: string;
  charLimit: number;
  lastUpdated?: string;
  showEditBtn?: boolean;
  showPreviewBtn?: boolean;
}

export default function ContentViewOrEdit(
  props: ContentViewOrEditProps
): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="ihub-content-page ihub-style-list">
      {isEditing ? (
        <CustomTextEditor
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          content={props.content}
          onChange={props.setContent}
          placeholder={props.placeholder}
          charLimit={props.charLimit}
          lastUpdated={props.lastUpdated}
          showPreviewBtn={props.showPreviewBtn}
        />
      ) : (
        <ContentViewer
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          content={props.content}
          title={props.title}
          showToolbar={props.showToolbar}
          showEditBtn={props.showEditBtn}
        />
      )}
    </div>
  );
}
