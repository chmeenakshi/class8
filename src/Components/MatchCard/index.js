import React from 'react';
import './index.css';

const MatchCard = (props) => {
  const getMatchStatusClassName = (matchStatus) => {
    return matchStatus === 'Won' ? 'match-won' : 'match-lost';
  };

  const { competingTeamLogo, competingTeam, matchStatus, result } = props.matchData;
  const matchStatusClassName = `match-status ${getMatchStatusClassName(matchStatus)}`;

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        className="competing-team-logo"
        alt={`competing-team ${competingTeam}`}
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  );
};

export default MatchCard;
