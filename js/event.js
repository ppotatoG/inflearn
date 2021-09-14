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
                sticky1 : document.querySelector('.section-text__sticky:nth-child(2)'),
                sticky2 : document.querySelector('.section-text__sticky:nth-child(3)'),
                sticky3 : document.querySelector('.section-text__sticky:nth-child(4)'),
                sticky4 : document.querySelector('.section-text__sticky:nth-child(5)'),
            },
            values : {
                opacity1_in : [0, 1, {start: 0.1, end: 0.2}],
                opacity1_out : [1, 0, {start: 0.3, end: 0.4}],

                opacity2 : [0, 1, {start: 0.25, end: 0.45}]
            }
        },
        {
            type : 'normal',
            heightNum : 5,
            scrollHeight : 0,
            objs : {
                container : document.querySelector('.section-normal')
            }
        },
        {
            type : 'sticky',
            heightNum : 5,
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
                container : document.querySelector('.section-expns')
            }
        }
    ];


    function setLayout() {
        for(let i = 0; i < sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
                const sticky1_in = calcValues(values.opacity1_in, currentYOffset);
                const sticky1_out = calcValues(values.opacity1_out, currentYOffset);
                if(scrollRatio <= 0.22){
                    // in
                    objs.sticky1.style.opacity = sticky1_in; 

                }else {
                    // out
                    objs.sticky1.style.opacity = sticky1_out; 
                }
                break;
            case 1:
                // console.log('1');
                break;
            case 2:
                // console.log('2');
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