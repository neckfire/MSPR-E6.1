import React, { useState } from 'react';

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {

            if (username && password) {
                console.log('Connexion avec:', username);
            } else {
                setError('Veuillez remplir tous les champs');
            }
        } else {

            if (username && password && confirmPassword) {
                if (password !== confirmPassword) {
                    setError('Les mots de passe ne correspondent pas');
                    return;
                }
                console.log('Inscription de:', username);
            } else {
                setError('Veuillez remplir tous les champs');
            }
        }
    };

    return (
        <div style={{
            backgroundColor:'rgb(27, 148, 118)',
            borderRadius:'10px' ,
            padding:'5% 10% 10% 10%',
            border:'1px solid black',

        }}>
            <div>
                <h2>
                    {isLogin ? 'Connexion' : 'Inscription'}
                </h2>

                {error && (
                    <div style={{color:'orange'}}>{error}
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-2">
                            Identifiant :
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                            placeholder="Votre identifiant"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Votre mot de passe"
                        />
                    </div>

                    {!isLogin && (
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Confirmer votre mot de passe"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {isLogin ? 'Se connecter' : 'S\'inscrire'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin
                            ? 'Pas de compte ? Inscrivez-vous'
                            : 'Déjà un compte ? Connectez-vous'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;