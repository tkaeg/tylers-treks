import { Link } from 'react-router-dom'

const CONTACT_EMAIL = 'tylerkaegi@gmail.com'

export default function Terms() {
  return (
    <main className="pt-20 pb-16 max-w-2xl mx-auto px-4 md:px-6">
      <h1 className="text-3xl font-bold text-accent mb-2">Terms of Service</h1>
      <p className="text-muted text-sm mb-8">Last updated October 27, 2026</p>

      <div className="prose prose-amber prose-a:text-accent max-w-none">
        <p>
          Tyler's Treks (tylers-treks.com) is a personal travel blog run by me, Tyler Kaegi. By
          using the site, subscribing to updates, or leaving a comment, you agree to these terms.
        </p>

        <h2>My content</h2>
        <p>
          The writing, photos, videos, and timelapses on this site are mine unless I say
          otherwise. Feel free to link to any page or share it with friends. Please don't
          republish or sell my photos or posts without asking first.
        </p>

        <h2>Not travel advice</h2>
        <p>
          Everything here is a record of my own trips, written for fun. Trail conditions, road
          access, closures, and rules change all the time, and I get things wrong. Check with the{' '}
          <a href="https://www.nps.gov">National Park Service</a> and use your own judgment
          before heading out. You're responsible for your own safety, and I'm not liable for
          anything that happens on a trip you take based on something you read here.
        </p>

        <h2>Comments</h2>
        <p>
          You're welcome to comment on any trip. By posting, you confirm the comment is yours to
          share and give me permission to display it on the site. Keep it friendly: no spam,
          harassment, hate, illegal content, or other people's personal information. I can hide
          or delete any comment at any time, for any reason.
        </p>

        <h2>Email updates and newsletter</h2>
        <p>
          If you subscribe, either with the form on the site or through Google's newsletter
          sign-up, I'll email you when new trips go up. It's free, and you can unsubscribe at any
          time with the link in any email. How I handle your email address is covered in the{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>

        <h2>Links to other sites</h2>
        <p>
          I link to trails, park pages, maps, and other sites I found useful. I don't control
          those sites and I'm not responsible for what's on them.
        </p>

        <h2>No warranty</h2>
        <p>
          The site is provided as is. I do my best to keep it working and accurate, but I can't
          promise it will always be available, error-free, or up to date. To the fullest extent
          the law allows, I'm not liable for any damages that come from using the site.
        </p>

        <h2>Changes</h2>
        <p>
          I may update these terms now and then. When I do, I'll change the date at the top.
          Continuing to use the site after that means you accept the updated terms.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of California.</p>

        <h2>Contact</h2>
        <p>
          Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </main>
  )
}
