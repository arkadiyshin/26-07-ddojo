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

        this.button.style.margin = "0.5em";
        this.button.style.borderRadius = "0.5em";
        this.button.style.width = "15em";
        this.button.style.height = "3em";
        this.button.style.order = this.order + 1;
        this.button.style.position = "absolute";
        this.button.style.top = 50 * parseInt(this.button.style.order-1) + 'px';
        this.button.style.transition = "all 1s ease-in";
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
            
            let top = e.style.top;
            top = top.substring(0, top.length-2);
            e.style.top = parseInt(top)+ 50 + 'px';
            console.log("top: " + e.style.top);
            console.log("order: " + e.style.order);
            }
        });
        this.button.style.top = 0;

        //const buttons = container.querySelectorAll("button");
        buttons.forEach( (e) => {
            e.style.order = parseInt(e.style.order)+1;
        });
        this.button.style.order = 1;
    }

}


buttonsArray.forEach((element, i) => {
    const button = new Button(element.message, element.emoji, i);
    button.render(container);
});


