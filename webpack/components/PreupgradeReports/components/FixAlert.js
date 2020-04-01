import React, { useState } from 'react';
import { Alert } from 'patternfly-react';

import AlertBody from 'foremanReact/components/common/Alert/AlertBody';

const FixAlert = props => {

  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <Alert className="base in fade" type='error' onDismiss={() => setShow(false)}>
      <AlertBody>
        <span>{props.message}</span>
      </AlertBody>
    </Alert>
  );
}

export default FixAlert;
