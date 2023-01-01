tsParticles.load('tsparticles',{
    background: {
        color: 'transparent',
    },
    particles: {
        links: {
            enable: false,
            opacity: 0.7,
            distance: 200
        },
        move: {
            enable: true,
            speed: {
                min: 1,
                max: 4,
            },
        },
        opacity: {
            value: {
                min:0.5,
                max: 1,
            },
        },
        size: {
            value: {
                min: 1,
                max: 5,
            },
        },
    },
});