import "./App.css";
import ExpenceTrackerMain from "./components/ExpenceTrackerMain/ExpenceTrackerMain";
import BalanceCard from "./components/BalanceCard/BalanceCard";

function App() {
  return (
    <div className="App">
      <ExpenceTrackerMain
        header={"Expense Tracker"}
        content={<BalanceCard />}
        bgColorClass="card-bg-dark"
      />
    </div>
  );
}

export default App;
