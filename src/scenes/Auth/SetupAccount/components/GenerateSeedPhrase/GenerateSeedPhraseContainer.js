import { connect } from 'react-redux';
import GenerateSeedPhraseDisplay from './GenerateSeedPhraseDisplay';

function mapStateToProps(state) {
  return {
    generatedSeedPhrase:
      'LOREM IPSUM LOREM IPSUM DOLORSIT DOLORSIT IPSUM DOLOR SIT AMET IPSUM DOLOR',
    errors: null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    generateSeedPhrase() {
      console.log('Generating...');
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenerateSeedPhraseDisplay);
