import React from "react";
import {
	Button,
	Modal,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
	Alert,
} from "reactstrap";
import Select from "react-select";
import CatModal from "components/Cat-Modal";
import { storeCatData, toTitleCase } from "../../services";

const PostModal = ({
	modalState,
	toggleModal,
	addPostHandler,
	editPost,
	category,
}) => {
	const [multipleSelect, setMultipleSelect] = React.useState(null);
	const [cat_modal_state, setCatModalState] = React.useState(false);
	const [options, setOptions] = React.useState([
		{
			value: "cat",
			label: "Create New Category",
			isFixed: true,
		},
	]);
	const [formData, setFormData] = React.useState({
		title: "",
		description: "",
	});
	const [error, setError] = React.useState(false);

	React.useEffect(() => {
		//console.log(editPost)
		if (modalState && editPost) {
			const { title, description, category } = editPost;
			setFormData({
				...formData,
				title,
				description,
			});
			//console.log(...category);
			setOptions((prev) => [...prev, ...category]);
			setMultipleSelect(category);
		}
		if (modalState && category) {
			setOptions((prev) => [...prev, ...category]);
		}
		setError(false);
	}, [modalState]);

	const handleChange = (value) => {
		if (value && value.some((item) => item.value === "cat")) {
			cat_toggle_modal();
		}
		if (value && value.some((item) => item.value !== "cat")) {
			let new_val = value.filter((item) => item.value !== "cat");
			setMultipleSelect(new_val);
		} else {
			setMultipleSelect(null);
		}
	};
	const cat_toggle_modal = () => {
		setCatModalState((prev) => !prev);
	};

	const newCatHandler = (value) => {
		const label = toTitleCase(value);
		const obj = { value, label };
		setOptions((prev) => [...prev, obj]);
		if (multipleSelect) {
			handleChange([...multipleSelect, obj]);
		} else {
			handleChange([obj]);
		}
		storeCatData(obj);
		cat_toggle_modal();
	};

	const inputHandler = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validate = () => {
		let titleError = formData.title === "" ? true : false;
		let descriptionError = formData.description === "" ? true : false;
		let categoryError = multipleSelect === null ? true : false;
		if (titleError || descriptionError || categoryError) {
			return false;
		} else {
			return true;
		}
	};

	const addPost = () => {
		const post = {
			title: formData.title,
			description: formData.description,
			category: multipleSelect,
		};
		if (validate()) {
			if (editPost) {
				addPostHandler(post, true);
			} else {
				addPostHandler(post);
			}
			setError(false);
		} else {
			setError(true);
		}
	};

	return (
		<>
			<Modal
				className="modal-dialog-centered"
				isOpen={modalState}
				toggle={toggleModal}
			>
				<div className="modal-header">
					<h4 className="modal-title" id="modal-title-default">
						Add Post
					</h4>
					<button
						aria-label="Close"
						className="close"
						data-dismiss="modal"
						type="button"
						onClick={toggleModal}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">
					<Form>
						<Row>
							<Col md="12">
								<FormGroup>
									<label>Title *</label>
									<Input
										className="form-control-alternative"
										placeholder="write down post title"
										type="text"
										name="title"
										onChange={inputHandler}
										value={formData.title}
									/>
								</FormGroup>
							</Col>
							<Col md="12">
								<FormGroup>
									<label>Description *</label>
									<Input
										className="form-control-alternative"
										placeholder="write down description"
										rows="3"
										type="textarea"
										name="description"
										onChange={inputHandler}
										value={formData.description}
									/>
								</FormGroup>
							</Col>
							<Col md="12">
								<FormGroup>
									<label>Category *</label>
									<Select
										className="react-select react-select-info"
										components={{ ClearIndicator: () => null }}
										classNamePrefix="react-select"
										placeholder="Choose Category"
										name="multipleSelect"
										closeMenuOnSelect={false}
										isMulti
										value={multipleSelect}
										onChange={handleChange}
										options={options}
									/>
								</FormGroup>
							</Col>
							{error && (
								<Alert color="danger">
									<strong>Danger!</strong> Error in form. Please check again
								</Alert>
							)}
						</Row>
					</Form>
				</div>
				<div className="modal-footer">
					<Button color="primary" type="button" onClick={addPost}>
						Save changes
					</Button>
					<Button
						className="ml-auto"
						color="link"
						data-dismiss="modal"
						type="button"
						onClick={toggleModal}
					>
						Close
					</Button>
				</div>
				<CatModal
					cat_modal_state={cat_modal_state}
					cat_toggle_modal={cat_toggle_modal}
					newCatHandler={newCatHandler}
				/>
			</Modal>
		</>
	);
};

export default PostModal;
