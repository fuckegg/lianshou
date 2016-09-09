var con=document.getElementById('example');

var CommentBox = React.createClass({
	loadCommentsFromServer:function(){
		$.ajax({
			type:'GET',
			url:this.props.url,
			dataType:'json',
			success:function(data){
				this.setState({
					data:data
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});		
	},
	handleCommentSubmit:function(comment){
		var comments=this.state.data;
		var newComments=comments.concat([comment]);
		this.setState({data:newComments});
		/*$.ajax({
			url:'/',
			dataType:"json",
			type:"POST",
			data:comment,
			success:function(data){
				this.setState({
					data:data
				});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});*/
	},
	getInitialState:function(){
		return{data:[]};	
	},
	componentDidMount:function(){
		this.loadCommentsFromServer();
	},
	render:function(){
		return(
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		);
	}
});
 
var CommentList = React.createClass({
	render:function(){
		var commentNodes=this.props.data.map(function(comment){
			return(
				<Comment author={comment.author}>
				{comment.text}
				</Comment>
			);
		});
		return(
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	handleSubmit:function(e){
		e.preventDefault();
		var author=this.refs.author.value.trim();
		var text=this.refs.text.value.trim();
		if(!text||!author){
			return;
		}
		this.props.onCommentSubmit({author:author,text:text});
		this.refs.author.value='';
		this.refs.text.value='';
		return;
	},
	render:function(){
		return(
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" ref="author"/>
				<input type="text" placeholder="Say something..." ref="text"/>
				<input type="submit" value="Post"/>
			</form>
		);
	}
});

var Comment = React.createClass({
	render:function(){
		return(
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		);
	}
});
ReactDOM.render(
	<CommentBox url='./tutorial_react.json'/>,
	con
);