import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef,useState } from "react";
const MealItemForm = (props) => {

  const [amountIsValid, setAmountIsValid] = useState(true);  
  const amountInputref = useRef();

  const submitHandler = (event) => {

    event.preventDefault();
    console.log('hiii ')
    const enteredAmount = amountInputref.current.value;
    const enteredAmountNumber = +enteredAmount;
    if(enteredAmount.trim().length=== 0 || enteredAmountNumber < 1 || enteredAmountNumber >  5){
        setAmountIsValid(false);
        return;
    }

    props.onAddtoCart(enteredAmountNumber);

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputref}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit"> + Add </button>
      {!amountIsValid && <p> Please enter a valid number between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
