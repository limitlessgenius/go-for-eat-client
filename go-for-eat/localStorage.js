export const loadState = () => {
  try {
    const serializedState =Expo.SecureStore.getItemAsync('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      authentication: state.authentication,
    });
    Expo.SecureStore.setItemAsync('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
