import { Title } from "@mantine/core";

export default function NoneFound({title = "Nothing to see here...", ...props} : {title? : string}) {
    return (
      <Title {...props}>
        {title}
      </Title>
    )
  }