export default function GetTask({ tasks }) {
  return (
    <ul>
      {tasks.map((task, idx) => (
        <li key={idx}>{task}</li>
      ))}
    </ul>
  );
}
