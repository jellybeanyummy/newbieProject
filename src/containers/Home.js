import React, { Component } from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';
import { memoPostRequest, memoListRequest } from 'actions/memo';

class Home extends Component {
  componentDidMount() {
    this.props.memoListRequest(true, undefined, undefined, undefined);
  }

  handlePost = (contents) => {
    return this.props.memoPostRequest(contents).then(
      () => {
        if (this.props.postStatus.status === "SUCCESS") {
          Materialize.toast('Success!', 2000);
        } else {
          let $toastContent;
          switch(this.props.postStatus.error) {
            case 1: 
              $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
              Materialize.toast($toastContent, 2000);
              setTimeout(()=> {location.reload(false);}, 2000);
              break;
            case 2:
              $toastContent = $('<span style="color: #FFB4BA">Contents should be string</span>');
              Materialize.toast($toastContent, 2000);
              break;
            case 3:
              $toastContent = $('<span style="color: #FFB4BA">Please write Something</span>');
              Materialize.toast($toastContent, 2000);
              break;
            default:
              toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
              Materialize.toast($toastContent, 2000);
              break;
          }
        }
      }
    );
  }

  render() {
    const write = ( <Write onPost={this.handlePost}/> );
    return (
      <div className="wrapper">
        { this.props.isLoggedIn ? write : undefined }
        <MemoList data={this.props.memoData}
                  currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn, 
    postStatus: state.memo.post, 
    currentUser: state.authentication.status.currentUser, 
    memoData: state.memo.list.data, 
    listStatus: state.memo.list.status, 
    isLast: state.memo.list.isLast
  };
};

const mapDispatchToProps = (Dispatch) => {
  return {
    memoPostRequest: (contents) => {
      return dispatch(memoPostRequest(contents));
    },
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id , username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);