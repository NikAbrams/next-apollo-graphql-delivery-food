// useQuery - хук для запросов к бд
// Принимает как аргумент запрос GRAPHQL 
// Возвращает 3 параметра loading, error, data
// import { useQuery } from "@apollo/react-hooks"
// Удобный способ записи запросов graphql
// import { gql } from "apollo-boost"
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
// Маршрутизия
import Link from "next/link"
// Reactstrap
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col, 
  Input, 
  InputGroup, 
  InputGroupAddon
} from "reactstrap"

// Создаём запрос graphql
const QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`

export default function Restaurants() {
    const [term, updateTerm] = useState("");

    // Делаем запрос к бд
    const { loading, error, data } = useQuery(QUERY)
    if (error) return "Error loading restaurants"
    if (loading) return <h1>Fetching</h1>
    if (data.restaurants && data.restaurants.length) {
        // Форма поиска
        // Фильтрум рестораны и если ресторан совпадает с шаблоном поиска возвращаем массив ресторанов
        const searchQuery = data.restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(term)
        )
        // Проверяем, что у нас есть рестораны
        if (searchQuery.length != 0) {
            return (
                <Col>
                    <div className="search">
                        <InputGroup>
                            <InputGroupAddon addonType="append"> Search </InputGroupAddon>
                            <Input
                                onChange={e => updateTerm(e.target.value.toLocaleLowerCase())}
                                value={term}
                            />
                        </InputGroup>
                    </div>
                    <Row>
                        {/* Перебираем рестораны, которые подошли по шаблону поиска */}
                        {searchQuery.map((res) => (
                            <Col xs="6" sm="4" key={res.id}>
                                <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                                    <CardImg
                                        top={true}
                                        style={{ height: 250 }}
                                        // NEXT_PUBLIC_API_URL мы указали в файле .env.development
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                                    />
                                    <CardBody>
                                        <CardTitle>{res.name}</CardTitle>
                                        <CardText>{res.description}</CardText>
                                    </CardBody>
                                    <div className="card-footer">
                                        <Link
                                            href={`/restaurants/${res.id}`}
                                        >
                                            <a className="btn btn-primary">View</a>
                                        </Link>
                                    </div>
                                </Card>
                            </Col>
                        ))}

                        <style jsx global>
                            {`
                                a {
                                    color: white
                                }
                                a:link {
                                    text-decoration: none
                                    color: white
                                }
                                a:hover {
                                    color: white
                                }
                                .card-columns {
                                    column-count: 3
                                }
                                .search {
                                    margin: 20px;
                                    width: 500px;
                                }
                            `}
                        </style>
                    </Row>
                </Col>
            )
        } else {
            return <h1>No Restaurants Found</h1>
        }
    }

    return <h5>Add Restaurants</h5>
}