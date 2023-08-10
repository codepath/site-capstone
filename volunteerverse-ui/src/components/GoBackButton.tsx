import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function GoBackButton(props : any) {
    
    let navigate = useNavigate();
    return (
        <div style={{textAlign : "left", paddingLeft: "5vw"}}>
            
            <Button 
            variant="light" 
            styles={{root : { border: 0, transition:  "all 200ms ease-in-out", "&:hover" : {cursor : "pointer"}}}}
            leftIcon={<IconArrowLeft />}
            {...props} 
            ml={"auto"}
            mr={0}
            radius={"lg"}
            onClick={() => navigate(-1)}></Button> 
        </div>
    );
};