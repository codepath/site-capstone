import { Button, Header, Group, Text, Container, Image, createStyles, Title, Modal } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
import {Anchor,Divider,Center,
  Box,Burger,Drawer,Collapse,
  ScrollArea, rem, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from "react-router-dom";
import SignUpModal from "../pages/Landing/SignUpModal";
import { useEffect } from "react";
import { useAuthenticationUserProp } from "../services/hooks/useAuthentication";
import { fetchCorrectUserOption } from "../utility/utility";
import { useMemo } from "react";

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.primaryShade,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

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
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
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
export default function Navbar({isAuth, user, removeToken} : 
  {user : useAuthenticationUserProp, isAuth: boolean, removeToken: () => void}) {
  /**
   * @todo use navigation route to change navbar conditionallty
   */
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [showModal, {open : openModal, close: closeModal }] = useDisclosure(false);
  const navigate = useNavigate();
  const urlLocation = useLocation();
  const { classes, theme } = useStyles();

  // Dynamic Nav bar links
  const volunteerLinks = [
    {label : "Explore", path:"/"},
    {label : "My Projects", path:"/projects"},
  ];
  // const orgLinks = [
    // {label : "Dashboard", path:"/"},
    // {label : "How It Works", path:"/#"},
    // {label : "About", path:"/#About"},
  // ];
  const unAuthLinks = [
    {label : "Home", path:"/"},
    {label : "How It Works", path:"/#HowItWorks"},
    {label : "About", path:"/#About"},
  ];

  const mapLinksToElements = (links : linkProp[]) => {
    return (
      links.map((link, index) => (
        <Link key={`${link.path}:${link.label}`} to={link.path} className={classes.link}>{link.label}</Link>
      ))
    )
  }
  useEffect(() => {
    // closes drawer anytime users navigate to a new route
    closeDrawer();

  }, [urlLocation])
  const fetchCorrectUserLinks = useMemo(() => {
    // using usememo here is more performant
    return fetchCorrectUserOption(
      mapLinksToElements(unAuthLinks),
      mapLinksToElements(volunteerLinks),
      <></>,
      { isAuth: isAuth, user: user }
    )
  }, [user, isAuth])
  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Image src={Logo} width={50} height={50} fit="contain" />
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            {fetchCorrectUserLinks}
          </Group>
          <Group className={classes.hiddenMobile}>
            {
              isAuth ? <Button onClick={removeToken} radius={"lg"} variant="outline">Log Out</Button> :
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
        title={<Text weight={700} variant="gradient">VolunteerVerse</Text>}
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">

          <Anchor mt={"xl"} href="/" className={classes.link}>
            Home
          </Anchor>
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Anchor href="/#HowItWorks" className={classes.link}>
            How It Works
          </Anchor>
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Anchor href="/#About" className={classes.link}>
            About
          </Anchor>


          <Group position="center" grow mt={"md"} py="xl" px="md">
            <Button variant="outline" radius={"xl"} component={Link} to={"/login"}>Login</Button>
            <Button radius={"xl"} onClick={openModal}>Sign up</Button>
          </Group>
          
        </ScrollArea>
      </Drawer>
      <Modal 
        styles={{ inner: {paddingLeft: "2rem"}}}
        title={<Text  align="center">Select Your Role:</Text>}
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
