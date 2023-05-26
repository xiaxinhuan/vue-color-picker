import Hex from './Hex';
import RGB from './RGB';
import ColorFinder from './ColorFinder';
import ColorDefault from './ColorDefault';

export default {
    name: "Preview",

    props: {
        red: Number,
        green: Number,
        blue: Number,
        alpha: Number,
        updateColor: Function,
    },

    components: {
        Hex,
        RGB,
        ColorFinder,
        ColorDefault
    }
};
