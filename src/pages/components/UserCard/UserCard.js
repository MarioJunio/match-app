import React from "react";

import "./UserCard.css";

import like from "../../../assets/like.svg";
import dislike from "../../../assets/dislike.svg";

export default function UserCard({ user, handleLike, handleDislike }) {
  return (
    <li>
      <img src={user.avatar} alt={user.name} />
      <footer>
        <p>{user.name}</p>
        <p>{user.bio}</p>
      </footer>
      <div className="buttons">
        <button type="button" onClick={() => handleDislike(user._id)}>
          <img src={dislike} alt="Não gostei" />
        </button>

        <button type="button" onClick={() => handleLike(user._id)}>
          <img src={like} alt="Gostei" />
        </button>
      </div>
    </li>
  );
}
