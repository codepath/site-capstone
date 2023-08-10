import { Button, Flex, Group, Paper, Text, Title, createStyles, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
    backgroundColor: "transparent",
  },
  content : {
    backgroundColor: "transparent",
    padding: "4rem",
    [theme.fn.smallerThan("sm")] : {
      padding : "1rem"
    },
    maxWidth: "100rem"
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[7],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.colors.violet[8],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    fontWeight: 800,
    color:  theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[6],
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));

export default function NotFound() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/")
  }
  return (
      <Flex align={"center"} justify={"center"} className={classes.root}>  
    <Paper shadow='xl' radius={"md"} className={classes.content}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text size="lg" align="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group position="center">
        <Button onClick={goHome} sx={{ "&:hover" : {backgroundColor:  "transparent"}}} variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Paper>
      </Flex>
  );
}