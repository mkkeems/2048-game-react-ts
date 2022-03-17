import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background: #bbada0;
  padding: 10px 25px;
  font-size: 25px;
  font-weight: bold;
  border-radius: 3px;
  color: white;
  text-align: center;
  margin-bottom: 8px;

  span {
    text-transform: uppercase;
    font-size: 13px;
    line-height: 13px;
    text-align: center;
    color: #eee4da;
  }
`;

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard = ({ score }: ScoreBoardProps) => {
  return (
    <Wrap>
      <span>SCORE</span>
      {score}
    </Wrap>
  );
};

export default ScoreBoard;
