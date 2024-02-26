import React from 'react';
import { Multiselect } from './';
import { getMultiselectStyles } from './Multiselect.styles';

export interface MultiselectCategoryProps {
  isSingle: boolean;
  category: string;
  items: string[];
  selectedItems: string[];
  onSelectItem: (event: { target: { checked: boolean; value: string; }; }) => void;
  onSelectManyItems: (checked: boolean, values: string[]) => void;
}

export const MultiselectCategory = ({
  isSingle,
  category,
  items,
  selectedItems,
  onSelectItem,
  onSelectManyItems
}: MultiselectCategoryProps) => {
  const styles = getMultiselectStyles();
  const val = category.toLowerCase().replace(/\s/g, '-');
  const isAllChecked = items.every((value) => selectedItems.includes(value));
  const isIndeterminate = !isAllChecked && items.some((value) => selectedItems.includes(value));

  const handleSelectAll = () => {
    onSelectManyItems(!isAllChecked, items);
  };

  return (
    <>
      {items.length > 0 && !isSingle && (
        <Multiselect.Option
          itemId={`item-${val}`}
          value={category}
          label={category}
          onSelectItem={handleSelectAll}
          isIndeterminate={isIndeterminate}
          isChecked={isAllChecked}
        />
      )}
      {
        items.map((categoryItem) => {
          const val = categoryItem.toLowerCase().replace(/\s/g, '-');

          return (
            <Multiselect.Option
              className={isSingle ? '' : styles.multiCategoryOptions}
              key={`key-${val}`}
              itemId={`item-${val}`}
              value={categoryItem}
              label={categoryItem}
              onSelectItem={onSelectItem}
              isChecked={selectedItems.includes(categoryItem)}
            />
          )
        })
      }
    </>
  );
};
