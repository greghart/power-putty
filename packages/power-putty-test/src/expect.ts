/**
 * Our application specific "expect"
 *
 * Includes additional functionality and ensures we have all our dependencies setup
 */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

export default chai.expect;
