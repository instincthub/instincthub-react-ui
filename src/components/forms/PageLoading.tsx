import React from 'react';

interface PageLoadingProps {
  labels?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ labels = '' }) => {
  return (
    <div className="ihub-loading container">
      <p>{labels} Loading...</p>
    </div>
  );
};

export default PageLoading;