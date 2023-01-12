import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterSearch, setFilterSearch] = useState("")
  const [currentList, setCurrentList] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  
  function onSearchChange(event) {
    setFilterSearch(event.target.value)
  }

  const itemsToDisplay = currentList.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const filteredItems = itemsToDisplay.filter(item => 
    item.name.toLowerCase().includes(filterSearch.toLowerCase())
  )

  function handleItemFormSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: uuid(),
      name: e.target.name.value,
      category: e.target.category.value,
    }
    setCurrentList([...currentList, newItem]);
    console.log(newItem);
  }

  return (
    <div className="ShoppingList">
      <ItemForm 
        onItemFormSubmit={handleItemFormSubmit}
      />
      <Filter 
        onCategoryChange={handleCategoryChange} 
        onSearchChange={onSearchChange}
      />
      <ul className="Items">
        {filteredItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
