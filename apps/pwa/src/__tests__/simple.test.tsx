import { render } from '@testing-library/react';

function PwaTest() {
  return <p>PWA test component</p>;
}

describe('PWA sample test', () => {
  it('renders content', () => {
    const { getByText } = render(<PwaTest />);
    expect(getByText('PWA test component')).toBeTruthy();
  });
});
