(() => {

    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;

    const sceneInfo = [
        {
            type : 'sticky',
            heightNum : 5,
            scrollHeight : 0,
            objs : {
                container : document.querySelector('.section-text'),
                sticky1 : document.querySelector('.section-text__stiky:nth-child(2)'),
                sticky2 : document.querySelector('.section-text__stiky:nth-child(3)'),
                sticky3 : document.querySelector('.section-text__stiky:nth-child(4)'),
                sticky4 : document.querySelector('.section-text__stiky:nth-child(5)'),
            },
            values : {
                opacity : [0, 1]
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
        yOffset = window.pageYOffset;

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
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        rv = scrollRatio * (values[1] - values[0]) + values[0]; 

        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene) {
            case 0:
                let sticky1_in = calcValues(values.opacity, currentYOffset);
                objs.sticky1.style.opacity = sticky1_in; 
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

        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene ++;
            document.body.setAttribute('id', `show-scene-${currentScene + 1}`);
        }
        if(yOffset < prevScrollHeight){
            if(currentScene === 0) return false;
            currentScene --;
            document.body.setAttribute('id', `show-scene-${currentScene + 1}`);
        }

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;

        scrollLoop();
    });

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
})();