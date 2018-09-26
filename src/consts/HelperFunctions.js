let Helpers = {};


Helpers.getUser = () => {
  let storage = window.localStorage || {}
  return storage.smuser || '';
}

Helpers.getToken = () => {
  let storage = window.localStorage || {}
  return storage.smtoken || '';
}

Helpers.toTitleCase = (str) => {
  return str.toLowerCase().replace(/(?:^|[\s-_/])\w/g, function (match) {
    return match.toUpperCase();
  });
}


export default Helpers