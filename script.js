const container = document.querySelector(".buttons");

const buttonsArray = [
    {
        message: "apple",
        emoji: "🍏",
        timer: 0
    },
    {
        message: "pineapple",
        emoji: "🍍",
        timer: 0
    },

    {
        message: "kiwi",
        emoji: "🥝",
        timer: 0
    },

    {
        message: "avokado",
        emoji: "🥑",
        timer: 0

    },

    {
        message: "cherry",
        emoji: "🍒",
        timer: 0
    },
    {
        message: "strawberry",
        emoji: "🍓",
        timer: 0
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
            e.style.order = parseInt(e.style.order)+1;
        });
        this.button.style.order = 1;
    }

}


buttonsArray.forEach((element, i) => {
    const button = new Button(element.message, element.emoji, i);
    button.render(container);
});


