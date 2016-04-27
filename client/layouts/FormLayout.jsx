import React from 'react';

export const FormLayout = ({content}) => (
  <div className="form-layout">
    <header>
      <link rel="stylesheet" href="./forms.css" />
    </header>
    <main>
      {content}
    </main>
  </div>
)
