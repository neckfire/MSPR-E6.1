import useCurrentUserStore from "../store/CurrentUser.ts";

export const fetchUserInfo = async () => {
    const store = useCurrentUserStore.getState(); // Récupérer l'état actuel
    const { token, setCurrentUser } = store;

    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch('http://localhost:8000/auth/user/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }
        console.log(response);
        const userData = await response.json();

        // Mettre à jour le store avec les informations complètes de l'utilisateur
        setCurrentUser(userData, token); // On garde le même token mais on met à jour les données user

        return userData;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};