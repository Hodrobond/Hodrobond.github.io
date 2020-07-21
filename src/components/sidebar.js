import React from 'react';
import Sidebar from '@hodrobond/ui-sidebar';
import styled from 'styled-components';
import GameSidebarSection from './gameSidebarSection';

const SidebarContainer = styled.div`
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 0;
`;

const StyledSidebar = ({ children }) => {
  return (
    <SidebarContainer>
      <Sidebar>
        <GameSidebarSection/>
        {children}
      </Sidebar>
    </SidebarContainer>
  );

};

export default StyledSidebar;
