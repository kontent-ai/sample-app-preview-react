import React from 'react';

export const PageContent: React.FunctionComponent = ({ children })  => {
  return (
    <div className="app-content">
      {children}
    </div>
  )
};