
import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Wrapper = styled.div`
    background-color: ${({ theme}) => theme.colors.gray["100"]};
    padding: 16px;
`

const UnauthenticatedDrawerContent = () => {
    
    const [mode, setMode] = useState<"LOG" | "REG">("LOG")


    return (
        <Wrapper>
           {mode === "LOG" && <LoginForm setMode={setMode}/>}
           {mode === "REG" && <RegisterForm setMode={setMode}/>}
        </Wrapper>
    )
}

export default UnauthenticatedDrawerContent;