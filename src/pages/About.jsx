import Carousel from '../components/Carousel'

const setupImages = [
  { src: 'images/camper_shell_rear_closed.jpg', alt: 'Rear View', caption: 'Rear View' },
  { src: 'images/camper_shell_rear_view.jpg', alt: 'Open Back View', caption: 'Very very dusty. Probably should clean.' },
  { src: 'images/camper_shell_side_view.jpg', alt: 'Side View', caption: 'Side View' },
  { src: 'images/materials.jpg', alt: 'Home Depot haul', caption: "Lotta extra wood cuz I told the guy the wrong measurements." },
  { src: 'images/bed_setup.jpg', alt: 'Bed Setup initial', caption: 'Just a couple of 2 by 4s and added some all weather carpet.' },
  { src: 'images/bed_setup_2.jpg', alt: 'Bed Setup Finished', caption: "Two pieces of plywood 3/4 inch thick and we're good to go! Cleaning off the dust was clearly not a priority of mine." },
]

export default function About() {
  return (
    <main className="pt-20 pb-16 max-w-2xl mx-auto px-4 md:px-6">
      <h1 className="text-3xl font-bold text-amber-400 mb-6">About Tyler's Treks</h1>

      <div className="prose prose-invert prose-amber prose-a:text-amber-400 max-w-none mb-10">
        <p>
          In 2026, I've made a goal of going to all of the national parks in California.
          I made this site to document my trips.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-stone-100 mb-1">December 7, 2025 — Truck Setup</h2>
      <p className="text-stone-500 text-sm mb-5">Building out the camper shell before the first trip.</p>

      <div className="mb-8">
        <Carousel images={setupImages} />
      </div>

      <div className="prose prose-invert prose-amber prose-a:text-amber-400 max-w-none">
        <p>
          I have very little knowledge of what camping in the bed of a truck is going to be like.
          I figured getting a camper shell would be a good place to start. I dove into the depths
          of Facebook Marketplace and found one! After I got the camper shell, I built out a bed
          system in the truck bed. I'm the least handy person on the planet but with the help of{' '}
          <a href="https://www.youtube.com/watch?v=WaRvZekpdVs">YouTube</a>, I was able to build
          a pretty solid setup.
        </p>
      </div>
    </main>
  )
}
