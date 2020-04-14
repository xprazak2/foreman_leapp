import React from 'react';

import { EmptyStatePattern as EmptyState } from 'foremanReact/components/common/EmptyState';
import { translate as __ } from 'foremanReact/common/I18n';

const NoReports = () => (
  <EmptyState
    iconType="pf"
    icon="in-progress"
    header={__('No Preupgrade Reports Found')}
    description={__(
      'If job execution is still running, reports may not have been yet created. If job generates any reports, they will be loaded once the job finishes.'
    )}
  />
);

export default NoReports;
