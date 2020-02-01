import React from "react";

import "./MatchPopup.css";

import itsmatch from "../../../assets/itsamatch.png";

export default function MatchPopup({ user, onClose }) {
  return (
    <div className={"match-container " + (!user ? "hidden" : "")}>
      <img src={itsmatch} alt="" />
      <img className="avatar" src={user.avatar} alt="Match" />
      <strong className="name">{user.name}</strong>
      <p className="bio">{user.bio}</p>

      <button className="btn-close-match" type="button" onClick={onClose}>
        Fechar
      </button>
    </div>
  );
}
