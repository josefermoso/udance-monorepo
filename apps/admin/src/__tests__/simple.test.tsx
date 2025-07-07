import { render } from '@testing-library/react';

function TestComponent() {
  return <p>Admin test component</p>;
}

describe('Admin sample test', () => {
  it('renders content', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Admin test component')).toBeTruthy();
  });
});
