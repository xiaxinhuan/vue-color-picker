import { getRgbByHue, changePicker } from "../../../../helpers";
import { useMouseEvents } from "../../../../hooks";

export default {
    name: "Picker",

    props: {
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        hue: Number,
        saturation: Number,
        value: Number,
        updateColor: Function,
    },

    data() {
        return {
            width: 0,
            height: 0,
            mouseEvents: () => {},
        }
    },

    mounted() {
        setTimeout(()=>{
            const { pickerAreaRef } = this.$refs;
            if (pickerAreaRef) {
                this.width = pickerAreaRef.clientWidth || 248;
                this.height = pickerAreaRef.clientHeight || 160;
            }

            this.mouseEvents = useMouseEvents(this.mouseDownHandler, this.mouseMoveHandler, this.mouseUpHandler);
        },100)
        
    },

    computed: {
        offsetLeft() {
            return ((this.saturation * this.width / 100) | 0) - 6;
        },

        offsetTop() {
            // console.log('scrollY',window.scrollY)
            return (this.height - (this.value * this.height / 100) | 0) - 6;
        },

        pointerStyle() {
            return {
                backgroundColor: `rgb(${this.red}, ${this.green}, ${this.blue})`,
                left: `${this.offsetLeft}px`,
                top: `${this.offsetTop}px`,
            }
        },

        pickerStyle() {
            const { red, green, blue } = getRgbByHue(this.hue);

            return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
        }
    },

    methods: {
        mouseDownHandler(event) {
            const { x: elementX, y: elementY } = this.$refs.pickerAreaRef.getBoundingClientRect();
            // console.log('sa',event.pageY,elementY,document.documentElement.scrollTop)
            const startX = event.pageX;
            const startY = event.pageY;
            const positionX = startX - elementX ;
            const positionY = startY - elementY - document.documentElement.scrollTop;

            const color = changePicker(positionX, positionY, this.height, this.width, this.hue);

            this.updateColor(color, 'onStartChange');
            return {
                startX,
                startY,
                positionX,
                positionY,

            };
        },

        changeObjectPositions(event, { startX, startY, positionX, positionY }) {
            const moveX = event.pageX - startX;
            const moveY = event.pageY - startY;
            positionX += moveX;
            positionY += moveY;

            const color = changePicker(positionX, positionY, this.height, this.width, this.hue);

            return {
                positions: {
                    positionX,
                    positionY,
                    startX: event.pageX,
                    startY: event.pageY,
                },
                color,
            };
        },

        mouseMoveHandler(event, { startX, startY, positionX, positionY, }) {
            const { positions, color } = this.changeObjectPositions(event, {
                startX, startY, positionX, positionY,
            });

            this.updateColor(color, 'onChange');

            return positions;
        },

        mouseUpHandler(event, { startX, startY, positionX, positionY, }) {
            const { positions, color } = this.changeObjectPositions(event, {
                startX, startY, positionX, positionY,
            });

            this.updateColor(color, 'onEndChange');

            return positions;
        },
    }
}
