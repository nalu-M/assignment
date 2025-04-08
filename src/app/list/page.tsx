'use client';

import { useEffect, useState } from "react";

type User = {
  username: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/getUsers")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}