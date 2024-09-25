export default function Footer() {
    const date = new Date()
    return (
        <footer className="flex h-10 items-center justify-center bg-gray-100 p-3 text-sm font-semibold text-gray-600">
            <p>
                © {date.getFullYear()} <span>Digicom inc.</span>{' '}
            </p>
        </footer>
    )
}
