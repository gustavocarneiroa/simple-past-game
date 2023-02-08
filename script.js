
new Vue({
    el: '#app',
    data: {
        words: verbArray,
        amount: verbArray.length,
        actualWord: {},
        finished_class: false,
        isAnswered: false,
        isRightAnswer: false,
        isWrongAnswer: false,
        right_counter: 0,
        wrong_counter: 0
    },
    methods: {
        responseIs(response) {
            this.isAnswered = true;
            if (this.actualWord.type === response) this.rightAnswer()
            else this.wrongAnswer();
        },

        rightAnswer() {
            this.isRightAnswer = true;
            this.isWrongAnswer = false;
            this.right_counter++
        },

        wrongAnswer() {
            this.isRightAnswer = false;
            this.isWrongAnswer = true;
            this.wrong_counter++;
        },

        nextWord() {
            this.words.shift();
            if (this.words.length === 0) return this.finished_class = true
            this.actualWord = this.words[0];
            this.isRightAnswer = false;
            this.isWrongAnswer = false;
            this.isAnswered = false;
        },
        shareViaWebShare() {

            const message = `I got ${this.right_counter} out of ${this.amount}.\n\n Você consegue bater o meu placar?\n`; 

            navigator.share({
                title: 'Simple Past Game | Teacher Késsia Lima',
                text: message,
                url: window.location.href
            })
        }
    },
    mounted() {
        this.words = this.words
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);

        this.actualWord = this.words[0]
    }
})