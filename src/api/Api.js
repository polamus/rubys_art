import 'whatwg-fetch';

let Api = {};

const list_url = process.env.REACT_APP_SMARTAPI_URL + "api/v1/cost/playbooks" ;
// const admin_url = process.env.REACT_APP_SMARTAPI_URL + "api/v1/users/roles?app=" ;

// Api.permissions = (authToken, app) => {
//   return fetch( admin_url + app, {
//       method: 'GET',
//       headers: { "Authorization": authToken }
//   }).then((response) => {
//     return response.json()
//   })
// }


Api.list = (authToken) => {
  return fetch( list_url, {
    method: 'GET',
    headers: { 
      "Authorization": authToken
    }
  }).then((response) => {
    return response.json();
  })
}

Api.create = (authToken, item) => {
  return fetch(list_url, { 
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": authToken,
    },
    body: JSON.stringify(item)
  }).then((response) => {
    return response.json();
  })
}

Api.edit = (authToken, item) => {
  return fetch( list_url + '/'+ item.id, {
    method: 'PUT',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": authToken,
    },
    body: JSON.stringify(item)
  }).then((response) => {
    return response.json();
  })
}


Api.delete = (authToken, playbookId) => {
  return fetch( list_url + '/' + playbookId, {
    method: 'DELETE',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": authToken,
    },
    body: JSON.stringify(playbookId)
  }).then((response) => {
    return response.json();
  })
}

Api.listCategories = (authToken, playbookId) => {
  return fetch( list_url + '/' + playbookId + '/merch_groups',{
    method: 'GET',
    headers: { 
      "Authorization": authToken,
      'Content-Type': 'application/json'
    },

  }).then((response) => {
    return response.json();
  })
}



Api.assignCategories = (authToken, playbookId, categoryIds) => {
  let categories_assign_url = list_url + '/' + playbookId + '/assign_categories';
  return fetch(categories_assign_url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": authToken,
    },
    body: JSON.stringify({category_ids: categoryIds})
  }).then((response) => {
    return response.json();
  })
}

export default Api;





// don't remove below code
// import 'whatwg-fetch';

// let Api = {};

// const list_url = process.env.REACT_APP_SMARTAPI_URL + "api/v1/cost/manufacturers" ;
// const large_request = process.env.REACT_APP_SMARTAPI_URL + "api/v1/cost/large_document_request" ;

// // Api.permissions = (authToken, app) => {
// //   return fetch( admin_url + app, {
// //       method: 'GET',
// //       headers: { "Authorization": authToken }
// //   }).then((response) => {
// //     return response.json()
// //   })
// // }


// Api.list = (authToken) => {
//   return fetch( list_url, {
//     method: 'GET',
//     headers: { 
//       "Authorization": authToken,
//       'Content-Type': 'application/json'
//     }
//   }).then((response) => {
//     return response.json();
//   })
// };

// Api.generateReport = (authToken, banners, periodOneStartDate, periodOneEndDate, periodTwoStartDate, periodTwoEndDate, manufacturerNum, includeItemsWithNoManufacturer) => {
//   return fetch(large_request, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       "Authorization": authToken,
//     },
//     body: JSON.stringify({banners: banners, periodOneStartDate: periodOneStartDate, periodOneEndDate: periodOneEndDate, periodTwoStartDate: periodTwoStartDate, periodTwoEndDate: periodTwoEndDate, manufacturerNum: manufacturerNum, includeItemsWithNoManufacturer: includeItemsWithNoManufacturer})
//   }).then((response) => {
//     return response.json();
//   })
// };

// export default Api;


// ----------------------------------
// api for demandtec reuest

// import 'whatwg-fetch';

// let Api = {};

// const list_url = process.env.REACT_APP_SMARTAPI_URL + "/api/v1/cost/manufacturers" ;

// // const list_url = process.env.REACT_APP_SMARTAPI_URL + "/api/v1/cost/departments" ;
// const generate_url = process.env.REACT_APP_SMARTAPI_URL + "api/v1/cost/large_document_request/demand_tech_request" ;
// const admin_url = process.env.REACT_APP_SMARTAPI_URL + "api/v1/roles?app=" ;

// Api.permissions = (authToken, app) => {
//   return fetch( admin_url + app, {
//       method: 'GET',
//       headers: { "Authorization": authToken }
//   }).then((response) => {
//     return response.json()
//   })
// }


// Api.list = (authToken) => {
//   return fetch( list_url, {
//     method: 'GET',
//     headers: { 
//       "Authorization": authToken,
//       'Content-Type': 'application/json'
//     }
//   }).then((response) => {
//     return response.json();
//   })
// };

// Api.listCategories = (authToken, dept) => {
//   return fetch( list_url + '/' + dept + '/find_categories',{
//     method: 'GET',
//     headers: { 
//       "Authorization": authToken,
//       'Content-Type': 'application/json'
//     },

//   }).then((response) => {
//     return response.json();
//   })
// }

// Api.generateReport = (authToken, banners, periodOneStartDate, periodOneEndDate, department, category) => {
//   return fetch(generate_url, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       "Authorization": authToken,
//     },
//     body: JSON.stringify({banners: banners, perf_start_date: periodOneStartDate, perf_end_date: periodOneEndDate, department: department, category: category})
//   }).then((response) => {
//     return response.json();
//   })
// };

// export default Api;