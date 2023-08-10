import {
  Box, Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Header,
  Modal,
  ScrollArea,
  Text,
  Title,
  createStyles,
  rem
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../context/AuthenicationContext";
import SignUpModal from "../pages/Landing/SignUpModal";

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.violet[6],
    fontWeight: 500,
    fontSize: theme.fontSizes.lg,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

interface linkProp {
  label: string,
  path: string,
  id?: string, // use this if needed to select specific links
}
export default function Navbar() {
  /**
   * @todo use navigation route to change navbar conditionallty
   */
  const { isAuth, isValidOrg, removeToken} = useContext(AuthenticationContext)
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [showModal, { open: openModal, close: closeModal }] = useDisclosure(false);
  const navigate = useNavigate();
  const urlLocation = useLocation();
  const { classes, theme } = useStyles();

  // Dynamic Nav bar links
  const volunteerLinks = [
    { label: "Explore", path: "/" },
    { label: "My Projects", path: "/projects" },
  ];
  const orgLinks = [
  {label : "Home", path:"/"},
  {label : "Create Project", path:"/projects/create"},
  ];
  const unAuthLinks = [
    { label: "Home", path: "/" },
    { label: "How It Works", path: "/#HowItWorks" },
    { label: "About", path: "/#About" },
  ];

  const mapLinksToElements = (links: linkProp[], withDivider : boolean = false) => {
    return (
      links.map((link) => (
        <>
        <Link 
        key={`${link.path}:${link.label}`} 
        to={link.path}
        color={theme.colorScheme === 'dark' ? 'violet.7' : 'violet.6'}
        className={classes.link}>{link.label}</Link>
        { withDivider && (<Divider key={`${link.path}:+${link.label}`} my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />)}
        </>
      ))
    )
  }
  useEffect(() => {
    // closes drawer anytime users navigate to a new route
    closeDrawer();

  }, [urlLocation])
  return (
    <Box >
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Text component={Link} to={"/"} size={"xl"} fw={600} variant="gradient" gradient={{ from: "violet", to: "violet.2", deg: 45 }}>VolunteerVerse</Text>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            {
              !isAuth ? mapLinksToElements(unAuthLinks) :
                isValidOrg ? mapLinksToElements(orgLinks) :
                mapLinksToElements(volunteerLinks)
                  
            }
          </Group>
          <Group className={classes.hiddenMobile}>
            {
              isAuth ? <Button onClick={()=> {removeToken?.(); navigate("/")}} radius={"lg"} variant="outline">Log Out</Button> :
                <>
                  <Button radius={"lg"} onClick={() => navigate("/login")} variant="default">Log in</Button>
                  <Button radius={"lg"} onClick={openModal}>Sign up</Button>
                </>
            }

          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<Text size={30} weight={700} gradient={{from: "violet", to : "violet.2", deg:45}} variant="gradient">VolunteerVerse</Text>}
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          {
            !isAuth ?
              mapLinksToElements(unAuthLinks, true) :
              isValidOrg ? mapLinksToElements(volunteerLinks, true)
                : mapLinksToElements(orgLinks, true)
          }
          <Group position="center" grow mt={"md"} py="xl" px="md">
          {
              isAuth ? <Button onClick={removeToken} radius={"lg"} variant="outline">Log Out</Button> :
                <>
                  <Button radius={"lg"} onClick={() => navigate("/login")} variant="default">Log in</Button>
                  <Button radius={"lg"} onClick={openModal}>Sign up</Button>
                </>
            }
          </Group>

        </ScrollArea>
      </Drawer>
      <Modal
        styles={{ inner: { paddingLeft: "2rem" } }}
        title={<Title align="center">Select Your Role:</Title>}
        closeButtonProps={{ 'aria-label': 'Close modal' }}
        opened={showModal}
        onClose={closeModal}
        size="auto"
        centered
        zIndex={1000001}>
        <SignUpModal close={closeModal} />
      </Modal>
    </Box>
  );
}