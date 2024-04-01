import "./App.css";
import ExpenseTrackerMain from "./components/ExpenseTrackerMain/ExpenseTrackerMain";
import TransactionList from "./components/Transactions/TransactionTable.js";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm.js";
import AddBalanceWindow from "./components/AddBalance/AddBalanceWindow.js";
import TopExpenses from "./components/TopExpenses/TopExpenses.js";

function App() {
  return (
    <div className="App">
      <ExpenseTrackerMain
        header={"Expense Tracker"}
        bgColorClass="card-bg-dark"
      />
      <div className="flex align-Item-stretch alignItemCentre">
        <TransactionList />
        <TopExpenses />
      </div>
      <ExpenseForm />
      <AddBalanceWindow />
    </div>
  );
}

export default App;
