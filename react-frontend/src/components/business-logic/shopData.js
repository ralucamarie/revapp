
function findReviewsByShopId(reviewsToSearch, shopId) {
  let reviewsByShopId = [];
  reviewsToSearch.map((review) => {
      if(review.shop_ID === shopId) {
          reviewsByShopId.push(review);
      }
      return reviewsByShopId
      })
  return reviewsByShopId
}

function getShopsByCategory(shops, categories, searchCategoryName) {
  let shopsAfterFilter = []
  if(searchCategoryName !== "") {
      let categoryId = categories.find(element => element.category_name === searchCategoryName).id
      shopsAfterFilter = shops.filter(shop => shop.category_ID === categoryId)
  }
  return shopsAfterFilter
}

export function populateShopWithProperties(shops, categories, reviews, searchCategoryName) {
    let shopsList = []
    let shopWithProperties = {
      id: 0,
      name: "",
      category: "",
      rateValue: 0,
      numberOfReview: 0,
      websiteUrl: "",
    }

    if (searchCategoryName !== "") {
      getShopsByCategory(shops, categories, searchCategoryName).map(shop => {
        let countReview = 0;
        let rateValueSum = 0
  
        let reviewsBasedOnShopID = findReviewsByShopId(reviews, shop.id);
        reviewsBasedOnShopID.map((review) => {
          countReview++
          rateValueSum += review.rating
          return {countReview, rateValueSum}
        })

        if(countReview !== 0 || rateValueSum !== 0){
          shopWithProperties.rateValue = Math.round(((rateValueSum / countReview) + Number.EPSILON) * 100) / 100
        } else {
          shopWithProperties.rateValue = ""
        }         
          shopWithProperties.numberOfReview = countReview
          shopWithProperties.category = categories.find(element => element.id === shop.category_ID).category_name
          shopWithProperties.name = shop.shop_name
          shopWithProperties.websiteUrl = shop.website_url
          shopWithProperties.id = shop.id

          shopsList.push(shopWithProperties);
          shopWithProperties = {
            id: 0,
            name: "",
            category: "",
            rateValue: 0,
            numberOfReview: 0,
            websiteUrl: "",
          }
      })
    } else {
        shops.map(shop => {
          let countReview = 0;
          let rateValueSum = 0

          let reviewsBasedOnShopID = findReviewsByShopId(reviews, shop.id);
          reviewsBasedOnShopID.map((review) => {
            countReview++
            rateValueSum += review.rating
          })

          if(countReview !== 0 || rateValueSum !== 0){
            shopWithProperties.rateValue = Math.round(((rateValueSum / countReview) + Number.EPSILON) * 100) / 100
          } else {
            shopWithProperties.rateValue = ""
          }
           
            shopWithProperties.numberOfReview = countReview
            let category = categories.find(element => element.id === shop.category_ID)
            if(category && category.category_name !== "") {
              shopWithProperties.category = category.category_name;
            }
            shopWithProperties.name = shop.shop_name
            shopWithProperties.websiteUrl = shop.website_url
            shopWithProperties.id = shop.id

            shopsList.push(shopWithProperties);
            shopWithProperties = {
              id: 0,
              name: "",
              category: "",
              rateValue: 0,
              numberOfReview: 0,
              websiteUrl: "",
            }
        })
      }
    return shopsList
  } 