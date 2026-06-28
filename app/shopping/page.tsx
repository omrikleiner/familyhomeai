'use client';

import ShoppingListCard from '../../src/components/ShoppingListCard';
import { useAppState } from '../../src/context/AppStateContext';

export default function ShoppingPage() {
  const {
    state,
    handleAddShoppingItem,
    handleToggleShoppingItem,
    handleEditShoppingItem,
    handleDeleteShoppingItem,
    handleClearPurchasedShopping,
  } = useAppState();

  return (
    <div className="page-grid">
      <ShoppingListCard
        items={state.shoppingItems}
        onAddItem={handleAddShoppingItem}
        onToggleItem={handleToggleShoppingItem}
        onEditItem={handleEditShoppingItem}
        onDeleteItem={handleDeleteShoppingItem}
        onClearPurchased={handleClearPurchasedShopping}
      />
    </div>
  );
}
