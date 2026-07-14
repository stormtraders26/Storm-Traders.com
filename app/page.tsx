"use client";

import { useState } from "react";

export default function StormTradersWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const products = [
  {
    name: "Pokémon Booster Packs",
    image: "/images/pokemon-booster-pack.jpg",
  },
  {
    name: "Elite Trainer Boxes",
    image: "/images/Elite Trainer Boxes.png",
  },
  {
    name: "One Piece Cards",
    image: "/images/One Piece Cards.png",
  },
  {
    name: "Disney Lorcana",
    image: "/images/Disney-Lorcana.png",
},
  {
    name: "Mystery Packs",
    image: "/images/Mystery Packs.png",
  },
  {
    name: "Sleeved Boosters",
    image: "/images/Sleeved Booster Packs.png",
  },
];

  const services = [
    {
      icon: "🏪",
      title: "Host a Machine",
      text: "Add a clean, exciting trading card vending machine to your mall, shop, arcade, game store, or family entertainment center.",
    },
    {
      icon: "📦",
      title: "Fresh Inventory",
      text: "We keep machines stocked with popular sealed TCG products customers are actively looking for.",
    },
    {
      icon: "✅",
      title: "Reliable Operation",
      text: "Storm Traders handles stocking, product rotation, maintenance, and machine presentation.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
    <div className="flex items-center gap-3">
      <img
        src="/images/storm-traders-logo.png"
        alt="Storm Traders Logo"
        className="h-30 w-auto"
      />

      <div>
        <p className="text-xl font-black">Storm Traders</p>
        <p className="text-xs text-slate-400">Trading Card Vending</p>
      </div>
    </div>

    <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
  <a href="#products" className="hover:text-yellow-300">Products</a>
  <a href="#locations" className="hover:text-yellow-300">Locations</a>
  <a href="#hosts" className="hover:text-yellow-300">Host a Machine</a>
  <a href="/shop" className="hover:text-yellow-300">Shop Accessories</a>
  <a href="#contact" className="hover:text-yellow-300">Contact</a>
</nav>

    <a
      href="#contact"
      className="rounded-xl bg-yellow-300 px-5 py-3 font-bold text-slate-950 hover:bg-yellow-200"
    >
      Get Started
    </a>
  </div>
</header>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-2 text-sm font-semibold text-yellow-200">
              ✨ Pokémon, One Piece & Disney Cards
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-tight md:text-7xl">
              Trading cards on demand.
              <span className="block text-yellow-300">No checkout line.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Storm Traders places modern vending machines filled with sealed TCG products in high-traffic locations, giving collectors a fast and exciting way to buy cards anytime.
            </p>

            <div className="flex gap-4">
  <a
    href="#hosts"
    className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950"
  >
    Host a Machine
  </a>
  <a
    href="#products"
    className="rounded-xl border border-white/20 px-6 py-3 font-bold text-white"
  >
    View Products
  </a>
</div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl">
            <div className="rounded-[1.5rem] bg-slate-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Featured Machine</p>
                  <p className="text-2xl font-black">Storm Traders TCG Hub</p>
                </div>
                <p className="text-3xl">⭐</p>
              </div>

              <div className="grid gap-3 rounded-2xl bg-slate-800 p-4">
                {products.slice(0, 4).map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl bg-slate-950/70 px-4 py-3">
                   <span className="font-semibold">{item.name}</span>
                    <span className="rounded-full bg-green-400/15 px-3 py-1 text-xs font-bold text-green-300">
                      In Stock
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-2xl font-black text-yellow-300">24/7</p>
                  <p className="text-xs text-slate-400">Access</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-2xl font-black text-yellow-300">TCG</p>
                  <p className="text-xs text-slate-400">Focused</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-2xl font-black text-yellow-300">Clean</p>
                  <p className="text-xs text-slate-400">Setup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-black uppercase tracking-widest text-red-500">What We Sell</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Collector favorites, stocked fast</h2>
            <p className="mt-5 text-slate-600">
              Our machines are built around sealed trading card products that customers recognize and trust.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
  <div
    key={product.name}
    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition"
  >
    <img
      src={product.image}
      alt={product.name}
      className="h-64 w-full object-cover"
    />

    <div className="p-6">
      <h3 className="text-xl font-black">{product.name}</h3>

      <p className="mt-3 text-slate-600">
        Available through Storm Traders vending locations.
      </p>
    </div>
  </div>
))}
          </div>
        </div>
      </section>

      <section id="hosts" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-300 text-3xl">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="locations" className="bg-slate-900 px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-black uppercase tracking-widest text-yellow-300">Locations</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Berkley Mall, Goldsboro NC</h2>
            <p className="mt-6 leading-8 text-slate-300">
              Storm Traders vending machines are a strong fit for malls, card shops, arcades, skating rinks, bowling centers, family entertainment venues, gyms, and retail lobbies.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Malls", "Game Stores", "Arcades", "Retail Lobbies"].map((place) => (
                <div key={place} className="rounded-2xl bg-white/5 p-4 font-bold">
                  📍 {place}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <h3 className="text-3xl font-black">Why property owners like it</h3>
            <ul className="mt-6 space-y-4 text-slate-200">
              <li>• Adds a fun attraction for kids, collectors, and families</li>
              <li>• Requires very little floor space</li>
              <li>• Storm Traders manages inventory and upkeep</li>
              <li>• Commission or placement options available</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-black uppercase tracking-widest text-yellow-300">Contact</p>
              <h2 className="mt-3 text-4xl font-black">Bring Storm Traders to your location</h2>
              <p className="mt-5 leading-8 text-slate-300">
                Interested in hosting a machine or buying TCG products? Reach out and let’s talk about the best setup for your location.
              </p>
            </div>

<form
  action="https://api.web3forms.com/submit"
  method="POST"
  className="space-y-4"
>
  <input
  type="hidden"
  name="access_key"
  value="0212283b-2f1d-4355-a3ba-1a6ba218f760"
/>

<input
  type="hidden"
  name="subject"
  value="New Host a Machine Request - Storm Traders"
/>
  <input
  type="hidden"
  name="_subject"
  value="New Host a Machine Request - Storm Traders"
/>

<input
  type="hidden"
  name="_captcha"
  value="false"
/>

  <input
    type="text"
    name="name"
    placeholder="Your Name"
    className="w-full rounded-xl bg-white/10 p-4 text-white"
    required
  />

  <input
    type="email"
    name="email"
    placeholder="Email Address"
    className="w-full rounded-xl bg-white/10 p-4 text-white"
    required
  />

  <input
    type="text"
    name="location"
    placeholder="Business / Location Name"
    className="w-full rounded-xl bg-white/10 p-4 text-white"
  />

  <textarea
    name="message"
    rows={5}
    placeholder="Tell us about your location and what you're interested in..."
    className="w-full rounded-xl bg-white/10 p-4 text-white"
    required
  />

  <button
    type="submit"
    className="w-full rounded-xl bg-yellow-300 px-6 py-4 font-black text-slate-950 hover:bg-yellow-200"
  >
    Send Message
  </button>
</form>
        </div>
      </div>
    </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-slate-400">
        <p>© 2026 Storm Traders. Trading card vending machines for collectors and families.</p>
      </footer>
    </main>
  );
}