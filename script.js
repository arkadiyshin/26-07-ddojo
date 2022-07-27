const container = document.querySelector(".buttons");

const buttonsArray = [
    {
        message: "apple",
        emoji: "🍏"
    },
    {
        message: "pineapple",
        emoji: "🍍"
    },
    {
        message: "kiwi",
        emoji: "🥝"
    },
    {
        message: "avokado",
        emoji: "🥑"
    },
    {
        message: "cherry",
        emoji: "🍒"
    },
    {
        message: "strawberry",
        emoji: "🍓"
    }
];

class Button {
    constructor(message, emoji, order) {

        this.button = document.createElement("button");

        this.message = message;
        this.emoji = emoji;

        this.timerValue = 0;
        this.timerId = undefined;
        this.order = order; 
        const thisObject = this;

        this.button.addEventListener("click", function () {
            thisObject.resetTimer();
        });
    }

    render(container) {

        this.updateButtonTitle(this);
        this.setStyle();
        container.appendChild(this.button);
    }

    setStyle() {

        this.button.style.margin = "10px";
        this.button.style.borderRadius = "0.5em";
        this.button.style.width = "250px";
        this.button.style.height = "50px";
        this.button.style.order = this.order + 1;
        this.button.style.position = "absolute";
        this.button.style.transition = "all 1s ease-in";

        this.button.style.top = this.getYOffset() * (parseInt(this.button.style.order)-1) + 'px';
        
    }

    resetTimer() {

        this.putButtonOnTheTop();

        if (this.timerId !== undefined) {
            clearInterval(this.timerId);
            this.timerValue = 0;
            this.updateButtonTitle(this);
        }

        this.timerId = setInterval(() => {
            this.timerValue++;
            this.updateButtonTitle(this);

        }, 1000);

    }

    updateButtonTitle() {
        this.button.innerText = `eaten ${this.timerValue} ${this.message} ${this.emoji} `;
    }

    putButtonOnTheTop() {
        
        const buttons = container.querySelectorAll("button");
        
        buttons.forEach( (e) => {
            if(parseInt(e.style.order) <= parseInt(this.button.style.order)) {
            e.style.top = parseInt(e.style.top) + this.getYOffset()+ 'px';
            }
        });
        this.button.style.top = 0;

        buttons.forEach( (e) => {
            e.style.order = parseInt(e.style.order)+1;
        });
        this.button.style.order = 1;
    }

    getYOffset() {
        return (parseInt(this.button.style.height) + 2 * parseInt(this.button.style.margin));    
    }

}


buttonsArray.forEach((element, i) => {
    const button = new Button(element.message, element.emoji, i);
    button.render(container);
});


