import React from 'react';
import { Multiselect } from '../Multiselect';

export default function MultiselectSelectAllExample() {
  const spaces = React.useMemo(
    () => [
      'Travel Blog',
      'Finnance Blog',
      'Fitness App',
      'News Website',
      'eCommerce Catalogue',
      'Photo Gallery',
    ],
    [],
  );

  // This `useState` is going to store the selected "space" so we can show it in the UI
  const [selectedSpaces, setSelectedSpaces] = React.useState<any[]>([]);

  // This function will be called once the user selects an item in the list of options
  const handleSelectItem = (event: { target: { checked: any; value: any; }; }) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedSpaces((prevState) => [...prevState, value]);
    } else {
      setSelectedSpaces((prevState) =>
        //its important to use prevState to avoid race conditions when using the state variable as reference.
        prevState.filter((space) => space !== value),
      );
    }
  };

  const toggleAll = (event: { target: { checked: any; }; }) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedSpaces(spaces);
    } else {
      setSelectedSpaces([]);
    }
  };

  const areAllSelected = React.useMemo(() => {
    // this can affect the app performance with a larger amount of data, consider changing it in your implementation
    return spaces.every((element) => selectedSpaces.includes(element));
  }, [selectedSpaces, spaces]);

  return (
    <Multiselect
      currentSelection={selectedSpaces}
      popoverProps={{ isFullWidth: true }}
    >
      <Multiselect.SelectAll
        onSelectItem={toggleAll}
        isChecked={areAllSelected}
      />
      {spaces.map((space) => {
        const val = space.toLowerCase().replace(/\s/g, '-');
        return (
          <Multiselect.Option
            key={`key-${val}`}
            itemId={`space-${val}`}
            value={space}
            label={space}
            onSelectItem={handleSelectItem}
            isChecked={selectedSpaces.includes(space)}
          />
        );
      })}
    </Multiselect>
  );
}
