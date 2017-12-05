import Modal from './src/Modal.js';
import Drawer from './src/Drawer.js';

module.exports = {
    get Modal() {
        return require( './src/Modal' ).default;
    },
    get Drawer() {
        return require( './src/Drawer' ).default;
    }
}
