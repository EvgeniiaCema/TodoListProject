import { useEffect, useState } from "react";

import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoItem } from "./components/TodoItems/TodoItems";

import style from "./App.module.scss";

function App() {
	const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("todo")) || []);

	useEffect(() => {
		localStorage.setItem("todo", JSON.stringify(todo));
	}, [todo]);

	return (
		<div className="app">
			<h1 className={style.appHeader}>Todo List</h1>
			<TodoForm todo={todo} setTodo={setTodo} />
			<TodoItem todo={todo} setTodo={setTodo} />
		</div>
	);
}

export default App;
