import styled from "styled-components";

export const NavigationContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
`;
export const NavItemsContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 0px 40px;
  width: 100%;
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #690cb0;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const NavLinkItems = styled.div`
  display: flex;
`;
export const NavigationLogo = styled.img`
  height: 35px;
`;
export const RightItemsContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const LogoutStyling = styled.a`
  padding-bottom: 0px;
`;
