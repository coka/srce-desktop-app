const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const DELETE_VOLUNTEER_SUCCESS = 'DELETE_VOLUNTEER_SUCCESS';
export const DELETE_VOLUNTEER_ERROR = 'DELETE_VOLUNTEER_ERROR';

export function deleteVolunteerSuccess(id) {
    return {
        type: DELETE_VOLUNTEER_SUCCESS,
        item_id: id
    };
}

export function deleteVolunteerError(error) {
    return {
        type: DELETE_VOLUNTEER_ERROR,
        error: error
    };
}

function deleteVolunteer(id) {
    return dispatch => {
        ipcRenderer.send('deleteVolunteer', id);
        ipcRenderer.once('volunteerDeleted', (event, isDeleted) => {
            if (isDeleted) {
                dispatch(deleteVolunteerSuccess(id));
            } else {
                dispatch(
                    deleteVolunteerError(
                        'Volunteer with id: ' + id + ' does not exists.'
                    )
                );
            }
        });
    };
}

export default deleteVolunteer;
