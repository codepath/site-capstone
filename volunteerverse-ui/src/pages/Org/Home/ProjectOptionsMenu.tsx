import { Menu, ActionIcon } from '@mantine/core';
import { IconTrash, IconArchive, IconDotsVertical } from '@tabler/icons-react';

export default function ProjectOptionsMenu({ projectId, handleDelete, handleArchiveToggle, isActive } : {isActive : boolean, projectId :  number, handleDelete: ({ projectId } : {projectId :  number}) => void, handleArchiveToggle: () => void}) {
    
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <ActionIcon ml={"auto"} radius={"xl"}>
                    <IconDotsVertical  />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Modify Project</Menu.Label>
                <Menu.Item onClick={handleArchiveToggle} icon={<IconArchive size={14} />}>{ !isActive ?  "Unarchive" : "Archive"}</Menu.Item>
                <Menu.Item onClick={() => handleDelete({projectId : projectId})}  color="red" icon={<IconTrash size={14} />}>Delete</Menu.Item>
                <Menu.Divider />
            </Menu.Dropdown>
        </Menu>
    );
}