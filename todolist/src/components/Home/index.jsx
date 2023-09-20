import { useState, useEffect } from "react";
import axios from "axios";
import { FiCircle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import Create from "../Create";

import "./index.css";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:5555/update/${id}`)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5555/delete/${id}`)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="home-bg-container">
      <h1>Todo List</h1>
      <Create />
      {todos.length === 0 ? (
        <h1>No Records Found</h1>
      ) : (
        <ul className="todo-list-container">
          {todos.map((todo) => {
            const icon = todo.done ? (
              <FaCheckCircle className="icon" />
            ) : (
              <FiCircle className="icon" />
            );

            return (
              <li key={todo._id}>
                <div onClick={() => handleEdit(todo._id)}>
                  {icon}
                  <p>{todo.task}</p>
                </div>
                <div>
                  <MdDeleteOutline
                    onClick={() => handleDelete(todo._id)}
                    className="delete-icon"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Home;
