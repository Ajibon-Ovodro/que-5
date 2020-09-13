import React from 'react';
import {
	Card,
  Container,
  Row,
  Col
} from "reactstrap";
const SinglePost = ({item}) => {
	//console.log(item)
  return (
    <Container className="mt-2">
    	<Row>
    		<Col md="12" lg="12">
    			<div className="text-center">
    				<Card>
    					<h3>{item.title}</h3>
    					<p>{item.description}</p>
    				</Card>
    			</div>
    		</Col>
    	</Row>
    </Container>
  )
}

export default SinglePost;