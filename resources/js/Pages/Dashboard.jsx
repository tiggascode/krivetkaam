import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import Hero from "@/Components/Hero.jsx";
import { CartProvider } from "@/contexts/CartContext.jsx";
import ProductGrid from "@/Components/ProductGrid.jsx";
import Footer from "@/Components/Footer.jsx";

export default function Dashboard() {
    const { products } = usePage().props;
    return (
        <div className="min-h-screen bg-gradient-to-br from-premium-sapphire-800 via-premium-sapphire-750 to-premium-sapphire-800 relative overflow-hidden">
            {/* Enhanced 3D Background with Apple-inspired premium effects */}
            <div className="fixed inset-0 z-0">
                {/* Deep blue gradient foundation */}
                <div className="absolute inset-0 bg-gradient-to-br from-premium-sapphire-800 via-premium-sapphire-750 to-premium-sapphire-800"></div>

                {/* 3D geometric grid overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full" style={{
                        backgroundImage: `
                            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                            linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '400px 400px, 600px 600px, 80px 80px, 80px 80px'
                    }}></div>
                </div>

                {/* Premium 3D depth layers */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/40"></div>

                {/* Apple-style floating orbs with 3D depth */}
                <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-premium-gold-500/10 to-premium-gold-600/5 rounded-full blur-3xl animate-float opacity-60"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-premium-gold-400/8 to-transparent rounded-full blur-2xl animate-float opacity-40" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-premium-gold-500/5 via-premium-gold-400/10 to-premium-gold-500/5 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '6s' }}></div>

                {/* Premium light beams */}
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-premium-gold-400/20 via-premium-gold-500/5 to-transparent"></div>
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-premium-gold-300/15 via-premium-gold-400/3 to-transparent"></div>

                {/* Subtle noise texture for premium feel */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
            </div>

            {/* Content with enhanced z-indexing */}
            <div className="relative z-10">
                <Header />
                <Hero />

                {/* Premium Products Section with enhanced 3D background */}
                <section id="products" className="py-24 px-4 relative">
                    {/* Section-specific 3D background elements */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-premium-gold-500/60 to-transparent shadow-lg shadow-premium-gold-500/30"></div>

                        {/* 3D geometric accents */}
                        <div className="absolute top-20 left-20 w-40 h-40 opacity-5 transform rotate-45 animate-float">
                            <div className="w-full h-full bg-gradient-to-br from-premium-gold-500/30 to-transparent rounded-3xl blur-xl"></div>
                        </div>
                        <div className="absolute bottom-20 right-20 w-32 h-32 opacity-8 transform -rotate-12 animate-float" style={{ animationDelay: '4s' }}>
                            <div className="w-full h-full bg-gradient-to-tl from-premium-gold-400/20 to-transparent rounded-2xl blur-lg"></div>
                        </div>
                    </div>

                    <div className="container mx-auto relative z-10">
                        {/* Premium section header with 3D effects */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center px-8 py-3 bg-black/70 border-2 border-premium-gold-500/30 rounded-full mb-8 backdrop-blur-xl shadow-2xl shadow-premium-gold-500/20">
                                <span className="text-premium-gold-400 text-sm font-medium tracking-wider uppercase">
                                    Curated Collection
                                </span>
                            </div>

                            <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-6 relative">
                                <span className="bg-gradient-to-r from-premium-gold-300 via-premium-gold-400 to-premium-gold-500 bg-clip-text text-transparent" style={{
                                    textShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
                                }}>
                                    Our Premium
                                </span>
                                <br />
                                <span className="text-white drop-shadow-xl">Selection</span>
                            </h2>

                            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Each product in our exclusive collection represents the pinnacle of oceanic luxury,
                                handpicked from the world's most pristine waters.
                            </p>
                        </div>

                        <ProductGrid products={products.data} />
                    </div>
                </section>

                {/* Premium About Section with enhanced depth */}
                <section id="about" className="py-24 px-4 relative">
                    <div className="absolute inset-0">
                        {/* Deep blue gradient foundation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a6f] via-[#1f5a8f] to-[#1a4a6f]"></div>

                        {/* 3D geometric grid overlay */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="h-full w-full" style={{
                                backgroundImage: `
                                    radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
                                    radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                                    linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
                                `,
                                backgroundSize: '400px 400px, 600px 600px, 80px 80px, 80px 80px'
                            }}></div>
                        </div>

                        {/* Premium 3D depth layers */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a42]/80 via-transparent to-[#1a4a6f]/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a4a6f]/15 to-[#0d2a42]/30"></div>

                        {/* Subtle noise texture for premium feel */}
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
                    </div>

                    <div className="container mx-auto max-w-5xl relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-playfair font-bold mb-8">
                                <span className="bg-gradient-to-r from-premium-gold-400 via-premium-gold-300 to-premium-gold-500 bg-clip-text text-transparent">
                                    About Krivetka.am
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <p className="text-premium-pearl-200 text-lg leading-relaxed">
                                    At Krivetka.am, we are passionate about bringing you the finest seafood from the depths of the ocean.
                                    Our commitment to quality and sustainability sets us apart in the industry.
                                </p>
                                <p className="text-premium-pearl-200 text-lg leading-relaxed">
                                    Each product in our collection is carefully selected and handled with the utmost care to ensure
                                    you receive nothing but the best. From our sustainable fishing practices to our premium packaging,
                                    every detail matters.
                                </p>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-premium-gold-500 to-premium-gold-600 rounded-full flex items-center justify-center">
                                        <span className="text-premium-onyx-900 font-bold">✓</span>
                                    </div>
                                    <span className="text-premium-gold-400 font-medium">Sustainably Sourced</span>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-premium-onyx-700/50 to-premium-onyx-800/50 p-8 rounded-2xl border border-premium-gold-500/20">
                                <h3 className="text-2xl font-playfair font-bold text-premium-gold-400 mb-4">Our Promise</h3>
                                <ul className="space-y-3">
                                    <li className="text-premium-pearl-200 flex items-center gap-3">
                                        <div className="w-2 h-2 bg-premium-gold-400 rounded-full"></div>
                                        Premium Quality Guarantee
                                    </li>
                                    <li className="text-premium-pearl-200 flex items-center gap-3">
                                        <div className="w-2 h-2 bg-premium-gold-400 rounded-full"></div>
                                        Sustainable Sourcing
                                    </li>
                                    <li className="text-premium-pearl-200 flex items-center gap-3">
                                        <div className="w-2 h-2 bg-premium-gold-400 rounded-full"></div>
                                        Expert Curation
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Premium Contact Section with enhanced styling */}
                <section id="contact" className="py-24 px-4 relative">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-gray-900/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-premium-gold-500/60 to-transparent shadow-lg shadow-premium-gold-500/30"></div>
                    </div>

                    <div className="container mx-auto max-w-5xl relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-playfair font-bold mb-6">
                                <span className="bg-gradient-to-r from-premium-gold-400 via-premium-gold-300 to-premium-gold-500 bg-clip-text text-transparent">
                                    Contact Us
                                </span>
                            </h2>
                            <p className="text-xl text-premium-pearl-200">
                                Experience luxury service that matches our premium products
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-premium-onyx-800/60 to-premium-onyx-900/80 p-10 rounded-2xl border border-premium-gold-500/20 backdrop-blur-md">
                                <h3 className="text-3xl font-playfair font-bold text-premium-gold-400 mb-6">Get in Touch</h3>
                                <p className="text-premium-pearl-200 mb-8 text-lg leading-relaxed">
                                    Have questions about our products or services? Our luxury concierge team is here to assist you.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-premium-gold-500 to-premium-gold-600 rounded-full flex items-center justify-center">
                                            <span className="text-premium-onyx-900 font-bold">📞</span>
                                        </div>
                                        <span className="text-premium-pearl-200 text-lg">+374 94616939</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-premium-onyx-800/60 to-premium-onyx-900/80 p-10 rounded-2xl border border-premium-gold-500/20 backdrop-blur-md">
                                <h3 className="text-3xl font-playfair font-bold text-premium-gold-400 mb-6">Luxury Service</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-premium-emerald-500 to-premium-emerald-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">24</span>
                                        </div>
                                        <div>
                                            <p className="text-premium-pearl-200 text-lg font-medium">Open 24/7</p>
                                            <p className="text-premium-pearl-300">Luxury never sleeps</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-premium-sapphire-500 to-premium-sapphire-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">⚡</span>
                                        </div>
                                        <div>
                                            <p className="text-premium-pearl-200 text-lg font-medium">Same-Day Delivery</p>
                                            <p className="text-premium-pearl-300">Premium locations only</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
