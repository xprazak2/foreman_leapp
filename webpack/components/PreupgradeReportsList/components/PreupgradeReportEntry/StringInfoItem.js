import React from 'react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import PropTypes from 'prop-types';
import { translate as __ } from 'foremanReact/common/I18n';

import InfoItem from './InfoItem';
import { itemIteratorId } from './helpers';

const StringInfoItem = ({
  entry,
  attr,
  tooltipText,
  translate,
  mapAttr,
  elipsed,
}) => {
  const inner = (
    <span>{translate ? __(mapAttr(entry, attr)) : mapAttr(entry, attr)}</span>
  );
  const innerContent = elipsed ? (
    <EllipsisWithTooltip placement="top">{inner}</EllipsisWithTooltip>
  ) : (
    inner
  );

  return (
    <InfoItem itemId={itemIteratorId(entry, attr)} tooltipText={tooltipText}>
      {innerContent}
    </InfoItem>
  );
};

StringInfoItem.propTypes = {
  entry: PropTypes.object.isRequired,
  attr: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  translate: PropTypes.bool,
  mapAttr: PropTypes.func,
  elipsed: PropTypes.bool,
};

StringInfoItem.defaultProps = {
  translate: false,
  mapAttr: (entry, attr) => entry[attr],
  elipsed: false,
  tooltipText: undefined,
};

export default StringInfoItem;
