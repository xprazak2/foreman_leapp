import React, { useState } from 'react';
import { Alert } from 'patternfly-react';
import PropTypes from 'prop-types';

import AlertBody from 'foremanReact/components/common/Alert/AlertBody';

const FixAlert = ({ message }) => {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <Alert
      className="base in fade"
      type="error"
      onDismiss={() => setShow(false)}
    >
      <AlertBody>
        <span>{message}</span>
      </AlertBody>
    </Alert>
  );
};

FixAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FixAlert;
