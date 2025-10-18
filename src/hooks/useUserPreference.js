const useUserPreference = (variableName) => {
  const localStorageMode = true;
  const getLocalStorageValue = (varName) => {
    const v = localStorage.getItem(varName);
    if (v) {
      try {
        const pv = JSON.parse(v);
        return pv;
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        return undefined;
      }
    }
    return undefined;
  };

  const get = () => {
    if (localStorageMode) {
      return getLocalStorageValue(variableName);
    }
    const strValue = window.widget.getValue(variableName);
    try {
      if (strValue) {
        const res = JSON.parse(strValue);
        return res;
      }
    } catch (e) {
      return undefined;
    }
    return undefined;
  };

  const set = (data) => {
    if (localStorageMode) {
      localStorage.setItem(variableName, JSON.stringify(data));
    } else {
      window.widget.setValue(variableName, JSON.stringify(data));
    }
  };

  return {
    get,
    set,
  };
};
export default useUserPreference;
