"use client";
import React from "react";

interface EmbedBlockProps {
  src: string;
  type?: string;
}

export default function EmbedBlock({ src, type = "generic" }: EmbedBlockProps) {
  return (
    <div className="ihub-te-embed-wrapper" data-embed-type={type}>
      <div className="ihub-te-embed-responsive">
        <iframe
          src={src}
          frameBorder="0"
          allowFullScreen
          className="ihub-te-embed-iframe"
          title={`Embedded ${type} content`}
        />
      </div>
    </div>
  );
}
