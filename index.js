import Modal from './src/Modal.js';


module.exports = {
    get Modal() {
        return require( './src/Modal' ).default;
    }
}
