import React from 'react';
import PropTypes from 'prop-types';

import { EmptyStatePattern as EmptyState } from 'foremanReact/components/common/EmptyState';
import { translate as __ } from 'foremanReact/common/I18n';

const NoReports = ({ reportsExpected }) => {
  let text;
  let icon;

  if (reportsExpected) {
    text = __(
      'The preupgrade report could not be generated, check the job details for the reason'
    );
    icon = 'warning-triangle-o';
  } else {
    text = __('The preupgrade report will be available after the job finishes');
    icon = 'in-progress';
  }

  return (
    <EmptyState
      iconType="pf"
      icon={icon}
      header={__('No Preupgrade Report Available')}
      description={text}
    />
  );
};

NoReports.propTypes = {
  reportsExpected: PropTypes.bool.isRequired,
};

export default NoReports;
