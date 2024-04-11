import { useMouseEvents } from "../../../../hooks";
import { calculateDegree } from "../../../../helpers";

export default {
    name: "GradientControls",

    props: {
        type: String,
        degree: Number,
        changeGradientControl: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            disableClick: false,
            inputDegree:this.degree,
            mouseEvents: () => {},
        }
    },
    watch:{
        degree:{
            handler(newVal){
                this.inputDegree = newVal
            }
        }
    },

    mounted() {
        this.mouseEvents = useMouseEvents(this.mouseDownHandler, this.mouseMoveHandler, this.mouseUpHandler);
    },

    computed: {
        degreesStyle() {
            return { transform: `rotate(${this.degree}deg)` };
        }
    },

    methods: {
        mouseDownHandler(event) {
            const pointer = event.target;
            const pointerBox = pointer.getBoundingClientRect(); 
            const centerY = pointerBox.top + parseInt(8 - window.pageYOffset, 10) + document.documentElement.scrollTop*1;
            const centerX = pointerBox.left + parseInt(8 - window.pageXOffset, 10);

            return {
                centerY,
                centerX,

            };
        },

        mouseMoveHandler(event, { centerX, centerY }) {
            this.disableClick = true;

            const newDegree = calculateDegree(event.clientX, event.clientY, centerX, centerY);

            this.changeGradientControl({ degree: parseInt(newDegree, 10) });
        },

        mouseUpHandler(event) {
            const targetClasses = event.target.classList;

            if (targetClasses.contains('gradient-degrees') || targetClasses.contains('icon-rotate')) {
                return;
            }

            this.disableClick = false;
        },

        onClickGradientDegree() {
            if (this.disableClick) {
                this.disableClick = false;
                return;
            }

            let gradientDegree = this.degree + 45;

            if (gradientDegree >= 360) {
                gradientDegree = 0;
            }

            this.changeGradientControl({ degree: parseInt(gradientDegree, 10) });
        },
        inputDegreeChange(){
            this.inputDegree = Number(this.inputDegree)
            if(this.inputDegree > 360){
                this.inputDegree = 360
            }
            if(this.inputDegree < 0){
                this.inputDegree = 0
            }
            if(isNaN(this.inputDegree)){
                this.inputDegree = 0
            }
            this.changeGradientControl({ degree: parseInt(this.inputDegree, 10) });
        }
    }
};
