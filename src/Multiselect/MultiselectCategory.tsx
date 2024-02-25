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
  const [selectedItemsLocal, setSelectedItemsLocal] = React.useState<string[]>([]);
  const styles = getMultiselectStyles();
  const val = category.toLowerCase().replace(/\s/g, '-');
  const isAllChecked = items.every((value) => selectedItemsLocal.includes(value));

  const handleSelectItemLocal = (event: { target: { checked: any; value: any; }; }) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedItemsLocal((prevState) => [...prevState, value]);
    } else {
      setSelectedItemsLocal((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  const handleSelectAll = () => {
    if (isAllChecked) {
      setSelectedItemsLocal([]);
    } else {
      setSelectedItemsLocal(items);
    }
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
              onSelectItem={handleSelectItemLocal}
              isChecked={selectedItemsLocal.includes(categoryItem)}
            />
          )
        })
      }
    </>
  );
};
