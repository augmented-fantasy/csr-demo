/* "use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient();

export default function App() {
  const [todos, setTodos] = useState([]);

  function listTodos() {
    client.models.User.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Usercreate({
      content: window.prompt("Enter new user name"),
    });
  }

  return (
    <main>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </main>
  );
} */


"use client"

import { Amplify } from 'aws-amplify';
import { generateClient } from "aws-amplify/data"; // Data client for CRUDL requests
import outputs from '@/amplify_outputs.json';
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient()

import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  function listUsers() {
    client.models.User.observeQuery().subscribe({
      next: (data) => setUsers([...data.items]),
    });
  }

  useEffect(() => {
    listUsers();
  }, []);

  function createUser() {
    client.models.User.create({
      name: window.prompt("Enter new user name"),
    });
  }


  return (
    <main>
      <button onClick={createUser}>+ new</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} {user.email}</li>
        ))}
      </ul>
    </main>
  );
}
