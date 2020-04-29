import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';
import { translate as __ } from 'foremanReact/common/I18n';

import { isInhibitor } from '../../PreupgradeReports/PreupgradeReportsHelpers';
import InfoItem from './InfoItem';
import EmptyInfoItem from './EmptyInfoItem';

const InhibitorInfoItem = ({ entry }) => {
  const key = `inhibitor-${entry.id}`;

  if (isInhibitor(entry)) {
    return (
      <InfoItem
        itemId={key}
        tooltipText={__('This issue inhibits the upgrade.')}
      >
        <span>
          <Icon type="pf" name="security" className="severity-high" />
          {__('Inhibitor')}
        </span>
      </InfoItem>
    );
  }
  return <EmptyInfoItem entry={entry} attr="inhibitor" />;
};

InhibitorInfoItem.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default InhibitorInfoItem;
