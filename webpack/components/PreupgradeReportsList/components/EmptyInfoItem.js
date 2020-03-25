import React from 'react';
import PropTypes from 'prop-types';

import InfoItem from './InfoItem';
import { itemIteratorId } from './helpers';

const EmptyInfoItem = ({ entry, attr }) => (
  <InfoItem itemId={itemIteratorId(entry, attr)} />
);

EmptyInfoItem.propTypes = {
  entry: PropTypes.object.isRequired,
  attr: PropTypes.string.isRequired,
};

export default EmptyInfoItem;
