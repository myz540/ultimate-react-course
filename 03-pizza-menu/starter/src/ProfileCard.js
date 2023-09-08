import React from "react";
import "./profile_card.css";

function ProfileCard() {
  return (
    <div className="card">
      <Avatar />
      <Bio />
      <SkillList />
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="avatar.jpeg" alt="avatar"></img>;
}

function Bio() {
  return (
    <div className="data">
      <h1>Mike Zhong</h1>
      <p>This is my bio</p>
    </div>
  );
}

function SkillList() {
  const skills = [
    { name: "git", emoji: "👍", color: "blue" },
    { name: "aws", emoji: "👍", color: "red" },
    { name: "python", emoji: "👍", color: "green" },
  ];

  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill skill={skill} />
      ))}
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.skill.color }}>
      <span>{props.skill.name}</span>
      <span>{props.skill.emoji}</span>
    </div>
  );
}

export default ProfileCard;
