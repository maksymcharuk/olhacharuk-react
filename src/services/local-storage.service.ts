export const keyPrefix = "app";

export const setItem = (key: string, value: string | number | object) => {
  if (!localStorage) {
    return;
  }

  localStorage.setItem(`${keyPrefix}-${key}`, JSON.stringify(value));
};

export const getItem = (key: string) => {
  if (!localStorage) {
    return null;
  }

  const item = localStorage.getItem(`${keyPrefix}-${key}`);

  return item? JSON.parse(item): null;
};

export const removeItem = (key: string) => {
  if (!localStorage) {
    return;
  }

  localStorage.removeItem(`${keyPrefix}-${key}`);
};

export const clear = () => {
  if (!localStorage) {
    return;
  }

  localStorage.clear();
};
