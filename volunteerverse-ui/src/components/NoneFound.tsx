import { Title, createStyles, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles(() => ({
  root:{
    height: "100vh",
  }
}))
export default function NoneFound({title = "Nothing to see here...", ...props} : {title? : string}) {
  const {classes} = useStyles();  
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
      <div className={classes.root}>
      <Title my={"auto"} fz={ isMobile ? 30 : 40} {...props}>
        {title}
      </Title>
      </div>
    )
  }