import { useContext } from 'react';
import { FoodContext, CuisineType } from '../context/FoodContextProvider';
function Cuisine() {
  const foodContext = useContext(FoodContext);
  if (!foodContext) {
    return <div>Loading...</div>; // or some other fallback UI
  }
  return (
    <div className="dropdown dining">
      <label htmlFor="cuisine-type">Cuisine Type</label>
      <select
        value={foodContext.selectedCuisineType}
        onChange={foodContext.changeCuisineType}
        id="cuisine-type"
      >
        {Object.values(CuisineType).map((cuisine, index) => (
          <option key={index} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Cuisine;
