console.log('Start!')

class MainMenu {
    constructor(triggerSelector, containeerSelector){
        this.trigger = document.querySelector(triggerSelector)
        this.container = document.querySelector(containeerSelector)
        this.init()
    }
    init(){
        this.trigger.addEventListener('click', (e) => {            
            this.container.classList.toggle('menuOpened')
        })
    }
}
new MainMenu('.menuTriggier', '.menuContainer')