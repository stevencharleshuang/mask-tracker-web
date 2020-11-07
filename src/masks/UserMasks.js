import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserMasks } from '../store/actions/userActions';
import { auth } from '../constants/firebase';

class UserMasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMasks: [],
      count: 0
    };
  }

  async componentDidMount() {
    try {
      await this.props.getUserMasks(auth.currentUser.uid);
      const userMasks = await this.props.userMasks;
      console.log(await userMasks);
      this.setState({ userMasks });
    } catch (error) {
      console.error(error);
    }
  }

  renderUserMasks = () => {
    return this.state.userMasks.map((mask, i) => (
      <div key={i}>
        <h4>{mask.maskNickname}</h4>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1>Your masks</h1>
        {this.state.userMasks && this.renderUserMasks()}
        {!this.props.isAuthenticated && <Redirect to="/login" />}
        <button onPress={() => this.setState(prevState => prevState.count++)}>re-render</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getUserMasks,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMasks);
