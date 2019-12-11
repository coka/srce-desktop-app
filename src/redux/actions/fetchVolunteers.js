const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const FETCH_VOLUNTEERS_PENDING = 'FETCH_VOLUNTEERS_PENDING';
export const FETCH_VOLUNTEERS_SUCCESS = 'FETCH_VOLUNTEERS_SUCCESS';
export const FETCH_VOLUNTEERS_ERROR = 'FETCH_VOLUNTEERS_ERROR';

export function fetchVolunteersPending() {
    return {
        type: FETCH_VOLUNTEERS_PENDING
    };
}

export function fetchVolunteersSuccess(volunteers) {
    return {
        type: FETCH_VOLUNTEERS_SUCCESS,
        items: volunteers
    };
}

export function fetchVolunteersError(error) {
    return {
        type: FETCH_VOLUNTEERS_ERROR,
        error: error
    };
}

function fetchVolunteers() {
    return dispatch => {
        dispatch(fetchVolunteersPending());
         new Promise(resolve => {
            ipcRenderer.send('getVolunteers');
            ipcRenderer.once('volunteersSent', (event, volunteers) => {
                resolve(volunteers);
            });
        })
            .then(result => {
                dispatch(fetchVolunteersSuccess(result));
            })
            .catch(error => dispatch(fetchVolunteersError(error)));
    };
}

export default fetchVolunteers;
