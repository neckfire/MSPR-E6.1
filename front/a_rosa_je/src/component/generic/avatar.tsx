import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Icon,
} from "@chakra-ui/react";
import { FiSettings, FiLogOut } from "react-icons/fi";
import {useNavigate} from "react-router-dom";

interface AvatarMenuProps {
    onSettingsClick?: () => void;
    onLogoutClick?: () => void;
    avatarUrl?: string;
    userName?: string;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({
                                                   avatarUrl,
                                                   userName = "Utilisateur",
                                               }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate("/login");
    }

    const handleSettingClick = () => {
        navigate("/setting");
    }
    return (
        <Menu>
            <MenuButton>
                <Avatar
                    size="md"
                    name={userName}
                    src={avatarUrl}
                    cursor="pointer"
                />
            </MenuButton>
            <MenuList color={'black'}>
                <MenuItem icon={<Icon as={FiSettings} />} onClick={handleSettingClick} fontWeight={'bold'}>
                    Paramètres
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<Icon as={FiLogOut} />} onClick={handleLogoutClick} fontWeight={'bold'}>
                    Se déconnecter
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default AvatarMenu;
