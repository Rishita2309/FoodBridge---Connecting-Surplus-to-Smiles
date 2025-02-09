import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


export default function Home() {
    return (
        <>
<div className='home'>
            <div className="hero-section" style={{ backgroundImage: "url('/lander.jpg')" }}>
                <div className="overlay"></div>
                <div className="hero-content">
                    <img src="logo.png" alt="Description" className="hero-image" />
                    <h1 className="hero-title">FoodBridge</h1>
                    <p className="hero-subtitle">Connecting Surplus to Smiles</p>
                </div>
            </div>


            <div className="cards-container">
                <div className="card">
                    <div className="card-details">
                        <img src="donor.png" alt="Card Image" className="card-image" />
                        <p className="text-title">Donator</p>
                        <p className="text-body">You will donate food to needy.</p>
                    </div>
                    <Link to="/donate">
                        <button className="card-button">Donate</button>
                    </Link>

                </div>

                <div className="card">
                    <div className="card-details">
                        <img src="volunteer.png" alt="Card Image" className="card-image" />
                        <p className="text-title">Volunteer</p>
                        <p className="text-body">You will pick up & deliver food.</p>
                    </div>
                    <Link to="/request">
                        <button className="card-button">Collect</button>
                    </Link>
                </div>
            </div>

            <div className="para">
                <b>Bridging Surplus Food to Those Who Need It Most</b>
                <p>At FoodBridge, we believe that no food should go to waste while millions struggle
                    with hunger. Our mission is to create a seamless, technology-driven platform that
                    connects restaurants, households, and food businesses with NGOs, shelters, and
                    charities. Every year, tons of edible food are discarded due to excess production
                    or unsold inventory. We aim to turn this waste into nourishment by enabling quick
                    and easy redistribution of surplus food to those who need it most.</p>
                <br />
                <b>Bridging the Gap Between Surplus and Need</b> <br />
                At FoodBridge, we strive to create a world where surplus food is never wasted but
                instead reaches those who need it the most. Through our platform, we make food
                donation simple, efficient, and impactful—connecting donors with NGOs and
                shelters seamlessly.
                <br /><br />
                <b>Why It Matters</b><br />
                Hunger and food waste are two sides of the same coin.
                While millions struggle to find their next meal, vast amounts of food go to
                waste daily. FoodBridge is committed to changing this by enabling businesses,
                restaurants, and households to share surplus food with organizations that serve
                the underprivileged.
                <br /><br />
                <b>How We Make a Difference</b><br />
                With just a few clicks, donors can list surplus food, and verified NGOs or
                volunteers can claim it. Our platform ensures safe and efficient food
                distribution, reducing waste while feeding communities. The impact dashboard
                lets donors track their contributions, making every meal count.
                <br /><br />
                <b>Join Us in the Fight Against Hunger</b><br />
                Be a part of the movement. Whether you’re a restaurant, grocery store,
                or an individual with extra food, your contribution can bring relief to
                someone in need. Together, we can turn excess into opportunity and create
                a more sustainable, hunger-free world.

            </div>


            </div>
        </>
    );
}
