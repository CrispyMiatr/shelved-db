import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import styles from '~styles/components/ui/carousel.module.scss';

interface CarouselProps {
    title: string;
    children: React.ReactNode;
    headerExtra?: React.ReactNode;
}

export const Carousel = ({ title, children, headerExtra }: CarouselProps) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // check if scrolling is possible to show/hide arrows
    const updateArrows = () => {
        if (scrollContainer.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
            setShowLeftArrow(scrollLeft > 0);
            // uuse -1 to account for sub-pixel rounding errors
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        updateArrows();
        window.addEventListener('resize', updateArrows);
        return () => window.removeEventListener('resize', updateArrows);
    }, [children]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            // scroll by 80% of the visible width for natural feel
            const scrollAmount = scrollContainer.current.clientWidth * 0.8;
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={styles['carousel']}>
            <div className={styles['carousel__header']}>
                <h3>{title}</h3>

                {headerExtra && (
                    <div className={styles['carousel__header__extra']}>
                        <p>{headerExtra}</p>
                    </div>
                )}
            </div>

            <div className={styles['carousel__container']}>
                {showLeftArrow && (
                    <button
                        className={`${styles['nav-btn']} ${styles['left']}`}
                        onClick={() => scroll('left')}
                    >
                        <ChevronLeft size={30} strokeWidth={3} />
                    </button>
                )}

                <div
                    className={styles['carousel__container__viewport']}
                    ref={scrollContainer}
                    onScroll={updateArrows}
                >
                    <div className={styles['carousel-items']}>
                        {children}
                    </div>
                </div>

                {showRightArrow && (
                    <button
                        className={`${styles['nav-btn']} ${styles['right']}`}
                        onClick={() => scroll('right')}
                    >
                        <ChevronRight size={30} strokeWidth={3} />
                    </button>
                )}
            </div>
        </div>
    );
};