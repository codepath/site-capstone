import { createStyles, Card, Avatar, Text, Group, Button, rem,  Image, Title, Stack, Flex, useMantineTheme} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link} from "react-router-dom";
import { FaGithub, FaLinkedin,FaRegEnvelope} from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
  title : {
    fontSize : `calc(${theme.fontSizes.xl} * 1.75)`,
    color: theme.colors.violet[6],
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
    textDecoration: "underline"
},
}));

interface FounderCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  school: string;
  linkdlnLink:string;
  githubLink:string;
  emailLink:string;
  stats: { label: string; value: string }[];
}

function FoundersCard({ image, avatar, name, job, school, stats,linkdlnLink, githubLink, emailLink, major }: FounderCardImageProps) {
  const {classes, theme} = useStyles();
    const items = stats.map((stat) => (
      <div key={stat.label}>
        <Text ta="center" fz="lg" fw={500}>
          {stat.value}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          {stat.label}
           <Text ta="center" fz="lg" fw={500} mt="sm">
          {name}
        </Text>
        </Text>
      </div>
    ));
  
    return (
      
      <Card w={"20rem"} withBorder padding="xl" radius="md" className={classes.card}>
        <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
        <Avatar src={avatar} size={150} radius={100} mx="auto" mt={-30} className={classes.avatar} />
        <Text ta="center" fz="xl" fw={500} mt="sm">
          {name}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
        </Text>
        <Group mt="md" position="center" spacing={30}>
          <a href={linkdlnLink}>
          <FaLinkedin/>
          </a>

          <a href={githubLink}>
          <FaGithub />
          </a>

          <Link to={`mailto:emailLink`}><FaRegEnvelope /></Link>
        </Group>
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {school}
        </Text>
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {major}
        </Text>
        {/* <Button
          fullWidth
          radius="md"
          mt="xl"
          size="md"
          color={theme.colorScheme === 'light' ? undefined : 'dark'}
        >
         University of Texas, Austin
        </Button> */}
        
      </Card>
    );
  }

 function AboutUs() {
   const { classes, theme } = useStyles();
  const founders = [
    {
    
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      avatar: "https://vc.bridgew.edu/hoba/1008/preview.jpg",
      name: "Kelechi Emeruwa",
      job: "Fullstack engineer",
      school: "University of Texas, Austin 25'",
      linkdlnLink: "https://www.linkedin.com/in/kelechi-emeruwa",
      githubLink: "https://github.com/Kelach",
      emailLink: "kelechi@uttexas",
      major: "Computational Engineering",
      stats: [
        {
          value: "34K",
          label: "Followers"
        },
        {
          value: "187",
          label: "Follows"
        },
        {
          value: "1.6K",
          label: "Posts"
        }
      ]
    
  },
    {
    
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      avatar: "https://media.licdn.com/dms/image/D5603AQFZrdFq0i6Rvw/profile-displayphoto-shrink_800_800/0/1690899123842?e=2147483647&v=beta&t=APgfMju3GK-8covSWHcgcpYJ_bNrygzSVCgc8eNIBWY",
      name: "Melyssa Cristino",
      job: "Fullstack engineer",
      school: "Brown University 25'",
      linkdlnLink: "https://www.linkedin.com/in/melyssa-cristino",
      githubLink: "https://github.com/melyssa5",
      emailLink: "melyssa_cristino@brown.edu",
      major: " Computer Science",
      stats: [
        {
          value: "34K",
          label: "Followers"
        },
        {
          value: "187",
          label: "Follows"
        },
        {
          value: "1.6K",
          label: "Posts"
        }
      ]
    
  },
    {
    
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      avatar: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      name: "Iretomiwa Idowu",
      job: "Fullstack engineer",
      school: "Southern Illinois University E 25'",
      linkdlnLink: "https://www.linkedin.com/in/iretomiwa-idowu",
      githubLink: "https://github.com/Tomiwa2",
      emailLink: "iidowu@siue.edu",
      major: " Mechatronics Engineering",
      stats: [
        {
          value: "34K",
          label: "Followers"
        },
        {
          value: "187",
          label: "Follows"
        },
        {
          value: "1.6K",
          label: "Posts"
        }
      ]
    
  },
]
const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
return (
  <>
  <Flex w={'100%'} direction={'column'} >
  <Title className={classes.title}>Meet the Creators</Title>
<Flex gap={isMobile ? "3rem" :  0} justify={'space-around'} align={"center"} direction={ isMobile ? "column" : "row"} >
  {founders.map((founder : FounderCardImageProps) => (
    <FoundersCard {...founder} />
  ))}
  </Flex>
  </Flex>
 
  </>
)
}

export default AboutUs;