import React from 'react'

export default function ToDoForm({task, err, handleChange, handleTaskSubmit}) {
    return (
        <form onSubmit={handleTaskSubmit}>
        <formset>
          {err ? err : 'Dodaj nowe zadanie:'}
          <label>
            Tytuł:{" "}
            <input
              type="text"
              name="title"
              value={task.title}
              placeholder="Tytuł zadania"
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Termin:{" "}
            <input
              type="date"
              name="date"
              value={task.date}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Godzina:{" "}
            <input
              type="time"
              name="time"
              value={task.time}
              onChange={handleChange}
            ></input>
          </label>
          <label>Co masz do zrobienia:</label>
          <textarea
            name="description"
            value={task.description}
            rows="4"
            placeholder="Twoje zadanie"
            onChange={handleChange}
          ></textarea>
          <label>
            Priorytet
            <select onChange={handleChange} name="color" value={task.color}>
              <option value="yellow">Normalny</option>
              <option value="lightgreen">Bez spiny</option>
              <option value="orange">ASAP</option>
            </select>
          </label>
          <input type="submit" value="Dodaj zadanie" />
        </formset>
      </form>
    )
}
