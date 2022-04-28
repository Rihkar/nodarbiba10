const tasks = [
  {
    title: 'uzd1',
    isDone: false,
  },

];

const ToDoList = () => (
  <div className="inputBox">
    <input
      className="input"
      type="text"
      placeholder="Task"
    />
    <div className="bigText">{tasks}</div>
  </div>

);
export default ToDoList;
