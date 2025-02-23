export const loginUser = async (credentials) => {
    const response = await fetch('http://localhost:8000/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur de connexion');
    }

    return response.json();
};

export const registerUser = async (userData) => {
    const response = await fetch('http://localhost:8000/auth/registration/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...userData,
            password1: userData.password,
            password2: userData.password2,
        }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.non_field_errors?.join(", ") || "Erreur lors de la création du compte");
    }

    return response.json();
};