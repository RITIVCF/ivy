import React from 'react';

export const FormLayout = ({content}) => (
  <div id="form-back">
    <div className="container">
      <div className="col s12 m8 l6 offset-m2 offset-l3">
        {content}
      </div>
    </div>
  </div>
)
