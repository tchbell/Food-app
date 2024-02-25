import { useContext } from 'react';
import { FoodContext, DiningStyle } from '../context/FoodContextProvider';

function Dining() {
  const foodContext = useContext(FoodContext);
  if (!foodContext) {
    return <div>Loading...</div>; // or some other fallback UI
  }
  return (
    <div className="dropdown dining">
      <label htmlFor="dining-type">Dining Type</label>
      <select
        value={foodContext.selectedDiningStyle}
        onChange={foodContext.changeDiningStyle}
        id="dining-type"
      >
        {Object.values(DiningStyle).map((style, index) => (
          <option key={index} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Dining;
