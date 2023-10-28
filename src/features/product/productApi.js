// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllProductByFilter(filter, sort, pagination) {
  
  //filter ={'category':['smartphone','laptops']}
  //sort ={_sort:'price',_order:'desc'}
  //pagination={_page=1,_limit=10}
  //Todo: on server we will support multi values

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
     
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
   console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
   
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:5000/products?" + queryString
    );
    const data = await response.json();
    const totalItems=  response.headers.get('X-Total-Count')
    resolve({ data:{products:data,totalItems:+totalItems} });
  });
}

export function fetchCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/category");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/brands");
    const data = await response.json();
    resolve({ data });
  });
}