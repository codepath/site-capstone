import { Button } from "@mantine/core";
import { useNavigate} from "react-router-dom";

export default function GoBackButton(props : any) {
    let navigate = useNavigate();
    return (
        <Button {...props} onClick={() => navigate(-1)}>Go Back</Button> 
    );
};