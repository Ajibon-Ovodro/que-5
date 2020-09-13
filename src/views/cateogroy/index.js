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
import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";
import CatModal from "../../components/Cat-Modal";
import { loadCatData, storeCatData, toTitleCase } from "../../services";
const Category = (props) => {
	const [modalState, setmodalState] = React.useState(false);
	const toggleModal = () => {
		setmodalState((prev) => !prev);
	};
	const [cat, setCat] = React.useState([]);

	React.useEffect(() => {
		if (loadCatData()) {
			setCat(loadCatData());
		}
		return () => {
			console.log("app cleanup");
		};
	}, []);

	const newCatHandler = (value) => {
		//console.log(value);
		const label = toTitleCase(value);
		const obj = { value, label };
		setCat([...cat, obj]);
		storeCatData(obj);
		toggleModal();
	};

	return (
		<>
			<DemoNavbar />
			<main>
				<section className="section">
					<Container className="mt-7">
				{/* Table */}
				<Row>
					<div className="col">
						<Card className="shadow">
							<CardHeader className="border-0">
								<Row className="align-items-center">
									<div className="col">
										<h3 className="mb-0">All Category</h3>
									</div>
									<div className="col text-right">
										{/* Button trigger modal */}
										<Button color="default" type="button" onClick={toggleModal}>
											Add New Category
										</Button>
									</div>
								</Row>
							</CardHeader>
							{cat.length > 0 ? (
								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
											<th scope="col">label</th>
											<th scope="col">Value</th>
										</tr>
									</thead>
									<tbody>
										{cat.map((item, index) => {
											return (
												<tr key={index}>
													<td>{item.label}</td>
													<td>{item.value}</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							) : (
								<CardBody>
									<div className="text-center">
										<h4>There are no category</h4>
									</div>
								</CardBody>
							)}
						</Card>
					</div>
				</Row>
			</Container>
				</section>
			</main>
			<SimpleFooter />
			<CatModal
				cat_toggle_modal={toggleModal}
				cat_modal_state={modalState}
				newCatHandler={newCatHandler}
			/>
		</>
	);
};

export default Category;
