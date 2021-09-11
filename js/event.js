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

    }


    function scrollLoop() {
        prevScrollHeight = 0;
        console.log(currentScene);

        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene ++;
        }
        if(yOffset < prevScrollHeight){
            if(currentScene === 0) return false;
            currentScene --;
        }

        console.log(currentScene);
    } 

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;

        scrollLoop()
    });

    setLayout();
})();