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
	Col,
} from "reactstrap";
import { useLocation } from 'react-router-dom';

// core components
import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
import SimpleFooter from "../../components/Footers/SimpleFooter.js";

const SinglePost = (props) => {

	const [data, setData] = React.useState({
		title: '',
		description: ''
	})

	const location = useLocation();

	  React.useEffect(() => {
	    const location_state = location.state;
	    console.log(location_state);
	    if (location_state !== undefined) {
	      console.log('working');
	      const { item } = location_state;
	      setData({
        	...data,
     			title: item.title,
     			description: item.description
      	});
	    }
	    return () => {
	      console.log('cleanup page');
	    };
	  }, []);

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
									<CardBody>
										<h1>{data.title}</h1>
										<p>{data.description}</p>
									</CardBody>
								</Card>
							</div>
						</Row>
					</Container>
				</section>
			</main>
			<SimpleFooter />
		</>
	);
};

export default SinglePost;
