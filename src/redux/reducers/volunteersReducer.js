import {
    FETCH_VOLUNTEERS_PENDING,
    FETCH_VOLUNTEERS_SUCCESS,
    FETCH_VOLUNTEERS_ERROR
} from '../actions/fetchVolunteers'

const initialState = {
  pending: false,
  items: [],
  error: null
}

export function volunteersReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_VOLUNTEERS_PENDING:
            return {
                ...state,
                pending: true,
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
        default:
            return state;
    }
}

export const getVolunteers = state => state.volunteers;
export const getVolunteersPending = state => state.pending;
export const getVolunteersError = state => state.error;


export default volunteersReducer;
