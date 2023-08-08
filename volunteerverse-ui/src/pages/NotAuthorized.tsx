
export default NotAuthorized

import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(120),
    boxShadow: theme.shadows.xl
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors.violet[9],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors.violet[8]
  },
}));

export function NotAuthorized() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>401</div>
        <Title className={classes.title}>Unauthorized</Title>
        <Text size="lg" align="center" className={classes.description}>
          You do not have permission to access resources from this page.
        </Text>
        <Text fz={"xl"} mb={"xl"}>(▰︶︹︺▰)</Text>
        <Group position="center">
          <Button component='a' href='/' variant='outline' radius={"lg"} size="md">
            Return Home
          </Button>
        </Group>
      </Container>
    </div>
  );
}