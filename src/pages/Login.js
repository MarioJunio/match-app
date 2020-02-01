import React, { useState } from "react";

import api from "../services/api";

import "./Login.css";

import logo from "../assets/logo.svg";

export default function Login({ history }) {
  const [username, setUsername] = useState("");

  async function entrar(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      user: username
    });

    const { _id } = response.data;

    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={entrar}>
        <img src={logo} alt="TinDev" />
        <input
          type="text"
          placeholder="Digita seu usuário no Git"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
