export function filterHotels (value, target) {
  var filtredHotels = value.hotels.filter(function(item){
    var itemLowerCase = item.title.rendered.toLowerCase()
    return (itemLowerCase.indexOf(target) >= 0);
  })

  return filtredHotels;
}

export function sortByNameAsc(a, b) {
  var nameA = a.title.rendered.toUpperCase(); // ignore upper and lowercase
  var nameB = b.title.rendered.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

export function sortByNameDesc(a, b) {
  var nameA = a.title.rendered.toUpperCase(); // ignore upper and lowercase
  var nameB = b.title.rendered.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }
  return 0;
};

export function sortByPriceAsc (a, b) {
  var aReplace = a.acf.location_price.replace('$', '');
  var bReplace = b.acf.location_price.replace('$', '');
  if (aReplace > bReplace) {
    return 1;
  }
  if (aReplace < bReplace) {
    return -1;
  }
  return 0;
};

export function sortByPriceDesc (a, b) {
  var aReplace = a.acf.location_price.replace('$', '');
  var bReplace = b.acf.location_price.replace('$', '');
  if (aReplace > bReplace) {
    return -1;
  }
  if (aReplace < bReplace) {
    return 1;
  }
  return 0;
};

export function sortByDistanceAsc (a, b) {
  var resultA = a.acf.location_distance.match( '^[0-9.]+' );
  var resultB = b.acf.location_distance.match( '^[0-9.]+' );
  if (resultA > resultB) {
    return 1;
  }
  if (resultA < resultB) {
    return -1;
  }
  return 0;
}

export function sortByDistanceDesc (a, b) {
  var resultA = a.acf.location_distance.match( '^[0-9.]+' );
  var resultB = b.acf.location_distance.match( '^[0-9.]+' );
  if (resultA > resultB) {
    return -1;
  }
  if (resultA < resultB) {
    return 1;
  }
  return 0;
}
