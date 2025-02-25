export const loginUser = async (credentials) => {
    const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: credentials.email,
            password: credentials.password,
        }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur de connexion');
    }

    return response.json();
};



export const registerUser = async (userData) => {
    try {

        const response = await fetch(`http://localhost:8000/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'

    },
            body: JSON.stringify(userData)
        });

        const responseText = await response.text();

        if (!response.ok) {

            try {
                const errorData = JSON.parse(responseText);
                if (errorData.detail) {
                    if (Array.isArray(errorData.detail)) {
                        throw new Error(errorData.detail[0].msg || 'Erreur lors de l\'inscription');
                    }
                    throw new Error(errorData.detail);
                }
            } catch (e) {

                console.log("Impossible de parser l'erreur JSON");
            }
            throw new Error(`Erreur ${response.status}: Erreur lors de l'inscription`);
        }

        try {
            return JSON.parse(responseText);
        } catch (e) {
            console.error("Erreur lors du parsing de la réponse:", e);
            throw new Error("Format de réponse invalide");
        }
    } catch (error) {
        console.error('Erreur d\'inscription complète:', error);
        throw error;
    }
};