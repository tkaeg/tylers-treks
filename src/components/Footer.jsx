import SubscribeForm from './SubscribeForm'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-base font-semibold text-ink mb-1">Get updates on new trips</h2>
        <p className="text-muted text-sm mb-4">No need to have my mom text you my site every time I post something new!</p>
        <SubscribeForm />
      </div>
    </footer>
  )
}
