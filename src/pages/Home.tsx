import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { increment, decrement } from "../store/slices/testSlice";

function Home() {
  const name = useSelector((state: RootState) => state.test.name);
  const count = useSelector((state: RootState) => state.test.count);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Hello, {name}</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>+</button>

      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default Home;