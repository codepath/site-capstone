import {
    TextInput, TextInputProps,
    ActionIcon, useMantineTheme,
    Text, Group, MultiSelect, Select, Button
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { skillsTags } from '../../constants';
import { useEffect, useState } from 'react';

export interface QueryProps {
    search: string,
    tags: string[],
    timeRange: "Day" | "Week" | "Month" | "Year"
  }

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
        <Group >
            <TextInput
                icon={<Text size="xl" className='material-symbols-outlined' component="span">search</Text>}
                radius="xl"
                size="md"
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