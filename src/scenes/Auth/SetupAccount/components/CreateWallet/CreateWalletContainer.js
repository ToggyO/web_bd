import { connect } from 'react-redux';
import CreateWalletDisplay from './CreateWalletDisplay';

function mapStateToProps(state) {
  return {
    generatedSeedPhrase:
      'LOREM IPSUM LOREM IPSUM DOLORSIT DOLORSIT IPSUM DOLOR SIT AMET IPSUM DOLOR',
  };
}
export default connect(mapStateToProps)(CreateWalletDisplay);
