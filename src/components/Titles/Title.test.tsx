import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '../../styles/defaultTheme';
import { Title } from './Title';

const renderWithTheme = (text: string) =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Title text={text} />
    </ThemeProvider>
  );

describe('Title', () => {
  it('renders the text prop', () => {
    renderWithTheme('Hello World');
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as an h2 heading', () => {
    renderWithTheme('Section Title');
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders with different text values', () => {
    renderWithTheme('Categories');
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });
});
