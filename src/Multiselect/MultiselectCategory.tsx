import React from 'react';
import { Multiselect } from './';
import { getMultiselectStyles } from './Multiselect.styles';

export interface MultiselectCategoryProps {
  category: string;
  items: string[];
  selectedItems: string[];
  handleSelectItem: (event: { target: { checked: any; value: any; }; }) => void
}

export const MultiselectCategory = ({
  category,
  items,
  selectedItems,
  handleSelectItem
}: MultiselectCategoryProps) => {
  const styles = getMultiselectStyles();
  const val = category.toLowerCase().replace(/\s/g, '-');

  return (
    <>
      <Multiselect.Option
        itemId={`item-${val}`}
        value={category}
        label={category}
        onSelectItem={handleSelectItem}
        isChecked={selectedItems.includes(category)}
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
};
