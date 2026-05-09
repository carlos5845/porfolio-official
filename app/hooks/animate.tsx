// hooks/useAnimatedValue.ts
import {useEffect, useRef, useState} from 'react';
import {animate, AnimationParams} from 'animejs';

interface UseAnimatedValueOptions {
    from?: number;
    to: number;
    duration?: number;
    easing?: string;
    round?: number;
    onComplete?: () => void;
}

const useAnimatedValue = ({
                              from = 0,
                              to,
                              duration = 1000,
                              easing = 'linear',
                              round = 1,
                              onComplete,
                          }: UseAnimatedValueOptions) => {
    const [animatedValue, setAnimatedValue] = useState(from);
    const animationRef = useRef<any>(null);

    useEffect(() => {
        const animatable = {value: from};

        animationRef.current = animate(animatable, {
            value: to,
            duration,
            easing,
            round,
            update: () => {
                setAnimatedValue(animatable.value);
            },
            complete: () => {
                onComplete?.();
            },
        } as AnimationParams);

        return () => {
            animationRef.current?.revert();
        };
    }, [from, to, duration, easing, round, onComplete]);

    return animatedValue;
};

export default useAnimatedValue;

