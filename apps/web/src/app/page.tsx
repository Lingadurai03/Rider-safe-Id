export default function Home() {
    return (
        <div>
            <button tabIndex={1}>hai</button>

            <div role='button' tabIndex={0} aria-pressed='false'>
                Like
            </div>
        </div>
    );
}
