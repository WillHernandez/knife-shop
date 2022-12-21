import { createGlobalState } from 'react-hooks-global-state';
const { setGlobalState, useGlobalState } = createGlobalState({
	user: {},
	cartItems: [],
	userOrder: {}
});

export { useGlobalState, setGlobalState };