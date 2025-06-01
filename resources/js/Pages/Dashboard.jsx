import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import Hero from "@/Components/Hero.jsx";
import {CartProvider} from "@/contexts/CartContext.jsx";
import ProductGrid from "@/Components/ProductGrid.jsx";
import Footer from "@/Components/Footer.jsx";

export default function Dashboard() {
    const {products} = usePage().props;
    return (
         <div
                className="min-h-screen bg-gradient-to-br from-premium-onyx-900 via-premium-sapphire-900 to-premium-onyx-800">
                <Header/>
                <Hero/>

                <section id="products" className="py-20 px-4">
                    <div className="container mx-auto">
                        <h2 className="text-4xl font-playfair font-bold text-premium-pearl-50 mb-12 text-center">
                            Our Premium Selection
                        </h2>
                        <ProductGrid products={products.data}/>
                    </div>
                </section>
                <section id="about" className="py-20 px-4 bg-premium-onyx-800/50">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-4xl font-playfair font-bold text-premium-pearl-50 mb-8 text-center">
                            About Krivetka.am
                        </h2>
                        <div className="prose prose-lg prose-invert mx-auto">
                            <p className="text-premium-pearl-200 mb-6">
                                At Krivetka.am, we are passionate about bringing you the finest seafood from the depths of the ocean. Our commitment to quality and sustainability sets us apart in the industry.
                            </p>
                            <p className="text-premium-pearl-200 mb-6">
                                Each product in our collection is carefully selected and handled with the utmost care to ensure you receive nothing but the best. From our sustainable fishing practices to our premium packaging, every detail matters.
                            </p>
                            <p className="text-premium-pearl-200">
                                Join us in our journey to provide exceptional seafood experiences while preserving our oceans for future generations.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-4xl font-playfair font-bold text-premium-pearl-50 mb-8 text-center">
                            Contact Us
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-premium-onyx-800/50 p-8 rounded-lg">
                                <h3 className="text-2xl font-playfair font-bold text-premium-gold-400 mb-4">Get in Touch</h3>
                                <p className="text-premium-pearl-200 mb-6">
                                    Have questions about our products or services? We're here to help.
                                </p>
                                <div className="space-y-4">
                                    <p className="text-premium-pearl-200">Phone: +374 94616939</p>
                                </div>
                            </div>
                            <div className="bg-premium-onyx-800/50 p-8 rounded-lg">
                                <h3 className="text-2xl font-playfair font-bold text-premium-gold-400 mb-4">Business Hours</h3>
                                <div className="space-y-2">
                                    <p className="text-premium-pearl-200">Open 24/7</p>
                                    <p className="text-premium-pearl-300 text-sm">We're always here to serve you</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
    )
}
