import React from "react";
import {
	Button,
	Modal,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
} from "reactstrap";

const CatModal = ({ cat_modal_state, cat_toggle_modal, newCatHandler }) => {
	const [new_cat, setNewCat] = React.useState("");
	const handleChange = (e) => {
		setNewCat(e.target.value);
	};

	const addCatHandler = () => {
		newCatHandler(new_cat);
		setNewCat("");
	};

	return (
		<>
			<Modal
				className="modal-dialog-centered"
				isOpen={cat_modal_state}
				toggle={cat_toggle_modal}
			>
				<div className="modal-header">
					<h4 className="modal-title" id="modal-title-default">
						Add Cateogry
					</h4>
					<button
						aria-label="Close"
						className="close"
						data-dismiss="modal"
						type="button"
						onClick={cat_toggle_modal}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">
					<Form>
						<Row>
							<Col md="12">
								<FormGroup>
									<label>Category Name</label>
									<Input
										className="form-control-alternative"
										placeholder="write down post title"
										type="text"
										onChange={handleChange}
									/>
								</FormGroup>
							</Col>
						</Row>
					</Form>
				</div>
				<div className="modal-footer">
					<Button color="primary" type="button" onClick={addCatHandler}>
						Save changes
					</Button>
					<Button
						className="ml-auto"
						color="link"
						data-dismiss="modal"
						type="button"
						onClick={cat_toggle_modal}
					>
						Close
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default CatModal;
