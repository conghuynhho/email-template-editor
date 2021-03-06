// Libraries
import React, {createContext, useReducer} from 'react';
import produce from 'immer';

// Constants
import {initialState} from 'Components/design-template/components/ContextStore/initialState';
import {actionType} from 'Components/design-template/components/ContextStore/constants';

// Utils
import {getObjectPropSafely} from 'Utils';

const StoreContext = createContext(initialState);
const {Provider} = StoreContext;

const reducer = (state, action) => {
    const {type, payload} = getObjectPropSafely(() => action || {type: undefined, payload: undefined});

    switch (type) {
        case actionType.INITIAL_DATA: {
            if (!getObjectPropSafely(() => Object.keys(payload).length)) {
                return state;
            }

            const newState = {
                ...state,
                ...payload
            };

            return {...newState};
        }
        case actionType.UPDATE_BODY: {
            if (!getObjectPropSafely(() => Object.keys(payload.values).length && payload.id)) {
                return state;
            }

            const bodies = produce(state.rows, draft => {
                if (draft[payload.id]) {
                    draft[payload.id] = {...draft[payload.id], ...payload.values};
                }
            });

            const newState = {
                ...state,
                bodies: bodies
            };

            return {...newState};
        }
        case actionType.UPDATE_ROW: {
            if (!getObjectPropSafely(() => Object.keys(payload.values).length && payload.id)) {
                return state;
            }

            const rows = produce(state.rows, draft => {
                if (draft[payload.id]) {
                    draft[payload.id] = {...draft[payload.id], ...payload.values};
                }
            });

            const newState = {
                ...state,
                rows: rows
            };

            return {...newState};
        }
        case actionType.UPDATE_COLUMN: {
            if (!getObjectPropSafely(() => Object.keys(payload.values).length && payload.id)) {
                return state;
            }

            const columns = produce(state.rows, draft => {
                if (draft[payload.id]) {
                    draft[payload.id] = {...draft[payload.id], ...payload.values};
                }
            });

            const newState = {
                ...state,
                columns: columns
            };

            return {...newState};
        }
        case actionType.UPDATE_CONTENT: {
            if (!getObjectPropSafely(() => Object.keys(payload.values).length && payload.id)) {
                return state;
            }

            const contents = produce(state.rows, draft => {
                if (draft[payload.id]) {
                    draft[payload.id] = {...draft[payload.id], ...payload.values};
                }
            });

            const newState = {
                ...state,
                contents: contents
            };

            return {...newState};
        }
        case actionType.UPDATE_MODE: {
            const checkValid = Object(payload).hasOwnProperty('viewMode') 
            || Object(payload).hasOwnProperty('sidePanelMode')
            || Object(payload).hasOwnProperty('isOpenPreview');

            if (!checkValid) {
                return state;
            }

            const newState = {
                ...state,
                ...payload
            };

            return {...newState};
        }
        case actionType.ACTIVE_ELEMENT: {
            const checkValid = Object(payload).hasOwnProperty('activeElement'); 

            if (!checkValid) {
                return state;
            }

            const newState = {
                ...state,
                activeElement: payload.activeElement
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