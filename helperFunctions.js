export const searchProduct = (arr, value) => {
  var result = { status: "" };
  for (let i in arr) {
    if (arr[i].id == value) {
      result.status = "success";
      result.product = arr[i];
      return result;
    }
  }
  if (result.status === "") {
    result.status = "error";
    result.message =
      "Invalid product id. Valid product id range is 100 to 110.";
    return result;
  }
};
export const searchPostalCode = (arr, value) => {
  var result = { status: "" };
  for (let i in arr) {
    if (arr[i].postal_code == value) {
      result.status = "success";
      result.distance_in_kilometers = arr[i].distance_in_kilometers;
      return result;
    }
  }
  if (result.status === "") {
    result.status = "error";
    result.message = "Invalid postal code, valid ones are 465535 to 465545.";
    return result;
  }
};
