import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { Counter } from './Counter';

const renderWithStore = (initialCount = 0) => {
  const store = configureStore({
    reducer: { counter: counterReducer },
    preloadedState: { counter: { value: initialCount } },
  });
  render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
  return store;
};

describe('Counter', () => {
  it('displays the initial count of 0', () => {
    renderWithStore(0);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments the count when Increment button is clicked', () => {
    renderWithStore(0);
    fireEvent.click(screen.getByRole('button', { name: /increment value/i }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements the count when Decrement button is clicked', () => {
    renderWithStore(5);
    fireEvent.click(screen.getByRole('button', { name: /decrement value/i }));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('can increment multiple times', () => {
    renderWithStore(0);
    const incrementBtn = screen.getByRole('button', { name: /increment value/i });
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
