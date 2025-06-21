console.log('Start!')

class MainMenu{
    constructor(triggerSelector, containerSelector){
        this.trigger = document.querySelector(triggerSelector)
        this.container = document.querySelector(containerSelector)
        this.init()
    }
    init(){
        this.trigger.addEventListener('click', () => {
            this.container.classList.toggle('menuOpened')
        })
        
    }
}

new MainMenu('.menuTriggier','.menuContainer')