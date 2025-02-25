import { VStack, Button, Text, Checkbox } from "@chakra-ui/react";
import { FormInput } from "./formInput.tsx";
import { PasswordInput } from "./passwordInput.tsx";

export const RegisterForm = ({
                                 formData,
                                 onSubmit,
                                 onChange,
                                 isLoading,
                                 showPassword,
                                 onTogglePassword,
                                 onToggleMode
                             }) => {
    // Fonction pour gérer le changement de la case à cocher
    const handleCheckboxChange = (e) => {
        onChange({
            target: {
                name: "is_botanist",
                value: e.target.checked
            }
        });
    };

    return (
        <form onSubmit={onSubmit} style={{ width: '80%' }}>
            <VStack spacing={8} w="100%">
                <FormInput
                    name="username"
                    value={formData.username || ""}
                    onChange={onChange}
                    placeholder="Nom d'utilisateur"
                />
                <FormInput
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="Email"
                    type="email"
                />
                <FormInput
                    name="phone"
                    value={formData.phone || ""}
                    onChange={onChange}
                    placeholder="Numéro de téléphone"
                />
                <PasswordInput
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    placeholder="Mot de passe"
                    showPassword={showPassword}
                    onTogglePassword={onTogglePassword}
                />
                <PasswordInput
                    name="password2"
                    value={formData.password2 || ""}
                    onChange={onChange}
                    placeholder="Confirmer le mot de passe"
                    showPassword={showPassword}
                    onTogglePassword={onTogglePassword}
                />
                <Checkbox
                    colorScheme="green"
                    name="is_botanist"
                    isChecked={formData.is_botanist}
                    onChange={handleCheckboxChange}
                >
                    <Text color="white">Je suis botaniste</Text>
                </Checkbox><Text
                color="white"
                mt={4}
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={onToggleMode}
            >
                Déjà un compte ? Se connecter
            </Text>
                <Button
                    type="submit"
                    colorScheme="green"
                    isLoading={isLoading}
                    width="100%"
                >
                    Créer un compte
                </Button>

            </VStack>
        </form>
    );
};