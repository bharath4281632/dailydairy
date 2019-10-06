export const isValeInArray = (array, element) => {
  const findIndex = array.findIndex(val => val.name === element.name);
  return findIndex === -1 ? false : true;
};

export function Unix_timestamp(t) {
  var dt = new Date(t * 1000);
  var hr = dt.getHours();
  var m = "0" + dt.getMinutes();
  var s = "0" + dt.getSeconds();
  return hr + ":" + m.substr(-2) + ":" + s.substr(-2);
}

export function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

export function capitalizeFist(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
