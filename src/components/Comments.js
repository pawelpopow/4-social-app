import React, { Component } from 'react';
import { connect } from 'react-redux';


import { isFriend } from './../functions/friendCheck';
import { getUser } from './../functions/getUsers';


import { addComment } from './../actions/commentAction';
import { deleteComment } from './../actions/commentAction';

function mapStateToProps(store) {
  return {
    list: store.users.list,
    comments: store.comments,
    activeUser: store.activeUser
  }
}

class Comments extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      showInput: true,
      commentText: ''
    }
  }

  handleInputChange(e) {
    this.setState({
      commentText: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.dispatch(addComment(
      this.props.userProfile.id,
      this.props.activeUser.userId,
      this.state.commentText
    ))

    // Reset the inputs
    this.setState({
      commentText: ''
    })
  }

  render() {
    let areFriends = false;
    if(this.props.activeUser.userId !== undefined) {
      areFriends = isFriend(this.props.userProfile.id, this.props.activeUser.userId, this.props.list);
    }

  
    let userComments = {};

    userComments = this.props.comments.find((comment) => {
      return comment.user === Number(this.props.userProfile.id);
    });

    let comments = [];
    if(userComments !== undefined) {
      comments = userComments.posts.map((post) => {
        const postedBy = getUser(this.props.list, post.poster);
        let canDeleteComment = false;

        if((this.props.activeUser.userId === this.props.userProfile.id) || (this.props.activeUser.userId === post.poster)) {
          canDeleteComment = true;
        }

        return (
          <div key={post.id} lass='container-fluid'>
            <div class='row'>
              <div class='col-12 mt-3'>
                <div class='card'>
                  <div class='card-horizontal'>
                    <div class='comment-img-wrapper'>
                      <div style={{backgroundImage: postedBy !== undefined ? `url(${postedBy.image})` : 'url(https://www.festivalclaca.cat/imgfv/b/72-722963_circular-question-mark-button-question-mark-icon-white.png)', backgroundSize: 'cover', backgroundPosition: 'center top', paddingTop: '100%', width: '100%', borderTopLeftRadius:'0.25rem', borderBottomLeftRadius: '0.25rem'}} />
                    </div>
                    <div class='card-body'>
                      <h5 class='card-title text-muted'>
                        Posted By:&nbsp;
                        {postedBy !== undefined ? postedBy.fullname : 'User Deleted'}
                      </h5>
                      <p class='card-text'>
                        {post.post}
                      </p>
                      { canDeleteComment === true &&
                        <button
                          onClick={() => this.props.dispatch(deleteComment(post.id))}
                          className='btn btn-danger'>
                          Delete Comment
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        )
      });
    }

    let addCommentSection = null;

    if(this.props.activeUser.userId === undefined) {
      addCommentSection = <h4>Sign in to add a comment</h4>;
    }
    else if((!areFriends) && (this.props.activeUser.userId !== this.props.userProfile.id)) {
      addCommentSection = <h5>You need to be friends to add a comment</h5>;
    }
    else {
      addCommentSection =
      <form onSubmit={this.handleSubmit}>
        <textarea
          value={this.state.commentText}
          onChange={this.handleInputChange}
          className='comments-add-textarea form-control mb-1' />

        <button type='submit' className='btn btn-primary u-inline-block mr-2'>Add Comment</button>
      </form>
    }


    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h4>Comments</h4>
          </div>
          <div className='col-md-6'>
            { addCommentSection }
          </div>
        </div>
        <hr />
        { comments.length > 0 ? (
            comments.reverse()
          ) : (
            <h4>No Comments</h4>
          )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Comments);
