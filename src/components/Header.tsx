import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: white;
    color: #252525;
    padding: 0 20% 0 20%;
    font-size: 2rem;
    font-weight: bold;
`

const Header = () => {
    return (
        <HeaderContainer>
            <div>
                Who is PRESSO?
            </div>
        </HeaderContainer>
    )
}

export default Header;
