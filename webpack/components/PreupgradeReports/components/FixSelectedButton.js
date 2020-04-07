import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { translate as __ } from 'foremanReact/common/I18n';

const FixSelectedButton = ({ ids, postUrl, disabled, csrfToken }) => {
  const { hostIds, entryIds } = ids;

  return (
    <form action={postUrl} method="post">
      <Button type="submit" disabled={disabled}>
        {__('Fix Selected')}
      </Button>
      <input type="hidden" name="authenticity_token" value={csrfToken} />
      <input type="hidden" name="feature" value="leapp_remediation_plan" />
      {hostIds.map(hostId => (
        <input type="hidden" name="host_ids[]" key={hostId} value={hostId} />
      ))}
      <input
        type="hidden"
        name="inputs[remediation_ids]"
        value={entryIds.join(',')}
      />
    </form>
  );
};

FixSelectedButton.propTypes = {
  ids: PropTypes.object.isRequired,
  postUrl: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  csrfToken: PropTypes.string.isRequired,
};

export default FixSelectedButton;
