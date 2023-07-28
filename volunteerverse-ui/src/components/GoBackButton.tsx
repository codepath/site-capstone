import { Button, Text } from "@mantine/core";
import { useNavigate} from "react-router-dom";

export default function GoBackButton(props : any) {
    
    let navigate = useNavigate();
    return (
        <Button leftIcon={<Text component="span" className="material-symbols-outlined">arrow_back</Text>}
        {...props} onClick={() => navigate(-1)}>Go Back</Button> 
    );
};