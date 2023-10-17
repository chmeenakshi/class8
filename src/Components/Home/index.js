import React, { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import TeamCard from "../TeamCard";
import "./index.css";

const teamsApiUrl = "https://apis.ccbp.in/ipl";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    try {
      const response = await fetch(teamsApiUrl);
      const fetchedData = await response.json();
      const formattedData = fetchedData.teams.map((eachTeam) => ({
        name: eachTeam.name,
        id: eachTeam.id,
        teamImageURL: eachTeam.team_image_url,
      }));
      setTeams(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  console.log(getTeams);

  useEffect(() => {
    getTeams();
  }, []);

  const renderTeamsList = () => (
    <ul className="team-list">
      {teams.map((team) => (
        <TeamCard teamData={team} key={team.id} />
      ))}
    </ul>
  );

  const renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Triangle color="#ffffff" height={50} />
    </div>
  );

  return (
    <div className="home-route-container">
      <div className="team-list-container">
        <div className="ipl-dashboard-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl-logo"
            className="ipl-logo"
          />
          <h1 className="ipl-dashboard-heading">Ipl Dashboard</h1>
        </div>
        {isLoading ? renderLoader() : renderTeamsList()}
      </div>
    </div>
  );
};

export default Home;
