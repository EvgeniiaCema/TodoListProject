import { useState } from "react";

import style from "./TodoForm.module.scss";

export const TodoForm = ({ todo, setTodo }) => {
	const [value, setValue] = useState("");

	const handlerInput = (event) => {
		setValue(event.target.value);
	};

	const handlerSubmit = (event) => {
		event.preventDefault();
		setValue("");
	};

	const addTodo = () => {
		if (value.trim() === "") {
			return;
		}
		const newTodo = [...todo, { id: Date.now(), title: value, status: false }];
		setTodo(newTodo);
	};

	return (
		<form className={style.form} onSubmit={handlerSubmit}>
			<input className={style.formInput} type="text" placeholder="Enter a new task" value={value} onChange={handlerInput} />
			<button className={style.formButton} onClick={addTodo}>
				Add task
			</button>
		</form>
	);
};
