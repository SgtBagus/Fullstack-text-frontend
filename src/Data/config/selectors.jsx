export const GET_CURRENT_USER = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    return currentUser;
};
