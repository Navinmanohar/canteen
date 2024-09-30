const initialState={
  bucketItems:JSON.parse(localStorage.getItem('bucketItems'))||[]

}

export const bucketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BUCKET_ADD_ITEM':
      const newItem = action.payload;

      // Check if the item already exists in the bucket
      const existItem = state.bucketItems.find((x) => x._id === newItem._id);

      if (existItem) {
        return {
          ...state,
          // Update the quantity of the existing item
          bucketItems: state.bucketItems.map((x) =>
            x._id === existItem._id ? newItem : x
          ),
        };
      } else {
        return {
          ...state,
          // Add the new item to the bucket
          bucketItems: [...state.bucketItems, newItem],
        };
      }

    case 'BUCKET_REMOVE_ITEM':
      return {
        ...state,
        // Remove the item from the bucket based on item id
        bucketItems: state.bucketItems.filter((x) => x._id !== action.payload._id),
      };

    case 'BUCKET_UPDATE_ITEM':
      const updatedItem = action.payload;
      return {
        ...state,
        // Update the item in the bucket with the new quantity
        bucketItems: state.bucketItems.map((x) =>
          x._id === updatedItem._id ? updatedItem : x
        ),
      };

    default:
      return state;
  }
};
