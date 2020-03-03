export const getJwt = () => {
    return localStorage.getItem('cool-jwt')
};
export const getRole = () => {
    return localStorage.getItem('role')
};
export const getUserId = () => {
    return localStorage.getItem('user-id')
};