import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-a6b89-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){

        throw new Error('Something went wrong');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);

    };

 
      fetchMeals().then().catch((error=>{
        setIsLoading(false)
        setHttpError(error.message  );
      })
    
      );

    }, []);

  if(isLoading){

    return <section className={classes.mealsloading}>Loading</section>;
  }

  if(httpError){

    return<section className={classes['meals-error']}>
      <p>{httpError}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} id={meal.id} name={meal.name} price={meal.price}  description={meal.description}/>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
