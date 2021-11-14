import React from 'react'
import { withNavbar } from './Navbar'

function HomePage() {
    return <p>Home Page</p>
}

export default withNavbar(HomePage, { title: "Herulo Weather App" })
