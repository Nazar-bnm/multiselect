import React from 'react';
import { Multiselect } from '../Multiselect';

import { devicesMock, type DevicesMock } from './devices';

export default function MultiselectSelectAllExample() {
  const { categories, items, devicesData } = React.useMemo(
    () => {
      const categories = Object.keys(devicesMock);
      const items = Object.values(devicesMock).flat();

      return {
        categories,
        items,
        devicesData: devicesMock as DevicesMock
      }
    },
    [devicesMock],
  );

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [filterValue, setFilterValue] = React.useState('');

  const handleSearchValueChange = (event: { target: { value: string; }; }) => {
    const { value } = event.target;
    setFilterValue(value);
  };

  const handleSelectItem = (event: { target: { checked: boolean; value: string; }; }) => {
    const { checked, value } = event.target;

    if (checked) {
      setSelectedItems((prevState) => [...prevState, value]);
    } else {
      setSelectedItems((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const handleSelectManyItems = (checked: boolean, values: string[]) => {
    if (checked) {
      setSelectedItems((prevState) => [...prevState, ...values]);
    } else {
      setSelectedItems((prevState) =>
        prevState.filter((item) => !values.includes(item))
      );
    }
  };

  const filteredItems = React.useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(filterValue.toLowerCase()),
    );
  }, [items, filterValue]);

  const toggleAll = (event: { target: { checked: boolean; }; }) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedItems((prevState) => [...prevState, ...filteredItems]);
    } else {
      setSelectedItems((prevState) =>
        prevState.filter((item) => !filteredItems.includes(item))
      );
    }
  };

  const areAllSelected = React.useMemo(() => {
    return filteredItems.every((element) => selectedItems.includes(element));
  }, [selectedItems, filterValue, items]);

  return (
    <Multiselect
      currentSelection={selectedItems}
      popoverProps={{ isFullWidth: true }}
      searchProps={{
        searchPlaceholder: 'Search Devices',
        onSearchValueChange: handleSearchValueChange,
      }}
    >
      <Multiselect.SelectAll
        onSelectItem={toggleAll}
        isChecked={areAllSelected}
      />

      {categories.map((category) => {
        const val = category.toLowerCase().replace(/\s/g, '-');
        const categoryItems = devicesData[category].filter((item) =>
          item.toLowerCase().includes(filterValue.toLowerCase()),
        );

        return (
          <Multiselect.Category
            key={`key-${val}`}
            category={category}
            items={categoryItems}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectManyItems={handleSelectManyItems}
          />
        )
      })}
    </Multiselect>
  );
}
