import React from 'react';
import { Icon } from 'patternfly-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SortableHeaderItem = ({ value, title, sort, changeSort }) => {
  const chooseChevron = (active, order) => {
    if (!active) {
      return null;
    }

    const direction = order === 'asc' ? 'angle-up' : 'angle-down';

    return <Icon type="fa" name={direction} />;
  };

  const active = sort.attribute === value;

  const clickHandler = () => {
    let direction = 'asc';

    if (active) {
      direction = sort.order === 'asc' ? 'desc' : 'asc';
    }

    changeSort({
      attribute: value,
      order: direction,
    });
  };

  return (
    <span
      className={`sortable-header ${classNames({ active })}`}
      onClick={clickHandler}
    >
      {chooseChevron(active, sort.order)}
      {title}
    </span>
  );
};

SortableHeaderItem.propTypes = {
  sort: PropTypes.object.isRequired,
  changeSort: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SortableHeaderItem;
