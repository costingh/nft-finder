export default function sort(arr, order, criteria) {

    if(criteria === 'created_date') {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
              //Value comparison using ascending order
              if (order == "ascending") {
                if (arr[j + 1][criteria] < arr[j][criteria]) {
                  //Swapping
                  [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                }
              } else {
                if (arr[j + 1][criteria] > arr[j][criteria]) {
                  //Swapping
                  [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                }
              }
            }
          }
    } else {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
              //Value comparison using ascending order
              if (order == "ascending") {
                if (arr[j + 1].stats.[criteria] < arr[j].stats.[criteria]) {
                  //Swapping
                  [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                }
              } else {
                if (arr[j + 1].stats.[criteria] > arr[j].stats.[criteria]) {
                  //Swapping
                  [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                }
              }
            }
          }
    }

  
  return arr;
}

/* console.log(
  sort(
    [
      {
        created_date: 6,
        floor_price: 62,
      },
      {
        created_date: 1,
        floor_price: 32,
      },
      {
        created_date: 16,
        floor_price: 12,
      },
      {
        created_date: 26,
        floor_price: 162,
      },
    ],
    "ascending",
    "floor_price"
  )
); */
