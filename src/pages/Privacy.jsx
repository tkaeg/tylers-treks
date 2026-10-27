import { Link } from 'react-router-dom'

const CONTACT_EMAIL = 'tylerkaegi@gmail.com'

export default function Privacy() {
  return (
    <main className="pt-20 pb-16 max-w-2xl mx-auto px-4 md:px-6">
      <h1 className="text-3xl font-bold text-accent mb-2">Privacy Policy</h1>
      <p className="text-muted text-sm mb-8">Last updated October 27, 2026</p>

      <div className="prose prose-amber prose-a:text-accent max-w-none">
        <p>
          Tyler's Treks is a personal travel blog run by me, Tyler Kaegi. I don't sell your
          information, run ads, or track you across other sites. This page explains the small
          amount of information the site does collect and what happens to it.
        </p>

        <h2>What I collect</h2>

        <h3>Email updates</h3>
        <p>
          If you subscribe using the form at the bottom of the site, I store your email address
          so I can email you when a new trip goes up. Those emails are sent through{' '}
          <a href="https://resend.com/legal/privacy-policy">Resend</a>. Every email has an
          unsubscribe link, and you can also email me to be removed.
        </p>

        <h3>Google newsletter sign-up</h3>
        <p>
          The site uses Google's Reader Revenue Manager, which can show a prompt to sign up for
          the newsletter with your Google account. If you sign up that way, Google shares your
          name and email address with me so I can send you updates. Google handles that sign-up
          under the <a href="https://policies.google.com/privacy">Google Privacy Policy</a>, and
          the Google script that loads on each page may set cookies or collect usage data on
          Google's behalf.
        </p>

        <h3>Comments</h3>
        <p>
          When you leave a comment, the name and comment you enter are stored and shown publicly
          next to that trip stop. I also store a one-way hash of your IP address, which is only
          used to stop spam by limiting how many comments can be posted in a short time. It can't
          be turned back into your IP address. Comments are stored with{' '}
          <a href="https://supabase.com/privacy">Supabase</a>. Your browser also remembers the
          name you typed so you don't have to enter it again; that stays on your device.
        </p>

        <h3>Analytics</h3>
        <p>
          I use <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel Web Analytics</a>{' '}
          to see things like page views and which pages people visit. It doesn't use cookies and
          doesn't identify individual visitors.
        </p>

        <h3>Hosting, maps, and photos</h3>
        <p>
          Like any website, loading a page sends your IP address and basic browser information to
          the services that deliver it. The site is hosted on{' '}
          <a href="https://vercel.com/legal/privacy-policy">Vercel</a>, photos and videos are
          served from <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a>, and the
          map on the home page is provided by{' '}
          <a href="https://www.mapbox.com/legal/privacy">Mapbox</a>. Each of them handles that
          data under its own privacy policy.
        </p>

        <h2>How I use it</h2>
        <p>
          Only to run the site: to send trip updates, show and moderate comments, block spam, and
          get a rough idea of how many people are reading. I don't sell or rent your information
          to anyone, and I don't share it with anyone other than the services listed above.
        </p>

        <h2>How long I keep it</h2>
        <p>
          Email addresses are kept until you unsubscribe or ask me to delete them. Comments stay
          up until I remove them or you ask me to.
        </p>

        <h2>Your choices</h2>
        <p>
          You can unsubscribe from emails at any time with the link in any email. To see, change,
          or delete anything I have about you, including a comment you posted, email me at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and I'll take care of it.
        </p>

        <h2>Kids</h2>
        <p>
          This site isn't directed at children under 13, and I don't knowingly collect
          information from them. If you think a child has given me their information, email me
          and I'll delete it.
        </p>

        <h2>Changes</h2>
        <p>
          If I change this policy, I'll update this page and the date at the top. See also the{' '}
          <Link to="/terms">Terms of Service</Link>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </main>
  )
}
