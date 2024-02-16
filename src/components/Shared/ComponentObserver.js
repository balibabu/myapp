import React, { useEffect } from 'react'

export default function ComponentObserver({ sectionRef,setVisible }) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: .5,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);
    return (
        <></>
    )
}
