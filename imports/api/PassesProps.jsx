import React from 'react';
import PropTypes from 'prop-types';

export default function PassesProps({ children, ...other }) {
  var childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { ...other }));

  return <div>{childrenWithProps}</div>
}

PassesProps.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array
    ])
}
