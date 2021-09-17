(() => {

    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;
    let enterNewScene = false;

    const sceneInfo = [
        {
            type : 'sticky',
            heightNum : 5,
            scrollHeight : 0,
            objs : {
                container : document.querySelector('.section-text'),

                sticky1 : document.querySelectorAll('.section-text__sticky')[0],
                sticky2 : document.querySelectorAll('.section-text__sticky')[1],
                sticky3 : document.querySelectorAll('.section-text__sticky')[2],
                sticky4 : document.querySelectorAll('.section-text__sticky')[3],
            },
            values : {
                opacity1_in : [0, 1, {start: 0.1, end: 0.2}],
                opacity2_in: [0, 1, { start: 0.3, end: 0.4 }],
                opacity3_in: [0, 1, { start: 0.5, end: 0.6 }],
                opacity4_in: [0, 1, { start: 0.7, end: 0.8 }],

                translateY1_in : [20, 0, {start: 0.1, end: 0.2}],
                translateY2_in: [20, 0, { start: 0.3, end: 0.4 }],
                translateY3_in: [20, 0, { start: 0.5, end: 0.6 }],
                translateY4_in: [20, 0, { start: 0.7, end: 0.8 }],
                
                opacity1_out : [1, 0, {start: 0.25, end: 0.3}],
                opacity2_out: [1, 0, { start: 0.45, end: 0.5 }],
                opacity3_out: [1, 0, { start: 0.65, end: 0.7 }],
                opacity4_out: [1, 0, { start: 0.85, end: 0.9 }],

                translateY1_out : [0, -20, {start: 0.25, end: 0.3}],
                translateY2_out: [0, -20, { start: 0.45, end: 0.5 }],
                translateY3_out: [0, -20, { start: 0.65, end: 0.7 }],
                translateY4_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {
            type : 'normal',
            // heightNum : 5,
            scrollHeight : 0,
            objs : {
                container : document.querySelector('.section-expln')
            }
        },
        {
            type : 'sticky',
            heightNum : 5,
            scrollHeight : 0,
            objs : {
                container : document.querySelector('.section-expln'),
                
                sticky1 : document.querySelectorAll('.section-expln__sticky')[0],
                sticky2 : document.querySelectorAll('.section-expln__sticky')[1],
                sticky3 : document.querySelectorAll('.section-expln__sticky')[2],
            },
            values : {
                opacity1_in: [0, 1, { start: 0.15, end: 0.2 }],
                opacity2_in: [0, 1, { start: 0.5, end: 0.55 }],
				opacity3_in: [0, 1, { start: 0.72, end: 0.77 }],

                translateY1_in: [20, 0, { start: 0.15, end: 0.2 }],
                translateY2_in: [30, 0, { start: 0.5, end: 0.55 }],
				translateY3_in: [30, 0, { start: 0.72, end: 0.77 }],
                
                opacity1_out: [1, 0, { start: 0.3, end: 0.35 }],            
                opacity2_out: [1, 0, { start: 0.58, end: 0.63 }],
				opacity3_out: [1, 0, { start: 0.85, end: 0.9 }],

                translateY1_out: [0, -20, { start: 0.3, end: 0.35 }],
                translateY2_out: [0, -20, { start: 0.58, end: 0.63 }],
				translateY3_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        {
            type : 'sticky',
            heightNum : 5,
            scrollHeight : 0,
            objs : {
                container : document.querySelector('.section-expns')
            }
        }
    ];


    function setLayout() {
        for(let i = 0; i < sceneInfo.length; i++){
            if(sceneInfo[i].type === 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if(sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }

            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }

        let totalScrollHeight = 0;

        for(let i = 0; i < sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene + 1}`);
    }

    function calcValues(values, currentYOffset){
        let rv;

        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if(values.length === 3){
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart ) / partScrollHeight * (values[1] - values[0]) + values[0];
            }else if(currentYOffset < partScrollStart){
                rv = values[0];
            }else if(currentYOffset > partScrollEnd) {
                rv = values[1];
            }

        }else {
            rv = scrollRatio * (values[1] - values[0]) + values[0]; 
        }

        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight;
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:
                if (scrollRatio <= 0.22){
                    // in
                    objs.sticky1.style.opacity = calcValues(values.opacity1_in, currentYOffset); 
                    objs.sticky1.style.transform = `translateY(${calcValues(values.translateY1_in, currentYOffset)}%)`;
                }else {
                    // out
                    objs.sticky1.style.opacity = calcValues(values.opacity1_out, currentYOffset);
                    objs.sticky1.style.transform = `translateY(${calcValues(values.translateY1_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.42) {
                    objs.sticky2.style.opacity = calcValues(values.opacity2_in, currentYOffset); 
                    objs.sticky2.style.transform = `translateY(${calcValues(values.translateY2_in, currentYOffset)}%)`;
                }else {
                    objs.sticky2.style.opacity = calcValues(values.opacity1_out, currentYOffset);
                    objs.sticky2.style.transform = `translateY(${calcValues(values.translateY1_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.62) {
                    objs.sticky3.style.opacity = calcValues(values.opacity3_in, currentYOffset); 
                    objs.sticky3.style.transform = `translateY(${calcValues(values.translateY3_in, currentYOffset)}%)`;
                }else {
                    objs.sticky3.style.opacity = calcValues(values.opacity3_out, currentYOffset); 
                    objs.sticky3.style.transform = `translateY(${calcValues(values.translateY3_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.82) {
                    objs.sticky4.style.opacity = calcValues(values.opacity4_in, currentYOffset); 
                    objs.sticky4.style.transform = `translateY(${calcValues(values.translateY4_in, currentYOffset)}%)`;
                }else {
                    objs.sticky4.style.opacity = calcValues(values.opacity4_out, currentYOffset); 
                    objs.sticky4.style.transform = `translateY(${calcValues(values.translateY4_out, currentYOffset)}%)`;
                }

                break;
                
            case 2:
                if (scrollRatio <= 0.25) {    
                    // in
                    objs.sticky1.style.opacity = calcValues(values.opacity1_in, currentYOffset); 
                    objs.sticky1.style.transform = `translateY(${calcValues(values.translateY1_in, currentYOffset)}%)`;
                }else {
                    // out
                    objs.sticky1.style.opacity = calcValues(values.opacity1_out, currentYOffset);
                    objs.sticky1.style.transform = `translateY(${calcValues(values.translateY1_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.57) {
                    objs.sticky2.style.opacity = calcValues(values.opacity2_in, currentYOffset); 
                    objs.sticky2.style.transform = `translateY(${calcValues(values.translateY2_in, currentYOffset)}%)`;
                }else {
                    objs.sticky2.style.opacity = calcValues(values.opacity1_out, currentYOffset);
                    objs.sticky2.style.transform = `translateY(${calcValues(values.translateY1_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.83) {
                    objs.sticky3.style.opacity = calcValues(values.opacity3_in, currentYOffset); 
                    objs.sticky3.style.transform = `translateY(${calcValues(values.translateY3_in, currentYOffset)}%)`;
                }else {
                    objs.sticky3.style.opacity = calcValues(values.opacity3_out, currentYOffset); 
                    objs.sticky3.style.transform = `translateY(${calcValues(values.translateY3_out, currentYOffset)}%)`;
                }

                break;

            case 3:
                // console.log('3');
                break;
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        enterNewScene = false;

        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene ++;
            document.body.setAttribute('id', `show-scene-${currentScene + 1}`);
        }
        if(yOffset < prevScrollHeight){
            enterNewScene = false;
            if(currentScene === 0) return false;
            currentScene --;
            document.body.setAttribute('id', `show-scene-${currentScene + 1}`);
        }

        if(enterNewScene) return;
        
        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;

        scrollLoop();
    });

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
})();