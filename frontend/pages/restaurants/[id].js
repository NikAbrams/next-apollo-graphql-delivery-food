// import { useQuery } from "@apollo/react-hooks"
import { useRouter } from "next/router"
// import { gql } from "apollo-boost"
import { gql, useQuery } from '@apollo/client'

import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Row,
} from "reactstrap"

const GET_RESTAURANT_DISHES = gql`
    query($id: ID!) {
        restaurant(id: $id) {
            id
            name
            dishes {
                id
                name
                description
                price
                image {
                url
                }
            }
        }
    }
`

export default function Restaurant(props) {
    // Получаем объект роутер, у которого есть поле query с id (id он получаем из URL)
    const router = useRouter()
    const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
        // передаём объект variables, чтобы присвоить значение переменным внутри запроса GET_RESTAURANT_DISHES
        variables: { id: router.query.id }, 
    })

    if (error) return "Error Loading Dishes"
    if (loading) return <h1>Loading ...</h1>
    if (data.restaurant) {
        const { restaurant } = data
        
        return (
            <>
                <h1>{restaurant.name}</h1>
                {restaurant.dishes.length > 0 ? (
                    <Row>
                        {restaurant.dishes.map((res) => (
                            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
                                <Card style={{ margin: "0 10px" }}>
                                    <CardImg
                                        top={true}
                                        style={{ height: 250 }}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                                    />
                                    <CardBody>
                                        <CardTitle>{res.name}</CardTitle>
                                        <CardText>{res.description}</CardText>
                                    </CardBody>
                                    <div className="card-footer">
                                        <Button outline color="primary">
                                            + Add To Cart
                                        </Button>

                                        <style jsx>
                                            {`
                                            a {
                                                color: white
                                            }
                                            a:link {
                                                text-decoration: none
                                                color: white
                                            }
                                            .container-fluid {
                                                margin-bottom: 30px
                                            }
                                            .btn-outline-primary {
                                                color: #007bff !important
                                            }
                                            a:hover {
                                                color: white !important
                                            }
                                            `}
                                        </style>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (<h3>No dishes yet</h3>)}
            </>
        )
    }
    return <h1>Add Dishes</h1>
}