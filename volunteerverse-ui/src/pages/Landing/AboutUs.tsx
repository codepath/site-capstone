import { createStyles, Card, Avatar, Text, Group, Button, rem,  Image, Title} from '@mantine/core';


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
}));

interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}

 function AboutUs({ image, avatar, name, job, stats }: UserCardImageProps) {
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    
    <>
    
   
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar src={"https://nypost.com/wp-content/uploads/sites/2/2022/06/reddit-cats-judging-looks-00.jpg?resize=1536,1024&quality=75&strip=all"} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        Melyssa Cristino
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {job}
      </Text>
      {/* <Group mt="md" position="center" spacing={30}>
        {items}
      </Group> */}
      <a href='https://www.linkedin.com/in/ojakanbi'>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'light' ? undefined : 'dark'}
        >
     {/* <Image maw={30} mx="auto" radius="md"src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png"} /> */}

        Linkedin 
      </Button>

      </a>
     
    </Card>
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar src={"https://nypost.com/wp-content/uploads/sites/2/2022/06/reddit-cats-judging-looks-00.jpg?resize=1536,1024&quality=75&strip=all"} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        Kelechi Emeruwa
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {job}
      </Text>
      {/* <Group mt="md" position="center" spacing={30}>
        {items}
      </Group> */}
      <a href='https://www.linkedin.com/in/ojakanbi'>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'light' ? undefined : 'dark'}
        

        
      >
                {/* <Image maw={30} mx="auto" radius="md"src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png"} /> */}

        Linkedin 
      </Button>

      </a>
     
    </Card>
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar src={"https://nypost.com/wp-content/uploads/sites/2/2022/06/reddit-cats-judging-looks-00.jpg?resize=1536,1024&quality=75&strip=all"} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        Iretomiwa Idowu
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {job}
      </Text>
      {/* <Group mt="md" position="center" spacing={30}>
        {items}
      </Group> */}
      <a href='https://www.linkedin.com/in/ojakanbi'>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'light' ? undefined : 'dark'}
        

        
      >
                {/* <Image maw={30} mx="auto" radius="md"src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png"} /> */}

        Linkedin 
      </Button>

      </a>
     
    </Card>
   
    </>
  );
}

export default AboutUs;