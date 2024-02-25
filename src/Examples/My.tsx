import React from 'react';
import { Multiselect } from '../Multiselect';
import { MultiselectCategory } from '../Multiselect/MultiselectCategory'

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
  const [filteredItems, setFilteredItems] = React.useState<string[]>(items);

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

  const toggleAll = (event: { target: { checked: any; }; }) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedItems(items);
    } else {
      setSelectedItems([]);
    }
  };

  const areAllSelected = React.useMemo(() => {
    // this can affect the app performance with a larger amount of data, consider changing it in your implementation
    return items.every((element) => selectedItems.includes(element));
  }, [selectedItems, items]);

  const handleSearchValueChange = (event: { target: { value: string; }; }) => {
    const value = event.target.value;
    const newFilteredItems = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredItems(newFilteredItems);
  };

  return (
    <Multiselect
      currentSelection={selectedItems}
      popoverProps={{ isFullWidth: true }}

      searchProps={{
        searchPlaceholder: 'Search spaces',
        onSearchValueChange: handleSearchValueChange,
      }}
    >
      <Multiselect.SelectAll
        onSelectItem={toggleAll}
        isChecked={areAllSelected}
      />
      {categories.map((category) => {
        const val = category.toLowerCase().replace(/\s/g, '-');

        return (
          <MultiselectCategory
            key={`key-${val}`}
            category={category}
            items={devicesData[category]}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleSelectManyItems={handleSelectManyItems}
          />
        )
      })}
    </Multiselect>
  );
}
