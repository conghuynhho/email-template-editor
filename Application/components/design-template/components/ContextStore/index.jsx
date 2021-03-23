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
        case actionType.UPDATE_COLUMN: {
            if (!getObjectPropSafely(() => Object.keys(payload.values).length && payload.id)) {
                return state;
            }

            const newState = {
                ...state,
                columns: payload.values
            };

            return {...newState};
        }
        case actionType.UPDATE_CONTENT: {
            if (!getObjectPropSafely(() => Object.keys(payload.values).length && payload.id)) {
                return state;
            }
            const contents = produce(state.contents, draft => {
                if (draft[payload.id]) {
                    draft[payload.id].values.text = payload.values;
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
        case actionType.DRAGGING_COLUMN_ID: {
            const checkValid = Object(payload).hasOwnProperty('columnId');

            if (!checkValid) {
                return state;
            }

            const newState = {
                ...state,
                draggingColumnId: payload.columnId,
                draggingContentIndex: payload.contentIndex
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
        case actionType.HOVER_ROW: {
            const checkValid = Object(payload).hasOwnProperty('hoverId');

            if (!checkValid) {
                return;
            }

            const newState = {
                ...state,
                hoverId: payload.hoverId
            };

            return {...newState};
        }
        case actionType.DRAG_IT_HERE_SPECS: {
            const checkValid = Object(payload).hasOwnProperty('rowVisiblePosition');

            if (!checkValid) {
                return;
            }

            const newState = {
                ...state,
                rowVisiblePosition: {...payload.rowVisiblePosition}
            };

            return {...newState};
        }
        case actionType.RENDER_DRAG_POSITION: {
            const checkValid = Object(payload).hasOwnProperty('rowDraggingIndex');

            if (!checkValid) {
                return;
            }

            const newState = {
                ...state,
                rowDraggingIndex: payload.rowDraggingIndex
            };

            return {...newState};
        }
        case actionType.UPDATE_DRAGGING_STATUS: {
            const checkValid = Object(payload).hasOwnProperty('isDragging');

            if (!checkValid) {
                return;
            }

            const newState = {
                ...state,
                isDragging: payload.isDragging
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