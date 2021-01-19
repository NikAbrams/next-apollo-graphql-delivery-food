import React, { useState } from "react"
import Link from 'next/link'

import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap"
import RestaurantList from "../components/RestaurantList"

function Home() {
    // const [term, updateTerm] = useState("");
    return (
        // <div className="container-fluid">
        //     <Row>
        //         <Col>
        //             <div className="search">
        //                 <InputGroup>
        //                     <InputGroupAddon addonType="append"> Search </InputGroupAddon>
        //                     <Input
        //                         onChange={e => updateTerm(e.target.value.toLocaleLowerCase())}
        //                         value={term}
        //                     />
        //                 </InputGroup>
        //             </div>
        //             <RestaurantList search={term} />
        //         </Col>
        //     </Row>
        //     <style jsx>
        //         {`
        //             .search {
        //                 margin: 20px;
        //                 width: 500px;
        //             }
        //         `}
        //     </style>
        // </div>
        <Link href="/restaurants"><a>Restaurants</a></Link>
    )
}
export default Home