import {
    FETCH_VOLUNTEERS_PENDING,
    FETCH_VOLUNTEERS_SUCCESS,
    FETCH_VOLUNTEERS_ERROR
} from '../actions/fetchVolunteers';
import {
    FETCH_VOLUNTEER_NAMES_PENDING,
    FETCH_VOLUNTEER_NAMES_SUCCESS,
    FETCH_VOLUNTEER_NAMES_ERROR
} from '../actions/fetchVolunteerNames';
import {
    INSERT_VOLUNTEER_SUCCESS,
    INSERT_VOLUNTEER_ERROR
} from '../actions/insertVolunteer';
import {
    DELETE_VOLUNTEER_SUCCESS,
    DELETE_VOLUNTEER_ERROR
} from '../actions/deleteVolunteer';

const initialState = {
    pending: false,
    items: [],
    names: [],
    error: null
};

export function volunteersReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_VOLUNTEERS_PENDING:
            return {
                ...state,
                pending: true
            };
        case FETCH_VOLUNTEERS_SUCCESS:
            return {
                ...state,
                pending: false,
                items: action.items
            };
        case FETCH_VOLUNTEERS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        case FETCH_VOLUNTEER_NAMES_PENDING:
            return {
                ...state,
                pending: true
            };
        case FETCH_VOLUNTEER_NAMES_SUCCESS:
            return {
                ...state,
                pending: false,
                names: action.names
            };
        case FETCH_VOLUNTEER_NAMES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        case INSERT_VOLUNTEER_SUCCESS:
            return {
                ...state,
                pending: false,
                items: [...state.items, action.item]
            };
        case INSERT_VOLUNTEER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        case DELETE_VOLUNTEER_SUCCESS:
            return {
                ...state,
                pending: false,
                items: state.items.filter(
                    v => v.volunteer_id !== action.item_id
                )
            };
        case DELETE_VOLUNTEER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
}

export const getVolunteers = state => state.volunteers;
export const getVolunteersPending = state => state.pending;
export const getVolunteersError = state => state.error;

export default volunteersReducer;
