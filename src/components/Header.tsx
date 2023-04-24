import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    height: 96px;
    background-color: white;
    color: #252525;
    padding: 0 20% 0 20%;
    font-size: 2rem;
    font-weight: lighter;
`

const Header = () => {
    return (
        <HeaderContainer>
            <div>
                프레소
            </div>
        </HeaderContainer>
    )
}

export default Header;
