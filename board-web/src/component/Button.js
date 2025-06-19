import styled from "@emotion/styled/macro"

const ButtonStyled = styled.button`
    background-color: #1976d2;
    color: white;
    padding: 10px 16px;
    border-radius: 12px;
    border-color : #1976d2;
`;

const ButtonComponent = ({onClick, disable, title,children,type}) => {
    return(
        <ButtonStyled
            type={type}
            onClick={onClick}
            disabled={disable}
            title={title}
        >
            {children}
        </ButtonStyled>
    )
}


export default ButtonComponent;