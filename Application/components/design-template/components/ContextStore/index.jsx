// Libraries
import React, {createContext, useReducer} from 'react';

// Utils
import {getObjectPropSafely} from 'Utils';
import {initialState} from 'Components/design-template/components/ContextStore/initialState';
import {actionType} from 'Components/design-template/components/ContextStore/constants';

const StoreContext = createContext(initialState);
const {Provider} = StoreContext;

const reducer = (state, action) => {
    const {type, payload} = getObjectPropSafely(
        () =>
            action || {
                type: undefined,
                payload: undefined
            }
    );

    switch (type) {
        case actionType.INITIAL_DATA: {
            if (!getObjectPropSafely(() => Object.keys(payload).length)) {
                return state;
            }

            const newState = {
                ...state,
                leftSideBar: {
                    ...state.leftSideBar,
                    ...payload
                }
            };

            return {...newState};
        }
    }
};

const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {initialState, StoreContext, StateProvider};