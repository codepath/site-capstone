import {
    Badge,
    Container,
    Divider,
    Flex,
    Group,
    Image,
    Paper,
    Text,
    Title,
    createStyles, useMantineTheme
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { fetchPrettyTime } from "../../../utility/utility";

export interface ProjectCardProps {
    imageUrl: string,
    title: string;
    tags: string[];
    id: string;
    createdAt: number;
    orgDescription: string,
    description: string;
    orgName: string, // currently does not exist in backend
    orgUrl: string, // currently does not exist in backend
    requestedVolunteers: number,
    approvedVolunteers: number,
    external : boolean,
    externalLink: string,
    orgLogoUrl: string,
}
const useStyles = createStyles((theme) => ({
    card: {
        zIndex: 0,
        height: 700,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: "2rem",
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,
        [theme.fn.smallerThan("md")]: {
            fontSize: 24
        },
    },
    cardContent: {
        overflow: "hidden",
        textOverflow: "clip",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column-reverse"
        },
    },
    mediaContainer: {
        flexGrow: 6,
    },
    image: {
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        maxWidth: 400,
        [theme.fn.smallerThan("md")]: {
            maxWidth: 250,
            paddingBottom: `calc(${theme.spacing.xl})`,
        },

    },
    descContainer: {
        margin: theme.spacing.xl,
        maxHeight: 400,
        [theme.fn.smallerThan("md")]: {
            maxHeight: 250,
        },
    },
    descTitle: {
        [theme.fn.smallerThan("md")]: {
            fontSize: theme.fontSizes.xl,
        },
    },
    description: {
        height: 300,
        [theme.fn.smallerThan("md")]: {
            height: 150,
        },
    },
    tagGroup: {
        [theme.fn.smallerThan("md")]: {
            marginBottom: theme.spacing.xl
        }
    },
    detailsContainer: {
        flexGrow: 1,
        height: "100%",
        [theme.fn.smallerThan("sm")]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    detailsBody: {
        textOverflow: "clip",
        maxWidth: 500,
    },
    tag: {
        zIndex: 2,
        transform: "scale(0.99)",
        transition: "all 200ms ease-in-out",
        "&:hover": {
            transform: "scale(1)",
            boxShadow: theme.shadows.md
        }
    }
}));
export default function ProjectCard(props: ProjectCardProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

    return (
        <>
            <Paper
                shadow="md"
                p="xl"
                radius="lg"
                className={classes.card}>
                <Flex className={classes.cardContent}>
                    <Flex justify={"space-around"} align={"center"} direction="column" className={classes.detailsContainer}>
                        {props.external && <Badge size={isMobile ? "md" : "lg"} variant="filled" color="orange">External</Badge>}
                        <Container>
                            <Text my={"xs"} align="center" component={Link} to={props.externalLink || `/projects/${props.id}`} className={classes.title}>{props.title}</Text>
                            <Text mb={"xs"}>By:  { props.orgUrl ? <Text to={props.orgUrl} component={Link}>{props.orgName}</Text> :  props.orgName}</Text>
                            <Badge> <Text size={"sm"}>  { props.requestedVolunteers ?  `${props.approvedVolunteers}/${props.requestedVolunteers} approved` : `${props.approvedVolunteers} approved` }</Text></Badge>
                        </Container>
                        <Flex className={classes.detailsBody} direction={"column"}>
                            <Title p={"xs"} className={classes.descTitle} align="start" weight={600} order={3}>Project Description:</Title>
                            <Divider />
                            <Container p={0} className={classes.description}>
                                <Text p={"xs"} align="start">{props.description}</Text>
                            </Container>

                        </Flex>
                    </Flex>
                    <Flex direction={"column"} align={"center"} justify={"center"} className={classes.mediaContainer}>
                        <Image fit="cover" width={isMobile ? 200 : isTablet ? 250 : 400} height={isMobile ? 200 : isTablet ? 250 : 400} withPlaceholder radius={"xl"} 
                        src={props.imageUrl || props.orgLogoUrl} className={classes.image} />
                        <Group className={classes.tagGroup}>
                            <Text color="dimmed" fw={"bolder"}>Tags: </Text>
                            {props.tags.map((tag: string) => {
                                return <Badge key={tag} size={isMobile ? "lg" : "xl"} variant="light" className={classes.tag} component={Text}>{tag}</Badge>
                            })}
                        </Group>
                    </Flex>
                </Flex>
                {/* Use a library to get time ago data */}
                <Text align="center" color="dimmed" size={"sm"}>Posted: {props.createdAt ? fetchPrettyTime(props.createdAt) : "N/A"}</Text>
            </Paper>
        </>
    );
}