import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { translate as __ } from 'foremanReact/common/I18n';

import { idsForInvocation } from '../PreupgradeReportsHelpers';

const FixAllButton = ({ preupgradeReports, postUrl, disabled, csrfToken }) => {
  const { hostIds, entryIds } = idsForInvocation(preupgradeReports);

  return (
    <form action={postUrl} method="post">
      <Button type="submit" disabled={disabled}>
        {__('Fix All')}
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

FixAllButton.propTypes = {
  preupgradeReports: PropTypes.array.isRequired,
  postUrl: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  csrfToken: PropTypes.string.isRequired,
};

export default FixAllButton;
