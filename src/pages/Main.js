import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import api from "../services/api";
import { UserCard, MatchPopup } from "./components";
import { Link } from "react-router-dom";

import "./Main.css";

import logo from "../assets/logo.svg";

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchUser, setMatchUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io("http://localhost:8080", {
      query: {
        user: match.params.id
      }
    });

    socket.on("match", dev => {
      setMatchUser(dev);
    });
  }, [match.params.id]);

  async function loadUsers() {
    const response = await api.get("/devs", {
      headers: {
        userid: match.params.id
      }
    });
    setUsers(response.data);
  }

  async function handleLike(userId) {
    await api.post(`/devs/${userId}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });

    removerUsuario(userId);
  }

  async function handleDislike(userId) {
    await api.post(`/devs/${userId}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    });

    removerUsuario(userId);
  }

  function removerUsuario(userId) {
    setUsers(users.filter(user => user._id !== userId));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>

      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <UserCard
              key={user._id}
              user={user}
              handleLike={handleLike}
              handleDislike={handleDislike}
            />
          ))}
        </ul>
      ) : (
        <div className="no-users">
          Não há mais usuários para essas configurações de localidade
        </div>
      )}

      {matchUser && (
        <MatchPopup user={matchUser} onClose={() => setMatchUser(null)} />
      )}
    </div>
  );
}
