// App Controller

const App = (function(ItemCtrl, UICtrl, StorageCtrl)   {

    const loadEventListeners = ()  =>  {
        const UISelectors = UICtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        document.addEventListener('keypress', e => {
            if(e.key === 'enter')    {
                e.preventDefault();
                return false;
            }
        });
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    function calculateTotalCals()   {
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
    }

    const itemAddSubmit = e  =>  {
        const input = UICtrl.getItemInput();
        if(input.name !=='' && input.calories !== '')   {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);
        } else  {
            window.alert('Invalid Input')
        }
        calculateTotalCals();
        StorageCtrl.storeItem(newItem);
        UICtrl.clearInput();
        e.preventDefault();
    }

    const itemEditClick = e  =>  {
        if(e.target.classList.contains('edit-item')) {
            const listId = e.target.parentNode.parentNode.id;
            const listIdArray = listId.split('-');
            const id = parseInt(listIdArray[1]);
            const itemToEdit = ItemCtrl.getItemById(id);
            ItemCtrl.setCurrentItem(itemToEdit);
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    }

const itemUpdateSubmit = e =>  {
    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updatedItem(input.name, input.calories);
    UICtrl.updateListItem(updatedItem);
    calculateTotalCals();
    StorageCtrl.updateItemStorage(updatedItem);
    UICtrl.clearEditState();
    e.preventDefault();
}

const itemDeleteSubmit = e  =>  {
    
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);
    calculateTotalCals();
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    UICtrl.clearEditState();
    e.preventDefault();
}

const clearAllItemsClick = e => {
    ItemCtrl.clearAllItems();
    UICtrl.removeItems();
    calculateTotalCals();
    StorageCtrl.clearItemsFromStorage();
    UICtrl.hideList();
}
    return {
        init:  ()  =>  {
            UICtrl.clearEditState();
            const item = ItemCtrl.getItem();
            if(item.length === null)   {
                UICtrl.hideList();
            }   else   {
                UICtrl.populateItemList(item);
            }
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);          

            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl, StorageCtrl);

App.init();