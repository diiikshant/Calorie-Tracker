// Item Controller

const ItemCtrl = (function()   {
    class Item {
        constructor(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        }
    }   

    const data = {
        items : StorageCtrl.getItemsFromStorage(),
        currentItem : null,
        totalCalories : 0
    }

    return  {
        getItem: () => data.items,

        getItemById: id => {
            let found = null;
            data.items.forEach(function(item)  {
                if(item.id === id)  {
                    found = item;
                }
            });
            return found;
        },

        updatedItem: (name, cals) => {
            cals = parseInt(cals);
            let found = null;
            data.items.forEach( item => {
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = cals;
                    found = item;
                }
            });
            return found;
        },

        deleteItem: (id) => {
            const ids = data.items.map( item => item.id);
            const index = ids.indexOf(id);
            data.items.splice(index, 1);
        },

        clearAllItems: () =>   {
            data.items = [];
        },

        setCurrentItem: (item) => data.currentItem = item,

        getCurrentItem: () => data.currentItem,
        
        addItem:(name, calories) => {
            let id;
            if (data.items.length >0)   {
                id = data.items.length;
            }   else    {
                id = 0;
            }
            calories = parseInt(calories);
            newItem = new Item(id, name, calories);
            data.items.push(newItem);
            return newItem;
        },

        getTotalCalories: () => {
            let total = 0;
            data.items.forEach((item) =>  {
                total += item.calories;
            });
            data.totalCalories = total;
            return total;
        },

        logData: function() {
            return data;
        }   
    }
})();