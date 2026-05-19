import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { defaultTheme } from '../../styles/defaultTheme';
import { ActionButton } from './ActionButton';

const renderWithTheme = (onClick: () => void, icon = <EditIcon />) =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <ActionButton onClick={onClick}>{icon}</ActionButton>
    </ThemeProvider>
  );

describe('ActionButton', () => {
  it('renders a button', () => {
    renderWithTheme(vi.fn());
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(handleClick);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick before interaction', () => {
    const handleClick = vi.fn();
    renderWithTheme(handleClick);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with different icon children', () => {
    renderWithTheme(vi.fn(), <DeleteIcon data-testid="delete-icon" />);
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
  });
});
