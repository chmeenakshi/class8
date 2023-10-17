import React, { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import LatestMatch from "../LatestMatch";
import MatchCard from "../MatchCard";
import { useParams } from "react-router-dom";
import "./index.css";

const teamMatchesApiUrl = "https://apis.ccbp.in/ipl/";

const TeamMatches = () => {
  const params = useParams();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [recentMatchesData, setRecentMatchesData] = useState({});

  const getRouteClassName = () => {
    switch (id) {
      case "RCB":
        return "rcb";
      case "KKR":
        return "kkr";
      case "KXP":
        return "kxp";
      case "CSK":
        return "csk";
      case "RR":
        return "rr";
      case "MI":
        return "mi";
      case "SH":
        return "srh";
      case "DC":
        return "dc";
      default:
        return "";
    }
  };

  const setRecentMatches = (formattedData, isLoading) => {
    setRecentMatchesData(formattedData);
    setIsLoading(isLoading);
  };

  const getRecentMatches = async () => {
    try {
      const response = await fetch(`${teamMatchesApiUrl}${id}`);
      const fetchedData = await response.json();
      const formattedData = {
        teamBannerURL: fetchedData.team_banner_url,
        latestMatch: {
          umpires: fetchedData.latest_match_details.umpires,
          result: fetchedData.latest_match_details.result,
          manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
          id: fetchedData.latest_match_details.id,
          date: fetchedData.latest_match_details.date,
          venue: fetchedData.latest_match_details.venue,
          competingTeam: fetchedData.latest_match_details.competing_team,
          competingTeamLogo:
            fetchedData.latest_match_details.competing_team_logo,
          firstInnings: fetchedData.latest_match_details.first_innings,
          secondInnings: fetchedData.latest_match_details.second_innings,
          matchStatus: fetchedData.latest_match_details.match_status,
        },
        recentMatches: fetchedData.recent_matches.map((recentMatch) => ({
          umpires: recentMatch.umpires,
          result: recentMatch.result,
          manOfTheMatch: recentMatch.man_of_the_match,
          id: recentMatch.id,
          date: recentMatch.date,
          venue: recentMatch.venue,
          competingTeam: recentMatch.competing_team,
          competingTeamLogo: recentMatch.competing_team_logo,
          firstInnings: recentMatch.first_innings,
          secondInnings: recentMatch.second_innings,
          matchStatus: recentMatch.match_status,
        })),
      };
      setRecentMatches(formattedData, false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecentMatches();
  }, []);

  const renderRecentMatchesList = () => {
    const { recentMatches } = recentMatchesData;

    return (
      <ul className="recent-matches-list">
        {recentMatches.map((recentMatch) => (
          <MatchCard matchData={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    );
  };

  const renderTeamMatches = () => {
    const { teamBannerURL, latestMatch } = recentMatchesData;

    return (
      <div className="team-matches-container">
        <img src={teamBannerURL} alt={id} className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {renderRecentMatchesList()}
      </div>
    );
  };

  const className = `team-matches-route-container ${getRouteClassName()}`;

  return (
    <div className={className}>
      {isLoading ? (
        <div testid="loader" className="loader-container">
          <BallTriangle type="Oval" color="#ffffff" height={50} />
        </div>
      ) : (
        renderTeamMatches()
      )}
    </div>
  );
};

export default TeamMatches;
