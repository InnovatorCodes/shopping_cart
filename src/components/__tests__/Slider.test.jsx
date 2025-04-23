import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNavigate } from 'react-router-dom';
import Slider from '../Slider'; // Adjust the import path as needed

// Mock react-router-dom's useNavigate
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

// Mock the image imports to be just strings (file paths)
vi.mock('../assets/phones.webp', () => 'phones.webp');
vi.mock('../assets/smartwatches.png', () => 'smartwatches.png');
vi.mock('../assets/audio.png', () => 'audio.png');
vi.mock('../assets/slideRight.svg', () => 'slideRight.svg');
vi.mock('../assets/slideLeft.svg', () => 'slideLeft.svg');

describe('Slider', () => {
  const setFilterMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    setFilterMock.mockClear();
    navigateMock.mockClear();
    useNavigate.mockImplementation(() => navigateMock);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the component and displays the first slide initially', () => {
    render(<Slider setFilter={setFilterMock} />);
  
    expect(screen.getByRole('heading', { name: /Best Deals/i })).toBeInTheDocument();
  
    const firstSlideTitle = screen.getByText(/Best Offers on Smartphones/i);
    expect(firstSlideTitle).toBeVisible();
  
    const firstSlideContainer = firstSlideTitle.closest('.slide');
    const firstSlideImage = within(firstSlideContainer).getByAltText(/offer image/i);
    expect(firstSlideImage).toBeInTheDocument();
  
    const sliderElement = screen.getByTestId('slider-container');
    expect(sliderElement.style.transform).toMatch(/^translateX\(-?0%\)$/);
  });
  
  it('moves to the next slide when the right button is clicked and wraps around', () => {
    render(<Slider setFilter={setFilterMock} />);

    const sliderElement = screen.getByTestId('slider-container');
    const rightButton = screen.getByRole('button', { name: /next slide/i });

    expect(sliderElement.style.transform).toMatch(/^translateX\(-?0%\)$/);

    fireEvent.click(rightButton);
    expect(sliderElement).toHaveStyle('transform: translateX(-100%)');

    fireEvent.click(rightButton);
    expect(sliderElement).toHaveStyle('transform: translateX(-200%)');

    fireEvent.click(rightButton);
    expect(sliderElement.style.transform).toMatch(/^translateX\(-?0%\)$/);
  });

  it('moves to the previous slide when the left button is clicked and wraps around', () => {
    render(<Slider setFilter={setFilterMock} />);

    const sliderElement = screen.getByTestId('slider-container');
    const leftButton = screen.getByRole('button', { name: /previous slide/i });

    expect(sliderElement.style.transform).toMatch(/^translateX\(-?0%\)$/);

    fireEvent.click(leftButton);
    expect(sliderElement).toHaveStyle('transform: translateX(-200%)');

    fireEvent.click(leftButton);
    expect(sliderElement).toHaveStyle('transform: translateX(-100%)');

    fireEvent.click(leftButton);
    expect(sliderElement.style.transform).toMatch(/^translateX\(-?0%\)$/);
  });

  it('calls setFilter and navigate when the image container of the first slide is clicked', () => {
    render(<Slider setFilter={setFilterMock} />);

    const firstSlideTitle = screen.getByText(/Best Offers on Smartphones/i);
    const firstSlideContainer = firstSlideTitle.closest('.slide');
    const firstSlideImage = within(firstSlideContainer).getByAltText(/offer image/i);
    const firstSlideImageContainer = firstSlideImage.closest('.image-container');

    fireEvent.click(firstSlideImageContainer);

    expect(setFilterMock).toHaveBeenCalledTimes(1);
    expect(setFilterMock).toHaveBeenCalledWith('ST');
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/shop');
  });

  it('calls setFilter and navigate when the "Explore" button of the first slide is clicked', () => {
    render(<Slider setFilter={setFilterMock} />);

    const firstSlideTitle = screen.getByText(/Best Offers on Smartphones/i);
    const firstSlideContainer = firstSlideTitle.closest('.slide');
    const firstSlideExploreButton = within(firstSlideContainer).getByRole('button', { name: /explore/i });

    fireEvent.click(firstSlideExploreButton);

    expect(setFilterMock).toHaveBeenCalledTimes(1);
    expect(setFilterMock).toHaveBeenCalledWith('ST');
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/shop');
  });
});
