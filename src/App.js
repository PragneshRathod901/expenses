import "./App.css";
import ExpenseTrackerMain from "./components/ExpenseTrackerMain/ExpenseTrackerMain";
import TransactionList from "./components/Transactions/TransactionTable.js";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm.js";
import AddBalanceWindow from "./components/AddBalance/AddBalanceWindow.js";

function App() {
  return (
    <div className="App">
      <ExpenseTrackerMain
        header={"Expense Tracker"}
        bgColorClass="card-bg-dark"
      />
      <div className="flex spaceBetween alignItemCentre">
        <TransactionList />
      </div>
      <ExpenseForm />
      <AddBalanceWindow />
    </div>
  );
}

export default App;
