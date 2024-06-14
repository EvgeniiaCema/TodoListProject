import { useEffect, useState } from "react";
import style from "./TodoItems.module.scss";

export const TodoItem = ({ todo, setTodo }) => {
	const [value, setValue] = useState("");
	const [edit, setEdit] = useState(null);
	const [filterTodo, setFilterTodo] = useState([]);

	useEffect(() => {
		setFilterTodo(todo);
	}, [todo]);

	const todoFilter = (status) => {
		if (status === "All") {
			setFilterTodo(todo);
		} else {
			const newTodo = todo.filter((item) => item.status === status);
			setFilterTodo(newTodo);
		}
	};

	const handlerInput = (event) => {
		setValue(event.target.value);
	};

	const todoEdit = (id, title) => {
		setEdit(id);
		setValue(title);
	};

	const saveEdit = (id) => {
		const newTodo = todo.map((item) => {
			if (item.id === id) {
				item.title = value;
			}
			return item;
		});
		setTodo(newTodo);
		setEdit(null);
	};

	const todoDone = (id) => {
		const newTodo = todo.filter((item) => {
			if (item.id === id) {
				item.status = !item.status;
			}
			return item;
		});
		setTodo(newTodo);
	};

	const todoDelete = (id) => {
		const newTodo = todo.filter((item) => item.id !== id);
		setTodo(newTodo);
	};

	return (
		<div className={style.tasks}>
			<div className={style.tasksButtonFilter}>
				<button className={style.tasksButtonFilterAll} onClick={() => todoFilter("All")}>
					All
				</button>
				<button className={style.tasksButtonFilterDone} onClick={() => todoFilter(true)}>
					Done
				</button>
				<button className={style.tasksButtonFilterNotDone} onClick={() => todoFilter(false)}>
					Not Done
				</button>
			</div>
			{filterTodo.map((item) => (
				<div className={style.tasksItem} key={item.id}>
					{edit === item.id ? (
						<div className={style.tasksItemForm}>
							<input className={style.tasksItemFormInput} type="text" value={value} onChange={handlerInput} />{" "}
							<button className={style.tasksItemFormButtonSave} onClick={() => saveEdit(item.id)}>
								Save
							</button>
						</div>
					) : (
						<div className={style.tasksItemTodo}>
							<div className={item.status ? style.tasksItemTodoDoneTitle : style.tasksItemTodoTitle}>{item.title}</div>
							<div className={style.tasksItemTodoButtonFunc}>
								<button className={style.tasksItemTodoButtonFuncDone} onClick={() => todoDone(item.id)}>
									Done
								</button>
								<button className={style.tasksItemTodoButtonFuncEdit} onClick={() => todoEdit(item.id, item.title)}>
									Edit
								</button>
								<button className={style.tasksItemTodoButtonFuncDelete} onClick={() => todoDelete(item.id)}>
									Delete
								</button>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
