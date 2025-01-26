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

interface AvatarMenuProps {
    onSettingsClick?: () => void;
    onLogoutClick?: () => void;
    avatarUrl?: string;
    userName?: string;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({
                                                   onSettingsClick,
                                                   onLogoutClick,
                                                   avatarUrl,
                                                   userName = "Utilisateur",
                                               }) => {
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
                <MenuItem icon={<Icon as={FiSettings} />} onClick={onSettingsClick} fontWeight={'bold'}>
                    Paramètres
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<Icon as={FiLogOut} />} onClick={onLogoutClick} fontWeight={'bold'}>
                    Se déconnecter
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default AvatarMenu;
