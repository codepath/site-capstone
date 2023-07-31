import { Menu, Button, Text, ActionIcon } from '@mantine/core';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight, IconArchive, IconDotsVertical } from '@tabler/icons-react';
import { apiClient } from '../../../services/ApiClient';
import { notifications } from '@mantine/notifications';

export default function ProjectOptionsMenu({ projectId, handleDelete, handleArchiveToggle } : {projectId :  number, handleDelete: ({ projectId } : {projectId :  number}) => void, handleArchiveToggle: () => void}) {
    
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <ActionIcon  radius={"xl"}>
                    <IconDotsVertical />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Modify Project</Menu.Label>
                <Menu.Item onClick={handleArchiveToggle} icon={<IconArchive size={14} />}>Archive</Menu.Item>
                <Menu.Item onClick={() => handleDelete({projectId : projectId})}  color="red" icon={<IconTrash size={14} />}>Delete</Menu.Item>
                <Menu.Divider />
            </Menu.Dropdown>
        </Menu>
    );
}