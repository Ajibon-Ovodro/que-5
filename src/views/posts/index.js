import React from "react";
// reactstrap components
import {
	Card,
	CardHeader,
	Table,
	Container,
	Row,
	Button,
	CardBody,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import PostModal from "components/Post-Modal";
import SinglePost from "components/Single-Post";
import { loadPostData, storePostData, loadCatData } from "../../services";
import { v4 as uuidv4 } from "uuid";

const Posts = (props) => {
	const [modalState, setmodalState] = React.useState(false);
	const toggleModal = () => {
		//console.log('working');
		setmodalState((prev) => !prev);
	};
	const [posts, setPosts] = React.useState([]);
	const [cat, setCat] = React.useState([]);
	const [editPost, setEditPost] = React.useState(null);
	const [showPost, setShowPost] = React.useState(false);
	const [viewPost, setViewPost] = React.useState(null);

	React.useEffect(() => {
		setPosts(loadPostData());
		setCat(loadCatData());
		return () => {
			console.log("app cleanup");
		};
	}, []);

	React.useEffect(() => {
		storePostData(posts);
		//console.log("posts");
		return () => {
			console.log("app cleanup");
		};
	}, [posts]);

	const addPostHandler = (post, edit = false) => {
		let today = new Date();
		const dd = today.getDate();
		const mm = today.getMonth() + 1;
		const yyyy = today.getFullYear();
		const date = `${dd}/${mm}/${yyyy}`;
		const { title, description, category } = post;
		if (!edit) {
			const new_post = {
				id: uuidv4(),
				title,
				description,
				category,
				date,
			};
			setPosts([...posts, new_post]);
			setCat([...cat, ...category]);
			toggleModal();
		} else {
			const { id } = editPost;
			const updated_post = {
				id,
				title,
				description,
				category,
				date,
			};
			const old_posts = posts;
			//const old_cat = cat;
			let objIndex = old_posts.findIndex((obj) => obj.id === id);
			old_posts[objIndex] = updated_post;
			setPosts(old_posts);
			storePostData(posts);
			setEditPost(null);
			toggleModal();
		}
	};

	const editHanlder = (item) => {
		setEditPost(item);
		toggleModal();
		setShowPost(false);
		setViewPost(null);
	};

	const deleteHandler = (item) => {
		const new_post = posts.filter((el) => el.id !== item.id);
		setPosts(new_post);
		setShowPost(false);
		setViewPost(null);
	};

	const showPostHandler = (item) => {
		setShowPost(true);
		setViewPost(item);
	};

	return (
		<>
			<Header title="Post" />
			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Table */}
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0">
								<Row className="align-items-center">
									<div className="col">
										<h3 className="mb-0">All Post</h3>
									</div>
									<div className="col text-right">
										{/* Button trigger modal */}
										<Button color="default" type="button" onClick={toggleModal}>
											Add New Post
										</Button>
									</div>
								</Row>
							</CardHeader>
							{posts.length > 0 ? (
								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
											<th scope="col">Title</th>
											<th scope="col">Author</th>
											<th scope="col">Categories</th>
											<th scope="col">Date</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>
										{posts.map((item, index) => {
											const cat_arr = [];
											item.category.forEach((item) => {
												cat_arr.push(item.label);
											});
											return (
												<tr key={index}>
													<td>{item.title}</td>
													<td>Admin</td>
													<td>{cat_arr.join(", ")}</td>
													<td>{item.date}</td>
													<td>
														<Button
															color="primary"
															type="button"
															size="md"
															onClick={() => editHanlder(item)}
														>
															Edit
														</Button>
														<Button
															color="danger"
															type="button"
															size="md"
															onClick={() => deleteHandler(item)}
														>
															Delete
														</Button>
														<Button
															color="info"
															type="button"
															size="md"
															onClick={() => showPostHandler(item)}
														>
															View
														</Button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							) : (
								<CardBody>
									<div className="text-center">
										<h4>There are no posts</h4>
									</div>
								</CardBody>
							)}
						</Card>
					</div>
				</Row>
			</Container>
			{/* Modal */}
			<PostModal
				toggleModal={toggleModal}
				modalState={modalState}
				addPostHandler={addPostHandler}
				editPost={editPost}
				category={cat}
			/>
			{showPost && <SinglePost item={viewPost} />}
		</>
	);
};

export default Posts;
