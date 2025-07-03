import { render } from '@testing-library/react';

// Simple component for testing
const TestComponent = () => {
  return (
    <div>
      <h1>Hello CI/CD</h1>
      <p>This is a simple test component</p>
    </div>
  );
};

describe('CI/CD Pipeline Test', () => {
  it('renders without crashing', () => {
    const { container } = render(<TestComponent />);
    expect(container).toBeTruthy();
  });

  it('displays correct text', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Hello CI/CD')).toBeTruthy();
    expect(getByText('This is a simple test component')).toBeTruthy();
  });
});
