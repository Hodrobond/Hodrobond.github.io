import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const GameSidebarSection = () => (
  <Container>
      <h5>This one time I (re)made some games</h5>
      <a target="_blank" href="https://hodrobond.github.io/learning2048/">This one time I made 2048 in React</a><br/>
      <a target="_blank" href="https://hodrobond.github.io/react-tetris/">This other time I made Tetris in React</a>
  </Container>
);

GameSidebarSection.propTypes = {

};

export default GameSidebarSection;
