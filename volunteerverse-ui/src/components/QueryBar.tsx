import {
    Group, MultiSelect,
    Text,
    TextInput
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useSkills } from '../services/hooks/useSkills';

export interface QueryProps {
    search: string,
    tags: string[],
    timeRange: "Day" | "Week" | "Month" | "Year"
  }
  
export function QueryBar(form: UseFormReturnType<QueryProps>) {
    // const theme = useMantineTheme();
    const skillsTags = useSkills();
    const [showSearchButton, setShowSearchButton] = useState(false);

    useEffect(() => {
        console.log(showSearchButton)
        const { search, tags } = form.values;
        if (search.trim().length > 0 || tags.length > 0) {
            setShowSearchButton(true);
        } else {
            setShowSearchButton(false);
        }
    }, [form])


    return (
        <Group position="center" spacing="xl" >
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
                data={skillsTags}
                label="Tag Filters"
                nothingFound="Nothing found"
                placeholder="Search projects by tags"
                clearButtonProps={{ 'aria-label': 'Clear selection' }}
                {...form.getInputProps("tags")} />
            {/* <Select
                label="Time Range"
                placeholder="Search projects this..."
                data={["Day", "Week", "Month", "Year"]}
                {...form.getInputProps("timeRange")} /> */}
        </Group>
    );
}