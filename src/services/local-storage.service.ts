export const setItem = (key: string, value: string | number | object) => {
  if (!localStorage) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  if (!localStorage) {
    return null;
  }

  const item = localStorage.getItem(key);

  return item? JSON.parse(item): null;
};

export const removeItem = (key: string) => {
  if (!localStorage) {
    return;
  }

  localStorage.removeItem(key);
};

export const clear = () => {
  if (!localStorage) {
    return;
  }

  localStorage.clear();
};
