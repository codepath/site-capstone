import {
    TextInput, TextInputProps,
    ActionIcon, useMantineTheme,
    Text, Group, MultiSelect, Select, Button
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { QueryProps } from './VolunteerHome';
import { skillsTags } from '../../../../constants';
import { useEffect, useState } from 'react';

export function QueryBar(form: UseFormReturnType<QueryProps>) {
    const theme = useMantineTheme();
    const [showSearchButton, setShowSearchButton] = useState(false);

    useEffect(() => {
        const { search, tags } = form.values;
        if (search.trim().length > 0 || tags.length > 0) {
            setShowSearchButton(true);
        } else {
            setShowSearchButton(false);
        }
    }, [form])
    return (
        <Group>
            <TextInput
                icon={<Text size="xl" className='material-symbols-outlined' component="span">search</Text>}
                radius="xl"
                size="md"
                //   rightSection={
                //     <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                //       {theme.dir === 'ltr' ? (
                //         <Text size="xl" className='material-symbols-outlined' component="span">west</Text>
                //       ) : (
                //         <Text size="xl" className='material-symbols-outlined' component="span">east</Text>
                //       )}
                //     </ActionIcon>
                //   }
                placeholder="Search projects by title"
                {...form.getInputProps("search")}
            />
            <MultiSelect
                icon={<Text component='span' className='material-symbols-outlined'>psychology</Text>}
                searchable
                clearable
                data={skillsTags.map((tag) => ({
                    value: tag.toLocaleLowerCase(),
                    label: tag
                }))
                }
                label="Tag Filters"
                nothingFound="Nothing found"
                placeholder="Search projects by tags"
                clearButtonProps={{ 'aria-label': 'Clear selection' }}
                {...form.getInputProps("tags")} />
            <Select
                label="Time Range"
                placeholder="Search projects this..."
                data={["Day", "Week", "Month", "Year"]}
                {...form.getInputProps("timeRange")} />
        </Group>
    );
}