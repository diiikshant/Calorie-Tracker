// UI Controller

const UICtrl = (function()   {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
    }
    return {
        populateItemList:   items =>  {
            let html = '';
            items.forEach(item => {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput : () =>  {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: item => {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <sa href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        updateListItem: (item) =>   {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);
            listItems.forEach( listItem  =>  {
                const itemId = listItem.getAttribute('id');
                if(itemId === `item-${item.id}`)    {
                    document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <sa href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
            });
        },

        deleteListItem: (id) =>  {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },

        removeItems: () => {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);
            listItems.forEach(item  => {item.remove()});
        },

        clearInput: () =>  {
            document.querySelector(UISelectors.itemNameInput).value='';
            document.querySelector(UISelectors.itemCaloriesInput).value='';
        },

        addItemToForm: () =>  {
            document.querySelector(UISelectors.itemNameInput).value=ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value=ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },

        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: (totalCalories) =>   {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        clearEditState: () =>  {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: () => {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        getSelectors: () => {
            return UISelectors;
        }
    }

})();