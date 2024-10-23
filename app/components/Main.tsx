import axios from "axios";
import { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export default function Main(){
    return (
        <div className="bg-black">
            <TrendingCategories />
        </div>
    )
}

const TrendingCategories = () => {
    const categories = [
        {
            name: 'iPhone',
            image: '//techno-workdo.myshopify.com/cdn/shop/files/category-1_x100.png?v=1714565025',
            link: '/collections/mobiles',
        },
        {
            name: 'Speaker',
            image: '//techno-workdo.myshopify.com/cdn/shop/files/category-2_x100.png?v=1714565025',
            link: '/collections/speaker',
        },
        {
            name: 'Headphones',
            image: '//techno-workdo.myshopify.com/cdn/shop/files/category-3_x100.png?v=1714565025',
            link: '/collections/headphones',
        },
        {
            name: 'Laptops',
            image: '//techno-workdo.myshopify.com/cdn/shop/files/category-4_x100.png?v=1714565025',
            link: '/collections/laptops',
        },
        {
            name: 'AirPods',
            image: '//techno-workdo.myshopify.com/cdn/shop/files/category-5_x100.png?v=1714565025',
            link: '/collections/airpods',
        },
        {
            name: 'Smart Watch',
            image: '//techno-workdo.myshopify.com/cdn/shop/files/category-6_x100.png?v=1714566664',
            link: '/collections/smart-watches',
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '30px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className="pt-10 pb-10">
            <div className="container mx-auto" data-section="category-featured">
                <div className="text-left mb-5">
                    <h2 className="text-4xl text-white font-bold wow animate__fadeInLeft my-14" data-wow-duration="0.5s">
                        TRENDING CATEGORIES
                    </h2>
                </div>
                <Slider {...settings}>
                    {categories.map((category, index) => (
                        <div key={index} className="flex justify-center ">
                            <div className="bg-white shadow-md rounded-full p-4 w-full max-w-[250px] flex flex-col items-center">
                                <a href={category.link} className="block">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        loading="lazy"
                                        className="w-40 h-40 object-contain rounded-full mb-3"
                                    />
                                </a>
                                <h3 className="text-center">
                                    <a href={category.link} className="text-lg font-medium hover:text-blue-500">
                                        {category.name}
                                    </a>
                                </h3>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};