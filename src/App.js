import "./App.css";
import ExpenseTrackerMain from "./components/ExpenseTrackerMain/ExpenseTrackerMain";

function App() {
  return (
    <div className="App">
      <ExpenseTrackerMain
        header={"Expense Tracker"}
        bgColorClass="card-bg-dark"
      />
    </div>
  );
}

export default App;
