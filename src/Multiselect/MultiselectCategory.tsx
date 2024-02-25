import React, { memo } from 'react';
import { Multiselect } from './';
import { getMultiselectStyles } from './Multiselect.styles';

export interface MultiselectCategoryProps {
  category: string;
  items: string[];
  selectedItems: string[];
  handleSelectItem: (event: { target: { checked: boolean; value: string; }; }) => void;
  handleSelectManyItems: (checked: boolean, values: string[]) => void;
}

export const MultiselectCategory = memo(({
  category,
  items,
  selectedItems,
  handleSelectItem,
  handleSelectManyItems
}: MultiselectCategoryProps) => {
  const styles = getMultiselectStyles();
  const val = category.toLowerCase().replace(/\s/g, '-');
  const isAllChecked = items.every((value) => selectedItems.includes(value));

  // console.log('__RENDER__');

  const handleSelectAll = () => {
    handleSelectManyItems(!isAllChecked, items);
    // if (isAllChecked) {
    //   setSelectedItemsLocal([]);
    // } else {
    //   setSelectedItemsLocal(items);
    // }
  };

  return (
    <>
      <Multiselect.Option
        itemId={`item-${val}`}
        value={category}
        label={category}
        onSelectItem={handleSelectAll}
        isChecked={isAllChecked}
      />
      {
        items.map((categoryItem) => {
          const val = categoryItem.toLowerCase().replace(/\s/g, '-');

          return (
            <Multiselect.Option
              className={styles.categoryOptions}
              key={`key-${val}`}
              itemId={`item-${val}`}
              value={categoryItem}
              label={categoryItem}
              onSelectItem={handleSelectItem}
              isChecked={selectedItems.includes(categoryItem)}
            />
          )
        })
      }
    </>
  );
});
