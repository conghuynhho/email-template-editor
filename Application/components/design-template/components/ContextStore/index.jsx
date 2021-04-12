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

            if (!getObjectPropSafely(() => Object(payload).hasOwnProperty('bodies'))) {
                return state;
            }

            const newState = {
                ...state,
                bodies: payload.bodies
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
        case actionType.UPDATE_COLUMNS: {
            if (!getObjectPropSafely(() => Object.keys(payload.values).length && payload.id)) {
                return state;
            }

            const newState = {
                ...state,
                columns: payload.values
            };

            return {...newState};
        }
        case actionType.UPDATE_COLUMN: {
            if (!getObjectPropSafely(() => Object.keys(payload.values).length && payload.id)) {
                return state;
            }

            const columns = produce(state.columns, draft => {
                if (draft[payload.id]) {
                    draft[payload.id] = {...draft[payload.id], ...payload.values};
                }
            });

            const newState = {
                ...state,
                columns
            };

            return {...newState};
        }
        case actionType.UPDATE_CONTENT: {
            const {id, values} = payload;

            const contents = produce(state.contents, draft => {
                if (draft[id]) {
                    draft[id] = {...draft[id], ...values};
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
            const checkValid = Object(payload).hasOwnProperty('activeElement') && Object(payload).hasOwnProperty('isEditing'); 

            if (!checkValid) {
                return state;
            }

            const newState = {
                ...state,
                activeElement: payload.activeElement,
                isEditing: payload.isEditing
            };

            return {...newState};
        }
        case actionType.HANDLE_ROW: {
            const checkValid = Object.keys(payload).length;

            if (!checkValid) {
                return state;
            }

            const newState = {
                ...state,
                ...payload
            };

            return {...newState};
        }
        case actionType.HANDLE_CONTENT: {
            const checkValid = Object.keys(payload).length;

            if (!checkValid) {
                return state;
            }

            const newState = {
                ...state,
                ...payload
            };

            return {...newState};
        }
        case actionType.TOGGLE_DELETE_FORM: {
            const checkValid = Object(payload).hasOwnProperty('toggleDeleteForm');

            if (!checkValid) {
                return;
            }

            const newState = {
                ...state,
                toggleDeleteForm: {...payload.toggleDeleteForm}
            };

            return {...newState};
        }
        case actionType.CONFIRM_DELETE: {
            const checkValid = Object(payload).hasOwnProperty('confirmDelete');

            if (!checkValid) {
                return;
            }

            const newState = {
                ...state,
                confirmDelete: {...payload.confirmDelete}
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