const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const FETCH_VOLUNTEER_NAMES_PENDING = 'FETCH_VOLUNTEER_NAMES_PENDING';
export const FETCH_VOLUNTEER_NAMES_SUCCESS = 'FETCH_VOLUNTEER_NAMES_SUCCESS';
export const FETCH_VOLUNTEER_NAMES_ERROR = 'FETCH_VOLUNTEER_NAMES_ERROR';

export function fetchVolunteerNamesPending() {
    return {
        type: FETCH_VOLUNTEER_NAMES_PENDING
    };
}

export function fetchVolunteerNamesSuccess(names) {
    return {
        type: FETCH_VOLUNTEER_NAMES_SUCCESS,
        names: names
    };
}

export function fetchVolunteerNamesError(error) {
    return {
        type: FETCH_VOLUNTEER_NAMES_ERROR,
        error: error
    };
}

function fetchVolunteerNames() {
    return dispatch => {
        dispatch(fetchVolunteerNamesPending());
        new Promise(resolve => {
            ipcRenderer.send('getVolunteerNames');
            ipcRenderer.once('volunteerNamesSent', (event, volunteerNames) => {
                resolve(volunteerNames);
            });
        })
            .then(result => {
                dispatch(fetchVolunteerNamesSuccess(result));
            })
            .catch(error => dispatch(fetchVolunteerNamesError(error)));
    };
}

export default fetchVolunteerNames;
