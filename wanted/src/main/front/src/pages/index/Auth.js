// Auth.js
export const isTokenValid = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTime;
    } catch (e) {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem('authToken');
};
