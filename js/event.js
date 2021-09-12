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
                container : document.querySelector('.section-text')
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


    function scrollLoop() {
        prevScrollHeight = 0;
        console.log(currentScene);

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
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;

        scrollLoop()
    });

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
})();